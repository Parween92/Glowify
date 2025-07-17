import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GiLipstick, GiPerfumeBottle, GiSunglasses } from "react-icons/gi";
import { FaShoePrints, FaShoppingBag, FaRegGem } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    icon: <GiLipstick className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "fragrances",
    label: "Fragrances",
    icon: <GiPerfumeBottle className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "mens-shoes",
    label: "Men's Shoes",
    icon: <FaShoePrints className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-shoes",
    label: "Women's Shoes",
    icon: <FaShoePrints className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "mens-watches",
    label: "Men's Watches",
    icon: <MdWatch className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-watches",
    label: "Women's Watches",
    icon: <MdWatch className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-bags",
    label: "Women's Bags",
    icon: <FaShoppingBag className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "womens-jewellery",
    label: "Jewellery",
    icon: <FaRegGem className="text-[#D59C8C] text-3xl md:text-4xl" />,
  },
  {
    key: "sunglasses",
    label: "Sunglasses",
    icon: <GiSunglasses className="text-[#D59C8C] text-3xl md:text-4xl" />,
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
      <div className="relative w-full h-[340px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="src/assets/fashion.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-xl tracking-wide font-sans mb-3">
            Glowify
          </h1>
          <span className="text-white text-lg md:text-2xl font-light drop-shadow-lg">
            Schönheit. Stil. Deine Auswahl.
          </span>
          <a
            href="#angebote"
            className="mt-8 px-7 py-3 rounded-full bg-[#D59C8C] text-white font-semibold shadow hover:scale-105 transition text-lg"
          >
            Jetzt entdecken
          </a>
        </div>
      </div>

      {/* Vorteile */}
      <section className="w-full flex flex-wrap gap-4 justify-center items-center py-6 bg-white shadow-sm border-b-[#326287]">
        <Vorteil
          icon={<FaShoppingBag className="text-[#D59C8C] text-2xl" />}
          text="Kostenlose Lieferung (DE)"
        />
        <Vorteil
          icon={<FaRegGem className="text-[#D59C8C] text-2xl" />}
          text="Klarna Ratenkauf"
        />
        <Vorteil
          icon={<MdWatch className="text-[#D59C8C] text-2xl" />}
          text="30 Tage Rückgaberecht"
        />
      </section>

      {/* Angebote */}
      <section id="angebote" className="py-10 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#326287]">
          Aktuelle Angebote
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {loadingSale ? (
            <div className="text-[#D59C8C] text-center col-span-2">Lädt...</div>
          ) : (
            saleProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center group hover:shadow-2xl 
                transition border border-[#D59C8C]/30"
              >
                <div className="relative w-44 h-44 flex items-center justify-center mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition"
                  />
                  <span className="absolute top-2 left-2 bg-[#D59C8C] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    SALE
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#326287] text-center">
                  {p.title}
                </h3>
                <p className="text-[#326287]/70 text-sm mb-2 line-clamp-2 text-center">
                  {p.description}
                </p>
                <p className="text-[#D59C8C] font-bold text-xl">{p.price} €</p>
                <button className="mt-4 px-6 py-2 rounded-full bg-[#D59C8C] text-white font-semibold shadow hover:scale-105 transition">
                  In den Warenkorb
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Kategorien */}
      <section className="py-10 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#326287]">
          Kategorien
        </h2>
        <CategorySlider categories={categories} />
      </section>

      {/* Marken */}
      <section className="py-10 px-4 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#326287]">
          Unsere Marken
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-center items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center p-4 rounded-xl bg-white shadow hover:shadow-lg transition"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-16 h-16 object-contain mb-2"
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

const Vorteil = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-2">
    {icon}
    <span className="text-sm font-semibold text-[#326287]">{text}</span>
  </div>
);

const CategorySlider = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;
  const maxIndex = Math.max(0, categories.length - visibleCount);
  const sliderRef = useRef(null);

  return (
    <div className="relative flex items-center justify-center">
      <button
        aria-label="Zurück"
        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        disabled={currentIndex === 0}
        className={`absolute left-0 z-10 bg-[#D59C8C] text-white rounded-full p-2 shadow-lg hover:bg-[#326287] transition ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <FaChevronLeft className="text-2xl" />
      </button>
      <div
        ref={sliderRef}
        className="flex gap-6 px-4 md:px-10 pb-4 transition-transform duration-300"
        style={{ overflow: "hidden", minWidth: "0" }}
      >
        {categories
          .slice(currentIndex, currentIndex + visibleCount)
          .map((cat) => (
            <a
              key={cat.key}
              href={`/category/${cat.key}`}
              className="min-w-[130px] flex flex-col items-center bg-[#FCE9E4] hover:bg-[#F5C6A5] rounded-2xl shadow-md 
              transition p-5 mx-1 cursor-pointer hover:scale-105 border border-[#D59C8C]/30"
            >
              <div className="mb-3">{cat.icon}</div>
              <span className="text-sm font-medium text-[#326287] text-center">
                {cat.label}
              </span>
            </a>
          ))}
      </div>
      <button
        aria-label="Weiter"
        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))}
        disabled={currentIndex === maxIndex}
        className={`absolute right-0 z-10 bg-[#D59C8C] text-white rounded-full p-2 shadow-lg hover:bg-[#326287] transition ${
          currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <FaChevronRight className="text-2xl" />
      </button>
    </div>
  );
};
