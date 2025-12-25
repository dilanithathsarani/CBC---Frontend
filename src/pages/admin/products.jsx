import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to delete a product");
      return;
    }
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoaded(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
      return;
    }
  }

  const filteredProducts = products.filter((product) =>
    (product.productId + " " + product.name + " " + product.category)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className="w-full h-full rounded-lg relative p-6"
      style={{ backgroundColor: "#FDEFF4" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-[#524A4E]">
        🛒 Manage Products
      </h1>
      <Link
        to={"/admin/addProduct"}
        className="text-gray-800 p-[12px] text-3xl rounded-full cursor-pointer absolute right-5 bottom-5 shadow-lg hover:opacity-90"
        style={{ backgroundColor: "#FFC0D3" }}
      >
        <FaPlus />
      </Link>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-[#FFC0D3] px-4 py-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-[#FF5C8D]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-[#524A4E] font-medium">
          Total: {filteredProducts.length}
        </span>
      </div>

      {loaded && (
        // Scrollable container
        <div className="rounded-lg bg-white shadow-lg border border-[#FFC0D3] pb-4">
          <div className="max-h-[65vh] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead
              className="sticky top-0 z-10"
              style={{ backgroundColor: "#FFC0D3" }}
            >
              <tr
                className="text-gray-800"
                style={{ backgroundColor: "#FFC0D3" }}
              >
                <th className="p-3">Product ID</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Labeled Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center border-b cursor-pointer"
                    style={{ borderColor: "#FFC0D3" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FFF7FA")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td className="p-3">{product.productId}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3">{product.labeledPrice}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">
                      <div className="w-full h-full flex justify-center">
                        <FaRegTrashAlt
                          onClick={() => {
                            deleteProduct(product.productId);
                          }}
                          className="text-[22px] m-[10px] cursor-pointer"
                          style={{ color: "#C0392B" }}
                        />

                        <MdOutlineModeEdit
                          onClick={() => {
                            navigate("/admin/editProduct", {
                              state: product,
                            });
                          }}
                          className="text-[22px] m-[10px] cursor-pointer"
                          style={{ color: "#6D214F" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {!loaded && <Loader />}
    </div>
  );
}
