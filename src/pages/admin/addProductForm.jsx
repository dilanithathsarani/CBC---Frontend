import { Link } from "react-router-dom";

export default function AddProductForm() {
return(
    <div className="w-full h-screen rounded-lg flex justify-center items-center">
        <div className="w-[500px] h-[600px] rounded-lg shadow-lg bg-white flex flex-col items-center">
            <h1>Add Product</h1>
            
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product Id" />
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="product Name" />
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Alternative Names" />
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Price" />
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Labeled Price" />
            <textarea className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" />
            <input className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Stock" />

            <div className="w-[400px] h-[100px] flex justify-between items-center">
                <Link to={"/admin/products"} className="bg-red-600 text-white p-[10px] w-[180px] text-center rounded-lg hover:bg-red-600">Cancel</Link>
                <button className="bg-green-500 cursor-pointer text-white p-[10px] ml-[10px] w-[180px] text-center rounded-lg hover:bg-green-600">Add Product</button>
            </div>
        </div>
    </div>
)
}