import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get("/orders/admin");
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Products</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Customer */}
                      <td className="p-4">
                        <p className="font-semibold text-gray-800">
                          {order.user?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.user?.email}
                        </p>
                      </td>

                      <td className="p-4">
                        {order.orderItems?.map((item) => (
                          <div key={item._id} className="mb-2">
                            <p className="font-medium">
                              {item.name} x {item.qty}
                            </p>
                            <p className="text-sm text-gray-500">
                              ₹ {item.price}
                            </p>
                          </div>
                        ))}
                      </td>

                      <td className="p-4 text-sm text-gray-600">
                        <p>{order.shippingAddress?.name}</p>
                        <p>{order.shippingAddress?.phone}</p>
                        <p>{order.shippingAddress?.address}</p>
                        <p>
                          {order.shippingAddress?.city},{" "}
                          {order.shippingAddress?.postalCode}
                        </p>
                        <p>{order.shippingAddress?.country}</p>
                      </td>

                      <td className="p-4 font-medium">₹ {order.totalPrice}</td>

                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
