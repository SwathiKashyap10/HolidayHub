import Booking from "../models/booking.js";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
import User from "../models/user.js";

const createBooking = async(req,res) => {
    try{
       const bookingData = req.body;//room,checkin,checkout,guests
       const userId = req.user._id;

       //get the room data
       const roomData = await Room.findById(bookingData.roomId).populate('hotel');
       const user = await User.findById(userId);
       let totalPrice = roomData.pricePerNight;

       //calculate total price based on nights
       const checkIn = new Date(bookingData.checkInDate);
       const checkOut = new Date(bookingData.checkOutDate);
       const timeDiff = checkOut.getTime() - checkIn.getTime();
       const nights = Math.ceil(timeDiff/(1000 *3600 * 24))

       totalPrice *= nights;
       const booking  = await Booking.create({
        ...bookingData,
        room:roomData,
        user,
        hotel:roomData.hotel,
        totalPrice,
       })

       return res.json({success:true,message:"Room is booked Successfully!",booking});
    }catch(err){
       return res.json({success:false,message:err.message});
    }
}

const getAllUserBookings = async(req,res)=>{
    try{
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt:-1})
        return res.json({success:true,bookings});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

const getAllUserBookingsInDetail = async (req, res) => {
  try {
    const bookingId = req.params.id; // extract user ID from URL params

    // Find bookings for this user, and populate details
    const mybookings = await Booking.find({ _id: bookingId })
      .populate("room")
      .populate({
        path: "hotel",
        populate: { path: "owner" }  // <-- populate owner inside hotel
      })
      .sort({ createdAt: -1 });

    return res.json({ success: true, mybookings });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


const getAllHotelBookings = async(req,res)=>{
    try{
        const owner = req.owner._id;
        const hotel = await Hotel.findOne({owner});
        if(!hotel){
            return res.json({success:false,message:"hotel not found"})
        }
        const hotelBookings = await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});

        const totalBookings = hotelBookings.length;
        const totalRevenue = hotelBookings.reduce((acc,booking)=>acc+booking.totalPrice,0);

        return res.json({success:true,dashboard:{totalBookings,totalRevenue,hotelBookings}});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

const getAllHotelBookingsInDetail = async (req, res) => {
  try {
    const bookingId = req.params.id; // extract user ID from URL params

    // Find bookings for this user, and populate details
    const bookings = await Booking.find({ _id: bookingId })
      .populate("room")
      .populate("hotel")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Confirm a single booking
const confirmBooking = async (req, res) => {
  try {       
    const bookingId = req.params.id;      

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId},  
      { $set: { status: "confirmed" } },
      { new: true }  // return updated document
    ).populate("room hotel user")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or unauthorized"
      });
    }

    return res.json({
      success: true,
      message: "Booking confirmed successfully",
      booking
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// cancel a single booking
const cancelBooking = async (req, res) => {
  try {       
    const bookingId = req.params.id;      

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId},  
      { $set: { status: "cancelled" } },
      { new: true }  // return updated document
    ).populate("room hotel user")

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or unauthorized"
      });
    }

    return res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};




export {createBooking,getAllUserBookings,getAllHotelBookings,getAllHotelBookingsInDetail,getAllUserBookingsInDetail,confirmBooking,cancelBooking};