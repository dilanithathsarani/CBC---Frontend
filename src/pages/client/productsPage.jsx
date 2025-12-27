import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "";

  // Load products based on category and search
  const fetchProducts = async (searchText = "", filterCategory = "") => {
    setLoading(true);
    try {
      let url = import.meta.env.VITE_BACKEND_URL + "/api/product";
      if (searchText.trim()) {
        url = import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + encodeURIComponent(searchText);
      } else if (filterCategory) {
        url += "?category=" + encodeURIComponent(filterCategory);
      }

      const res = await axios.get(url);
      setProductList(res.data.products || res.data);
    } catch (err) {
      console.error(err);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever category changes
  useEffect(() => {
    fetchProducts(search, category);
  }, [category]);

  // Debounced search effect
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(search, category);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category]);

  // Reset search & category
  const resetFilters = () => {
    setSearch("");
    navigate("/products", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#FDEFF4]">
      {/* Search Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 mt-8 px-4">
        <div className="relative w-full sm:w-[320px]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[42px] bg-white border border-[#FF5C8D] rounded-lg px-4 pr-10 text-[#524A4E] shadow-[0_4px_12px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#FF5C8D]"
          />
          {search && (
            <AiOutlineClose
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF5C8D] cursor-pointer hover:text-[#524A4E]"
              size={18}
            />
          )}
        </div>

        <button
          onClick={() => fetchProducts(search, category)}
          className="bg-[#FF5C8D] text-white font-medium px-5 py-2 rounded-lg hover:opacity-90 transition shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          Search
        </button>

        <button
          onClick={resetFilters}
          className="bg-white text-[#524A4E] font-medium px-5 py-2 rounded-lg border border-[#FF5C8D] hover:bg-[#FF5C8D] hover:text-white transition shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          Reset
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {["Skincare", "Makeup", "Haircare", "Accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              navigate(`/products?category=${encodeURIComponent(cat)}`);
            }}
            className={`px-4 py-2 rounded-full transition ${
              cat === category
                ? "bg-[#FF5C8D] text-white"
                : "bg-white text-[#FF5C8D] border border-[#FF5C8D] hover:bg-[#FFC0D3]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 place-items-center p-6">
          {productList.length ? (
            productList.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                className="shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              />
            ))
          ) : (
            <p className="text-[#524A4E] text-xl col-span-full text-center">
              No products found.
            </p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
