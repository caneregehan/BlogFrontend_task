import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadToSignedURL } from "../lib/action"; // uploadToSignedURL fonksiyonunu import edin

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    fileName: null,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id, BASE_URL]);

  const generateFileName = (file) => {
    const extension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(2, 7);
    return `${randomString}.${extension}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Blogu Güncellemek İstediğinizden Emin Misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, Güncelle",
      cancelButtonText: "İptal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        let updatedBlog = { ...blog };

        if (file) {
          const fileName = generateFileName(file);
          const uploadedFileName = await uploadToSignedURL(file, fileName);

          if (!uploadedFileName) {
            throw new Error("Dosya yükleme başarısız.");
          }

          updatedBlog.fileName = uploadedFileName;
        }

        await fetch(`${BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog),
        });

        Swal.fire("Güncellendi!", "Blog başarıyla güncellendi.", "success");
        navigate(`/blogs/${id}`);
      } catch (error) {
        console.error("Hata:", error);
        Swal.fire("Hata", "Blog güncellenirken bir hata oluştu.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto font-sans">
      <div className="mb-16 text-center">
        {blog.fileName && (
          <div>
            <img
              src={`${AWS_URL}/${blog.fileName}`}
              alt="Blog Image"
              className="inline-block w-52"
            />
          </div>
        )}
        <h4 className="mt-6 text-base font-semibold text-gray-800">
          Blogu Güncelle
        </h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div>
            <label className="block mb-2 text-sm text-gray-800">Başlık</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Başlık girin"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-800">Yazar</label>
            <input
              type="text"
              value={blog.author}
              onChange={(e) => setBlog({ ...blog, author: e.target.value })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Yazar adı girin"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-800">
              Blog Resmi
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-800">İçerik</label>
            <textarea
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all h-64 resize-none"
              placeholder="İçerik girin"
              required
            />
          </div>
        </div>

        <div className="!mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
