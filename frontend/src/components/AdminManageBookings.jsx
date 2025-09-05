import React, { useEffect, useState } from 'react'
import Header from './Header'
import RoomCard from './RoomCard'
import { Link } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig'
import ManageBookingsCard from './ManageBookingsCard'
import Loading from './Loading'

const AdminManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

   const getAdminBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/bookings/get-all-hotel-bookings"); 
      // console.log(res.data.dashboard.hotelBookings);

      if (res.data.success) {
        setBookings(res.data.dashboard.hotelBookings); 
      } else {
        toast.error(res.data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getAdminBookings();
  },[])

  if (loading) return <Loading/>;

  return (
    <div>
      <Header heading={'Manage Bookings'} paragraph={'Track all customer bookings, approve or cancel requests, and manage booking statuses'}/>
      <div className="grid grid-cols-1 gap-6 col-span-4 px-10">
        {bookings.map((booking,idx)=>(<Link key={idx} to={`/admin/manage-bookings/${booking._id}`}><ManageBookingsCard booking={booking}/></Link>))}
      </div>
    </div>
  )
}

export default AdminManageBookings
