import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_URL_USER; // Base URL for the backend
  const navigate = useNavigate(); // React Router hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    mail: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Şifreler uyuşmuyor!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          username: formData.username,
          mail: formData.mail,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Kayıt başarılı!");
        navigate("/login");
        console.log(result);
      } else {
        alert("Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="hidden w-1/2 h-screen lg:block">
        <img
          src="https://w.wallhaven.cc/full/jx/wallhaven-jxgvg5.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full rounded-e-2xl "
        />
      </div>
      <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
        <h1 className="pb-10 text-3xl font-semibold text-center">Kayıt ol</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="flex w-1/2 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>
            <div className="flex w-1/2 mb-4">
              <input
                type="text"
                name="lastname"
                placeholder="Soyadınız"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="mail"
              placeholder="Mail Adresi"
              value={formData.mail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirm_password"
              placeholder="Şifre Tekrar"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white rounded-md bg-zinc-500 hover:bg-zinc-600">
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}
