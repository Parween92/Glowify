import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

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
    <div className="min-h-screen bg-gray-50 pt-30 px-6 md:px-12 pb-20">
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#326287]">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-[#326287]/70 space-y-2">
            <p className="italic">Your cart is empty.</p>
            <Link
              to="/products"
              className="text-[#D59C8C] font-semibold underline hover:text-[#D59C8C]"
            >
              Go to Shop →
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
                  src={item.image || (item.images && item.images[0])}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <p className="font-semibold text-[#326287]">{item.title}</p>
                  <p className="text-[#B3746E] font-medium">{item.price} €</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-[#D59C8C] hover:text-[#D59C8C] text-2xl transition transform hover:scale-110"
                  title="Remove"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
