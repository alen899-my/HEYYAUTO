// routes/drivers.js (new file)
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get drivers based on from and to locations
router.get('/:from/:to', async (req, res) => {
  try {
    const { from, to } = req.params;
    const drivers = await User.find({
      role: 'driver',
      approvalStatus: 'approved',
      $or: [
        { Location: from },
        { Location: to }
      ]
    });
    if (drivers.length === 0) {
      return res.status(404).json({ message: 'No drivers found' });
    }
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
});

module.exports = router;