import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        toast.error("Unauthorized! Please login again");
        navigate("/login");
      }
    };
    fetchOrders();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-5 mb-4"
          >
            <p>
              <strong>Order:</strong> {index + 1}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-2 mb-3">
              <strong>Items:</strong>
              {order.orderItems.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.qty} — ₹ {item.price * item.qty}
                </li>
              ))}
            </div>

            <p>
              <strong>Total:</strong> ₹ {order.totalPrice}
            </p>
            <p><strong>Phone Number: </strong>{order.shippingAddress.phone}</p>
            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
