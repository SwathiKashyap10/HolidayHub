import React, { useEffect, useState } from 'react'
import axiosInstance from '../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Hero = ({searchCity,setSearchCity}) => {
  const navigate = useNavigate();

  const cityList = [
    'Hyderabad','Mumbai','Bengaluru','New Delhi','Amritsar'
  ]

  const [city,setCity] = useState("");
  const [checkIn,setCheckIn] = useState("");
  const [checkOut,setCheckOut] = useState("");

  const HandleSearch = (e) => {
    e.preventDefault();
    // console.log(city);
    // console.log(checkIn);
    // console.log(checkOut);
    setSearchCity(city);
    navigate("/rooms");
  }

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get("/rooms/get-all-rooms-search", {params: { city:searchCity },});
      // console.log(res);
      // setRooms(res.data.rooms);
      // setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchRooms();
  },[])

  return (
    <div className="px-8 mt-2 relative">
      {/* Image */}
      <img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756747827/gallery1_led8fi.jpg" alt="hero image" className="rounded-4xl h-[85vh] w-full object-cover"/>

      {/* Gradient overlay */}
       <div className="absolute inset-0 rounded-4xl bg-black/60 mx-8"></div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 max-sm:gap-5">
                <p className=' bg-blue-200 text-blue-700 px-5 py-2 rounded-full text-xs max-sm:px-3 max-sm:py-1 max-sm:text-xs'>Your perfect stay just a click away.</p>
        <h1 className="text-white text-3xl lg:text-7xl md:text-7xl xl:text-6xl max-sm:text-3xl font-bold text-center">Discover comfort <br/> anywhere you go</h1>

        <form className='bg-white flex flex-col items-center px-10 py-5 md:py-4 md-px-5 rounded-4xl mt-3'>
        <div className='flex flex-row lg:gap-10 md:gap-5 max-sm:flex-col max-sm:gap-5'>
            <div className='flex flex-col items-start'>
                <select required value={city} onChange={(e)=>setCity(e.target.value)}>
                    <option value=''>Select the city</option>
                    {cityList.map((city,index)=><option key={index} value={city}>{city}</option>)}
                </select>
                <p className='text-sm text-gray-500 px-1 pt-2'>{city ? city : 'Please select a city'}</p>
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor='check-in date'>Check-in Date</label>
                <input type='date' id='check-in date' value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 pt-2' required/>
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor='check-out date'>Check-out Date</label>
                <input type='date' id='check-out date' value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500 pt-2' required/>
            </div>
            <button onClick={HandleSearch} className='bg-extra hover:bg-primary-dull px-8 py-2 md:px-4 md:py-1 rounded-3xl text-white cursor-pointer transition-all lg:ml-10'><i className="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Hero
