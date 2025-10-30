import express from "express";
import User from "../models/User.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Update user details
router.put("/users/:id", verifyToken, isAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User updated" });
});

// Delete user
router.delete("/users/:id", verifyToken, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
