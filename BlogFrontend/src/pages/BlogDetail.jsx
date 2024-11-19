import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    try {
      fetch(`${BASE_URL}/${id}`)
        .then((response) => response.json())
        .then((data) => setBlog(data));
    } catch (error) {
      console.log(error);
    }
  }, [id, BASE_URL]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container p-4 mx-auto">
      <div className="pt-16">
        <img
          src={`https://s3.eu-north-1.amazonaws.com/my.task00/${blog.fileName}`}
          alt={blog.title}
          className="object-cover w-full h-[540px]"
        />
        <h1 className="pt-16 mb-4 text-3xl text-center">{blog.title}</h1>
      </div>
      <div className="mt-16">
        <p>{blog.content}</p>
      </div>
      <p className="pt-12">
        <strong>Yazar:</strong> {blog.author}
      </p>
      <div className="flex mt-5 mb-48">
        <Link to="/" className="p-2 text-xl bg-gray-300 rounded-xl">
          Bloglara Geri Dön
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
