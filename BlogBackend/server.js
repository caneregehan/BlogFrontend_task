const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://caneregehan:caneregehan@cluster0.1quyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Blog Model
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  author_title: String,
});

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
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.json(newBlog);
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

// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
