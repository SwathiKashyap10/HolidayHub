import Hotel from "../models/hotel.js";

const registerHotel = async (req, res) => {
  try {
    // Parse hotel data from frontend (sent as JSON string in FormData)
    let hotel = JSON.parse(req.body.hotelData);
    const owner = req.owner._id;

    // Manual validation
    if (!hotel.name || hotel.name.trim().length < 3) {
      return res.status(400).json({ success: false, message: "Hotel name must be at least 3 characters" });
    }
    if (!hotel.address) {
      return res.status(400).json({ success: false, message: "address is required" });
    }
    if (!hotel.city) {
      return res.status(400).json({ success: false, message: "city is required" });
    }
    if (!hotel.contact) {
      return res.status(400).json({ success: false, message: "contact email is required" });
    }

    // Check if owner already has a hotel
    const hotelExists = await Hotel.findOne({ owner });
    if (hotelExists) {
      return res.json({ success: false, message: "Hotel already registered!" });
    }

    // Create new hotel with owner info
    const newHotel = await Hotel.create({
      ...hotel,
      owner
    });

    return res.json({ success: true, message: "Hotel registered successfully!", hotel: newHotel });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export { registerHotel };
