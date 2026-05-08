import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="w-[95%] mx-auto my-10  bg-gray-50 py-12 px-6 flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-lg overflow-hidden">
      <div className="max-w-xl">
        <p className="text-sm text-gray-600 mb-2">Todays Hot Offer</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Unlock 50% Off on Essential Medicines!
        </h2>
        <p className="text-gray-600 mb-6">
          Embrace wellness without breaking the bank! Enjoy a generous discount
          on a wide range of vital medicines at our online pharmacy. Your health
          matters, and so does your budget.
        </p>
        <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-black transition">
          Place An Order Now →
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:ml-10">
        <Image
          src="/promobanner.svg"
          alt="Medicine capsule"
          layout="responsive"
          width={400}
          height={300}
          className="rounded-xl "
        />
      </div>
    </section>
  );
};

export default PromoBanner;
