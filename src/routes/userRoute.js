// Import required modules
const express = require("express");
const userRoute = new express.Router();
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authenticateUser = require("../middleware/auth");
const sendWelcomeEmail = require("../email/email");

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     security: []
 *     description: Create a new user account and send a confirmation email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: User registered successfully. A confirmation email has been sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "609b8b8b8b8b8b8b8b8b8b8b"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                 authToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjEzMTM4MzMwfQ.abc123xyz456"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email already exists."
 */

// Route to handle user signup
userRoute.post("/api/signup", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    const authToken = await newUser.createAuthToken();

    const confirmationLink = `http://localhost:8080/api/confirm-email?token=${authToken}`;

    sendWelcomeEmail(newUser.email, newUser.username, confirmationLink);
    res.send({ user: newUser, authToken });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to handle email confirmation
userRoute.get("/api/confirm-email", async (req, res) => {
  try {
    const token = req.query.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decodedToken._id);
    if (!user) {
      res.status(404).send("User not found");
    }
    user.isConfirmed = true;
    await user.save();

    res.send("Your email has been successfully confirmed!");
  } catch (error) {
    res.status(500).send("Invalid or expired token.");
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Log in an existing user and return an authentication token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "paras.asa28@gmail.com"
 *               password:
 *                 type: string
 *                 example: "hello@123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       403:
 *         description: Email not confirmed.
 *       500:
 *         description: User not found or server error.
 */

// Route to handle user login
userRoute.post("/api/login", async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password,
    );

    if (!user.isConfirmed) {
      return res
        .status(403)
        .send({ error: "Please confirm your email before logging in." });
    }
    const authToken = await user.createAuthToken();
    res.send({ user, authToken });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *       403:
 *         description: Email not confirmed.
 *       404:
 *         description: User not found.
 */

// Route to get user profile
userRoute.get("/api/profile", authenticateUser, async (req, res) => {
  try {
    if (!req.user.isConfirmed) {
      return res.status(403).send({
        error: "Please confirm your email before retrieving your profile.",
      });
    }
    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = userRoute;
