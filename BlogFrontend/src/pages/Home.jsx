import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, [BASE_URL]);

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <>
      <img
        className="object-top w-full h-96"
        src="https://cbx-prod.b-cdn.net/COLOURBOX38161888.jpg?width=1200&height=1200&quality=70"
        alt=""
      />
      <div className="container mx-auto">
        <h1 className="mb-4 text-3xl">Bloglar</h1>
        <Link to="/new" className="mb-4">
          Yeni Blog Yaz
        </Link>
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id} className="p-4 mb-4 border rounded">
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
    </>
  );
};

export default Home;
