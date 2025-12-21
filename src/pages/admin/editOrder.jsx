import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EditOrderForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  if (!locationData.state) {
    toast.error("Please select an order to edit");
    navigate("/admin/orders");
  }

  const order = locationData.state;
  const [status, setStatus] = useState(order.status);
  const [name, setName] = useState(order.name);
  const [email, setEmail] = useState(order.email);
  const [address, setAddress] = useState(order.address);
  const [phoneNumber, setPhoneNumber] = useState(order.phoneNumber);
  const [billItems, setBillItems] = useState(order.billItems);
  const [total, setTotal] = useState(order.total);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/product",
          { headers: { Authorization: "Bearer " + token } }
        );
        setAllProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const recalcTotal = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const handleQuantityChange = (index, quantity) => {
    const newBillItems = [...billItems];
    newBillItems[index].quantity = Number(quantity);
    setBillItems(newBillItems);
    recalcTotal(newBillItems);
  };

  const handleRemoveProduct = (index) => {
    const newBillItems = [...billItems];
    newBillItems.splice(index, 1);
    setBillItems(newBillItems);
    recalcTotal(newBillItems);
  };

  const handleAddProduct = () => {
    if (!selectedProductId) return toast.error("Select a product to add");
    const product = allProducts.find((p) => p.productId === selectedProductId);
    if (!product) return toast.error("Product not found");

    const exists = billItems.find((item) => item.productId === product.productId);
    if (exists) return toast.error("Product already in order");

    const newBillItems = [
      ...billItems,
      {
        productId: product.productId,
        productName: product.name,
        quantity: 1,
        price: product.price,
        image: product.images[0] || "",
      },
    ];
    setBillItems(newBillItems);
    recalcTotal(newBillItems);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + order.orderId,
        { status, name, email, address, phoneNumber, billItems },
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Order updated successfully");
      navigate("/admin/orders");
    } catch (err) {
      console.error(err);
      toast.error("Order update failed");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/order/" + order.orderId, {
        headers: { Authorization: "Bearer " + token },
      });
      toast.success("Order deleted successfully");
      navigate("/admin/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  return (
    <div className="w-full h-full rounded-lg flex justify-center items-start overflow-auto p-4" style={{ backgroundColor: "#FDEFF4" }}>
      <div className="w-[520px] h-auto rounded-2xl shadow-xl flex flex-col items-center transition-all duration-300 p-6" style={{ backgroundColor: "#FFFFFF" }}>
        <h1 className="text-3xl font-bold m-[15px] tracking-wide mt-4" style={{ color: "#C85A87" }}>
          Edit Order
        </h1>

        {/* Basic Info */}
        {[{ value: order.orderId, disabled: true, placeholder: "Order ID" },
          { value: name, placeholder: "Customer Name", onChange: (e) => setName(e.target.value) },
          { value: email, placeholder: "Customer Email", onChange: (e) => setEmail(e.target.value) },
          { value: address, placeholder: "Address", onChange: (e) => setAddress(e.target.value) },
          { value: phoneNumber, placeholder: "Phone Number", onChange: (e) => setPhoneNumber(e.target.value) }]
          .map((field, i) => (
            <input
              key={i}
              {...field}
              className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
              style={{ borderColor: "#FFC0D3" }}
            />
          ))}

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border bg-white transition-all duration-200 focus:outline-none focus:shadow-md"
          style={{ borderColor: "#FFC0D3" }}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Bill Items */}
        <div className="w-[400px] mt-4">
          {billItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2 border-b pb-2">
              <span className="text-sm font-semibold">{item.productName}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-[60px] h-[30px] text-center rounded-md border"
              />
              <span className="text-sm">Price: {item.price}</span>
              <button onClick={() => handleRemoveProduct(index)} className="text-red-500 font-bold ml-2">X</button>
            </div>
          ))}
        </div>

        {/* Add Product */}
        <div className="w-[400px] mt-2 flex justify-between items-center">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="w-[250px] h-[40px] rounded-xl border px-2"
          >
            <option value="">Select Product</option>
            {allProducts.map((p) => (
              <option key={p.productId} value={p.productId}>{p.name}</option>
            ))}
          </select>
          <button onClick={handleAddProduct} className="bg-[#FFC0D3] px-4 py-2 rounded-xl">Add</button>
        </div>

        {/* Total */}
        <div className="w-[400px] mt-2 text-right font-semibold text-lg">
          Total: {total.toFixed(2)}
        </div>

        {/* Buttons */}
        <div className="w-[400px] h-[100px] flex justify-between items-center mt-6 gap-4">
          <Link
            to={"/admin/orders"}
            className="p-[12px] w-[180px] text-center rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
            style={{ backgroundColor: "#FDEFF4", color: "#C85A87" }}
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="p-[12px] w-[180px] text-center rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
            style={{ backgroundColor: "#FFC0D3", color: "#7A1F3D" }}
          >
            Edit Order
          </button>
          <button
            onClick={handleDeleteOrder}
            className="p-[12px] w-[180px] text-center rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
            style={{ backgroundColor: "#FF5C5C", color: "#FFFFFF" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
