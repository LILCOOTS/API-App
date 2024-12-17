const mongoose = require("mongoose");

const userName = encodeURIComponent("admin");
const password = encodeURIComponent("password");

const database = "api-app";

const mongoURI = `mongodb://localhost:27017/${database}`;
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
