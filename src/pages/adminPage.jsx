import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import AdminProductsPage from "./admin/products.jsx";
import AddProductForm from "./admin/addProductForm.jsx";
import EditProductForm from "./admin/editProduct.jsx";
import AdminOrdersPage from "./admin/adminOrders.jsx";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-300 flex p-2">
            <div className="h-full w-[300px]">
                <Link to="/admin/users" className="block p-4 text-gray-800 hover:bg-gray-200 flex items-center"><FaUsers className="mr-2"/>Users</Link>
                <Link to="/admin/products" className="block p-4 text-gray-800 hover:bg-gray-200 flex items-center"><FaWarehouse className="mr-2"/>Products</Link>
                <Link to="/admin/orders" className="block p-4 text-gray-800 hover:bg-gray-200 flex items-center"><FaShoppingCart className="mr-2"/>Orders</Link>
            </div>
            <div className="h-full w-[calc(100vw-300px)] bg-white rounded-lg">
                <Routes path="/*">
                    <Route path="/users" element={<h1 className="text-3xl font-bold p-4">Admin Dashboard</h1>} />
                    <Route path="/products" element={<AdminProductsPage/>} />
                    <Route path="/orders" element={<AdminOrdersPage/>} />
                    <Route path="/addProduct" element={<AddProductForm/>} />
                    <Route path="/editProduct" element={<EditProductForm/>} />
                </Routes>
            </div>
        </div>
    )
}