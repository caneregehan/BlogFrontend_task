import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, content, author };

    await fetch(`http://localhost:5000/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });

    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Yeni Blog Yaz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn btn-primary">
          Yayınla
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
