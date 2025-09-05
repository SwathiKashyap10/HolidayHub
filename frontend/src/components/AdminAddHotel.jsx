import React, { useState } from 'react'
import axiosInstance from '../configs/axiosConfig';
import {toast,Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const AdminAddHotel = () => {

  const navigate = useNavigate();

  const [hotelData,setHotelData] = useState({
    name:"",
    contact:"",
    address:"",
    city:""
  })

  const handleChange = (e) => {
     setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
     try{
      e.preventDefault();

       // Create FormData
       const formData = new FormData();

       // Append roomData as JSON string
       formData.append("hotelData", JSON.stringify(hotelData));

      //  console.log('form data = ');
      //  for (let pair of formData.entries()) {
      //    console.log(pair[0], pair[1]);
      //  }

       // Send form-data
       const res = await axiosInstance.post("/hotel/register", formData);
       console.log("hotel created:", res);

       //handel response
       if(res.data.success){
         toast.success(res.data.message);
            
         // Navigate after toast disappears
         setTimeout(() => {
           navigate("/admin/dashboard");
         }, 2000);
       }else{
         toast.error(res.data.message);
       }
      } catch(err){
      toast.error(err.message);
     }
   };

  return (
    <div className='flex justify-center items-center'>
    <Toaster position="top-center" reverseOrder={false}/>
    <div className='mt-25 mx-10 w-230 shadow-2xl px-10 py-8'>
      <p className='text-2xl font-semibold mb-12 border-b-2'>Please provide deatils of your hotel.</p>
      <form>
        {/* name & contact */}
        <div className="grid grid-cols-2 gap-6 mt-5 mb-8">  
          <div>
            <p>Name</p>
            <input
            type="text"
            name="name"
            placeholder="Name of the hotel"
            value={hotelData.name}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
          <div>
            <p>Contact</p>
            <input
            type="text"
            name="contact"
            placeholder="Enter your contact email"
            value={hotelData.contact}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        </div>
        {/* address  */}
        <div className='grid grid-cols-1 mb-8'>
         <div>
            <p>Address</p>
            <input
            type="text"
            name="address"
            placeholder="Hotel address"
            value={hotelData.address}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        </div>
        {/* city  */}
        <div className='grid grid-cols-2 mb-8'>
         <div>
            <p>City</p>
            <input
            type="text"
            name="city"
            placeholder="Hotel city"
            value={hotelData.city}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        </div>
        <button onClick={handleSubmit} className='bg-extra hover:bg-primary-dull mt-4 text-white px-10 py-3 rounded-lg cursor-pointer'>List this hotel</button>
      </form>
    </div>
    </div>
  )
}

export default AdminAddHotel
