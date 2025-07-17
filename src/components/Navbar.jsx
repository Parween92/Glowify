import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-pink-600 shadow-lg" : "bg-white"
      } rounded`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div
          className={`font-extrabold text-xl tracking-wide select-none cursor-pointer transition-colors duration-500 ${
            scrolled ? "text-white" : "text-pink-600"
          }`}
        >
          MyShop
        </div>

        <ul
          className={`flex space-x-8 font-semibold transition-colors duration-500 ${
            scrolled ? "text-white" : "text-pink-600"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${
                      scrolled
                        ? "border-b-4 border-white pb-1"
                        : "border-b-4 border-pink-600 pb-1"
                    }`
                  : `hover:border-b-4 ${
                      scrolled
                        ? "hover:border-pink-300"
                        : "hover:border-pink-600"
                    } pb-1 transition`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? `${
                      scrolled
                        ? "border-b-4 border-white pb-1"
                        : "border-b-4 border-pink-600 pb-1"
                    }`
                  : `hover:border-b-4 ${
                      scrolled
                        ? "hover:border-pink-300"
                        : "hover:border-pink-600"
                    } pb-1 transition`
              }
            >
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${
                      scrolled
                        ? "border-b-4 border-white pb-1 flex items-center"
                        : "border-b-4 border-pink-600 pb-1 flex items-center"
                    }`
                  : `hover:border-b-4 ${
                      scrolled
                        ? "hover:border-pink-300"
                        : "hover:border-pink-600"
                    } pb-1 transition flex items-center`
              }
            >
              CART
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
