import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room',
        required:true
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel',
        required:true
    },
    checkInDate:{
        type:Date,
        required:true
    },
    checkOutDate:{
        type:Date,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    guests:{
        type:Number,
        required:true
    },
    status: {
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    },
    paymentMethod:{
        type:String,
        default:"Pay at hotel",
        required:true,
    },
    isPaid:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true})

const Booking = mongoose.model("Booking",bookingSchema);
export default Booking;