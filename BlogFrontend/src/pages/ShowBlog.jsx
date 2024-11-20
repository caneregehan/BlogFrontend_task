import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";

const ShowBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, [BASE_URL]);

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {blogs.map((blog, index) => (
          <SwiperSlide key={index} className="relative">
            <Link to={`/blogs/${blog._id}`}>
              <img
                className="object-cover w-full h-[768px]"
                src={`${AWS_URL}/${blog.fileName}`}
                alt={`Image ${index + 1}`}
              />
            </Link>
            <div className="relative">
              <p className="absolute px-4 py-4 text-xl text-white bg-transparent rounded-full bg-opacity-10 backdrop-blur-3xl bottom-28 left-8">
                {blog.author}
              </p>

              <p className="absolute px-4 text-2xl font-semibold text-white bg-opacity-50 rounded bottom-16 left-8">
                {blog.title}
              </p>

              <p className="absolute px-4 py-2 text-xl text-white bg-transparent rounded-full bg-opacity-10 bottom-4 left-8">
                {blog?.content?.substring(0, 60)}{" "}
                <Link to={`/blogs/${blog._id}`}>
                  <span className="text-sm font-light underline">
                    Daha Fazla
                  </span>
                </Link>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container mx-auto font-semibold">
        <h1 className="py-3 mt-16 mb-4 text-3xl text-center text-zinc-800">
          Bloglar
        </h1>

        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3 ">
          {blogs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((blog) => (
              <div
                key={blog._id}
                className="max-w-5xl bg-white border border-gray-200 rounded-lg shadow ">
                <Link to={`/blogs/${blog._id}`} className="btn btn-secondary">
                  <div className="relative">
                    <img
                      src={`${AWS_URL}/${blog.fileName}`}
                      alt={blog.title}
                      className="object-fill w-full h-[270px] rounded-t-lg"
                    />
                    <p className="absolute px-2 py-1 text-white bg-black bg-opacity-50 rounded top-2 left-2">
                      {blog.author}
                    </p>
                  </div>

                  <div className="flex gap-5 px-8 my-4 font-light justify-stretch ">
                    <h3 className="">
                      <span className="pr-2">Yayın Tarihi:</span>
                      {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                    </h3>
                  </div>

                  <h2 className="px-8 mb-2 text-2xl font-medium tracking-tight text-left text-gray-900 ">
                    {blog.title}
                  </h2>
                  <p className="px-8 mb-3 font-normal text-gray-600 ">
                    {blog?.content?.substring(0, 60)}...
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ShowBlog;
