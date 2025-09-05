import express from 'express';
import { getUserData, loginUser, registerUser } from '../controllers/userController.js';
import  { userProtect} from '../middelwares/protect.js';

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/data",userProtect,getUserData);

export default userRouter;