import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utills/cart";

export default function ProductOverview() {
  const params = useParams();
  if (!params.id) window.location.href = "/products";

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${params.id}`)
        .then((res) => {
          setProduct(res.data);
          setStatus("loaded");
        })
        .catch(() => {
          toast.error("Product is not available!");
          setStatus("error");
        });
    }
  }, [status]);

  return (
    <div className="w-full min-h-screen bg-[#FDEBD0] p-4 lg:p-16 overflow-hidden">
      {status === "loading" && <Loader />}

      {status === "loaded" && (
        <div className="w-full flex flex-col lg:flex-row gap-10 h-full">
          {/* Product Name - Mobile */}
          <h1 className="text-3xl font-bold text-center mb-6 text-[#DC143C] lg:hidden">
            {product.name}
            <span className="block text-lg text-gray-500 mt-1">
              {product.altNames.join(" | ")}
            </span>
          </h1>

          <div className="w-full lg:w-[65%] mt-4">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
            <h1 className="hidden lg:block text-4xl font-bold text-[#DC143C] text-center mb-6">
              {product.name}
              <span className="block text-xl text-gray-500 mt-2">
                {product.altNames.join(" | ")}
              </span>
            </h1>

            <div className="text-center mb-6">
              {product.labeledPrice > product.price ? (
                <>
                  <h2 className="text-3xl font-semibold text-[#DC143C]">
                    LKR.{product.price.toFixed(2)}
                  </h2>
                  <h2 className="text-xl line-through text-gray-400 mt-1">
                    LKR.{product.labeledPrice.toFixed(2)}
                  </h2>
                </>
              ) : (
                <h2 className="text-3xl font-semibold text-[#DC143C]">
                  LKR: {product.price.toFixed(2)}
                </h2>
              )}
            </div>

            <p className="text-lg text-center text-gray-700 mb-8">
              {product.description}
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button
                className="bg-[#FF8BA0] hover:bg-white text-white hover:text-[#DC143C] border-2 border-[#FF8BA0] font-medium px-6 py-3 rounded-xl shadow-md transition duration-300"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          name: product.name,
                          altNames: product.altNames,
                          price: product.price,
                          labeledPrice: product.labeledPrice,
                          image: product.images[0],
                          quantity: 1,
                        },
                      ],
                    },
                  })
                }
                className="bg-[#DC143C] hover:bg-white text-white hover:text-[#DC143C] border-2 border-[#DC143C] font-medium px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center text-red-600 font-bold text-2xl mt-10">
          Product Not Found
        </div>
      )}
    </div>
  );
}
