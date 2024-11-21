import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const navigation = [
  { name: "Anasayfa", href: "/", current: true },
  { name: "Blog Ekle", href: "/new", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl">
        <div className="absolute z-50 flex items-center justify-between pt-5 mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md group hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center shrink-0">
              <a href="/">
                <img
                  alt="Your Company"
                  src="https://static.vecteezy.com/system/resources/previews/014/827/561/large_2x/blog-icon-design-free-vector.jpg"
                  className="w-auto h-8 "
                />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "hover:bg-gray-400 hover:text-white text-white"
                        : "text-white hover:bg-gray-400 hover:text-white",
                      "rounded-md px-1 py-2 text-s font-medium text-nowrap"
                    )}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mr-48">
            <div className="relative w-full pl-48">
              <SearchBar />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static text-nowrap sm:inset-auto sm:ml-6 sm:pr-16">
            {!isLoggedIn ? (
              <>
                <div className="flex items-center justify-center dark:bg-gray-100 rounded-xl">
                  <a href="/login">
                    <button className="flex gap-2 px-6 py-2 transition duration-150 rounded-lg hover:bg-gray-100 border-gray-100bg-gray-100 dark:border-gray-100bg-gray-100 text-gray-100bg-gray-100 dark:text-gray-100bg-gray-100 hover:border-gray-100bg-gray-100 dark:hover:border-gray-100bg-gray-100 hover:text-gray-100bg-gray-100 dark:hover:text-gray-100bg-gray-100 hover:shadow">
                      <img
                        className="w-6 h-6"
                        src="https://cdn-icons-png.flaticon.com/512/7856/7856337.png"
                        loading="lazy"
                        alt="google logo"
                      />
                      <span>Giriş Yap</span>
                    </button>
                  </a>
                </div>
                <div className="flex items-center justify-center dark:bg-gray-100 rounded-xl">
                  <a href="/register">
                    <button className="flex gap-2 px-6 py-2 transition duration-150 border-gray-100 rounded-lg hover:bg-gray-100 dark:border-gray-100 text-gray-100border-gray-100 dark:text-gray-100border-gray-100 hover:border-gray-100 dark:hover:border-gray-100 hover:text-gray-100border-gray-100 dark:hover:text-gray-100border-gray-100 hover:shadow">
                      <img
                        className="w-6 h-6"
                        src="https://cdn-icons-png.flaticon.com/512/16206/16206813.png"
                        loading="lazy"
                        alt="google logo"
                      />
                      <span>Kayıt ol</span>
                    </button>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center dark:bg-gray-100 rounded-xl">
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 px-6 py-2 transition duration-150 rounded-lg hover:bg-gray-100 border-gray-100bg-gray-100 dark:border-gray-100bg-gray-100 text-gray-100bg-gray-100 dark:text-gray-100bg-gray-100 hover:border-gray-100bg-gray-100 dark:hover:border-gray-100bg-gray-100 hover:text-gray-100bg-gray-100 dark:hover:text-gray-100bg-gray-100 hover:shadow">
                    <img
                      className="w-6 h-6"
                      src="https://cdn-icons-png.flaticon.com/512/9208/9208320.png"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
                <div className="flex items-center justify-center dark:bg-gray-100 rounded-xl">
                  <a href="/admin">
                    <button className="flex gap-2 px-6 py-2 transition duration-150 border-gray-100 rounded-lg hover:bg-gray-100 dark:border-gray-100 text-gray-100border-gray-100 dark:text-gray-100border-gray-100 hover:border-gray-100 dark:hover:border-gray-100 hover:text-gray-100border-gray-100 dark:hover:text-gray-100border-gray-100 hover:shadow">
                      <img
                        className="w-6 h-6"
                        src="https://cdn-icons-png.flaticon.com/512/983/983901.png"
                        loading="lazy"
                        alt="google logo"
                      />
                      <span>Blogları Düzenle</span>
                    </button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}>
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
