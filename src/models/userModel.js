// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

// Define user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

// Method to create authentication token
userSchema.methods.createAuthToken = async function () {
  const user = this;
  const authToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY,
  );

  user.tokens = user.tokens.concat({ token: authToken });
  await user.save();

  return authToken;
};

// Static method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Unable to Login");
  }

  return user;
};

// Hide password and tokens array in response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;

  return userObject;
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const userModel = model("User", userSchema);
module.exports = userModel;
