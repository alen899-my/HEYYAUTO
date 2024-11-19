// middleware/authmiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes based on roles
const authMiddleware = (roles = []) => async (req, res, next) => {
  try {
    // Extract the token from the Authorization header (formatted as "Bearer token")
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attach the decoded user to the request object

    if (!req.user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if user has required roles (if roles array is provided)
    if (roles.length && !roles.includes(req.user.role)) {
      // If roles are provided, check if the user has one of the allowed roles
      if (req.user.role === 'user' && req.originalUrl === '/users/profile') {
        // Allow users to access the profile route (for themselves)
        return next();
      }
      return res.status(403).json({ msg: 'Access denied for this role' });
    }

    // Proceed to the next middleware or route handler if all checks pass
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
