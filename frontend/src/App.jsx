import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomInDetail from './pages/RoomInDetail'
import MyBooking from './pages/MyBooking'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import AdminDashboardComponent from './components/AdminDashboardComponent'
import AdminAddRoom from './components/AdminAddRoom'
import AdminManageRoom from './components/AdminManageRoom'
import AdminManageBookings from './components/AdminManageBookings'
import AdminLayout from './pages/AdminLayout'
import AdminAddHotel from './components/AdminAddHotel'
import UserProtectedRoute from './components/UserProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ManageBookingInDetail from './components/ManageBookingInDetail'
import MyBookingsInDetail from './components/MyBookingsInDetail'
import AdminRoomInDetailComponent from './components/AdminRoomInDetailComponent'
import AdminEditRoomComponent from './components/AdminEditRoomComponent'


const App = () => {
  const location = useLocation();
  const [user, setUser] = useState((localStorage.getItem("user")));
  const [searchCity,setSearchCity] = useState("");

  return (
    <div>
      {!location.pathname.startsWith('/admin') && <Navbar user={user} setUser={setUser}/>}
      <Routes>
        <Route path='/' element={<Home searchCity={searchCity} setSearchCity={setSearchCity}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/rooms' element={<Rooms searchCity={searchCity} setSearchCity={setSearchCity}/>}/>
        <Route path='/rooms/:id' element={<RoomInDetail/>}/>
        <Route path='/my-bookings' element={<UserProtectedRoute><MyBooking/></UserProtectedRoute>}/>
        <Route path='/my-bookings/:id' element={<UserProtectedRoute><MyBookingsInDetail/></UserProtectedRoute>}/>

        {/* admin routes  */}
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin-signup' element={<AdminSignup/>}/>
        <Route path="/add-hotel" element={<AdminAddHotel />} />
        <Route path="/admin" element={<AdminProtectedRoute><Navigate to="/admin/dashboard" replace /></AdminProtectedRoute>} /> {/* Exact /admin → redirect to dashboard */}

        {/* Admin layout + nested pages */}
        <Route path="/admin/*" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboardComponent />} />
          <Route path="add-room" element={<AdminAddRoom />} />
          <Route path="manage-rooms" element={<AdminManageRoom />} />
          <Route path='rooms/:id' element={<AdminRoomInDetailComponent/>}/>
          <Route path='edit/rooms/:id' element={<AdminEditRoomComponent/>}/>
          <Route path="manage-bookings" element={<AdminManageBookings />} />
          <Route path="manage-bookings/:id" element={<ManageBookingInDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
