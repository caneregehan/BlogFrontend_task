// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     username: "",
//     mail: "",
//     password: "",
//   });
//   const BASE_URL = import.meta.env.VITE_BASE_URL_USER; // Base URL for the backend

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BASE_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         if (result.status) {
//           alert("Giriş başarılı!");
//           navigate("/"); // Navigate to home page
//         } else {
//           setError("Kullanıcı adı veya şifre yanlış.");
//         }
//       } else {
//         setError("Bir hata oluştu. Lütfen tekrar deneyin.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Sunucuya bağlanırken bir hata oluştu.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="hidden w-1/2 h-screen lg:block">
//         <img
//           src="https://w.wallhaven.cc/full/jx/wallhaven-jxgvg5.jpg"
//           alt="Placeholder Image"
//           className="object-cover w-full h-full rounded-e-2xl"
//         />
//       </div>
//       <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
//         <h1 className="pb-10 text-3xl font-semibold text-center">Giriş Yap</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Kullanıcı Adı"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
//               autoComplete="off"
//               required
//               defaultValue=""
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               id="mail"
//               name="mail"
//               placeholder="Mail Adresiniz"
//               value={formData.mail}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
//               autoComplete="off"
//               required
//               defaultValue=""
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Şifre"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
//               autoComplete="off"
//               required
//               defaultValue=""
//             />
//           </div>

//           {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-semibold text-white rounded-md bg-zinc-500 hover:bg-zinc-600">
//             Giriş Yap
//           </button>
//         </form>
//         <div className="mt-6 font-semibold text-center text-zinc-800">
//           <span className="mr-2 font-semibold text-black">
//             Hesabınız Yok Mu?
//           </span>
//           <a href="/register" className="hover:text-zinc-500">
//             Kayıt ol
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    password: "",
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL_USER; // Base URL for the backend

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // POST isteği gönderiliyor
  //     const response = await fetch(`${BASE_URL}/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();

  //       if (result.status) {
  //         alert("Giriş başarılı!");
  //         navigate("/");
  //       } else {
  //         setError("Kullanıcı adı veya şifre yanlış.");
  //       }
  //     } else {
  //       setError("Kullanıcı adı veya şifre yanlış.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setError("Sunucuya bağlanırken bir hata oluştu.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST isteği gönderiliyor
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.status && result.token) {
          // JWT token'ı localStorage'a kaydet
          localStorage.setItem("authToken", result.token);

          alert("Giriş başarılı!");
          navigate("/"); // Başarılı giriş sonrası anasayfaya yönlendir
        } else {
          setError("Kullanıcı adı veya şifre yanlış.");
        }
      } else {
        setError("Kullanıcı adı veya şifre yanlış.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="hidden w-1/2 h-screen lg:block">
        <img
          src="https://w.wallhaven.cc/full/jx/wallhaven-jxgvg5.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full rounded-e-2xl"
        />
      </div>
      <div className="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
        <h1 className="pb-10 text-3xl font-semibold text-center">Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="mail"
              name="mail"
              placeholder="Mail Adresiniz"
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
              id="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-zinc-500"
              autoComplete="off"
              required
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white rounded-md bg-zinc-500 hover:bg-zinc-600">
            Giriş Yap
          </button>
        </form>
        <div className="mt-6 font-semibold text-center text-zinc-800">
          <span className="mr-2 font-semibold text-black">
            Hesabınız Yok Mu?
          </span>
          <a href="/register" className="hover:text-zinc-500">
            Kayıt ol
          </a>
        </div>
      </div>
    </div>
  );
}
