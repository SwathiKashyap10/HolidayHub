import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const payload = { id: user._id, email: user.email ,role:user.role} // <-- payload;
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
}

const registerUser = async (req,res) => {
   try{
      const {name,email,password} = req.body;

      //   server side validation 
      if(!name || !email || !password){
         return res.json({success:false,message:'All the fields are required'})
      }

      //   does user already exists 
      const userExists = await User.findOne({email});
      if(userExists){
        return res.json({success:false,message:'User alrready exists,Please login'})
      }
      //   if user does not exists create one 
      const hashedPassword = await bcrypt.hash(password,10);

      const newUser = await User.create({name,email,password:hashedPassword});
      //generate token
      const token = generateToken(newUser);

       res.json({success:true,message:"User registered successfully!",token,user:newUser.name});
   }catch(err){
      res.json({success:false,message:err.message});
   }
}

const loginUser = async (req,res) => {
    try{
      const {email,password} = req.body;

      //find if user exists
      const user = await User.findOne({email});
      if(!user){
        return res.json({success:false,message:'User nor found'})
      }

      //   check if the password is correct 
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.json({success:false,message:'Invalid credentials'})
      }

      //generate token
      const token = generateToken(user);
      res.json({success:true,message:"Login successfull!",token,user:user.name});
    }catch(err){
      res.json({success:false,message:err.message});
    }
}

const getUserData = (req,res) => {
    try{
        const {user} = req;
        return res.json({success:true,user});
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

export { registerUser,loginUser ,getUserData};