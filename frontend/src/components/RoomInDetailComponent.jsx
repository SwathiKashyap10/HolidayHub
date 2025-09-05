import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast,Toaster} from 'react-hot-toast'
import axiosInstance from '../configs/axiosConfig'
import Loading from './Loading'

const RoomInDetailComponent = () => {
  const navigate = useNavigate();

  const { id } = useParams();   // ✅ move hook to top-level
  const [roomData, setRoomData] = useState([]);
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

  const fetchRoomDetails = async() => {
    try {
      const res = await axiosInstance.get(`/rooms/roomInDetail/${id}`);
      // console.log('room data ', res);

      if (res.data.success) {
        // console.log('res.data.room',res.data.room);
        setRoomData(res.data.room);
        setImages(res.data.room.images)
        setSelectedImg(res.data.room.images[0]); // ✅ set default to first room image
        setFeatures(res.data.room.features);
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

         // Send admin-data
         const res = await axiosInstance.post("/bookings/book-room", bookingPayload);
        //  console.log("booking created:", res);

         //handel response
         if(res.data.success){
           toast.success(res.data.message);
     
           // Navigate after toast disappears
           setTimeout(() => {
             navigate("/my-bookings");
           }, 3000);
         }else{
           toast.error(res.data.message);
         }
     }catch(err){
        toast.error(err.message);
     }
   };

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
          <span className="text-3xl font-semibold ">{roomData.hotel.name}</span>&nbsp;
          <span className='text-lg text-gray-600'>({roomData.numberOfBeds == 1 ? "Single bed" :  "Double bed"})</span>
          <p className="text-md mt-3"><i class="fa-solid fa-location-dot"></i>{roomData.hotel.address},&nbsp;{roomData.hotel.city}</p>
          <p className="text-md mt-3"></p>
          <hr/>
        </div>
        <div className='mt-10'>
          <h3 className='text-lg font-semibold mb-3'>Description</h3>
          <p>{roomData.description}</p>
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
          <div className='flex items-center justify-between my-3'>
            <p className='text-2xl font-semibold'>&#x20B9;{roomData.pricePerNight}</p>
            <p className='text-gray-500 text-md'>per night</p>
          </div>
          <hr/>
          <form className='py-6'>
            <div className='flex flex-col items-start text-lg mb-5'>
                <label htmlFor='pick-up date'>Check-in Date</label>
                <input type='date' name='checkInDate' value={bookingData.checkInDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 mt-2 border w-full px-4 py-2' required/>
            </div>
            <div className='flex flex-col items-start text-lg'>
                <label htmlFor='return date'>Check-out Date</label>
                <input type='date' name='checkOutDate' value={bookingData.checkOutDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 mt-2 border w-full px-4 py-2' required/>
            </div>
             <div className='flex flex-col items-start text-lg mt-5'>
                <label htmlFor='number of guest'>Number of guest</label>
                <input type='Number' name='guests' value={bookingData.guests} onChange={handleChange} min='1' placeholder='minimum 1' className='text-sm text-gray-500 mt-2 border w-full px-4 py-2' required/>
            </div>
            {/* Pay at Hotel */}
            <div className="flex items-center mt-5">
              <input type="checkbox" name="payAtHotel" checked={bookingData.payAtHotel} onChange={handleChange} className="mr-2" required/>
              <label htmlFor="payAtHotel" className="text-lg">  Pay at Hotel</label>
             </div>
          </form>
          <button onClick={handleSubmit} className='bg-extra hover:bg-primary-dull w-full px-8 py-2 rounded-lg text-white cursor-pointer transition-all mt-4'>Book This Room</button>
        </div>
      </div>
    </div>
  )
}

export default RoomInDetailComponent
