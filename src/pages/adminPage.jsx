import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrdersPage from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
import EditOrderForm from "./admin/editOrder";
import AdminUsersPage from "./admin/users";
import AddAdminPage from "./admin/addAdmin";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.user.role == "admin") {
            setUserValidated(true);
          } else {
            toast.error("You are not an admin");
            navigate("/login");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something went wrong please login again");
          navigate("/login");
        });
    }
  }, []);
  return (
    <div
      className="w-full h-screen flex p-2"
      style={{ background: "linear-gradient(135deg, #FDEFF4, #FFC0D3)" }} // page background
    >
      {userValidated ? (
        <>
          {/* Sidebar */}
          <div
            className="h-full w-[300px] flex flex-col p-4 rounded-lg"
            style={{
              background: "linear-gradient(180deg, #524A4E, #FF5C8D)",
            }}
          >
            <Link
              to="/admin/users"
              className="p-3 flex items-center rounded-md mb-2 transition-all hover:bg-[#FF5C8D]/80 hover:scale-105 text-white font-semibold shadow-sm"
            >
              <FaUsers className="mr-3" /> Users
            </Link>
            <Link
              to="/admin/products"
              className="p-3 flex items-center rounded-md mb-2 transition-all hover:bg-[#FF5C8D]/80 hover:scale-105 text-white font-semibold shadow-sm"
            >
              <MdWarehouse className="mr-3" /> Products
            </Link>
            <Link
              to="/admin/orders"
              className="p-3 flex items-center rounded-md transition-all hover:bg-[#FF5C8D]/80 hover:scale-105 text-white font-semibold shadow-sm"
            >
              <FaFileInvoice className="mr-3" /> Orders
            </Link>
          </div>

          {/* Main Content */}
          <div
            className="h-full w-[calc(100vw-300px)] rounded-lg overflow-hidden ml-4 p-4"
            style={{
              background: "linear-gradient(180deg, #FFC0D3, #FF5C8D/60)",
            }}
          >
            <Routes path="/*">
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/addProduct" element={<AddProductForm />} />
              <Route path="/editProduct" element={<EditProductForm />} />
              <Route path="/editOrder" element={<EditOrderForm />} />
              <Route path="/addAdmin" element={<AddAdminPage />} /> 
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
