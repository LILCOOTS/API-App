const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const isAuthToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({
      _id: isAuthToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(404).send("Please Authenticate Yourself");
  }
};

module.exports = auth;
