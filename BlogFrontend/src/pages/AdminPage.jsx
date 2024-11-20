import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Swal from "sweetalert2";

import "swiper/css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;

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

  const confirmDelete = (blog_id) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu blogu silmek üzeresiniz. Bu işlem geri alınamaz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(blog_id); // blog._id burada kullanılmalı
        Swal.fire("Silindi!", "Blog başarıyla silindi.", "success");
      }
    });
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
        <h1 className="py-3 pt-12 mb-4 text-3xl text-center text-zinc-800">
          Bloglar
        </h1>
        <div className="mb-5 text-right">
          <Link
            to="/new"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 me-2 mb-2">
            Yeni Blog Yaz
          </Link>
        </div>

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
                      className="object-cover w-full h-[270px] rounded-t-lg"
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

                <div className="items-center mx-auto my-5 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="px-4 py-2 ml-2 text-sm text-center text-white transition-all bg-gray-600 border border-transparent rounded-md shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Detay
                  </Link>

                  <button
                    onClick={() => confirmDelete(blog._id)}
                    className="px-4 py-2 ml-2 text-sm text-center text-white transition-all bg-gray-600 border border-transparent rounded-md shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    Sil
                  </button>

                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="px-4 py-2 ml-2 text-sm text-center text-white transition-all bg-gray-600 border border-transparent rounded-md shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
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
