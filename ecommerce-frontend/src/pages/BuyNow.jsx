import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import toast from 'react-hot-toast';

export default function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrder = async () => {
    if (!address.name || !address.phone || !address.address) {
      toast.error("Please fill all required fields", { id: "toast" });
      return;
    }

    try {
      const payload = {
        orderItems: [
          {
            name: product.name,
            qty: Number(quantity),
            image: product.image,
            price: product.price,
            product: product._id,
          },
        ],
        shippingAddress: address,
        paymentMethod: "Cash On Delivery",
        totalPrice: product.price * quantity,
      };
      const { data } = await API.post("/orders/", payload);

      toast.success("Order placed successfully");
      navigate("/myorders");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        id: "toast",
      });
    }
  };

  const totalPrice = product?.price * quantity || 0;

  return (
    <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8 px-4">
      {/* Shipping */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          value={address.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="phone"
          value={address.phone}
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="address"
          value={address.address}
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="city"
          value={address.city}
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="postalCode"
          value={address.postalCode}
          placeholder="Postal Code"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="country"
          value={address.country}
          placeholder="Country"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="mt-4">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border ml-2 px-2 py-1 w-20 rounded"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <p>
            {product?.name} x {quantity}
          </p>
          <p>₹ {totalPrice}</p>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>₹ {totalPrice}</p>
        </div>

        <button
          onClick={handleOrder}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
