import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    numberOfBeds: {
        type: Number,
        required: true
    },
    images: {
        type: [String],  // ✅ array of strings
        default:[],
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: [String],  // ✅ array of strings
        default:[],
        required: true
    },
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;
