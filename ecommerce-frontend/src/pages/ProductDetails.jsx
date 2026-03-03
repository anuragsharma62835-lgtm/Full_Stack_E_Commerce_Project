import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axios";
import { addToCart } from "../features/cartSlice/cartSlice";
import toast from 'react-hot-toast';
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    const user = useSelector((state) => state.app.user);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);

        const res = await API.get(`/products?limit=20`);

        const shuffleArray = (array) => {
          return [...array].sort(() => Math.random() - 0.5);
        };

        const filtered = shuffleArray(
          res.data.data.filter((p) => p._id !== data._id),
        ).slice(0, 4);

        setSimilarProducts(filtered);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const cartItems = useSelector((state) => state.cart.items || []);
  const isInCart = cartItems.some(
    (item) =>
      String(item?.product?._id || item?.product) === String(product?._id),
  );

   const handleAddToCart = async () => {
  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  try {
    await dispatch(addToCart(product)).unwrap();
    toast.success("Added to cart");
  } catch (error) {
    toast.error("Failed to add to cart");
  }
};

  const handleBuyNow = () => navigate(`/buy/${product._id}`);
  const handleGoToCart = () => navigate("/cart");

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Main Product */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-green-600 text-2xl font-semibold">
            ₹ {product.price}
          </p>

          <p className="text-gray-700">{product.description}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Buy Now
            </button>

            {isInCart ? (
              <button
                onClick={handleGoToCart}
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
