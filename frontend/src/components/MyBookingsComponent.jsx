import React, { useEffect, useState } from 'react'
import MyBookingsHeader from './MyBookingsHeader'
import MyBookingsCard from './MyBookingsCard'
import axiosInstance from '../configs/axiosConfig';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Loading from './Loading';

const MyBookingsComponent = () => {
  const [mybookings, setMybookings] = useState([]);
  const [loading, setLoading] = useState(false);

   const getUserBookings = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/bookings/get-all-user-bookings"); 
      // console.log(res.data.bookings);

      if (res.data.success) {
        setMybookings(res.data.bookings); 
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
    getUserBookings();
  },[])

  if (loading) return <Loading/>;

  return (
    <div>
      <MyBookingsHeader/>
      <div className="grid grid-cols-1 gap-6 col-span-4 px-20 pb-10">
      {mybookings.map((mybooking,idx)=>(<Link key={idx} to={`/my-bookings/${mybooking._id}`}><MyBookingsCard booking={mybooking}/></Link>))}
      </div>
      <Footer/>
    </div>
  )
}

export default MyBookingsComponent
