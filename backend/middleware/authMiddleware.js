const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes with optional role-based access
const authMiddleware = (requiredRoles = []) => async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: 'Invalid token.' });
    }

    // Fetch the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    // Attach user to request
    req.user = user;

    // Role-based access control
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied. Insufficient permissions.' });
    }

    // All checks passed; proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error('Auth error:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired.' });
    }

    res.status(401).json({ msg: 'Authentication failed.', error: error.message });
  }
};

module.exports = authMiddleware;
