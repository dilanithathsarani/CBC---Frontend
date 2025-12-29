import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader.jsx";
import toast from "react-hot-toast";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
          console.log("Orders loaded:", response.data);
        })
        .catch(() => toast.error("Failed to load orders"));
    }
  }, [loaded]);

  function changeOrderStatus(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
        { status: status },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success("Order status changed successfully");
        setLoaded(false);
      });
  }
  const filteredOrders = orders
    .filter((order) =>
      (order.orderId + " " + order.name + " " + order.email)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div
      className="w-full h-full rounded-lg relative p-6"
      style={{ backgroundColor: "#FDEFF4" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-[#524A4E]">
        📦 Manage Orders
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search orders..."
          className="border border-[#FFC0D3] px-4 py-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-[#FF5C8D]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-[#524A4E] font-medium">
          Total: {filteredOrders.length}
        </span>
      </div>
      {loaded ? (
        <div>
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
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer Email</th>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Phone Number</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="text-center cursor-pointer border-b"
                      style={{ borderColor: "#FFC0D3" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#FFF7FA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <td className="p-3">{order.orderId}</td>
                      <td className="p-3">{order.email}</td>
                      <td className="p-3">{order.name}</td>
                      <td className="p-3">{order.address}</td>
                      <td className="p-3">{order.phoneNumber}</td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          className="z-[50]"
                          onChange={(e) =>
                            changeOrderStatus(order.orderId, e.target.value)
                          }
                        >
                          <option value={"Pending"}>Pending</option>
                          <option value={"Delivered"}>Delivered</option>
                          <option value={"Cancelled"}>Cancelled</option>
                          <option value={"Processing"}>Processing</option>
                        </select>
                      </td>
                      <td className="p-3">{order.total.toFixed(2)}</td>
                      <td className="p-3">
                        {new Date(order.date).toDateString()}
                      </td>
                      <td className="p-3 flex flex-col items-center justify-center gap-2">
                        <button
                          className="bg-gray-700 text-white p-2 rounded-lg hover:opacity-90"
                          onClick={() => {
                            setModalIsDisplaying(true);
                            setDisplayingOrder(order);
                          }}
                        >
                          Details
                        </button>
                        <MdOutlineModeEdit
                          onClick={() =>
                            navigate("/admin/editOrder", { state: order })
                          }
                          className="text-[22px] m-[2px] cursor-pointer text-[#6D214F]"
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center p-6 text-gray-500">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {modalIsDisplaying && displayingOrder && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
              <div
                className="w-[700px] max-w-[95%] h-[650px] rounded-xl shadow-2xl relative flex flex-col overflow-hidden"
                style={{ backgroundColor: "#FDEFF4" }}
              >
                {/* Header */}
                <div
                  className="p-4 flex justify-between items-center rounded-t-xl"
                  style={{ backgroundColor: "#FFC0D3" }}
                >
                  <div>
                    <h1 className="text-lg font-bold text-gray-800">
                      Order {displayingOrder.orderId}
                    </h1>
                    <p className="text-sm text-gray-700">
                      {new Date(displayingOrder.date).toDateString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-sm rounded-full font-semibold bg-white text-gray-800 shadow">
                    {displayingOrder.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">Customer</p>
                    <p>{displayingOrder.name}</p>
                    <p className="text-gray-600">{displayingOrder.email}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">Delivery</p>
                    <p>{displayingOrder.address}</p>
                    <p className="text-gray-600">
                      {displayingOrder.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="flex-1 overflow-y-auto p-4">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#FFC0D3" }}>
                        <th className="p-2">Product</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayingOrder.billItems &&
                      displayingOrder.billItems.length > 0 ? (
                        displayingOrder.billItems.map((item, index) => (
                          <tr
                            key={index}
                            className="text-center border-b"
                            style={{ borderColor: "#FFC0D3" }}
                          >
                            <td className="p-2 flex items-center gap-2">
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              {item.productName}
                            </td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2">{item.price.toFixed(2)}</td>
                            <td className="p-2">
                              {(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center py-4 text-gray-600"
                          >
                            No items in this order
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div
                  className="p-4 flex justify-between items-center rounded-b-xl"
                  style={{ backgroundColor: "#FFC0D3" }}
                >
                  <p className="font-bold text-lg text-gray-800">
                    Total: LKR {displayingOrder.total.toFixed(2)}
                  </p>

                  <button
                    onClick={() => setModalIsDisplaying(false)}
                    className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
