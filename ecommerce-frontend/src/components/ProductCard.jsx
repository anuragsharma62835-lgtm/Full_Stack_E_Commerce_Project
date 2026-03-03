import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice/cartSlice";
import toast from "react-hot-toast";
import React from "react";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.app.user);

  const isInCart = cartItems.some(
    (item) => String(item.product?._id || item.product) === String(product._id),
  );

    const handleAddToCart = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  try {
    await dispatch(addToCart(product)).unwrap();
    toast.success("Added to cart");
  } catch (error) {
    toast.error("Failed to add to cart");
  }
};

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/buy/${product._id}`);
  };

  const handleGoToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/cart");
  };

  return (
    <div className="border rounded-xl shadow hover:shadow-lg transition p-3 bg-white">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${product.image}?w=250&auto=format&fit=crop&q=50`}
          alt={product.name}
          className="h-48 w-full object-cover rounded-lg"
          loading="lazy"
        />

        <h2 className="font-bold mt-3">{product.name}</h2>

        <p className="text-green-600 font-semibold">₹{product.price}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Buy Now
          </button>

          {isInCart ? (
            <button
              onClick={handleGoToCart}
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}
export default React.memo(ProductCard);
