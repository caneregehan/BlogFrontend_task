const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwtHelper"); // jwtHelper.js'den generateToken fonksiyonunu import ediyoruz

const router = express.Router();

// Tüm kullanıcıları getir
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Kullanıcıyı ID ile getir
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Yeni kullanıcı oluştur
router.post("/", async (req, res) => {
  try {
    const { name, lastname, username, mail, password } = req.body;

    if (!mail || !username || !password) {
      return res.status(400).json({ message: "Eksik alanlar mevcut!" });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastname,
      username,
      mail,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Kullanıcı bilgilerini güncelle
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Kullanıcıyı sil
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Kullanıcı silindi" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Giriş yap (login)
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

    // Şifreyi doğrula
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Yanlış şifre!" });
    }

    // JWT token oluştur
    const token = generateToken(user);

    // Başarılı giriş
    res.json({
      status: true,
      message: "Giriş başarılı!",
      token, // Token'ı yanıtla gönder
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
