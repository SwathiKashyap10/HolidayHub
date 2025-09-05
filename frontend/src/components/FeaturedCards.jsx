import React from "react";

const FeaturedCards = ({ roomData }) => {
  return (
    <div>
        <div
          key={roomData._id}
          className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Room Images (Carousel style - show first image for now) */}
          <img
            src={roomData.images[0]}
            alt={roomData.description}
            className="w-full h-56 object-cover"
          />

          <div className="p-4 flex flex-col gap-2">
            {/* Hotel + Room Info */}
            <div className="flex flex-row gap-2 sm:gap-1 items-baseline">
            <span className="text-xl font-semibold">{roomData.hotel.name}</span>
            <span className='text-sm text-gray-600'>({roomData.numberOfBeds == 1 ? "Twin Beds" :  "Double bed"})</span>
            </div>
            <p className="text-gray-500 text-sm">
              {roomData.hotel.city} · {roomData.hotel.address}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mt-2">
              {roomData.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Beds + Price */}
            <div className="flex flex-row lg:flex-row xl:flex-row md:flex-col max-sm:flex-col justify-between items-center lg:justify-between lg:items-center xl:justify-between xl:items-center md:items-start max-sm:items-start md:gap-3 max-sm:gap-3 mt-3">
              <p className="text-xs text-gray-500 mt-1">
              Contact: {roomData.hotel.contact}
              </p>
              <span className="text-lg font-bold text-green-600">
                ₹{roomData.pricePerNight} / night
              </span>
            </div>
            
          </div>
        </div>
    </div>
  );
};

export default FeaturedCards;

