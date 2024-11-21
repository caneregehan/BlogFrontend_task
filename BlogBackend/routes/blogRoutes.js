const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.get("/latest", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

router.post("/", async (req, res) => {
  try {
    const { title, content, author, fileName } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Eksik alanlar mevcut!" });
    }

    const newBlog = new Blog({ title, content, author, fileName });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedBlog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
