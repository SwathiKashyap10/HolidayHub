import express from 'express';
import {ownerProtect, userProtect} from '../middelwares/protect.js';
import { createRoom, deleteRoom, getFeaturedSection, getOwnerRoom, getRoomDetails, getRooms, getRoomsSearch, updateRoom } from '../controllers/roomController.js';
import upload from '../middelwares/multer.js';

const roomRouter = express.Router();

roomRouter.post("/register", upload.array("images",4),ownerProtect,createRoom);
roomRouter.get("/get-all-rooms",getRooms);
roomRouter.get("/get-featuring-rooms",getFeaturedSection);
roomRouter.get("/roomInDetail/:id",getRoomDetails);
roomRouter.get("/get-owner-rooms",ownerProtect,getOwnerRoom)
roomRouter.get("/get-all-rooms-search",getRoomsSearch)
roomRouter.put("/update/:id", upload.array("images", 4),ownerProtect, updateRoom);
roomRouter.delete("/delete/:id",ownerProtect, deleteRoom);


export default roomRouter;