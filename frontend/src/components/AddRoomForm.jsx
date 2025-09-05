import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import axiosInstance from '../configs/axiosConfig';
import {toast,Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const AddRoomForm = () => {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    numberOfBeds: "",
    pricePerNight: "",
    description: "",
    features: []
  });
  
  const [featureInput, setFeatureInput] = useState(""); // input field for features
  const [files, setFiles] = useState([]);      // array of File objects
  const [previews, setPreviews] = useState([]); // array of preview URLs

  // handle adding a new feature
  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setRoomData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  // remove a feature
  const handleRemoveFeature = (idx) => {
    setRoomData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // update files array
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);

    // update previews array
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...previews];
      updatedPreviews[index] = reader.result;
      setPreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //client side validation
    if(!roomData.numberOfBeds || roomData.numberOfBeds <= 0){
      toast.error("Number of rooms is required");
      return;
    }
    if(!roomData.pricePerNight || roomData.pricePerNight <= 0){
      toast.error("Price per night is required");
      return;
    }
    if(!roomData.description){
      toast.error("description is required");
      return;
    }
    if(!roomData.features || roomData.features.length <= 0){
      toast.error("features is required");
      return;
    }
    if(!files || files[0].length <= 4){
      toast.error("Exactly 4 images are required");
      return;
    }

    // Show loading toast and store its ID
    const toastId = toast.loading("Booking your room...");

    try {
      const formData = new FormData();
      formData.append("roomData", JSON.stringify(roomData));
      files.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axiosInstance.post("/rooms/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // console.log('room is added',res);

      // If success → update toast
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setTimeout(() => navigate("/admin/manage-rooms"), 3000);
      } else {
        toast.error(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } 
};


  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
      <h3 className='my-10 mx-20 text-2xl sm:text-lg font-bold border-b-2'>Add A New Room</h3>
      <form className='my-10 mx-20'>
        {/* Upload Image */}
        <p className='text-md sm:text-2xl font-semibold'>Upload the room images</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-10">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="flex flex-row gap-4 items-center">
              <ImageUpload
                preview={previews[idx]}
                onFileChange={(e) => handleFileChange(e, idx)}
              />
            </div>
          ))}
        </div>

        <p className='text-md sm:text-2xl font-semibold mt-18 mb-10'>Provide the room details</p>
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
              placeholder="Enter a feature (e.g. Free Wi-Fi)"
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
          {/* show selected features */}
          <div className="flex gap-2 flex-wrap">
            {roomData.features.map((feature, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        </div>
        <button onClick={handleSubmit} className='bg-extra hover:bg-primary-dull mt-8 text-white px-10 py-3 rounded-lg cursor-pointer'>List this room</button>
      </form>
    </div>
  )
}

export default AddRoomForm
