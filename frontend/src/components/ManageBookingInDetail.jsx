import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast,Toaster} from 'react-hot-toast'
import axiosInstance from '../configs/axiosConfig'
import Loading from './Loading'

const ManageBookingInDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();   // ✅ move hook to top-level
  const [booking, setBooking] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [images,setImages] = useState([]);
  const [features,setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoomDetails = async() => {
    try {
      const res = await axiosInstance.get(`/bookings/get-all-hotel-bookings/${id}`);
      // console.log('myBookings data ', res.data.bookings[0]);

      if (res.data.success) {
        setBooking(res.data.bookings[0]);
        setImages(res.data.bookings[0].room.images)
        setSelectedImg(res.data.bookings[0].room.images[0]); // ✅ set default to first room image
        setFeatures(res.data.bookings[0].room.features);
        setLoading(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }finally {
    setLoading(false); // ✅ runs always, success or error
    }
  }

  useEffect(()=>{
    fetchRoomDetails();
    window.scrollTo(0, 0);
  },[id])

   const confirmBooking = async() => {
    try{
      const userConfirmed = window.confirm("Do you want to confirm the booking?");
      if (!userConfirmed) {
        return; 
      }
      setLoading(true);
      const res = await axiosInstance.post(`/bookings/confirm-booking/${id}`);
      // console.log("booking confirmed:", res);
      setLoading(false);
      if(res.data.success){
        setBooking(res.data.booking);
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }catch(err){
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
   }

   const cancelBooking = async() => {
    try{
      const userConfirmed = window.confirm("Do you want to cancel this booking?");
      if (!userConfirmed) {
        return; 
      }
      setLoading(true);
      const res = await axiosInstance.post(`/bookings/owner/cancel-booking/${id}`);
      // console.log("booking cancelled:", res);
      setLoading(false);
      if(res.data.success){
        setBooking(res.data.booking);
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }catch(err){
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
   }

  if (loading) return <Loading/>;

  return (
    <div className='grid grid-cols-5 max-sm:grid-cols-1 mx-20 max-sm:mx-4 mt-15 max-sm:mt-4 mb-20'>
      <Toaster position="top-center" reverseOrder={false}/>
      {/* div 1  */}
      <div className='col-span-3'>
        <Link to='/'><p className='text-gray-500 text-md mb-4'><i class="fa-solid fa-arrow-left"></i> &nbsp;Back to home</p></Link>
        <div className='py-4'>
          <img src={selectedImg} alt='car image' className='w-full h-120'/>
          <div className='grid grid-cols-4 gap-2 mt-5'>
            {images.map((img,index)=>(
                <img key={index} src={img} alt='car img' onClick={() => setSelectedImg(img)} className={`cursor-pointer rounded-md object-cover h-24 w-full border-2 transition 
                  ${selectedImg === img ? "border-extra" : "border-transparent"}`}/>
            ))}
          </div>
        </div>
        <div className='mt-3'>
          <span className="text-3xl font-semibold ">{booking.hotel.name}</span>&nbsp;
          <span className='text-lg text-gray-600'>({booking.numberOfBeds == 1 ? "Single bed" :  "Double bed"})</span>
          <p className="text-md mt-3"><i class="fa-solid fa-location-dot"></i>{booking.hotel.address},&nbsp;{booking.hotel.city}</p>
          <p className="text-md mt-3"></p>
          <hr/>
        </div>
        <div className='mt-10'>
          <h3 className='text-lg font-semibold mb-3'>Description</h3>
          <p>{booking.room.description}</p>
        </div>
        <div className='mt-6'>
          <h3 className='text-lg font-semibold mb-3'>Features</h3>
          <div className='grid grid-cols-2 gap-2'>
          {features.map((feature,index)=><p key={index} className=''><i class="fa-regular fa-circle-check"></i> &nbsp;{feature}</p>)}
          </div>
        </div>
      </div>
      {/* div 2  */}
      <div className='col-span-2 ml-10 max-sm:ml-1 mt-13'>
        <div className='bg-white shadow-2xl px-5 py-10'>
          <p className='text-2xl font-semibold mb-2'>Booking details</p>
          <hr/>
          <div className='mt-4'>
          <p className=' text-lg mb-2'><span className='text-black'>Name : </span><span className='text-gray-600 font-semibold'>{booking.user.name}</span></p>
          <p className='text-gray-700 text-md mb-2'><span className='text-black'>Email : </span> <span className='text-gray-600 font-semibold'>{booking.user.email}</span></p>
          <p className='text-gray-700 text-lg mb-2'><span className='text-black'>Check-in: </span> <span className='text-gray-600 font-semibold'>{new Date(booking.checkInDate).toLocaleString()}</span></p>
          <p className='text-gray-700 text-lg mb-2'><span className='text-black'>Check-out: </span> <span className='text-gray-600 font-semibold'>{new Date(booking.checkOutDate).toLocaleString()}</span></p>
          <p className='text-gray-700 text-lg mb-2'><span className='text-black'>Guests: </span> <span className='text-gray-600 font-semibold'>{booking.guests}</span></p>
          <p className='text-gray-900 font-semibold text-2xl mt-6'>Total: ₹{booking.totalPrice}</p>
          <p className='text-gray-600 text-sm  mt-2'>Payment: {booking.paymentMethod}</p>
          <p className={`text-sm mt-6 ${booking.status === "confirmed" ? "text-green-600" : "text-red-600"}`}> Status: {booking.status}
          </p>
          </div>
          <button onClick={confirmBooking} className='bg-green-600 hover:bg-primary-dull w-full px-8 py-2 rounded-lg text-white cursor-pointer transition-all mt-4'>Approve booking</button>
          <button onClick={cancelBooking} className='bg-red-600 hover:bg-primary-dull w-full px-8 py-2 rounded-lg text-white cursor-pointer transition-all mt-4'>Disapprove booking</button>
        </div>
      </div>
    </div>
  )
}

export default ManageBookingInDetail
 


