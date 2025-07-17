const AddToCart = ({ product }) => {
  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to your cart!");
  };

  return (
    <button
      onClick={handleCart}
      className="mt-3 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
