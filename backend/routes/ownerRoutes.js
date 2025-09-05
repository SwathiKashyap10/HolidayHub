import express from 'express';
import {ownerProtect} from '../middelwares/protect.js';
import { getDashboardDetails, getOwnerData, loginOwner, registerOwner } from '../controllers/ownerController.js';

const ownerRouter = express.Router();

ownerRouter.post("/register",registerOwner);
ownerRouter.post("/login",loginOwner);
ownerRouter.get("/data",ownerProtect,getOwnerData);
ownerRouter.get("/get-dashboard-details",ownerProtect,getDashboardDetails);

export default ownerRouter;