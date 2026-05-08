"use client";
import { FaShoppingCart, FaFire } from "react-icons/fa";
import Image from "next/image";
export default function OfferCards() {
  const products = [
    {
      discount: "25% OFF",
      title: "BLACK GARLIC OIL",
      description: "Stronger and Thicker Hair With Black Garlic Oil",
      price: "$37.00",
      details: "Including Tox",
      brand: "LMS BIEN",
      features: [
        "Black GARLIC OIL",
        "Bright Arousinol",
        "Sex Salmonella No.",
        "Chloro",
      ],
      image: "https://picsum.photos/id/238/303/476",
    },
    {
      discount: "25% OFF",
      title: "Dental Care Set",
      description: "For Vivid and Bright Smiles",
      originalPrice: "$33.90",
      price: "$22.90",
      details: "Including Tox",
      image: "https://picsum.photos/id/239/303/476",
    },
    {
      discount: "25% OFF",
      title: "BANANA FLAVOURED TOOTHPASTE",
      price: "$37.00",
      details: "Including Tox",
      image: "https://picsum.photos/id/240/303/476",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center z-10">
            <FaFire className="mr-1" />
            {products[0].discount}
          </div>

          {/* Product Image */}
          <div className="relative h-[400px] md:h-[480px] overflow-hidden">
            <Image
              src={products[0].image}
              alt={products[0].title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 uppercase">
              {products[0].title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {products[0].description}
            </p>

            {/* Price */}
            <div className="mt-4">
              <span className="text-xl font-bold text-blue-600">
                {products[0].price}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {products[0].details}
              </span>
            </div>

            {/* Brand */}
            <p className="text-xs text-gray-500 mt-1">{products[0].brand}</p>

            {/* Features */}
            <ul className="mt-3 text-xs text-gray-600 space-y-1">
              {products[0]?.features?.length ? (
                products[0].features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))
              ) : (
                <li>No features available</li>
              )}
            </ul>

            {/* Button */}
            <button className="w-full mt-6 flex items-center justify-center gap-2 bg-black hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Remaining Products - 30% width */}
        <div className="flex flex-col items-start gap-6">
          {products.slice(1).map((product, index) => (
            <div
              key={index}
              className=" relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 w-full h-fit"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center z-10">
                <FaFire className="mr-1" />
                {product.discount}
              </div>

              {/* Product Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 uppercase">
                  {product.title}
                </h3>

                {product.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                )}

                {/* Price */}
                <div className="mt-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through mr-2">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {product.details}
                  </span>
                </div>

                {/* Button */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-black hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
