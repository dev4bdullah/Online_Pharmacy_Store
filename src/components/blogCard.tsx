import Image from "next/image";
import React from "react";
interface Blog {
  id: number;
  title: string;
  imageUrl: string;
  author?: string;
  date?: string;
  content?: string;
}
interface BlogCardProps {
  blog: Blog;
}
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div
      key={blog.id}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          By {blog.author || "Unknown"} | {blog.date || "N/A"}
        </p>
        <p className="text-gray-700 mb-4 line-clamp-3">{blog.content}</p>
        <a
          href="#"
          className="text-green-600 hover:text-green-800 font-medium inline-flex items-center transition-colors duration-300"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
