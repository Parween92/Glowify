import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-500">
        Warenkorb
      </h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 space-y-2">
          <p className="italic">Dein Warenkorb ist leer.</p>
          <Link
            to="/products"
            className="text-pink-500 font-semibold underline hover:text-pink-600"
          >
            Zum Shop →
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center border-b border-gray-200 pb-4 gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-pink-600 font-medium">{item.price} €</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 text-xl hover:scale-110 transition"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
