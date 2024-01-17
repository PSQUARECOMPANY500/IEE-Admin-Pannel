// authMiddleware.js
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateEnggToken = (user) => {
  return jwt.sign({ user }, "engg-secret-key", { expiresIn: "1h" });
};

// Middleware to verify the user's JWT token
const verifyEnggToken = (req, res, next) => {
  let token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Remove the "Bearer " prefix
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, "engg-secret-key"); // Replace 'your-secret-key' with your actual secret key
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { generateEnggToken, verifyEnggToken };
