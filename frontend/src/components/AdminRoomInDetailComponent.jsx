import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast,Toaster} from 'react-hot-toast'
import axiosInstance from '../configs/axiosConfig'
import Loading from './Loading'

const AdminRoomInDetailComponent = () => {
  const navigate = useNavigate();

  const { id } = useParams();   
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
    //   console.log('room data ', res);

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
      console.log(err.message);
      toast.error(err.message);
    }finally {
    setLoading(false); // ✅ runs always, success or error
    }
  }

  useEffect(()=>{
    fetchRoomDetails();
    window.scrollTo(0, 0);
  },[id])

   const handleDelete = async (e) => {
     e.preventDefault();

     if (!window.confirm("Are you sure you want to delete this room?")) {
       return;
     }

     const toastId = toast.loading("Deleting room...");

     try {
       const res = await axiosInstance.delete(`/rooms/delete/${id}`);

       if (res.data.success) {
         toast.success(res.data.message, { id: toastId });
         setTimeout(() => navigate("/admin/manage-rooms"), 2000);
       } else {
         toast.error(res.data.message, { id: toastId });
       }
     } catch (err) {
       toast.error(err.message, { id: toastId });
     }
   };


  if (loading) return <Loading/>;

  return (
    <div className='mx-20 max-sm:mx-4 mt-15 max-sm:mt-4 mb-20'>
      <Toaster position="top-center" reverseOrder={false}/>
      {/* div 1  */}
      <div className='col-span-3'>
        <Link to='/'><p className='text-gray-500 text-md mb-4'><i class="fa-solid fa-arrow-left"></i> &nbsp;Back to home</p></Link>
        <div className='mt-3 flex flex-row justify-between'>
          <div className=''>
            <span className="text-3xl font-semibold ">{roomData.hotel.name}</span>&nbsp;
            <span className='text-lg text-gray-600'>({roomData.numberOfBeds == 1 ? "Single bed" :  "Double bed"})</span>
            <p className="text-md mt-3"><i class="fa-solid fa-location-dot"></i>{roomData.hotel.address},&nbsp;{roomData.hotel.city}</p>
            <p className="text-md mt-3"></p>
          </div>
          <div className='space-x-4'>
            <Link to={`/admin/edit/rooms/${id}`}><button className='bg-extra hover:bg-yellow-500 hover:text-black px-8 py-2 rounded-3xl text-white cursor-pointer transition-all'>Edit</button></Link>
            <button onClick={handleDelete} className='bg-extra hover:bg-red-600 px-8 py-2 rounded-3xl text-white cursor-pointer transition-all'>Delete</button>
          </div>
        </div>
        <hr/>
        <div className='py-4'>
          <img src={selectedImg} alt='car image' className='w-full h-120'/>
          <div className='grid grid-cols-4 gap-2 mt-5'>
            {images.map((img,index)=>(
                <img key={index} src={img} alt='car img' onClick={() => setSelectedImg(img)} className={`cursor-pointer rounded-md object-cover h-24 w-full border-2 transition 
                  ${selectedImg === img ? "border-extra" : "border-transparent"}`}/>
            ))}
          </div>
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
    </div>
  )
}

export default AdminRoomInDetailComponent
