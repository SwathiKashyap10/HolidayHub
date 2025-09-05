import React, { useEffect, useState } from 'react'
import RoomCard from '../components/RoomCard'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig';
import RoomsHeader from './RoomsHeader';
import Loading from './Loading';

const RoomsComponent = ({searchCity,setSearchCity}) => {
  const [rooms, setRooms] = useState([]);
  const [searchAllRooms,setSearchAllRooms] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const priceFilters = [
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Latest First", value: "latest" },
  { label: "Oldest First", value: "oldest" }
];

  
  const [priceOrder,setPriceOrder] = useState('');

  const fetchRooms = async () => {
    try {
      if(searchCity){
       setSearchAllRooms(false);
       const res = await axiosInstance.get("/rooms/get-all-rooms-search", {params: { city: searchCity },});
      //  console.log('searchcity true:',res.data.rooms);
       setRooms(res.data.rooms);
       setLoading(false);
      }else{
       const res = await axiosInstance.get("/rooms/get-all-rooms");
      //  console.log("'searchcity false:",res.data);
       setRooms(res.data.rooms);
       setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchRooms();
  },[searchAllRooms])

  const handelSearch = (e) => {
     e.preventDefault();
     setSearchAllRooms(true);
     setSearchCity("");
  }

  if (loading) return <Loading/>;

  return (
    <div className="w-full bg-bgk px-5 sm:px-20 py-6">
      <RoomsHeader/>
      {(searchCity && !searchAllRooms)  && (<div className='flex justify-between items-center mb-6'><p className='text-md text-gray-500 cursor-pointer'>All hotels in "{searchCity}"</p><button onClick={handelSearch} className='bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-800'>See all rooms</button></div>)}
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 col-span-4">
        {rooms.map((room,idx)=>(<Link key={idx} to={`/rooms/${room._id}`}><RoomCard roomData={room}/></Link>))}
      </div>
    </div>
  )
}

export default RoomsComponent;
