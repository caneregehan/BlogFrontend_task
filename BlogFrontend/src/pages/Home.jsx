import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";

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
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        <SwiperSlide>
          <img
            className="object-cover w-full pt-0 h-[540px]"
            src="https://w.wallhaven.cc/full/xl/wallhaven-xl8m1o.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover w-full pt-0 h-[540px]"
            src="https://w.wallhaven.cc/full/4o/wallhaven-4oqm7m.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-cover w-full pt-0 h-[540px]"
            src="https://w.wallhaven.cc/full/we/wallhaven-we9d66.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <div className="container mx-auto font-semibold">
        <h1 className="py-3 mb-4 text-3xl text-center text-zinc-800">
          Bloglar
        </h1>
        <div className="mb-5 text-right">
          <Link to="/new" className="btn btn-primary">
            Yeni Blog Yaz
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-4 border rounded">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
