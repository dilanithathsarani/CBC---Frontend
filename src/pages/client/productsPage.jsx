import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";
import { AiOutlineClose } from "react-icons/ai";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/")
        .then((res) => {
          setProductList(res.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  function searchProducts() {
    if (search.trim().length > 0) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search
        )
        .then((res) => {
          setProductList(res.data.products);
        });
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FDEFF4] py-10 px-4">
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
          onClick={() => setProductsLoaded(false)}
          className="bg-white text-[#524A4E] font-medium px-5 py-2 rounded-lg border border-[#FF5C8D] hover:bg-[#FF5C8D] hover:text-white transition shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          Reset
        </button>
      </div>

      {productsLoaded ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {productList.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              className="shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}