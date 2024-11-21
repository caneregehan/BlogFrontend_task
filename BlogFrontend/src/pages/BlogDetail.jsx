import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBlogItem from "../components/SideBlogItem"; // Import the SideBlogItem component

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;

  const fetchBlog = async () => {
    try {
      const blogData = await fetch(`${BASE_URL}/${id}`);
      const blog = await blogData.json();
      return blog;
    } catch (error) {
      console.log("Error fetching blog:", error);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const blogsData = await fetch(`${BASE_URL}/latest`);
      const blogs = await blogsData.json();
      return blogs;
    } catch (error) {
      console.log("Error fetching latest blogs:", error);
    }
  };

  const fetchData = async () => {
    const blogData = await fetchBlog();
    const blogsData = await fetchLatestBlogs();

    if (blogData) setBlog(blogData);
    if (blogsData) setBlogs(blogsData);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  document.title = blog?.title || "Blog Detail";

  return (
    <section className="flex flex-row justify-between px-4 py-8 space-x-6 prose bg-gray-200 max-w-none">
      <div className="w-[560px] h-min bg-white rounded-lg px-4 py-5 shadow-xl">
        <h3 className="font-bold mb-7">Diğer Blog Yazıları</h3>

        {blogs ? (
          blogs
            .filter((b) => b._id !== blog._id)
            .map((b) => <SideBlogItem key={b._id} blog={b} />)
        ) : (
          <p>Yükleniyor...</p>
        )}
      </div>

      <div className="flex flex-col w-full px-16 mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mt-12">
          <h1 className="text-3xl text-left ">{blog.title}</h1>
          <h1 className="text-sm font-medium">
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
          className="object-cover w-full h-[540px] rounded-lg shadow-md my-0"
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
            className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 me-2 mb-2">
            Bloglara Geri Dön
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
