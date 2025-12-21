import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader.jsx";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
	const [displayingOrder, setDisplayingOrder] = useState(null);

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
				});
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
                setLoaded(false)
            }
        )
        
    }

	return (
		<div className="w-full h-full ">
			{loaded ? (
				<div className="w-full h-full">
					<table className="w-full">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer Email</th>
								<th>Customer Name</th>
								<th>Address</th>
								<th>Phone Number</th>
								<th>Status</th>
								<th>Total</th>
								<th>Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr
										key={order.orderId}
										className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 "
									>
										<td className="p-2">{order.orderId}</td>
										<td className="p-2">{order.email}</td>
										<td className="p-2">{order.name}</td>
										<td className="p-2">{order.address}</td>
										<td className="p-2">{order.phoneNumber}</td>
										<td className="p-2">
											<select value={order.status} className="z-[50]" onChange={
                                                (e)=>{
                                                    changeOrderStatus(order.orderId,e.target.value)
                                                }
                                            }>
												<option value={"Pending"}>Pending</option>
												<option value={"Delivered"}>Delivered</option>
												<option value={"Cancelled"}>Cancelled</option>
												<option value={"Processing"}>Processing</option>
											</select>
										</td>
										<td className="p-2">{order.total.toFixed(2)}</td>
										<td className="p-2">
											{new Date(order.date).toDateString()}
										</td>
										<td className="p-2">
											<button
												className="bg-gray-700 text-white p-2 rounded-lg"
												onClick={() => {
													setModalIsDisplaying(true);
													setDisplayingOrder(order);
												}}
											>
												Details
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				{modalIsDisplaying && displayingOrder && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className="w-[700px] max-w-[95%] h-[650px] bg-white rounded-xl shadow-2xl relative flex flex-col">

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-100 rounded-t-xl">
        <div>
          <h1 className="text-lg font-bold">
            Order {displayingOrder.orderId}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(displayingOrder.date).toDateString()}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-sm rounded-full font-semibold ${
            displayingOrder.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : displayingOrder.status === "Cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {displayingOrder.status}
        </span>
      </div>

      {/* Customer Info */}
      <div className="p-4 grid grid-cols-2 gap-4 text-sm border-b">
        <div>
          <p className="font-semibold">Customer</p>
          <p>{displayingOrder.name}</p>
          <p className="text-gray-500">{displayingOrder.email}</p>
        </div>

        <div>
          <p className="font-semibold">Delivery</p>
          <p>{displayingOrder.address}</p>
          <p className="text-gray-500">{displayingOrder.phoneNumber}</p>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayingOrder.billItems?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border rounded-lg p-3 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.productName}</h2>
              <p className="text-sm text-gray-500">
                LKR {item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>

            <div className="font-bold">
              LKR {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex justify-between items-center bg-gray-50 rounded-b-xl">
        <p className="font-bold text-lg">
          Total: LKR {displayingOrder.total.toFixed(2)}
        </p>

        <button
          onClick={() => setModalIsDisplaying(false)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          Close
        </button>
      </div>{modalIsDisplaying && displayingOrder && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div
      className="w-[700px] max-w-[95%] h-[650px] rounded-xl shadow-2xl relative flex flex-col"
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
      <div className="p-4 grid grid-cols-2 gap-4 text-sm border-b border-pink-200">
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
              className="w-20 h-20 object-cover rounded-md border border-pink-200"
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
  </div>
)}

				</div>
			) : (
				<Loader/>
			)}
		</div>
	);
}

//