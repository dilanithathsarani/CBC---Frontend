import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../components/footer";
import ProductCard from "../../components/productCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => setProducts(res.data.slice(0, 8))) 
      .catch((err) => console.error(err));

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => setReviews(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDEFF4]">
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 flex flex-col gap-16">

        <section className="text-center py-20 bg-[#FF5C8D]/10 rounded-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FF5C8D] mb-4">
            Crystal Beauty Clear Cosmetics
          </h1>
          <p className="text-[#524A4E] text-lg md:text-xl mb-6">
            Premium cosmetics delivered to your doorstep
          </p>
          <button
          onClick={() => navigate("/products")}
          className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] px-8 py-3 rounded-full font-semibold shadow-[0_6px_15px_rgba(82,74,78,0.15)] transition">
            Shop Now
          </button>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-6 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div 
           onClick={() => navigate(`/products?category=Skincare`)}
          className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition">
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Skincare</h3>
          </div>
          <div 
           onClick={() => navigate(`/products?category=Makeup`)}
          className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition">
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Makeup</h3>
          </div>
          <div
           onClick={() => navigate(`/products?category=Hair Care`)}
          className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition">
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Hair Care</h3>
          </div>
          <div
           onClick={() => navigate(`/products?category=Accessories`)}
          className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition">
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Accessories</h3>
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-[#FF5C8D]/10 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-4">Special Offers</h2>
          <p className="text-[#524A4E] mb-6">Get up to 30% off on selected items!</p>
          <button
          onClick={() => navigate("/products")}
          className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] px-6 py-3 rounded-full font-semibold shadow transition">
            Grab Deals
          </button>
        </section>

        {/* Customer Reviews */}
        <section>
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-6 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
                <h3 className="text-[#524A4E] font-bold mb-2">{review.name}</h3>
                <div className="flex gap-1 text-[#FF5C8D] mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                  ))}
                </div>
                <p className="text-[#524A4E] text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-[#FFC0D3]/20 rounded-2xl">
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-4">Start Your Beauty Journey Today</h2>
          <p className="text-[#524A4E] mb-6">Explore our wide range of cosmetics and skincare products</p>
          <button 
          onClick={() => navigate("/products")}
          className="bg-[#FF5C8D] hover:bg-[#524A4E] text-white px-8 py-3 rounded-full font-semibold transition">
            Shop Now
          </button>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
