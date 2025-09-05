// AdminSidebar.jsx
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, PlusSquare, Car, CalendarCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { toast, Toaster } from 'react-hot-toast'

const AdminSidebar = () => {
  const location = useLocation();
  const [admin, setAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Add Room", path: "/admin/add-room", icon: <PlusSquare size={18} /> },
    { name: "Manage Rooms", path: "/admin/manage-rooms", icon: <Car size={18} /> },
    { name: "Manage Bookings", path: "/admin/manage-bookings", icon: <CalendarCheck size={18} /> }
  ];

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("owner");
      setAdmin(null);
      navigate("/admin-login");
    } catch (err) {
      toast.error(err.message || "Logout failed:");
    }
  };

  useEffect(() => {
    const adminName = localStorage.getItem("owner");
    setAdmin(adminName || null);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hamburger (visible only on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-2xl"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`shadow-md h-screen flex flex-col pt-10 bg-white fixed top-0 left-0 z-50 w-64
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className='flex flex-col items-center'>
          <img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1757073476/adminProfile_j5lmca.jpg" alt='admin profile' className='w-16 h-16 rounded-full object-cover border'/>
          <p className='text-gray-600 text-md mt-2 font-semibold'>{admin || "Admin name"}</p>
        </div>

        <div className='flex flex-col mt-15 text-lg'>
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex flex-row items-center gap-3 py-3 pl-8 ${location.pathname === link.path && 'bg-secondary border-r-6 rounded-r border-extra'} transition-all`}
              onClick={() => setIsOpen(!isOpen)} // close after navigation (mobile)
            >
              {link.icon} &nbsp;{link.name}
            </Link>
          ))}

        <div className='mt-10'>
          <button
            onClick={handleLogout}
            className="cursor-pointer flex flex-row items-center gap-3 py-3 pl-8 transition-all"
          >
            <CiLogout /> logout
          </button>

          <button
            onClick={()=>setIsOpen(false)}
            className="cursor-pointer flex flex-row items-center gap-3 py-3 pl-8 transition-all"
          >
            <i class="fa-solid fa-xmark"></i>  Close menu
          </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default AdminSidebar
