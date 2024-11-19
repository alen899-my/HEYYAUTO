const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference 'User' for drivers
  pickUpPoint: String,
  bookingDate: String,
  bookingTime: String,
  status: { type: String, default: 'Pending' },
});
module.exports = mongoose.model('Booking', bookingSchema);