import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Velora</h2>
          <p className="text-sm leading-6">
            We provide high quality products with secure payments, fast delivery,
            and excellent customer service.
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Electronics</li>
            <li className="hover:text-white cursor-pointer">Fashion</li>
            <li className="hover:text-white cursor-pointer">Home & Kitchen</li>
            <li className="hover:text-white cursor-pointer">Furniture</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l bg-gray-700 border border-gray-600 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 rounded-r hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Velora. All rights reserved.
      </div>
    </footer>
  );
}