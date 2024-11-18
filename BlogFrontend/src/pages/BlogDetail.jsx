import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id, BASE_URL]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl">{blog.title}</h1>
      <p>{blog.content}</p>
      <p className="pt-12">
        <strong>Yazar:</strong> {blog.author}
      </p>
      <div className="flex mt-5">
        <Link to="/" className="p-2 text-xl bg-gray-300 rounded-xl">
          Bloglara Geri Dön
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
