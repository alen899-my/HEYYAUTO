// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require("../middleware/authMiddleware");

// Create a new booking
router.post('/', authMiddleware(), async (req, res) => {
  const { driverId, pickUpPoint, bookingDate, bookingTime } = req.body;
  try {
    const booking = new Booking({
      userId: req.user.id,
      driverId,
      pickUpPoint,
      bookingDate,
      bookingTime,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});
router.get('/driver-bookings', authMiddleware(['driver']), async (req, res) => {
  try {
    const bookings = await Booking.find({ driverId: req.user.id })
      .populate('userId', 'fullName phoneNumber') // Populate user info if needed
      .exec();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings for driver:', error);
    res.status(500).json({ error: 'Failed to fetch bookings for driver' });
  }
});
module.exports = router;
