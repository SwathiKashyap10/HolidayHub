import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Owner from "../models/owner.js";
import Booking from "../models/booking.js";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";

const generateToken = (owner) => {
    const payload = { id: owner._id, email: owner.email ,role:owner.role} // <-- payload;
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
}

const registerOwner = async (req,res) => {
   try{
      const {name,email,password} = req.body;

      //   server side validation 
      if(!name || !email || !password ){
         return res.json({success:false,message:'All the fields are required'})
      }

      //   does owner already exists 
      const ownerExists = await Owner.findOne({email});
      if(ownerExists){
        return res.json({success:false,message:'User alrready exists,Please login'})
      }
      //   if owner does not exists create one 
      const hashedPassword = await bcrypt.hash(password,10);

      const newOwner = await Owner.create({name,email,password:hashedPassword});
      //generate token
      const token = generateToken(newOwner);

      res.json({success:true,message:"Admin registered successfully!",token,owner:newOwner.name});
   }catch(err){
      res.json({success:false,message:err.message});
   }
}

const loginOwner = async (req,res) => {
    try{
      const {email,password} = req.body;

      //find if owner exists
      const owner = await Owner.findOne({email});
      if(!owner){
        return res.json({success:false,message:'Owner not found'})
      }

      //   check if the password is correct 
      const isMatch = await bcrypt.compare(password,owner.password);
      if(!isMatch){
        return res.json({success:false,message:'Invalid credentials'})
      }

      //generate token
      const token = generateToken(owner);
      res.json({success:true,message:"Login is successfull!",token,owner:owner.name});
    }catch(err){
      res.json({success:false,message:err.message});
    }
}

const getOwnerData = (req,res) => {
    try{
        const {owner} = req;
        return res.json({success:true,owner});
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

const getDashboardDetails = async (req, res) => {
  try {
    const owner = req.owner._id;

    // Find hotel owned by this owner
    const hotel = await Hotel.findOne({ owner });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // Count rooms
    const rooms = await Room.find({ hotel: hotel._id });
    const totalRooms = rooms.length;

    // Get all bookings
    const allBookings = await Booking.find({ hotel: hotel._id });
    const totalBookings = allBookings.length;

    // Pending bookings
    const pendingBookings = await Booking.find({ hotel: hotel._id, status: "pending" });
    const totalPendingBookings = pendingBookings.length;

    // Completed bookings
    const completedBookings = await Booking.find({ hotel: hotel._id, status: "confirmed" });
    const totalCompletedBookings = completedBookings.length;

    // Recent 4 bookings
    const recentBookings = await Booking.find({ hotel: hotel._id })
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("user");

    // Total revenue from confirmed bookings
    const totalRevenue = await Booking.aggregate([
      { $match: { hotel: hotel._id, status: "confirmed" } },
      { $group: { _id: null, totalAmount: { $sum: "$totalPrice" } } }
    ]);

    return res.json({
      success: true,
      message: "dashboard details",
      dashboard: {
        totalRooms,
        totalBookings,
        totalPendingBookings,
        totalCompletedBookings,
        recentBookings,
        totalRevenue: totalRevenue[0]?.totalAmount || 0
      }
    });

  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


export { registerOwner , loginOwner ,getOwnerData,getDashboardDetails};