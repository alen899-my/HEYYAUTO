const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    // Extract the token from the Authorization header (formatted as "Bearer token")
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      // Verify the token using the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded payload (e.g., user data) to req.user

      // If roles are specified, check if the user's role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied for this role" });
      }

      // If everything checks out, proceed to the next middleware/route handler
      next();
    } catch (error) {
      res.status(401).json({ msg: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
