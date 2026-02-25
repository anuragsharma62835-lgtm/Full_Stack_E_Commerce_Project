import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../features/cartSlice/cartSlice";
import API from "../api/axios";
import toast from 'react-hot-toast';

export default function Checkout() {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.phone ||
      !formData.postalCode ||
      !formData.country
    ) {
      toast.error("Please fill all shipping details");
      return;
    }

    try {
      setLoading(true);

      await API.post("/orders/", {
        orderItems: cart.map((item) => ({
          product: item.product?._id || item.product,
          name: item.product?.name,
          price: item.product?.price,
          qty: item.qty,
        })),
        shippingAddress: formData,
        paymentMethod: "COD",
        totalPrice,
      });

      toast.success("Order placed successfully 🎉");

      dispatch(clearCart());
      navigate("/myorders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8 px-4">
      {/* Shipping */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <p>
              {item.product?.name} x {item.qty}
            </p>
            <p>₹ {item.product?.price * item.qty}</p>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>₹ {totalPrice}</p>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}