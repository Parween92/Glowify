import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar, FaShoePrints, FaShoppingBag, FaRegGem } from "react-icons/fa";
import { GiLipstick, GiPerfumeBottle, GiSunglasses } from "react-icons/gi";
import { BsCart2, BsHeart, BsHeartFill } from "react-icons/bs";
import AddToCart from "./AddToCart";
import { BsStars } from "react-icons/bs";

const Product = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");

  const categories = [
    { key: "beauty", label: "Beauty", icon: <GiLipstick className="text-white text-lg" /> },
    { key: "fragrances", label: "Fragrances", icon: <GiPerfumeBottle className="text-white text-lg" /> },
    { key: "womens-shoes", label: "Shoes", icon: <FaShoePrints className="text-white text-lg" /> },
    { key: "womens-bags", label: "Bags", icon: <FaShoppingBag className="text-white text-lg" /> },
    { key: "womens-jewellery", label: "Jewellery", icon: <FaRegGem className="text-white text-lg" /> },
    { key: "sunglasses", label: "Sunglasses", icon: <GiSunglasses className="text-white text-xl" /> },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Scroll to top when component mounts or URL category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [urlCategory]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    // Set initial category from URL parameter
    if (urlCategory && categories.some(cat => cat.key === urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        if (selectedCategory) {
          const response = await axios.get(
            `https://dummyjson.com/products/category/${selectedCategory}`
          );
          setProducts(response.data.products);
        } else {
          const results = await Promise.all(
            categories.map(async (category) => {
              const response = await axios.get(
                `https://dummyjson.com/products/category/${category.key}`
              );
              return response.data.products;
            })
          );
          setProducts(results.flat());
        }
      } catch (error) {
        setError("Error loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = storedCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      storedCart[existingItemIndex].quantity = (storedCart[existingItemIndex].quantity || 1) + 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(storedCart));
    alert(`"${product.title}" has been added to the cart.`);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < fullStars ? (
          <FaStar key={i} className="text-[#E8B09E]" />
        ) : (
          <FaRegStar key={i} className="text-[#E8B09E]" />
        )
      );
    }
    return (
      <div className="absolute top-2 left-2 flex gap-1 bg-white/80 px-2 py-1 rounded">
        {stars}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-30 flex gap-12 px-6 md:px-12 ">
      {/* Sidebar */}
      <aside className="hidden md:flex items-center gap-2 flex-col h-[100%] sticky top-24 w-64 bg-white rounded-lg shadow-md p-6"
        style={{
          background:
            "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="mt-auto pb-4 w-full border-b border-white">
          <h3 className="text-2xl font-bold text-center text-white">
            Filter
          </h3>
        </div>
        
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full mt-3 flex font-medium items-center gap-3 px-4 py-3 rounded-lg capitalize transition-colors ${
            !selectedCategory
              ? "bg-[#e8b09e]/60 text-white"
              : "text-white hover:bg-[#e8b09e]/20"
          }`}
        >
          <BsStars className="text-lg"/>
          All Categories
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`w-full font-medium flex items-center gap-3 px-4 py-3 rounded-lg capitalize transition-colors ${
              selectedCategory === cat.key
                ? "bg-[#e8b09e]/60 text-white"
                : "text-white hover:bg-[#e8b09e]/20"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Products */}
      <main className="flex-1">
        {error && <p className="text-[#326287] mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-lg text-[#326287]">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col"
              >
                <div
                  onClick={() => setModalProduct(product)}
                  className="relative overflow-hidden rounded-t-xl"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  {product.images?.length > 0 && (
                    <>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                      {renderStars(product.rating)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product);
                        }}
                        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        {isFavorite(product.id) ? (
                          <BsHeartFill className="text-[#326287]" />
                        ) : (
                          <BsHeart className="text-[#326287]" />
                        )}
                      </button>
                    </>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-[#326287] font-semibold text-lg mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-[#326287]/80 mb-4 text-sm flex-grow">
                    {product.description.length > 80
                      ? product.description.slice(0, 77) + "..."
                      : product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#326287] font-semibold text-xl">
                      {product.price} €
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-[#e8b09e] hover:bg-[#D59C8C] transition-colors rounded-xl px-4 py-2 text-white font-semibold shadow-md"
                    >
                      <BsCart2 />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalProduct && (
          <div
            onClick={() => setModalProduct(null)}
            className="fixed inset-0 z-50 bg-[#326287] bg-opacity-60 flex items-center justify-center px-4 sm:px-8 py-24 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 relative max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-3xl font-bold text-[#326287] mb-4">
                {modalProduct.title}
              </h2>
              <div className="relative mb-4">
                <img
                  src={modalProduct.images[0]}
                  alt={modalProduct.title}
                  className="rounded-xl w-full max-h-[300px] object-contain"
                />
                {renderStars(modalProduct.rating)}
              </div>
              <p className="text-[#326287]/90 mb-6">
                {modalProduct.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#326287] font-semibold text-2xl">
                  Price: {modalProduct.price} €
                </p>
              </div>
              <AddToCart product={modalProduct} />
              <button
                onClick={() => setModalProduct(null)}
                className="mt-8 px-6 py-3 bg-[#E8B09E] rounded-xl text-white hover:bg-[#D59C8C] transition-colors w-full font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Product;