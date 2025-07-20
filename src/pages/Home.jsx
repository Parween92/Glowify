import { useEffect, useState } from "react";
import axios from "axios";
import { GiLipstick, GiPerfumeBottle, GiSunglasses } from "react-icons/gi";
import { FaShoePrints, FaShoppingBag, FaRegGem } from "react-icons/fa";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { GoPackageDependents } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCart2, BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";

const SALE_PRODUCT_IDS = [1, 5];

const brands = [
  { logo: "src/assets/Chanel.png" },
  { logo: "src/assets/Nike.png" },
  { logo: "src/assets/Rolex.png" },
  { logo: "src/assets/Gucci.png" },
];

const categories = [
  {
    key: "beauty",
    label: "Beauty",
    icon: <GiLipstick className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "fragrances",
    label: "Fragrances",
    icon: <GiPerfumeBottle className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-shoes",
    label: "Shoes",
    icon: <FaShoePrints className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-bags",
    label: "Bags",
    icon: <FaShoppingBag className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-jewellery",
    label: "Jewellery",
    icon: <FaRegGem className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
  {
    key: "sunglasses",
    label: "Sunglasses",
    icon: <GiSunglasses className="text-[#e8b09e] text-3xl md:text-4xl" />,
  },
];

export const Home = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loadingSale, setLoadingSale] = useState(true);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      setLoadingSale(true);
      try {
        const responses = await Promise.all(
          SALE_PRODUCT_IDS.map((id) =>
            axios.get(`https://dummyjson.com/products/${id}`)
          )
        );
        setSaleProducts(responses.map((r) => r.data));
      } catch {
        setSaleProducts([]);
      }
      setLoadingSale(false);
    };
    fetchSaleProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Video */}
      <div className="relative w-full h-[360px] md:h-[580px] flex items-center justify-center overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="src/assets/fashion.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold drop-shadow-xl tracking-wide mb-3">
            Glowify Your Life
          </h1>
          <span className="text-white text-lg md:text-2xl font-light drop-shadow-lg">
            Your Beauty. Your Style. Your Choice.
          </span>
          <a
            href="#offers"
            className="mt-8 px-7 py-3 rounded-xl bg-[#e8b09e] text-white font-semibold shadow hover:bg-[#D59C8C] hover:scale-105 transition text-lg"
          >
            Discover Now
          </a>
        </div>
      </div>

      {/* Benefits section */}
      <section className="w-full flex flex-wrap gap-10 justify-center items-center py-6 bg-white shadow-sm border-b-[#326287]">
        <Benefit
          key="delivery"
          icon={<GoPackageDependents className="text-[#e8b09e] text-2xl" />}
          text="Free Delivery (DE)"
        />
        <Benefit
          key="payment"
          icon={<CiCreditCard1 className="text-[#e8b09e] text-3xl" />}
          text="Klarna Payment"
        />
        <Benefit
          key="return"
          icon={<HiArrowUturnLeft className="text-[#e8b09e] text-xl" />}
          text="30-Day Return Policy"
        />
      </section>

      {/* Offers */}
      <section id="offers" className="py-10 px-4 max-w-5xl mb-8 mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8 mt-8 text-[#326287] flex items-center gap-2 justify-center">
          Hot Deals <BsFire />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {loadingSale ? (
            <div className="text-[#e8b09e] text-center col-span-2">
              Loading...
            </div>
          ) : (
            saleProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl 
                transition border border-[#e8b09e]/30"
              >
                <div className="relative w-44 h-44 flex items-center justify-center mb-4 overflow-hidden rounded-xl">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition"
                  />
                  <span className="absolute top-1 right-30 bg-[#e8b09e] text-white text-xs font-semibold px-3 py-1 rounded-lg">
                    SALE
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#326287] text-center">
                  {p.title}
                </h3>
                <p className="text-[#326287]/70 text-sm mb-2 line-clamp-2 text-center">
                  {p.description}
                </p>
                <p className="text-[#e8b09e] font-bold text-xl">{p.price} €</p>
                <button className="mt-4 px-6 py-2 rounded-xl bg-[#e8b09e] text-white font-semibold shadow hover:bg-[#D59C8C] transition flex items-baseline gap-2">
                  <BsCart2 /> Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-35 py-10 px-4 max-w-5xl mx-auto w-full">
          {/* Video Section */}
          <div className="w-auto flex justify-center">
            <video
              className="w-[500px] h-[700px] object-[center_30%] object-cover rounded-xl shadow-lg"
              src="src/assets/video2.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Categories Section */}
          <div className="flex flex-col justify-center items-center w-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#326287]">
              Categories
            </h2>
            <div className="w-auto grid grid-cols-2 gap-12">
              {categories.map((category) => (
                <Link
                  key={category.key}
                  to={`/products?category=${category.key}`}
                  className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg group p-4 hover:shadow-2xl 
                  transition border border-[#e8b09e]/30 cursor-pointer h-[160px] w-[190px]"
                >
                  <div className="text-[#e8b09e] text-3xl mb-2 scale-105 group-hover:scale-110 transition">
                    {category.icon}
                  </div>
                  <span className="text-sm font-semibold text-[#326287]">
                    {category.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="p-20 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#326287]">
          Our Top Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-15 justify-center items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl bg-[#e8b09e] shadow-lg group hover:shadow-2xl 
                        border border-[#e8b09e]/30 transition"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-20 object-contain mb-2 scale-105 group-hover:scale-110 transition"
              />
              <span className="font-medium text-[#326287] text-lg">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Benefit = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-2">
    {icon}
    <span className="text-sm font-semibold text-[#326287]">{text}</span>
  </div>
);
