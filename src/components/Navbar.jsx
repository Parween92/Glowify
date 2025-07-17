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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[linear-gradient(to_right,_#e8b09e,_#95c7ef)] shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div
          className={`font-extrabold text-xl tracking-wide select-none cursor-pointer transition-colors duration-500 ${
            scrolled ? "text-white" : "text-slate-700"
          }`}
        >
          MyShop
        </div>

        <ul
          className={`flex space-x-8 font-semibold transition-colors duration-500 ${
            scrolled ? "text-white" : "text-slate-700"
          }`}
        >
          {["/", "/products", "/cart"].map((path, i) => {
            const label = ["HOME", "PRODUCTS", "CART"][i];
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? `${
                          scrolled
                            ? "border-b-4 border-white pb-1"
                            : "border-b-4 border-[#e8b09e] pb-1"
                        }`
                      : `hover:border-b-4 ${
                          scrolled
                            ? "hover:border-white"
                            : "hover:border-[#95c7ef]"
                        } pb-1 transition`
                  }
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
