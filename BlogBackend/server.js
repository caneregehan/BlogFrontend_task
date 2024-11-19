const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Blog Model
const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    fileName: String,
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

// Routes
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

app.post("/blogs", async (req, res) => {
  try {
    const { title, content, author, fileName } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Eksik alanlar mevcut!" });
    }

    const newBlog = new Blog({
      title,
      content,
      author,
      fileName,
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/blogs/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedBlog);
});

app.delete("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
