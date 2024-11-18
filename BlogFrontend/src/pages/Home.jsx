import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    });
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Düzenleme sayfasına yönlendir
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Bloglar</h1>
      <Link to="/new" className="btn btn-primary mb-4">
        Yeni Blog Yaz
      </Link>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl">{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-2">
              <Link to={`/blogs/${blog._id}`} className="btn btn-secondary">
                Detay
              </Link>

              <button
                onClick={() => handleDelete(blog._id)}
                className="btn btn-danger">
                Sil
              </button>

              <button
                onClick={() => handleEdit(blog._id)}
                className="btn btn-danger">
                Düzenle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
