import { useEffect, useState } from "react";
export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  return (
    <footer className="mt-5 bg-white rounded-t-lg shadow dark:bg-gray-800">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
        <a href="/">
          <div className="flex justify-between gap-8 text-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/827/561/large_2x/blog-icon-design-free-vector.jpg"
              className="w-auto h-12"
              alt="Blog Icon"
            />
            <p className="my-auto text-white">Blog APP</p>
          </div>
        </a>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">
              Anasayfa
            </a>
          </li>
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">
              Bloglar
            </a>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <a href="/register" className="hover:underline me-4 md:me-6">
                  Kayıt ol
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline me-4 md:me-6">
                  Giriş Yap
                </a>
              </li>
            </>
          )}
          <li>
            <a href="/contact" className="hover:underline">
              İletişim
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
