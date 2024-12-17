const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

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

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isUser = await bcrypt.compare(password, user.password);
  if (!isUser) {
    throw new Error("Unable to Login");
  }

  return user;
};

//hide password and tokens array in response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.tokens;

  return userObj;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const userModel = model("User", userSchema);
module.exports = userModel;
