import { BsCart2 } from "react-icons/bs";

const AddToCart = ({ product }) => {
  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

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
