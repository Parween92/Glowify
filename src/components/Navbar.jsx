import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#e8b09e] shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <div
          className={`font-extrabold text-xl tracking-wide select-none cursor-pointer transition-colors duration-500 ${
            scrolled ? "text-white" : "text-[#326287]"
          }`}
        >
          <img src="/src/assets/Glowify-Logo.png" className="h-12" />
        </div>

        <ul
          className={`flex space-x-8 font-semibold transition-colors duration-500 ${
            scrolled ? "text-white" : "text-[#326287]"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `border-b-4 pb-1 ${
                      scrolled ? "border-white" : "border-[#e8b09e]"
                    }`
                  : `hover:border-b-4 pb-1 transition ${
                      scrolled ? "hover:border-white" : "hover:border-[#326287]"
                    }`
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
                  ? `border-b-4 pb-1 ${
                      scrolled ? "border-white" : "border-[#e8b09e]"
                    }`
                  : `hover:border-b-4 pb-1 transition ${
                      scrolled ? "hover:border-white" : "hover:border-[#326287]"
                    }`
              }
            >
              <div className="flex gap-2 justify-center items-baseline">
                PRODUCTS
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `border-b-4 pb-1 ${
                      scrolled ? "border-white" : "border-[#e8b09e]"
                    }`
                  : `hover:border-b-4 pb-1 transition ${
                      scrolled ? "hover:border-white" : "hover:border-[#326287]"
                    }`
              }
            >
              <div className="flex gap-2 justify-center items-baseline">
                <BsCart2 />
                CART
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
