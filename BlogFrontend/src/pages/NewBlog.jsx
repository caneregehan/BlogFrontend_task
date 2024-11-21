import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToSignedURL } from "../lib/action";
import Swal from "sweetalert2";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Blogu yayınlamak istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Evet, yayınla",
      cancelButtonText: "Hayır, iptal et",
    });

    // If the user confirms, proceed with submission
    if (result.isConfirmed) {
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
          fileName, // Eğer dosya yüklenmediyse null olacak
        };

        const response = await fetch(`${BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          Swal.fire(
            "Başarılı!",
            "Blog başarılı bir şekilde yayınlandı.",
            "success"
          );
          navigate("/");
        } else {
          console.error("Blog gönderimi başarısız.");
          Swal.fire(
            "Hata",
            "Blogu yayınlama sırasında bir hata oluştu.",
            "error"
          );
        }
      } catch (error) {
        console.error("Hata:", error);
        Swal.fire("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.", "error");
      }
    } else {
      console.log("Blog yayınlanamadı.");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto font-sans">
      <h1 className="mb-4 text-3xl">Yeni Blog Yaz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          required
        />

        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          required
        />
        <input
          type="text"
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          required
        />

        <div className="grid w-full gap-3 border border-gray-300 border-dashed py-9 bg-gray-50 rounded-2xl">
          <div className="grid gap-1">
            <svg
              className="mx-auto"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"></svg>
            <h2 className="text-xs leading-4 text-center text-gray-400">
              PNG, JPG veya PDF, 15 MB tan küçük dosyalarınızı yükleyin
            </h2>
          </div>
          <div className="grid gap-2">
            <h4 className="text-sm font-medium leading-snug text-center text-gray-900">
              Dosyanızı Yükleyiniz
            </h4>
            <div className="flex items-center justify-center my-20">
              <label>
                <input
                  type="file"
                  hidden
                  accept="application/png, application/jpeg"
                  onChange={(event) => {
                    const selectedFile = event.currentTarget.files[0];
                    setFile(selectedFile);
                  }}
                />
                <div className="flex flex-col items-center justify-center px-2 mx-auto text-xs font-semibold leading-4 text-white bg-gray-800 rounded-full shadow cursor-pointer w-28 h-9 focus:outline-none">
                  Choose File
                </div>
                <div>
                  <p className="flex pt-5 text-xs text-center text-gray-500">
                    {file ? file.name : "No file selected"}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gray-800 w-full text-white text-sm px-4 py-3.5 rounded-md  outline-gray-800 ">
          Yayınla
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
