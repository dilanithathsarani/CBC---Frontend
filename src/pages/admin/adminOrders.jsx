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
  const navigate = useNavigate();

	useEffect(() => {
		if (!loaded) {
			const token = localStorage.getItem("token");
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setOrders(response.data);
					setLoaded(true);
					console.log(response.data);
				})
         .catch(() => toast.error("Failed to load orders"));
		}
	}, [loaded]);
	/*
    {
    "_id": "68179297609566291e7ccfc1",
    "orderId": "ORD0007",
    "email": "customer@gmail.com",
    "name": "Dilshan X",
    "address": "abc,456",
    "status": "Pending",
    "phoneNumber": "0777123789",
    "billItems": [
        {
            "productId": "COSM24003",
            "productName": "AquaFresh Face Wash",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/174515966319584f4fd3735fd65a04e6c05bc45d72df7.jpg",
            "quantity": 2,
            "price": 499,
            "_id": "68179297609566291e7ccfc2"
        },
        {
            "productId": "COSM24004",
            "productName": "SunGuard SPF 50+",
            "image": "https://acfihbfmgdmhzxvboogf.supabase.co/storage/v1/object/public/images/1745159690195619e443b79141a8e7e080f38abaa5774.jpg",
            "quantity": 2,
            "price": 749,
            "_id": "68179297609566291e7ccfc3"
        }
    ],
    "total": 2496,
    "date": "2025-05-04T16:15:19.185Z",
    "__v": 0
}
    */

    function changeOrderStatus(orderId,status){
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderId, {
            status: status
        },{
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(
            ()=>{
                toast.success("Order status changed successfully");
                setModalIsDisplaying(false);
                setLoaded(false)
            }
        )
        
    }

	return (
    <div
      className="w-full h-full rounded-lg relative"
      style={{ backgroundColor: "#FDEFF4" }}
    >
      {loaded ? (
        <div className="w-full h-full">
          {/* Scrollable table container */}
          <div className="max-h-[calc(100vh-50px)] overflow-y-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead>
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
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
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
                    <td className="p-3 flex justify-center gap-2">
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
              </tbody>
            </table>
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
                    <p className="text-gray-600">{displayingOrder.phoneNumber}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {displayingOrder.billItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg p-3 shadow"
                      style={{ backgroundColor: "#FFFFFF" }}
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded-md"
                      />

                      <div className="flex-1">
                        <h2 className="font-semibold text-gray-800">
                          {item.productName}
                        </h2>
                        <p className="text-sm text-gray-600">
                          LKR {item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>

                      <div className="font-bold text-gray-800">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
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