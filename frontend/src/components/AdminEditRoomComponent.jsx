import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import axiosInstance from '../configs/axiosConfig';
import {toast,Toaster} from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const AdminEditRoomComponent = () => {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    numberOfBeds: "",
    pricePerNight: "",
    description: "",
    features: []
  });
  
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [featureInput, setFeatureInput] = useState(""); // input field for features
  const [previews, setPreviews] = useState([]); // array of preview URLs
   

  const fetchRoomData = async() => {
    try {
      const res = await axiosInstance.get(`/rooms/roomInDetail/${id}`);
    //   console.log('room data ', res);

      if (res.data.success) {
        // console.log('res.data.room',res.data.room);
        setRoomData(res.data.room);
        setPreviews(res.data.room.images);
        setFeatureInput(res.data.room.features);
        setLoading(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }finally {
    setLoading(false); 
    }
  }

  useEffect(()=>{
    fetchRoomData();
  },[])

  // handle adding a new feature
  const handleAddFeature = () => {
  if (featureInput.trim() !== "") {
    // split by comma and trim each feature
    const featuresArr = featureInput
      .split(",")
      .map(f => f.trim())
      .filter(f => f !== "");

    setRoomData(prev => ({
      ...prev,
      features: featuresArr,   // overwrite instead of appending
    }));
  }
  };

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
  e.preventDefault();
  console.log("update = ",roomData);

  // client side validation
  if (!roomData.numberOfBeds || roomData.numberOfBeds <= 0) {
    toast.error("Number of rooms is required");
    return;
  }
  if (!roomData.pricePerNight || roomData.pricePerNight <= 0) {
    toast.error("Price per night is required");
    return;
  }
  if (!roomData.description) {
    toast.error("Description is required");
    return;
  }
  if (!roomData.features || roomData.features.length <= 0) {
    toast.error("Features are required");
    return;
  }

  const toastId = toast.loading("Updating your room...");

  try {
     const formData = new FormData();
     formData.append("roomData", JSON.stringify(roomData));

    const res = await axiosInstance.put(`/rooms/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (res.data.success) {
      toast.success(res.data.message, { id: toastId });
      setTimeout(() => navigate("/admin/manage-rooms"), 2000);
    } else {
      toast.error(res.data.message, { id: toastId });
    }
  } catch (err) {
    toast.error(err.message, { id: toastId });
  }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/admin/manage-rooms"); // or navigate(-1) to go back
  };



  if (loading) return <Loading/>;


  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
      <h3 className='my-10 mx-20 text-2xl sm:text-lg font-bold border-b-2'>Edit this room</h3>
      <form className='my-10 mx-20'>
        {/* Upload Image */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-10">
          {previews.map((src, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center border rounded-lg p-2 relative"
            >
              {/* Image with grayscale */}
              <img
                src={src}
                alt={`Room preview ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg filter grayscale opacity-70"
              />

              {/* Overlay message */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium rounded-lg">
                Not Editable
              </div>
            </div>
          ))}
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 mb-8">  
          <div>
            <p>Number Of Beds</p>
            <input
            type="number"
            name="numberOfBeds"
            placeholder="number of beds (eg: 1-twin beds or 2-double bed)"
            value={roomData.numberOfBeds}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
          <div>
            <p>Price Per Night</p>
            <input
            type="number"
            name="pricePerNight"
            placeholder="price per night"
            value={roomData.pricePerNight}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        </div>
        {/* Description */}
        <div className="grid grid-cols-1 gap-6 mt-5">  
          <div>
            <p>Description</p>
            <textarea
            type="text"
            name="description"
            placeholder="Write a small description about your car"
            value={roomData.description}
            onChange={handleChange}
            className="p-3 mt-2 w-full border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        {/* Features Input */}
         <div className="">
         <p>Features</p>
         <div className="flex gap-2 mb-3 mt-2">
             <input
             type="text"
             value={featureInput}
             onChange={(e) => setFeatureInput(e.target.value)}
             placeholder="Enter features separated by commas (e.g. Free Wi-Fi, Pool, Parking)"
             className="p-3 w-full border rounded-lg"
             />
             <button
             type="button"
             onClick={handleAddFeature}
             className="px-4 py-2 bg-blue-600 text-white rounded-lg"
             >
             Add
             </button>
         </div>

         {/* Show features below only after Add */}
         <div className="flex gap-2 flex-wrap">
             {roomData.features.map((feature, idx) => (
             <span
                 key={idx}
                 className="bg-gray-200 px-3 py-1 rounded-full"
             >
                 {feature}
             </span>
             ))}
         </div>
         </div>


        </div>
        <div className='flex gap-3'>
        <button onClick={handleSave} className='bg-green-600 hover:bg-primary-dull mt-8 text-white px-10 py-3 rounded-lg cursor-pointer'>Save</button>
        <button onClick={handleCancel} className='bg-red-600 hover:bg-primary-dull mt-8 text-white px-10 py-3 rounded-lg cursor-pointer'>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditRoomComponent



