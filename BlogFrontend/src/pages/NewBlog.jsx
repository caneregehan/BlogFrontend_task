import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToSignedURL } from "../lib/action";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const generateFileName = (file) => {
    const extension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(2, 7);
    return `${randomString}.${extension}`;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let fileName = null;
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("content", content);
  //     formData.append("author", author);

  //     if (file) {
  //       fileName = generateFileName(file);
  //       !fileName && console.log("Error generating file name");
  //       const res = await uploadToSignedURL(file, fileName);
  //       console.log(res);
  //     }
  //     fileName && formData.append("fileName", fileName);

  //     await fetch(`${BASE_URL}`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileName = null;

      if (file) {
        fileName = generateFileName(file);
        const uploadedFileName = await uploadToSignedURL(file, fileName);
        if (!uploadedFileName) throw new Error("Dosya yükleme başarısız.");
      }

      const payload = {
        title,
        content,
        author,
        fileName, // fileName yalnızca yükleme başarılı olursa gönderilir
      };

      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Blog gönderimi başarısız.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  return (
    <div className="container mx-auto pt-36">
      <h1 className="mb-4 text-3xl">Yeni Blog Yaz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input"
          required
        />

        <input
          type="file"
          accept="application/png, application/jpeg"
          onChange={(event) => {
            const selectedFile = event.currentTarget.files[0];
            setFile(selectedFile);
          }}
          className="block mb-2 text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
        />

        <button type="submit" className="btn btn-primary">
          Yayınla
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
