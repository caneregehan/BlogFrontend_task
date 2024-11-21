/* eslint-disable react/prop-types */
// SideBlogItem.jsx

import { Link } from "react-router-dom";

const SideBlogItem = ({ blog }) => {
  const AWS_URL = import.meta.env.VITE_AWS_URL;

  return (
    <Link to={`/blogs/${blog?._id}`} className="block mb-6 no-underline">
      <div className="flex justify-between h-28">
        <img
          src={`${AWS_URL}/${blog?.fileName}`}
          alt={blog?.title}
          className="object-cover h-full py-0 my-0 rounded-xl aspect-square"
        />
        <div className="flex flex-col w-full py-1 ml-2">
          <h6 className="my-0 leading-3">{blog?.title}</h6>
          <p className="my-0 mt-2 text-xs font-medium text-gray-500">
            {new Date(blog.createdAt).getDate().toString().padStart(2, "0")}.
            {(new Date(blog.createdAt).getMonth() + 1)
              .toString()
              .padStart(2, "0")}
            .{new Date(blog.createdAt).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SideBlogItem;
