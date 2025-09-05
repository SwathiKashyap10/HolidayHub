import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../configs/axiosConfig'
import {toast,Toaster} from 'react-hot-toast'

const SignupComponent = () => {

  const navigate = useNavigate();
  
  const [userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  })
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
     try{
         e.preventDefault();
        //  client side validation 
        if(!userData.name){
          toast.error("Name is required");
          return;
        }
        if(!userData.email){
          toast.error("Email is required");
          return;
        }
        if(!userData.password){
          toast.error("password is required");
          return;
        }

        // Send admin-data
        const res = await axiosInstance.post("/user/register", userData);
        // console.log("user created:", res);
        
        //handel response
        if(res.data.success){
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("user", JSON.stringify(res.data.user));
           setTimeout(() => {
             toast.success(res.data.message);
           }, 2000);
           navigate("/rooms");
                      
           // Navigate after toast disappears
           setTimeout(() => {
             window.location.reload();
           }, 2000);

           toast.success(res.data.message);

           // Navigate after toast disappears
           setTimeout(() => {
             navigate("/rooms");
           }, 2000);
        }else{
           toast.error(res.data.message);
        }
      }catch(err){
        toast.error(err.message);
      }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-bgk">
      <Toaster position="top-center" reverseOrder={false}/>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Signup Form */}
        <form className="mt-10 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
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
              value={userData.email}
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
              value={userData.password}
              onChange={handleChange}
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
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupComponent
