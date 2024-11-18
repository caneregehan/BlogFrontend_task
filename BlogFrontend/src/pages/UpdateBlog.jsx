import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });

    navigate(`/blogs/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Blogu Güncelle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="input"
          required
        />
        <textarea
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          value={blog.author}
          onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          className="input"
          required
        />
        <button type="submit" className="btn btn-primary">
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
