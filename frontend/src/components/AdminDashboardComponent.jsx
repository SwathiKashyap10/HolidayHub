import React, { useEffect, useState } from 'react'
import { GrNotes } from "react-icons/gr";
import Header from './Header'
import {toast,Toaster} from 'react-hot-toast'
import axiosInstance from '../configs/axiosConfig';
import Loading from './Loading';

const AdminDashboardComponent = () => {
   const [dashboardData, setDashboardData] = useState(null);
   const [recentBookings, setRecentBookings] = useState([]);
   const [loading, setLoading] = useState(false);

   const getAdminDashboard = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/owner/get-dashboard-details"); 
      // console.log(res.data.dashboard);
      if (res.data.success) {
        setDashboardData(res.data.dashboard);
        setRecentBookings(res.data.dashboard.recentBookings) 
      } else {
        toast.error(res.data.message || "Failed to fetch data");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
      getAdminDashboard();
  },[])


  const lists = [
  { topic: 'Total Rooms', count: dashboardData?.totalRooms || 0, icon: <i className="fa-solid fa-car-side"></i> },
  { topic: 'Total Bookings', count: dashboardData?.totalBookings || 0, icon: <GrNotes /> },
  { topic: 'Pending Bookings', count: dashboardData?.totalPendingBookings || 0, icon: <i className="fa-solid fa-triangle-exclamation"></i> },
  { topic: 'Completed Bookings', count: dashboardData?.totalCompletedBookings || 0, icon: <GrNotes /> }
];


  const bookings = [
    {carName:'BMW 3 Series',date:'4/1/2025',bill:'$475',button:'Confirm'},
    {carName:'Ford Explorer',date:'3/1/2025',bill:'$473',button:'Confirm'},
    {carName:'Toyota Corolla',date:'4/5/2025',bill:'$470',button:'Confirm'},
    {carName:'Tesla Model 3',date:'4/6/2025',bill:'$483',button:'Confirm'},
  ]

  if (loading) return <Loading/>;

  return (
    <div className='bg-bgk'>
      <Toaster position="top-center" reverseOrder={false}/>
      <Header heading={'Admin Dashboard'} paragraph={'Monitor overall platform performance including total cars, bookings, revenue, and recent activities'}/>
      {/* lits  */}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-4 px-10 mt-5'>
        {lists.map((list,index)=>{
            return(
                <div key={index} className='border  px-6 py-3 flex items-center justify-between'>
                    <div className=''>
                        <p className='text-md font-semibold'>{list.topic}</p>
                        <p className='text-md font-semibold mt-1 text-center'>{list.count}</p>
                    </div>
                    <div className='bg-secondary px-3 py-2 rounded-full'>
                        {list.icon}
                    </div>
                </div>
            )
        })}
      </div>
      {/* booking info  */}
      <div className='flex flex-col sm:flex-row gap-5 px-10 mt-6'>
        <div className='border-1 w-200 px-6 py-3'>
        <p className='text-lg font-semibold'>Recent Bookings</p>
        <p className='text-gray-600 mb-6'>Latest customer bookings</p>
        <div className='flex flex-col gap-3'>
            {recentBookings.map((booking,index)=>{
            return(
                    <div key={index} className='flex flex-row items-center justify-between  px-2 py-1 '>
                    <div className='flex flex-row items-center  gap-1'>
                        <GrNotes className=' bg-secondary px-2 py-1 rounded-full text-4xl'/>
                        <p>{booking.user.name}</p>
                    </div>
                    <p>{new Date(booking.checkInDate).toLocaleString()}</p>
                    <p>{new Date(booking.checkOutDate).toLocaleString()}</p>
                    <p>&#x20B9;{booking.totalPrice}</p>
                    </div>
            )
        })}
        </div>
        </div>
        <div className='border-1 w-80 sm:w-100 px-6 py-3 h-36'>
          <p className='text-lg font-semibold'>Monthly Revenue</p>
          <p className='text-gray-600 mb-6'>Revenue for current month</p>
          <p className='text-3xl font-bold'>&#x20B9;{dashboardData?.totalRevenue || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardComponent
