import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">{blog.title}</h1>
      <p>{blog.content}</p>
      <p className="pt-12">
        <strong>Yazar:</strong> {blog.author}
      </p>
      <div className=" flex mt-5">
        <button className="text-xl rounded-xl bg-gray-300 p-2">
          <a href="/">Bloglara Geri Dön</a>
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
