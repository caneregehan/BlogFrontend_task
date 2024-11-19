import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;
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
    <div className="container p-4 mx-auto ">
      <div className="pt-16 mx-auto">
        <img
          src={`${AWS_URL}/${blog.fileName}`}
          alt={blog.title}
          className="object-cover w-full h-[540px]"
        />
        <h1 className="pt-16 mb-4 text-3xl text-center">{blog.title}</h1>
        <p className="text-center">{blog.content}</p>
      </div>

      <p className="pt-12">
        <strong>Yazar:</strong> {blog.author}
      </p>
      <div className="flex mt-5 mb-48">
        <Link
          to="/"
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:focus:ring-gray-600 me-2 mb-2">
          Bloglara Geri Dön
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
