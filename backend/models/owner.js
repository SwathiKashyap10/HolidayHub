import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'owner'
    }
},{timestamps:true})

const Owner = mongoose.model("Owner",ownerSchema);
export default Owner;