import express from 'express';
import {ownerProtect} from '../middelwares/protect.js';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();

hotelRouter.post("/register",ownerProtect,registerHotel);

export default hotelRouter;