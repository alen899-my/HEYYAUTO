const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRoles = []) => async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted token:', token);

    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token payload:', decoded);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: 'Invalid token.' });
    }

    const user = await User.findById(decoded.id);
    console.log('Authenticated user:', user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    req.user = user;

    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      console.log('User role:', user.role);
      console.log('Required roles:', requiredRoles);

      return res.status(403).json({ msg: 'Access denied. Insufficient permissions.' });
    }

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
