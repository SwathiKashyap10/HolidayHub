import React, { useEffect, useState } from 'react'
import Header from './Header'
import RoomsComponent from './RoomsComponent'
import axiosInstance from '../configs/axiosConfig';
import { Link } from 'react-router-dom';
import RoomCard from './RoomCard';
import Loading from './Loading';

const AdminManageRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

   const getAdminRooms = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/rooms/get-owner-rooms"); 

      if (res.data.success) {
        // console.log('res.data.rooms',res.data.rooms);
        setRooms(res.data.rooms); 
      } else {
        toast.error(res.data.message || "Failed to fetch rooms");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getAdminRooms();
  },[])

  if (loading) return <Loading/>;

  return (
    <div>
      <Header heading={'Manage Rooms'} paragraph={'View all listed rooms, update their details, or remove them from the booking platform.'}/>
      <div className="grid grid-cols-1 gap-6 col-span-4 px-10 pb-10">
        {rooms.map((room,idx)=>(<Link key={idx} to={`/admin/rooms/${room._id}`}><RoomCard roomData={room}/></Link>))}
      </div>
    </div>
  )
}

export default AdminManageRoom
