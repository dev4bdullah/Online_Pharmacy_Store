import React from "react";
import Image from "next/image";
import { CalendarIcon } from "@heroicons/react/24/outline";

const NewsBlogsSection = () => {
  const blogs = [
    {
      id: 1,
      author: "Doctor",
      date: "24 Dec, 2023",
      title: "Discover a treasure trove of practical tips for enhancing",
      excerpt:
        "From nutrition advice to exercise routines, we're here to support your journey toward a healthier...",
      imageUrl: "https://picsum.photos/600/400?random=1",
    },
    {
      id: 2,
      author: "Doctor",
      date: "24 Dec, 2023",
      title:
        "Our patients' journeys are filled with courage, resilience, and triumph.",
      excerpt:
        "In this section, we share inspiring narratives of individuals who have overcome health challenges.",
      imageUrl: "https://picsum.photos/600/400?random=2",
    },
    {
      id: 3,
      author: "Doctor",
      date: "24 Dec, 2023",
      title:
        "From organizing health fairs to partnering with local organizations",
      excerpt:
        "Find out how you can participate in community events and contribute to the health.",
      imageUrl: "https://picsum.photos/600/400?random=3",
    },
    {
      id: 4,
      author: "Doctor",
      date: "24 Dec, 2023",
      title: "In this section, we delve into various aspects of health",
      excerpt:
        "Explore the world of medical specialties through our blog's spotlight: From cardiology to pediatrics, we share in-depth articles written by our expert physicians.",
      imageUrl: "https://picsum.photos/600/400?random=4",
    },
  ];

  const featured = blogs[3];
  const others = blogs.slice(0, 3);

  return (
    <section className="w-[95%] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Our Latest News & Blogs
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:h-64">
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2 gap-3">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                {featured.author}
              </span>
              <span className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {featured.date}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              {featured.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {featured.excerpt}
            </p>
            <a
              href="#"
              className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Other Cards */}
        <div className="space-y-6">
          {others.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col sm:flex-row bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative w-full sm:w-1/3 aspect-[4/4] sm:h-44">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 w-full sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-1 gap-2">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {blog.author}
                    </span>
                    <span className="flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {blog.date}
                    </span>
                  </div>
                  <h4 className="text-md font-semibold text-gray-800 mb-1">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <a
                  href="#"
                  className="mt-2 text-green-600 text-sm font-medium hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsBlogsSection;
