import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updatedCart);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return {
          ...item,
          quantity: newQty < 1 ? 1 : newQty,
        };
      }
      return item;
    });
    updateCartStorage(updatedCart);
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout");
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
          <>
            <ul className="space-y-6 mb-8">
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
                    <p className="text-[#326287] font-medium text-sm">
                      Subtotal:{" "}
                      {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-[#326287]/10 p-2 rounded-lg gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full border border-[#D59C8C] text-[#D59C8C] hover:bg-[#f2e0dc] transition"
                        title="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3 font-semibold text-[#326287]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full border border-[#D59C8C] text-[#D59C8C] hover:bg-[#f2e0dc] transition"
                        title="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#D59C8C] hover:text-[#B3746E] text-2xl transition transform hover:scale-110"
                      title="Remove"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <div className="flex pb-8 justify-between items-center text-xl font-bold text-[#326287]">
                <span>Total:</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#D59C8C] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#B3746E] transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingBag />
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
