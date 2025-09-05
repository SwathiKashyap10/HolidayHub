import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast,Toaster} from 'react-hot-toast'
import axiosInstance from '../configs/axiosConfig'
import Loading from './Loading'

const MyBookingsInDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();   // ✅ move hook to top-level
  const [mybooking, setMybooking] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [images,setImages] = useState([]);
  const [features,setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingData,setBookingData] = useState({
    roomId : "",
    checkInDate:"",
    checkOutDate:"",
    guests:"",
    payAtHotel: false,
  })

  const fetchMybookingDetails = async() => {
    try {
      const res = await axiosInstance.get(`/bookings/get-all-user-bookings/${id}`);
      // console.log('Bookings data ', res.data.mybookings[0]);

      if (res.data.success) {
        setMybooking(res.data.mybookings[0]);
        setImages(res.data.mybookings[0].room.images)
        setSelectedImg(res.data.mybookings[0].room.images[0]); // ✅ set default to first room image
        setFeatures(res.data.mybookings[0].room.features);
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
    fetchMybookingDetails();
    window.scrollTo(0, 0);
  },[id])

  const handleChange = (e) => {
    // setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    const { name, type, value, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
     const bookingPayload = { ...bookingData, roomId: id };
     try{
         // client side validation 
         if (!bookingPayload.checkInDate || !bookingPayload.checkOutDate || !bookingPayload.guests) {
           toast.error("All fields are required");
           return;
         }

         if (!bookingData.payAtHotel) {
          toast.error("Please agree to 'Pay at Hotel' before continuing.");
          return;
         }

        //  console.log('booking payload : ',bookingPayload);
         // Send admin-data
         const res = await axiosInstance.post("/bookings/book-room", bookingPayload);
        //  console.log("booking created:", res);

         //handel response
         if(res.data.success){
           toast.success(res.data.message);
     
           // Navigate after toast disappears
           setTimeout(() => {
             navigate("/");
           }, 3000);
         }else{
           toast.error(res.data.message);
         }
     }catch(err){
        toast.error(err.message);
     }
   };

   const cancelBooking = async() => {
    try{
      const userConfirmed = window.confirm("Do you want to cancel this booking?");
      if (!userConfirmed) {
        return; 
      }
      setLoading(true);
      const res = await axiosInstance.post(`/bookings/user/cancel-booking/${id}`);
      // console.log("booking cancelled:", res);
      setLoading(false);
      if(res.data.success){
        setMybooking(res.data.booking);
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
          <span className="text-3xl font-semibold ">{mybooking.hotel.name}</span>&nbsp;
          <span className='text-lg text-gray-600'>({mybooking.numberOfBeds == 1 ? "Single bed" :  "Double bed"})</span>
          <p className="text-md mt-3"><i class="fa-solid fa-location-dot"></i>{mybooking.hotel.address},&nbsp;{mybooking.hotel.city}</p>
          <p className="text-md mt-3"></p>
          <hr/>
        </div>
        <div className='mt-10'>
          <h3 className='text-lg font-semibold mb-3'>Description</h3>
          <p>{mybooking.room.description}</p>
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
          <p className=' text-lg mb-2'><span className='text-black'>Owner name : </span><span className='text-gray-600 font-semibold'>{mybooking.hotel.owner.name}</span></p>
          <p className='text-gray-700 text-md mb-2'><span className='text-black'>Owner Email : </span> <span className='text-gray-600 font-semibold'>{mybooking.hotel.owner.email}</span></p>
          <p className='text-gray-700 text-md mb-2'><span className='text-black'>Hotel Contact Email : </span> <span className='text-gray-600 font-semibold'>{mybooking.hotel.contact}</span></p>
          <p className='text-gray-700 text-lg mb-2 mt-5'><span className='text-black'>Check-in: </span> <span className='text-gray-600 font-semibold'>{new Date(mybooking.checkInDate).toLocaleString()}</span></p>
          <p className='text-gray-700 text-lg mb-2'><span className='text-black'>Check-out: </span> <span className='text-gray-600 font-semibold'>{new Date(mybooking.checkOutDate).toLocaleString()}</span></p>
          <p className='text-gray-700 text-lg mb-2'><span className='text-black'>Guests: </span> <span className='text-gray-600 font-semibold'>{mybooking.guests}</span></p>
          <p className='text-gray-900 font-semibold text-2xl mt-6'>Total: ₹{mybooking.totalPrice}</p>
          <p className='text-gray-600 text-sm  mt-2'>Payment method: {mybooking.paymentMethod}</p>
          <p className={`text-sm mt-6 ${mybooking.status === "confirmed" ? "text-green-600" : "text-red-600"}`}> Status: {mybooking.status} </p>
          </div>
          <button onClick={cancelBooking} className='bg-red-600 hover:bg-primary-dull w-full px-8 py-2 rounded-lg text-white cursor-pointer transition-all mt-4'>Cancel booking</button>
        </div>
      </div>
    </div>
  )
}

export default MyBookingsInDetail
 





