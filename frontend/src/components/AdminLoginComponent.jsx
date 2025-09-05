import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig'
import {toast,Toaster} from 'react-hot-toast'

const AdminLoginComponent = () => {
  const navigate = useNavigate();

  const [adminData,setAdminData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
     try{
         e.preventDefault();
        //  client side validation 
        if(!adminData.email){
          toast.error("Email is required");
          return;
        }
        if(!adminData.password){
          toast.error("password is required");
          return;
        }

        // Send admin-data
        const res = await axiosInstance.post("/owner/login", adminData);
        // console.log("admin created:", res);
        
        //handel response
        if(res.data.success){
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("owner", res.data.owner);

           toast.success(res.data.message);

           // Navigate after toast disappears
           setTimeout(() => {
             navigate("/admin/dashboard");
           }, 2000);
        }else{
           toast.error(res.data.message);
        }
      }catch(err){
        toast.error(err.message);
      }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-light">
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Signup Form */}
        <form className="mt-10 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-6 py-2 bg-extra cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an Admin account?{" "}
          <Link to="/admin-signup" className="text-extra font-semibold hover:underline">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLoginComponent



