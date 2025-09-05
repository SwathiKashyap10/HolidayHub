import cloudinary from 'cloudinary'
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import fs from "fs";

const createRoom = async (req,res) => {
    try{
      // Parse room data from frontend (sent as JSON string in FormData)
      let roomData = JSON.parse(req.body.roomData);
      const owner = req.owner._id;

      const hotel =await Hotel.findOne({owner});
      if(!hotel){
        return res.json({success:false,message:"No hotel found"})
      }

      //maual Validation 
       if (!roomData.numberOfBeds) {
         return res.json({success:false,message:"Number of beds must be a positive number"});
       }

       if (!roomData.pricePerNight || roomData.pricePerNight <= 0) {
         return res.json({success:false,message:"Price per night must be a positive number"});
       }

       if (!roomData.description || roomData.description.trim().length < 10) {
         return res.json({success:false,message:"Description must be at least 10 characters long"});
       }

       if (!roomData.features || roomData.features.length === 0) {
         return res.json({success:false,message:"At least one feature is required"});
       }

       if (!req.files || req.files.length !== 4) {
         return res.json({
           success: false,
           message: "Exactly 4 room images are required"
         });
       }
   
      
       //Upload images to cloudinary
       let images = [];
       try{
         const uploadImages = req.files.map(async(file) =>
           await cloudinary.uploader.upload(file.path, { folder: "hotel_rooms" })
         );
         const uploaded = await Promise.all(uploadImages);
         images = uploaded.map(img => img.secure_url);
       } catch (err) {
         return res.json({ success: false, message: "Image upload failed: " + err.message });
       }


       // Create new room
       const newRoom = await Room.create({
         ...roomData,
         hotel: hotel._id,
         images
       });

      return res.json({success:true,message:"room created successfully",room: newRoom})
    }catch(err){
      return res.json({success:false,message:err.message});
    }
}

const getRooms = async (req,res)=>{
    try{
        const rooms = await Room.find().populate({
        path:'hotel',
        populate:{
            path:'owner',
            select:'name'
        }
        }).sort({createdAt:-1});
        return res.json({success:true,rooms})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getRoomsSearch = async (req, res) => {
  try {
    const { city } = req.query;  // instead of req.body

    // Get all hotels in the city
    const hotels = await Hotel.find({ city });

    // If no hotels found
    if (!hotels.length) {
      return res.json({ success: true, rooms: [] });
    }

    // Extract hotel IDs
    const hotelIds = hotels.map(hotel => hotel._id);

    // Find rooms that belong to these hotels
    const rooms = await Room.find({ hotel: { $in: hotelIds } })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "name"
        }
      })
      .sort({ createdAt: -1 });

    return res.json({ success: true,message:"rooms in the selected city", rooms });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


const getOwnerRoom = async (req,res)=>{
    try{
       const owner = req.owner._id;
       const hotelData = await Hotel.findOne({owner});
       const rooms = await Room.find({hotel:hotelData._id.toString()}).populate('hotel');
       return res.json({success:true,rooms})
    }catch(err){
       return res.json({success:false,message:err.message});
    }
}

const getRoomDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find room by id
    const room = await Room.findById(id).populate("hotel"); 

    if (!room) {
      return res.status(404).json({ success:false,message: "Room not found" });
    }

    res.json({success:true,message:"room deatils",room});
  } catch (err) {
    res.json({ success:false,message: err.message });
  }
};

const getFeaturedSection = async(req,res)=>{
  try{
    const Featuring = await Room.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate({
        path:'hotel',
        populate:{
            path:'owner',
            select:'name'
        }
      })

    if(!Featuring){
      return res.json({success:false,message:"Featured section is not available"})
    }

    return res.json({success:true,message:"featured section is fetched successfully",Featuring});
  }catch(err){
    return res.json({success:false,message:err.message})
  }
}


const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // roomData is sent as JSON string from frontend
    const roomData = JSON.parse(req.body.roomData);

    // Destructure fields you want to allow updating
    const { numberOfBeds, pricePerNight, description, features } = roomData;

    // Update only the text-based fields (leave images untouched)
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        numberOfBeds,
        pricePerNight,
        description,
        features,
      },
      { new: true } // return updated document
    );

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.json({ success: false, message: "Room not found" });
    }

    res.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


export { createRoom,getRooms,getOwnerRoom ,getRoomDetails,getRoomsSearch,getFeaturedSection,updateRoom,deleteRoom};