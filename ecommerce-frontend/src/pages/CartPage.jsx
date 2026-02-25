import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  loadUserCart,
} from "../features/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUserCart());
  }, []);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="bg-gray-100 p-10 rounded-2xl shadow-md w-[90%] max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything yet. Start shopping and fill
            your cart!
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.product?._id || item._id}
          className="flex justify-between items-center border p-4 mb-2 rounded"
        >
          <img src={item.product?.image} alt="image" height="60" width="50" />

          <p>
            {item.product?.name} X qty: {item.qty}
          </p>

          <button
            onClick={() => dispatch(removeFromCart(item.product._id))}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          Clear Cart
        </button>

        <button
          onClick={() => navigate("/checkout")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
