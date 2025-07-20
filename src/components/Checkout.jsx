import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiLock } from "react-icons/fi";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.length === 0) {
      navigate("/cart");
      return;
    }
    setCartItems(storedCart);
  }, [navigate]);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const shippingCost = 5.99;
  const finalTotal = totalAmount + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const order = {
      items: cartItems,
      total: finalTotal,
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      customer: formData,
    };

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    setTimeout(() => {
      localStorage.removeItem("cart");
      setIsProcessing(false);
      navigate("/order-success", {
        state: { orderData: order },
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-30 px-6 md:px-12 pb-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#326287]">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white h-auto rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#326287]">
              Order Summary
            </h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex items-end justify-between w-full">
                    <div className="flex-1">
                      <p className="text-[#326287]">{item.title}</p>
                      <p className="text-[#D59C8C]">{item.price} €</p>
                      <p className="text-[#326287] text-sm">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="text-[#326287] text-sm">
                      Subtotal:{" "}
                      {(parseFloat(item.price) * (item.quantity || 1)).toFixed(
                        2
                      )}{" "}
                      €
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-[#326287]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-[#D59C8C]">
                  {totalAmount.toFixed(2)} €
                </span>
              </div>
              <div className="flex pb-4 justify-between">
                <span>Shipping:</span>
                <span className="text-[#D59C8C]">
                  {shippingCost.toFixed(2)} €
                </span>
              </div>
              <div className="flex pt-4 justify-between font-bold text-lg text-[#326287] border-t border-gray-200">
                <span>Total:</span>
                <span>{finalTotal.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#326287]">
                  Contact Information
                </h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 
                  focus:ring-[#264a66]"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#326287]">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1
                     focus:ring-[#264a66]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1
                     focus:ring-[#264a66]"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 
                  focus:ring-[#264a66]"
                />
                <div className="grid pt-4 grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1
                     focus:ring-[#264a66]"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 
                    focus:ring-[#264a66]"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#326287] flex items-center gap-2">
                  <FiCreditCard />
                  Payment Information
                </h3>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="w-full mb-6 px-3 py-2 rounded text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1
                   focus:ring-[#264a66]"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded mb-6 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 
                  focus:ring-[#264a66]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none focus:ring-1 
                    focus:ring-[#264a66]"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded mb-2 text-[#326287] placeholder-[#3262879c] border-1 focus:outline-none
                     focus:ring-1 focus:ring-[#264a66]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <FiLock className="text-green-600" />
                <span>Your payment information is secure and encrypted</span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#D59C8C] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#B3746E] transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FiLock />
                    Complete Order - {finalTotal.toFixed(2)} €
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
