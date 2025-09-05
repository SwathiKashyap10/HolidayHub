import express from 'express';
import {ownerProtect, userProtect} from '../middelwares/protect.js';
import { cancelBooking, confirmBooking, createBooking, getAllHotelBookings, getAllHotelBookingsInDetail, getAllUserBookings, getAllUserBookingsInDetail } from '../controllers/bookingsController.js';

const bookingsRouter = express.Router();

bookingsRouter.get("/get-all-user-bookings",userProtect,getAllUserBookings);
bookingsRouter.get("/get-all-user-bookings/:id",userProtect,getAllUserBookingsInDetail);
bookingsRouter.get("/get-all-hotel-bookings",ownerProtect,getAllHotelBookings);
bookingsRouter.get("/get-all-hotel-bookings/:id",ownerProtect,getAllHotelBookingsInDetail);
bookingsRouter.post("/book-room",userProtect,createBooking);
bookingsRouter.post("/confirm-booking/:id",ownerProtect,confirmBooking);
bookingsRouter.post("/owner/cancel-booking/:id",ownerProtect,cancelBooking);
bookingsRouter.post("/user/cancel-booking/:id",userProtect,cancelBooking);

export default bookingsRouter;