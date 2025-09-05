import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig'
import {toast,Toaster} from 'react-hot-toast'

const AdminSignupComponent = () => {
  const navigate = useNavigate();

  const [adminData,setAdminData] = useState({
    name:"",
    email:"",
    password:""
  })

  const handelChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
     try{
          e.preventDefault();
         // client side validation 
         if(!adminData.name){
           toast.error("Name is required");
           return;
         }
         if(!adminData.email){
           toast.error("Email is required");
           return;
         }
         if(!adminData.password){
           toast.error("Password is required");
           return;
         }

         // Send admin-data
         const res = await axiosInstance.post("/owner/register", adminData);
        //  console.log("admin created:", res);

         //handel response
         if(res.data.success){
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("owner", res.data.owner);
     
           toast.success(res.data.message);
     
           // Navigate after toast disappears
           setTimeout(() => {
             navigate("/add-hotel");
           }, 2000);
         }else{
           toast.error(res.data.message);
         }
     }catch(err){
        toast.error(err.message);
     }
   };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-light">
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Admin Account
        </h2>

        {/* Signup Form */}
        <form className="mt-10 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin Name
            </label>
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handelChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handelChange}
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
              onChange={handelChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-5 py-2 bg-extra cursor-pointer text-white font-semibold rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an admin account?{" "}
          <Link to="/admin-login" className="text-extra font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminSignupComponent



