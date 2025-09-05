import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingsRouter from './routes/bookingsRoutes.js';

const app = express();

await connectDB();
await connectCloudinary();

//middelware
app.use(cors({
  origin: "https://holidayhub-frontend.onrender.com", // 👈 better to use specific origin in dev
  credentials: true               // if using cookies or tokens
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("welcome to HolidayHub")
});

app.use("/api/user",userRouter);
app.use("/api/owner",ownerRouter);
app.use("/api/hotel",hotelRouter);
app.use("/api/rooms",roomRouter);
app.use("/api/bookings",bookingsRouter);

app.listen(process.env.PORT_NO,(req,res)=>{
    console.log(`server is listening at port ${process.env.PORT_NO}`)
})