// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require("../middleware/authMiddleware");

// Create a new booking
router.post('/bookings', authMiddleware(), async (req, res) => {
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
router.put('/update-booking-status/:id', async (req, res) => {
  try {
    const { status } = req.body; // "onRide", "completed", "cancelled", etc.
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated booking
    );
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

router.get('/user-rides/:userId', async (req, res) => {
  try {
    console.log('Received userId:', req.params.userId); // Debug log
    const rides = await Booking.find({ userId: req.params.userId });
    if (!rides.length) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }
    res.json(rides);
  } catch (error) {
    console.error('Error fetching user rides:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch user rides' });
  }
});



module.exports = router;
