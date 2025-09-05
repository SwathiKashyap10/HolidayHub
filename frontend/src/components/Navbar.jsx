import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import {toast,Toaster} from 'react-hot-toast'

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [open,setIsopen] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);

  const menuLinks = [
    {name:"Home",path:"/"},
    {name:"Rooms",path:"/rooms"},
    {name:"My Bookings",path:"/my-bookings"},
    {name:"Admin Dashboard",path:"/admin/dashboard"}
  ]

  const handleLogout = async () => {
    try {
      // Remove token and user info from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setMenuOpen(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Logout failed:");
    }
  };

  return (
    <div className={ ` ${location.pathname === "/" ? "border-0" : "border-1"} bg-white w-full ${location.pathname.startsWith('/admin') ? 'fixed top-0 left-0 shadow-md z-50' : ''}`}>
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex items-center justify-between px-8 max-sm:px-8  py-4 transition-all relative">
        {/* logo */}
        <div className='flex flex-row gap-2 items-baseline text-2xl '>
          <Link to="/"><img src={logo} alt="logo" className="h-9 w-9 object-cover " /></Link>
          <h2>HolidayHub</h2>
        </div>
        {/* nav elements */}
        <div className={`flex flex-row items-center gap-6 max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:flex-col max-sm:gap-8  max-sm:top-20 max-sm:pt-4 max-sm:border-t border-bordercolor max-sm:items-start max-sm:right-0 max-sm:px-6 max-sm:bg-bgk transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" :"max-sm:translate-x-full"}`}>
          {menuLinks.map((element,index)=>(
            <Link key={index} to={element.path}>{element.name}</Link>
          ))}
          {/* login btn  */}
          {!user && (
          <button onClick={()=>navigate("/login")} className='bg-extra hover:bg-primary-dull px-8 py-2 rounded-3xl text-white cursor-pointer transition-all lg:ml-5'>Login</button>
          )}
          {/* profile icon  */}
        <div>
        {user && (
          <>
          <div  onClick={() => setMenuOpen(!menuOpen)} className='border rounded-full text-lg px-2 py-1 cursor-pointer hover:bg-extra hover:text-white'><i className="fa-solid fa-user cursor-pointer"></i></div>
          <div>
              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="z-50 absolute top-full right-7 max-sm:top-70 max-sm:right-45  w-44 bg-white shadow-lg rounded-lg border border-gray-200 transition-all transform scale-95 hover:scale-100">
                  <ul className="text-gray-700 font-medium">
                    <li className="text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer">{user}</li>
                    <li className="text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer"><Link to="/my-bookings">My Bookings</Link></li>
                    <li onClick={handleLogout} className="text-sm px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500 rounded-b-lg">
                      Logout
                    </li>
                   </ul>
                </div>
              )}
          </div>
          </>
        )}
        </div>
        </div>
        {/* menu icon  */}
        <div className='hidden max-sm:block cursor-pointer text-lg'>
            <button onClick={()=>setIsopen(!open)}>{open ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}</button>
        </div>
      </div>
    </div>

  )
}

export default Navbar
