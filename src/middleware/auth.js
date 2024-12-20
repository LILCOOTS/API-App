// Import required modules
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Please authenticate yourself.");
  }
};

module.exports = authenticateUser;
