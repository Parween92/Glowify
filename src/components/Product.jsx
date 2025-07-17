import { useEffect, useState } from "react";
import axios from "axios";
import AddToCart from "./AddToCart";

const Product = () => {
  const categories = [
    "beauty",
    "fragrances",
    "mens-shoes",
    "womens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [modalProduct, setModalProduct] = useState(null);

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
                `https://dummyjson.com/products/category/${category}`
              );
              return response.data.products;
            })
          );
          setProducts(results.flat());
        }
      } catch (error) {
        console.error(error);
        setError("Fehler beim Laden der Produkte.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Filter */}
      <aside className="w-48 p-4 border-r border-gray-300 sticky top-0 h-screen overflow-y-auto">
        <h3 className="mb-4 font-semibold text-lg">Filter</h3>
        <ul className="list-none p-0 m-0">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`mb-2 w-full text-left cursor-pointer ${
                !selectedCategory ? "font-bold" : "font-normal"
              }`}
            >
              Alle Kategorien
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`mb-2 w-full text-left cursor-pointer ${
                  selectedCategory === cat ? "font-bold" : "font-normal"
                }`}
              >
                {cat.replace(/-/g, " ")}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Produke */}
      <main className="flex-1 p-4">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading ? (
          <p>Lade Produkte...</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-300 p-4 relative group cursor-pointer"
              >
                {/* Bild mit Hover-Overlay */}
                <div
                  onClick={() => setModalProduct(product)}
                  className="relative overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full block"
                  />
                  <div
                    className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center 
                  justify-center font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Details
                  </div>
                </div>

                <h3 className="mt-2 font-semibold">{product.title}</h3>
                <p>Price: {product.price} €</p>
                <AddToCart product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Popup Modal */}
        {modalProduct && (
          <div
            onClick={() => setModalProduct(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-lg max-w-md w-11/12 max-h-[80vh] overflow-y-auto cursor-auto"
            >
              <h2 className="text-xl font-bold mb-4">{modalProduct.title}</h2>
              <img
                src={modalProduct.images[0]}
                alt={modalProduct.title}
                className="w-full mb-4"
              />
              <p className="mb-2">{modalProduct.description}</p>
              <p className="mb-2">Price: {modalProduct.price} €</p>
              <p className="mb-4">Rating: {modalProduct.rating} / 5</p>
              <AddToCart product={modalProduct} />
              <button
                onClick={() => setModalProduct(null)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Product;
