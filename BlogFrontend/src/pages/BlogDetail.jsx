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
    <div className="flex flex-col px-16 mx-auto ">
      <div className="flex justify-between my-8">
        <h1 className="text-3xl text-left ">{blog.title}</h1>
        <h1 className="self-start text-xl">
          {new Date(blog.createdAt).getDate().toString().padStart(2, "0")}.
          {(new Date(blog.createdAt).getMonth() + 1)
            .toString()
            .padStart(2, "0")}
          .{new Date(blog.createdAt).getFullYear()}
        </h1>
      </div>

      <img
        src={`${AWS_URL}/${blog.fileName}`}
        alt={blog.title}
        className="object-cover w-full h-[540px]"
      />
      <p>
        <strong>Yazar:</strong> {blog.author}
      </p>
      <div className="pt-16 mx-auto">
        <p className="text-justify">{blog.content}</p>
      </div>

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
