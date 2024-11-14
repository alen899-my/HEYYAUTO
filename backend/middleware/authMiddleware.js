const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied for this role" });
      }

      next();
    } catch (error) {
      res.status(401).json({ msg: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
