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
    <div className="w-full min-h-screen bg-[#FDEFF4] p-4 lg:p-16 overflow-hidden">
      {status === "loading" && <Loader />}

      {status === "loaded" && (
        <div className="w-full flex flex-col lg:flex-row gap-10 h-full">
          {/* Product Name - Mobile */}
          <h1 className="text-3xl font-bold text-center mb-6 text-[#FF5C8D] lg:hidden">
            {product.name}
            <span className="block text-lg text-[#524A4E] mt-1">
              {product.altNames.join(" | ")}
            </span>
          </h1>

          <div className="w-full lg:w-[65%] mt-4">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
            <h1 className="hidden lg:block text-4xl font-bold text-[#FF5C8D] text-center mb-6">
              {product.name}
              <span className="block text-xl text-[#524A4E] mt-2">
                {product.altNames.join(" | ")}
              </span>
            </h1>

            <div className="text-center mb-6">
              {product.labeledPrice > product.price ? (
                <>
                  <h2 className="text-3xl font-semibold text-[#FF5C8D]">
                    LKR.{product.price.toFixed(2)}
                  </h2>
                  <h2 className="text-xl line-through text-[#524A4E] mt-1">
                    LKR.{product.labeledPrice.toFixed(2)}
                  </h2>
                </>
              ) : (
                <h2 className="text-3xl font-semibold text-[#FF5C8D]">
                  LKR: {product.price.toFixed(2)}
                </h2>
              )}
            </div>

            <p className="text-lg text-center text-[#524A4E] mb-8">
              {product.description}
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button
                className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] border-2 border-[#FF5C8D] font-medium px-6 py-3 rounded-xl shadow-[0_6px_15px_rgba(82,74,78,0.15)] transition duration-300"
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
                className="bg-[#FFC0D3] hover:bg-[#FF5C8D] text-[#524A4E] hover:text-white border-2 border-[#FFC0D3] font-medium px-6 py-3 rounded-xl shadow-[0_6px_15px_rgba(82,74,78,0.15)] transition duration-300"
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