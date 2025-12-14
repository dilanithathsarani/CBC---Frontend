import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state.items);
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function placeOrder() {
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phone,
            billItems: cart.map(item => ({ productId: item.productId, quantity: item.quantity }))
        };

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Order placed successfully");
            navigate("/");
        }).catch(() => toast.error("Order placement failed"));
    }

    function getTotal() {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    function getTotalForLabelledPrice() {
        return cart.reduce((acc, item) => acc + item.labeledPrice * item.quantity, 0);
    }

    return (
        <div className="w-full min-h-screen flex justify-center p-[40px] bg-[#FDEFF4]">
            <div className="w-[700px]">
                {cart.map((item, index) => (
                    <div key={index} className="w-full h-[100px] bg-white shadow-[0_6px_15px_rgba(82,74,78,0.1)] my-3 flex justify-between items-center relative rounded-xl transition hover:shadow-[0_10px_20px_rgba(82,74,78,0.2)]">
                        <button
                            className="absolute right-[-50px] bg-[#FF5C8D] w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-[#FFC0D3] transition"
                            onClick={() => setCart(cart.filter(product => product.productId !== item.productId))}
                        >
                            <TbTrash />
                        </button>
                        <img src={item.image} className="h-full aspect-square object-cover rounded-l-xl" />
                        <div className="h-full max-w-[300px] w-[300px] overflow-hidden px-2">
                            <h1 className="text-xl font-bold text-[#524A4E]">{item.name}</h1>
                            <h2 className="text-lg text-[#524A4E]">{item.altNames.join(" | ")}</h2>
                            <h2 className="text-lg text-[#524A4E]">LKR: {item.price.toFixed(2)}</h2>
                        </div>
                        <div className="h-full w-[100px] flex justify-center items-center">
                            <button className="text-2xl w-[30px] h-[30px] bg-[#FFC0D3] text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px] hover:bg-[#FF5C8D] transition"
                                onClick={() => { const newCart = [...cart]; newCart[index].quantity = Math.max(1, newCart[index].quantity - 1); setCart(newCart); setCartRefresh(!cartRefresh); }}>-</button>
                            <h1 className="text-xl font-bold">{item.quantity}</h1>
                            <button className="text-2xl w-[30px] h-[30px] bg-[#FFC0D3] text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px] hover:bg-[#FF5C8D] transition"
                                onClick={() => { const newCart = [...cart]; newCart[index].quantity += 1; setCart(newCart); setCartRefresh(!cartRefresh); }}>+</button>
                        </div>
                        <div className="h-full w-[100px] flex justify-center items-center">
                            <h1 className="text-xl w-full text-end pr-2 text-[#524A4E]">{(item.price * item.quantity).toFixed(2)}</h1>
                        </div>
                    </div>
                ))}

                <div className="w-full flex justify-end mt-4 gap-4">
                    <div className="flex justify-between w-[220px]">
                        <h1 className="text-xl text-[#524A4E]">Total</h1>
                        <h1 className="text-xl text-[#524A4E]">{getTotalForLabelledPrice().toFixed(2)}</h1>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-4">
                    <div className="flex justify-between w-[220px] border-b-[2px] border-[#FFC0D3] pb-1">
                        <h1 className="text-xl text-[#524A4E]">Discount</h1>
                        <h1 className="text-xl text-[#524A4E]">{(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</h1>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-4">
                    <div className="flex justify-between w-[220px] border-b-[4px] border-double border-[#FF5C8D] pb-1">
                        <h1 className="text-xl text-[#524A4E]">Net total</h1>
                        <h1 className="text-xl text-[#524A4E]">{getTotal().toFixed(2)}</h1>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-4">
                    <input placeholder="Name" className="w-full text-xl border-b-[2px] border-[#FF5C8D] px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFC0D3]" value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder="Phone" className="w-full text-xl border-b-[2px] border-[#FF5C8D] px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFC0D3]" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input placeholder="Address" className="w-full text-xl border-b-[2px] border-[#FF5C8D] px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#FFC0D3]" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] text-xl text-center shadow bg-[#FFC0D3] text-white h-[40px] rounded-lg cursor-pointer hover:bg-[#FF5C8D] transition-all duration-300" onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}