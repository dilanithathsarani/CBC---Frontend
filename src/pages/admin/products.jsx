import axios from "axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function AdminProductsPage(){
   
    const[products, setProducts] = useState([]);
    const [loaded,setLoaded]=useState(false);
    const navigate = useNavigate()

    useEffect(
        () => {
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
            (response) => {
                console.log(response.data);
                setProducts(response.data);
                setLoaded(true);
            }
        )
            }
        
    }, [loaded]);

    async function deleteProduct(id){
        const token=localStorage.getItem("token")
        if(token==null){
            toast.error("Please login to delete a product")
            return
        }
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id,{
            headers:{
                Authorization:"Bearer "+token
            }
        })
         setLoaded(false)
        toast.success("Product deleted successfully")
        }catch(error){
            console.log(error)
            toast.error("Error deleting product")
            return
        }
        
    }

    return(
<div
  className="w-full h-full rounded-lg relative"
  style={{ backgroundColor: "#FDEFF4" }}
>
  <Link
    to={"/admin/addProduct"}
    className="text-gray-800 p-[12px] text-3xl rounded-full cursor-pointer absolute right-5 bottom-5 shadow-lg hover:opacity-90"
    style={{ backgroundColor: "#FFC0D3" }}
  >
    <FaPlus />
  </Link>

  {loaded && (
    // Scrollable container
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto rounded-lg">
      <table className="w-full border-collapse">
        <thead>
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
          {products.map((product, index) => {
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
        </tbody>
      </table>
    </div>
  )}

  {!loaded && <Loader />}
</div>

    )
}