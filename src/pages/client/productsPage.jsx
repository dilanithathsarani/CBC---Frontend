import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  function loadProducts(cat = null) {
    setProductsLoaded(false);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/", {
        params: cat ? { category: cat } : {},
      })
      .then((res) => {
        setProductList(res.data);
        setProductsLoaded(true);
      })
      .catch(() => {
        setProductsLoaded(true);
      });
  }

  useEffect(() => {
    loadProducts(category);
    setSelectedCategory(category || "");
  }, [category]);

  function searchProducts() {
    if (search.trim().length == 0) return;
    setProductsLoaded(false);
    {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
        .then((res) => {
          setProductList(res.data.products);
          setProductsLoaded(true);
        });
    }
  }

  function filterByCategory(category) {
    setSelectedCategory(category);
    if (!category) {
      setProductsLoaded(false);
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((res) => {
          setProductList(res.data.filter((p) => p.category === category));
        });
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#FDEFF4] ">
      <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCategory === cat
                ? "bg-[#FF5C8D] text-white"
                : "bg-white text-[#524A4E] border border-[#FF5C8D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Search Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
          onClick={searchProducts}
          className="bg-[#FF5C8D] text-white font-medium px-5 py-2 rounded-lg hover:opacity-90 transition shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          Search
        </button>

        <button
          onClick={() => {
            setSearch("");
            setSelectedCategory("");
            navigate("/products", { replace: true });
            loadProducts();
          }}
          className="bg-white text-[#524A4E] font-medium px-5 py-2 rounded-lg border border-[#FF5C8D] hover:bg-[#FF5C8D] hover:text-white transition shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          Reset
        </button>
      </div>

      {category && (
        <div className="w-full max-w-4xl mx-auto mb-6 flex justify-start">
          <button
            onClick={() => {
              navigate("/products");
              loadProducts();
            }}
            className="bg-white text-[#FF5C8D] border border-[#FF5C8D] px-4 py-2 rounded-lg hover:bg-[#FF5C8D] hover:text-white transition"
          >
            All
          </button>
        </div>
      )}

      {productsLoaded ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center p-6">
          {productList.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              className="shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
          ))}
          {productList.length === 0 && (
            <p className="text-[#524A4E] text-xl col-span-full text-center">
              No products found in this category.
            </p>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <Footer/>
    </div>
  );
}
