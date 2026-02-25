import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../features/appSlice";
import toast from 'react-hot-toast';

export default function AdminAnalytics() {
  const dispatch = useDispatch();

  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      dispatch(startLoading());
      try {
        const token = localStorage.getItem("userInfo");
        const { data } = await API.get("/admin/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setAnalytics(data.data);
        }
      } catch (error) {
        toast.error("Failed to load analytics");
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchAnalytics();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold mt-2">{analytics.totalUsers}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Products</h2>
          <p className="text-2xl font-bold mt-2">{analytics.totalProducts}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">{analytics.totalOrders}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">
            ₹ {analytics.totalRevenue}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-10 flex gap-4">

        <Link
          to="/admin/orders"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Manage Orders
        </Link>

        <Link
          to="/admin/users"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Manage Users
        </Link>

        <Link
          to="/admin/products"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Manage Products
        </Link>

      </div>
    </div>
  );
}