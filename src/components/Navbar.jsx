import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { GoPerson } from "react-icons/go";

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
        scrolled ? "bg-[#e8b09e] shadow-md navbar-scrolled" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <div className="select-none cursor-pointer">
          <img
            src={
              scrolled
                ? "/src/assets/Glowify-Logo.png"
                : "/src/assets/Glowify-blau-Logo.png"
            }
            className="h-12 transition-all duration-500"
            alt="Glowify Logo"
          />
        </div>

        <ul className="flex space-x-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              PRODUCTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              <div className="flex items-center gap-2">
                <GoPerson className="text-xl"/>
                LOGIN
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "font-bold" : ""
                } ${scrolled ? "text-white" : "text-[#326287]"}`
              }
            >
              <div className="flex items-center gap-2">
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
