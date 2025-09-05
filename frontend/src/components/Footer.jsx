import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  return (
    <footer className={`${location.pathname === "/" ? 'bg-white' : 'bg-bgk'} mt-20`}>
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 lg:px-28 py-12 border-b border-gray-700">
        {/* Left */}
        <div>
          <button className= 'bg-blue-200 text-blue-700 px-5 py-2 rounded-full text-xs max-sm:px-5 max-sm:py-1 max-sm:text-xs mb-8'>
            Explore our Rooms
          </button>
          <h3 className="text-2xl font-semibold  mb-4">
            Perfect Location for a Relaxing Vacation
          </h3>
          <button className="bg-extra text-white cursor-pointer  px-6 py-2 rounded-lg">
            Contact Us
          </button>
        </div>

        {/* Right */}
        <div>
          <button className= "bg-blue-200 text-blue-700 px-5 py-2 rounded-full text-xs max-sm:px-5 max-sm:py-1 max-sm:text-xs mb-8">
            Newsletter
          </button>
          <h3 className="text-2xl font-semibold  mb-4">
            Subscribe To Our Newsletter
          </h3>
          <div className="flex items-center w-full max-w-md rounded-full overflow-hidden border border-gray-700 focus-within:ring-2 transition">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1  px-4 py-3  focus:outline-none"
            />
            <button className="bg-extra text-white cursor-pointer  px-6 py-3 font-medium rounded-r-full transition">
              Sign Up
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10 lg:px-28 py-12 text-sm">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">HolidayHub</h2>
          <p className="mb-4">
            Discover the best hotels, villas, resorts, and duplex stays with ease.
            We&apos;re committed to providing seamless booking experiences and
            unforgettable stays tailored to your travel needs.
          </p>
          <div className="flex space-x-4">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-square-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>GYM and Spa</li>
            <li>Swimming Pool</li>
            <li>Restaurant</li>
            <li>Pick Up & Drop</li>
            <li>Parking Space</li>
          </ul>
        </div>

        {/* Popular Links */}
        <div>
          <h4 className=" font-semibold mb-4">Popular Links</h4>
          <ul className="space-y-2">
            <li>Help & Support</li>
            <li>Trust & Safety</li>
            <li>FAQ&apos;s</li>
            <li>Feature Hotels</li>
            <li>Hotel Booking</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="mb-2">HolidayHub.hotel@gmail.com</p>
          <p className="mb-4">+01 234 567 890</p>
          <div className="space-y-1">
            <p><span className="font-bold ">58,66,745</span> Total Booking</p>
            <p><span className="font-bold">2,846,395</span> Active Users</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center text-gray-500 py-4 text-xs">
         © 2025, All Rights Reserved | Privacy Policy | Terms & Conditions
      </div>
    </footer>
  );
};

export default Footer;
