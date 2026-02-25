import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await API.get("/products/ok");
    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted", { id: "toast" });
      fetchProducts();
    } catch (error) {
      toast.error(error?.message || "Error deleting product", {
        id: "toast",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm uppercase text-gray-600">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Category</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </td>

                  <td className="p-4">₹ {product.price}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.countInStock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.countInStock}
                    </span>
                  </td>

                  <td className="p-4">{product.category}</td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
