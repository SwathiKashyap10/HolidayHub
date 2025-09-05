import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "James Miller",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Booking a room was so easy! The prices were transparent, and the stay was very comfortable. Definitely my go-to app for future trips.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Hall",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "I loved how quick and hassle-free the booking process was. Customer support was also very helpful when I needed to make a change.",
    rating: 4,
  },
  {
    id: 3,
    name: "William Johnson",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "Wide variety of options and reliable service. I’ve booked multiple times now and each experience has been great.",
    rating: 5,
  },
];

const CustomersReview = () => {
  return (
    <div className="py-32 px-6 bg-gray-50">
      {/* Section heading */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h3 className="text-3xl font-bold text-gray-800">What Our Customers Say</h3>
        <p className="text-gray-600 mt-2">
          Hear from our happy customers who trust us for their stays and bookings.
        </p>
      </div>

      {/* Review cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {/* Customer info */}
            <div className="flex items-center mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
              </div>
            </div>

            {/* Review text */}
            <p className="text-gray-600 mb-4">"{review.review}"</p>

            {/* Rating */}
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gray-300" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersReview;
