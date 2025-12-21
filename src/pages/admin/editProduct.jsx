import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utills/mediaUpload";


export default function EditProductForm() {
    const locationData = useLocation()
    const navigate = useNavigate();
    if(locationData.state == null){
        toast.error("Please select a product to edit")
        window.location.href = "/admin/products"
    }
    const [productId, setProductId] = useState(locationData.state.productId);
    const [name, setName] = useState(locationData.state.name);
    const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
    const [price, setPrice] = useState(locationData.state.price);
    const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
    const [description, setDescription] = useState(locationData.state.description);
    const [stock, setStock] = useState(locationData.state.stock);
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState(locationData.state.category);
    

    async function handleSubmit() {
        
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            const promise = mediaUpload(images[i]);
            promisesArray[i] = promise;
        }
        try {
            let result = await Promise.all(promisesArray);

            if(images.length == 0){
                result = locationData.state.images
            }

            const altNamesInArray = altNames.split(",");
            const product = {
                name: name,
                altNames: altNamesInArray,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                stock: stock,
                images: result,
                category
            };
            const token = localStorage.getItem("token");
            console.log(token);

            await axios
                .put(import.meta.env.VITE_BACKEND_URL + "/api/product/"+productId, product, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
            toast.success("Product updated successfully");
            navigate("/admin/products");
                
        } catch (error) {
            console.log(error);
            toast.error("Product updating failed");
        }
    }

    return (
<div
  className="w-full h-full rounded-lg flex justify-center items-center"
  style={{ backgroundColor: "#FDEFF4" }}
>
  <div
    className="w-[520px] h-[620px] rounded-2xl shadow-xl flex flex-col items-center transition-all duration-300"
    style={{ backgroundColor: "#FFFFFF" }}
  >
    <h1
      className="text-3xl font-bold m-[15px] tracking-wide mt-8"
      style={{ color: "#C85A87" }}
    >
      Edit Product
    </h1>

    {[
      { value: productId, disabled: true, placeholder: "Product ID", onChange: e => setProductId(e.target.value) },
      { value: name, placeholder: "Product Name", onChange: e => setName(e.target.value) },
      { value: altNames, placeholder: "Alternative Names", onChange: e => setAltNames(e.target.value) }
    ].map((field, i) => (
      <input
        key={i}
        {...field}
        className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
        style={{ borderColor: "#FFC0D3" }}
      />
    ))}

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border bg-white transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
    >
      <option value="">Select Category</option>
      <option value="Skincare">Skincare</option>
      <option value="Makeup">Makeup</option>
      <option value="Haircare">Haircare</option>
      <option value="Accessories">Accessories</option>
    </select>

    {[
      { value: price, placeholder: "Price", onChange: e => setPrice(e.target.value) },
      { value: labeledPrice, placeholder: "Labelled Price", onChange: e => setLabeledPrice(e.target.value) }
    ].map((field, i) => (
      <input
        key={i}
        {...field}
        type="number"
        className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
        style={{ borderColor: "#FFC0D3" }}
      />
    ))}

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-[400px] h-[60px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Description"
    />

    <input
      type="file"
      onChange={(e) => setImages(e.target.files)}
      multiple
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border bg-white cursor-pointer"
      style={{ borderColor: "#FFC0D3" }}
    />

    <input
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      type="number"
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Stock"
    />

    <div className="w-[400px] h-[100px] flex justify-between items-center mb-8">
      <Link
        to={"/admin/products"}
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
        Edit Product
      </button>
    </div>
  </div>
</div>

    );
}
