// Import Mongoose module
const mongoose = require("mongoose");

// Encode database credentials
const userName = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);

// Define database name
const database = "api-app";

// Construct MongoDB URI
const mongoURI = `mongodb://localhost:27017/${database}`;

// Connect to MongoDB
async function run() {
  try {
    await mongoose.connect(mongoURI, {
      authSource: "admin",
      user: userName,
      pass: password,
    });
    console.log(mongoose.connection.readyState);
  } catch (e) {
    console.log(e);
  }
}

run();
