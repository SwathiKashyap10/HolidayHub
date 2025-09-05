import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig';
import FeaturedCards from './FeaturedCards';
import Loading from './Loading';

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get("/rooms/get-featuring-rooms");
      // console.log('this one = ',res);
      setRooms(res.data.Featuring);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
      fetchRooms();
  },[]);

  if (loading) return <Loading/>;

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-26 bg-bgk">
      
      {/* Heading */}
      <div className="flex flex-col justify-center items-center mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Featured Rooms
        </h2>
        <p className="text-gray-600 text-sm sm:text-md mt-4 max-w-2xl">
         Discover our handpicked selection of comfortable and luxurious rooms, perfect for your next stay.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rooms.map((room,idx)=>(<Link key={idx} to={`/rooms/${room._id}`}><FeaturedCards roomData={room}/></Link>))}
      </div>

      {/* Explore Button */}
      <div className="flex items-center justify-center mt-10">
        <button 
          onClick={() => navigate('/rooms')} 
          className='bg-extra hover:bg-primary-dull px-8 py-2 rounded-3xl text-white cursor-pointer transition-all text-sm sm:text-base'>
          Explore all rooms &nbsp; <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default FeaturedSection
