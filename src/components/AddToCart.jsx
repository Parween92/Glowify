import { BsCart2 } from "react-icons/bs";
const AddToCart = ({ product }) => {
  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} has been added to your shopping cart!`);
  };

  return (
    <button
      onClick={handleCart}
      className="mt-3 flex gap-2 items-baseline px-4 py-2 bg-[#e8b09e] text-white rounded-xl hover:bg-[#D59C8C] transition"
    >
      <BsCart2 />
      Add to Cart
    </button>
  );
};

export default AddToCart;
