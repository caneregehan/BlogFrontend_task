const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/", async (req, res) => {
  try {
    const { name, lastname, username, mail, password } = req.body;

    if (!mail || !username || !password) {
      return res.status(400).json({ message: "Eksik alanlar mevcut!" });
    }

    const newUser = new User({ name, lastname, username, mail, password });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Eksik alanlar mevcut!" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Yanlış şifre!" });
    }

    res.json({ status: true, message: "Giriş başarılı!" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
