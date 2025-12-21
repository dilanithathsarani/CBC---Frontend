import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utills/mediaUpload";


export default function AddProductForm() {
	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [price, setPrice] = useState("");
	const [labeledPrice, setLabeledPrice] = useState("");
	const [description, setDescription] = useState("");
	const [stock, setStock] = useState("");
	const [images, setImages] = useState([]);
	const [category, setCategory] = useState("");
	const navigate = useNavigate();

	async function handleSubmit() {
		const promisesArray = [];
		for (let i = 0; i < images.length; i++) {
			const promise = mediaUpload(images[i])
			promisesArray[i] = promise;
		}
		try {
			const result = await Promise.all(promisesArray);

			const altNamesInArray = altNames.split(",");
			const product = {
				productId: productId,
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
            .post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
			toast.success("Product added successfully");
			navigate("/admin/products");
				
		} catch (error) {
			console.log(error);
			toast.error("Product adding failed");
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
      Add Product
    </h1>

    <input
      value={productId}
      onChange={(e) => setProductId(e.target.value)}
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Product ID"
    />

    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Product Name"
    />

    <input
      value={altNames}
      onChange={(e) => setAltNames(e.target.value)}
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Alternative Names"
    />

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

    <input
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      type="number"
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Price"
    />

    <input
      value={labeledPrice}
      onChange={(e) => setLabeledPrice(e.target.value)}
      type="number"
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Labelled Price"
    />

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
      placeholder="Product Images"
    />

    <input
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      type="number"
      className="w-[400px] h-[50px] rounded-xl text-center m-[6px] border transition-all duration-200 focus:outline-none focus:shadow-md"
      style={{ borderColor: "#FFC0D3" }}
      placeholder="Stock"
    />

    {/* Buttons */}
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
        Add Product
      </button>
    </div>
  </div>
</div>

	);
}