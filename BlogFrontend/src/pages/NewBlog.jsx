import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, content, author };

    await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });

    navigate("/");
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl">Yeni Blog Yaz</h1>
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
