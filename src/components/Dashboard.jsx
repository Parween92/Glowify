import { useState, useEffect } from "react";
import {
  BsHeart,
  BsPersonCircle,
  BsBoxSeam,
  BsEnvelope,
  BsCart2,
  BsHeartFill,
} from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BsGift } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState({
    name: "Placeholder User",
    email: "placeholder@example.com",
  });

  const [favorites, setFavorites] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [points, setPoints] = useState(350);
  const pointsNeeded = 500;
  const progressPercentage = (points / pointsNeeded) * 100;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    const onStorageChange = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`"${product.title}" has been added to the cart.`);
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponMessage("Coupon code validated successfully!");
      setCouponCode("");
      setTimeout(() => setCouponMessage(""), 3000);
    }
  };

  const claimOffer = () => {
    alert("Offer claimed! Check your email for the coupon code.");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("authStatusChanged"));
    window.location.href = "/";
  };

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: <BsPersonCircle /> },
    { id: "orders", label: "Orders", icon: <BsBoxSeam /> },
    { id: "favorites", label: "Favorites", icon: <BsHeart /> },
    { id: "newsletter", label: "Newsletter", icon: <BsEnvelope /> },
    { id: "settings", label: "Settings", icon: <IoSettingsOutline /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#326287] mb-6">
              Welcome back, {user?.name || "Gast"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-[#326287] mb-4">
                  Redeem Coupon Code
                </h3>
                <form onSubmit={handleCouponSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full px-3 py-2 rounded mb-6 text-[#326287] placeholder-[#3262879c] border-1 
                    focus:outline-none focus:ring-1 focus:ring-[#264a66]"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-2 bg-[#e8b09e] hover:bg-[#D59C8C] text-white rounded-lg transition-colors font-semibold"
                  >
                    Redeem
                  </button>
                </form>
                {couponMessage && (
                  <div className="mt-3 p-3 bg-gray-200 border border-gray-200 text-[#326287] rounded-lg">
                    {couponMessage}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-[#326287] mb-4">
                  Special Offers for You
                </h3>
                <div className="relative bg-gradient-to-r from-[#e8b09e] to-[#D59C8C] rounded-lg p-4 text-white">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                    <div className="border-t-2 border-dotted border-gray-200"></div>
                  </div>
                  <div className="flex flex-col gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <BsGift className="text-2xl" />
                      <div>
                        <h4 className="text-lg font-bold">€10 Gift Voucher</h4>
                        <p className="text-xs opacity-90">
                          Valid until 31.09.2025
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={claimOffer}
                      className="bg-white text-[#e8b09e] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                    >
                      Claim
                    </button>
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-gray-50 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#326287] mb-4">
                Loyalty Points
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#326287] font-medium">
                    Current Points
                  </span>
                  <span className="text-[#e8b09e] font-bold text-lg">
                    {points} points
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-[#e8b09e] to-[#D59C8C] h-4 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-[#326287] mt-2">
                    <span>0</span>
                    <span>{pointsNeeded}</span>
                  </div>
                </div>
                <p className="text-[#326287] text-sm">
                  Collect{" "}
                  <span className="font-semibold text-[#e8b09e]">
                    {pointsNeeded - points} more points
                  </span>{" "}
                  to earn a<span className="font-semibold"> €10 voucher</span>{" "}
                  for your next order!
                </p>
                <div className="bg-[#e8b09e]/10 rounded-lg p-4">
                  <h4 className="font-semibold text-[#326287] mb-2">
                    How to earn points:
                  </h4>
                  <ul className="text-sm text-[#326287] space-y-1">
                    <li>• 1 point for every €1 spent</li>
                    <li>• 50 bonus points for product reviews</li>
                    <li>• 100 bonus points for referrals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#326287] mb-6">
              Your Orders
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              {orders.length === 0 ? (
                <p className="text-[#326287]/70">No orders found.</p>
              ) : (
                <ul className="space-y-6">
                  {orders.map((order, idx) => (
                    <li
                      key={order.orderId || idx}
                      className="border-b border-gray-200 pb-4"
                    >
                      <div className="font-bold text-[#326287]">
                        Order ID: {order.orderId}
                      </div>
                      <div className="text-sm text-[#326287] mb-2">
                        Date: {new Date(order.date).toLocaleString()}
                      </div>
                      <div className="mb-2 text-[#326287] ">
                        Total: {order.total.toFixed(2)} €
                      </div>
                      <div className="text-[#326287] ">
                        Items:
                        <ul className="text-[#326287] list-disc ml-6">
                          {order.items.map((item) => (
                            <li key={item.id}>
                              {item.title} (x{item.quantity || 1}) -{" "}
                              {(
                                parseFloat(item.price) * (item.quantity || 1)
                              ).toFixed(2)}{" "}
                              €
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      case "favorites":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#326287] mb-6">
              Your Favorites
            </h2>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-[#326287]/70">
                  No favorites yet. Add some products to your favorites!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className="relative overflow-hidden rounded-t-xl"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <BsHeartFill className="text-[#D59C8C]" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[#326287] font-semibold text-lg mb-2 truncate">
                        {product.title}
                      </h3>
                      <p className="text-[#326287]/80 text-sm mb-3">
                        {product.description?.length > 60
                          ? product.description.slice(0, 57) + "..."
                          : product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[#326287] font-semibold text-xl">
                          {product.price} €
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full flex items-center justify-center gap-2 bg-[#e8b09e] hover:bg-[#D59C8C] transition-colors
                         rounded-xl px-4 py-2 text-white font-semibold shadow-md"
                      >
                        <BsCart2 />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "newsletter":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#326287] mb-6">
              Newsletter Settings
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#326287] mb-4">
                Subscription Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-[#326287]">Weekly promotions</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-[#326287]">
                    New product announcements
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-[#326287]">
                    Beauty tips and tutorials
                  </span>
                </label>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#326287] mb-6">
              Account Settings
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#326287] mb-4">
                Privacy & Security
              </h3>
              <div className="space-y-4">
                <button className="w-full text-[#326287] text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  Change Password
                </button>
                <button className="w-full text-[#326287] text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  Privacy Settings
                </button>
                <button className="w-full text-[#326287] text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-30 flex gap-6 px-6 md:px-12 pb-10">
      <aside
        className="hidden md:flex flex-col sticky top-24 h-[calc(100vh-6rem)] w-64 bg-white rounded-lg shadow-md p-6"
        style={{
          background:
            "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-white">
          Dashboard
        </h3>
        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-[#e8b09e]/60 text-white"
                  : "text-white hover:bg-[#e8b09e]/20"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white hover:bg-[#e8b09e]/20"
          >
            <BiLogOut />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
};
export default Dashboard;
