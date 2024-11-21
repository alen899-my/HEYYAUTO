// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require('mongoose');
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
const validStatuses = ['driverIsReady', 'completed', 'cancelled', 'pending','busy'];

router.put('/update-booking-status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid booking status' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated booking
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

router.get('/user-rides/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure a valid ObjectId is passed
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Use 'new' with ObjectId
    const rides = await Booking.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('driverId', 'fullName phoneNumber vehicleNumber') // Populate driver details
      .exec();

    console.log('Fetched rides:', rides);

    if (!rides.length) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    res.json(rides);
  } catch (error) {
    console.error('Error fetching user rides:', error.message); // Log detailed error
    res.status(500).json({ error: `Failed to fetch user rides: ${error.message}` });
  }
});

router.patch('/bookings/:id/complete', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    // Update the booking status to complete
    booking.status = 'complete';
   
    await booking.save();
    res.json({ message: 'Booking marked as complete' });
  } catch (error) {
    console.error('Error marking booking as complete:', error);
    res.status(500).json({ error: 'Failed to mark booking as complete' });
  }
});
// Cancel a booking
router.patch("/api/bookings/:id/cancel", authMiddleware(), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    booking.status = "canceled";
    await booking.save();
    res.json({ msg: "Ride canceled successfully", booking });
  } catch (error) {
    console.error("Error canceling ride:", error);
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;
