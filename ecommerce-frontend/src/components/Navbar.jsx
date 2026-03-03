import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/appSlice";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const user = useSelector((state) => state.app.user);
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Admin logged out");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        Velora
      </Link>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy-Policy</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Cart */}
        {user && (
          <Link
            to="/cart"
            className="relative px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                {cartItems.length}
              </span>
            )}
          </Link>
        )}

        {/* Account Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg hover:bg-white/20 transition border border-white/20"
          >
            {adminToken ? "Admin" : user ? user?.name : "Account"}
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden border">
              {adminToken ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Admin Dashboard
                  </Link>

                  <button
                    onClick={handleAdminLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/myorders"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleUserLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
