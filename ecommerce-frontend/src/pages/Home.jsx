import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../features/appSlice";
import toast from "react-hot-toast";
import { loadUserCart } from "../features/cartSlice/cartSlice";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const user = useSelector((state) => state.app.user);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    dispatch(startLoading());

    try {
      const { data } = await API.get(
        `/products?page=${page}&limit=20&keyword=${keyword}&sort=${sort}`,
      );
      setProducts(data.data);
      setPages(data.pages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(stopLoading());
    }
  }, [page, sort, keyword, dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [page, sort, keyword]);

  useEffect(() => {
    if (user) {
      dispatch(loadUserCart());
    }
  }, [user, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <>
      {/* Search + Sort */}
      <div className="p-6 bg-white shadow rounded-lg mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Sort By Price
            </option>
            <option value="price_asc">Low to High</option>
            <option value="price_desc">High to Low</option>
          </select>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <h2 className="text-lg font-semibold">Loading products...</h2>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <h2 className="text-lg font-semibold text-gray-500">
              No Products Found
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        <span>
          Page {page} / {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}
