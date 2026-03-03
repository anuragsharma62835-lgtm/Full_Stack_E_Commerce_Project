import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice/cartSlice";
import toast from 'react-hot-toast';

const CartButton = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  const handleAdd = async () => {
  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  try {
    await dispatch(addToCart(product)).unwrap();
    toast.success("Item added to cart");
  } catch (error) {
    toast.error("Failed to add to cart");
  }
};

  const handleRemove = () => {
    dispatch(removeFromCart(product._id));
    toast.info("Item removed from cart");
  };

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={handleAdd}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        Add to Cart
      </button>

      <button
        onClick={handleRemove}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        Remove
      </button>

      <p className="text-sm font-semibold">Cart Items: {cartItems.length}</p>
    </div>
  );
};

export default CartButton;