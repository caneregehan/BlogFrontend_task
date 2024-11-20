// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     author: "",
//   });
//   const [BASE_URL] = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     fetch(`${BASE_URL}/${id}`)
//       .then((response) => response.json())
//       .then((data) => setBlog(data));
//   }, [id, BASE_URL]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await fetch(`${BASE_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(blog),
//     });

//     navigate(`/blogs/${id}`);
//   };

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-4 text-3xl">Blogu Güncelle</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={blog.title}
//           onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//           className="input"
//           required
//         />
//         <textarea
//           value={blog.content}
//           onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//           className="input"
//           required
//         />
//         <input
//           type="text"
//           value={blog.author}
//           onChange={(e) => setBlog({ ...blog, author: e.target.value })}
//           className="input"
//           required
//         />
//         <button type="submit" className="btn btn-primary">
//           Güncelle
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateBlog;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const AWS_URL = import.meta.env.VITE_AWS_URL;
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [file, setFile] = useState(null); // To handle the uploaded image file

  useEffect(() => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id, BASE_URL]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: "Blogu Güncellemek İstediğinizden Emin Misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, Güncelle",
      cancelButtonText: "İptal",
      reverseButtons: true, // This will position the cancel button on the left
    });

    if (result.isConfirmed) {
      let updatedBlog = { ...blog };

      // If a file is selected, upload it
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const imageUploadResponse = await fetch(`${AWS_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        const imageData = await imageUploadResponse.json();
        updatedBlog.fileName = imageData.fileName; // Set the uploaded file name
      }

      // Proceed with the blog update
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      Swal.fire("Güncellendi!", "Blog başarıyla güncellendi.", "success"); // Success message
      navigate(`/blogs/${id}`);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto font-sans">
      <div className="mb-16 text-center">
        {blog.fileName && (
          <div>
            <a
              href="javascript:void(0)"
              onClick={() => document.getElementById("fileInput").click()}>
              <img
                src={`${AWS_URL}/${blog.fileName}`}
                alt="Blog Image"
                className="inline-block cursor-pointer w-52"
              />
            </a>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
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

          {/* Image upload field */}
          <div>
            <label className="block mb-2 text-sm text-gray-800">
              Blog Resmi
            </label>
            <input
              type="file"
              onChange={handleFileChange}
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
