import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const BlogDropdown = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
      })
      .catch((error) => console.error("Hata:", error));
  }, [BASE_URL]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Blogları arama query'sine göre filtrele
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setIsDropdownOpen(query.length > 0); // Arama yapıldığında dropdown'u aç
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBlogClick = () => {
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto " ref={dropdownRef}>
      {/* Arama Inputu */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-1 pr-12 pl-5 text-xl backdrop-blur-3xl backdrop-brightness-30 text-white placeholder:text-gray-200  bg-transparent border border-[#8197a3] rounded-xl w-full"
        placeholder="Blog Ara.."
      />

      {/* Dropdown Listesi */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 overflow-auto bg-transparent bg-white rounded-lg shadow-lg backdrop-blur-3xl max-h-60">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                to={`/blogs/${blog._id}`}
                key={blog._id}
                className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                onClick={() => handleBlogClick(blog._id)}>
                {blog.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">
              Aradığınız Blog Bulunamadı
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDropdown;
