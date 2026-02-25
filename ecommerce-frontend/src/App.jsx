import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/appSlice";

import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";

import BuyNow from "./pages/BuyNow";
import MyOrders from "./pages/MyOrders";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

import AdminAnalytics from "./pages/AdminAnalytics";
import AdminLogin from "./pages/AdminLogin";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import { loadUserCart } from "./features/cartSlice/cartSlice";

import { Toaster } from "react-hot-toast";
import NotFound from "./pages/Notfound";
import GoogleLogin from "./pages/GoogleLogin";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  // ✅ Restore user from localStorage on refresh
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      dispatch(login(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  // ✅ Load cart only for normal users
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(loadUserCart());
    }
  }, [user, dispatch]);

  return (
    <Router>
      <Toaster position="top-center" />

      <Loading />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/google-success" element={<GoogleLogin />} />

        {/* User Protected */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buy/:id"
          element={
            <ProtectedRoute>
              <BuyNow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
