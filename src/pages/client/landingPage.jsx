import React, { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../components/footer";
import ProductCard from "../../components/productCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => setProducts(res.data.slice(0, 8)))
      .catch((err) => console.error(err));

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews,totalSlides]);

  const slides = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide));
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDEFF4]">
      <main className="flex-1 w-full max-w-6xl mx-auto p-6 flex flex-col gap-16">
        <section className="py-20 bg-[#FF5C8D]/10 rounded-3xl px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap animate-bounce-once">
              <img
                src="/CBC.png"
                alt="Crystal Beauty Clear Cosmetics Logo"
                className="w-40 h-40 object-contain hover:scale-110 transition-transform duration-500"
              />
              <h1 className="text-5xl md:text-6xl font-bold text-[#FF5C8D] mb-4 ">
                Crystal Beauty Clear Cosmetics
              </h1>
            </div>
            <p className="text-[#524A4E] text-lg md:text-xl max-w-4xl text-center">
              Discover the perfect blend of quality and elegance with our
              premium cosmetics range. From skincare essentials to stunning
              makeup, we bring beauty and confidence straight to your doorstep.
              Experience luxury, care, and brilliance in every product you
              choose.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] px-8 py-3 rounded-full font-semibold shadow-[0_6px_15px_rgba(82,74,78,0.15)] transition"
            >
              Shop Now
            </button>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-6 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                className="transition transform hover:scale-105 hover:shadow-xl"
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div
            onClick={() => navigate(`/products?category=Skincare`)}
            className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition"
          >
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Skincare</h3>
          </div>
          <div
            onClick={() => navigate(`/products?category=Makeup`)}
            className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition"
          >
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Makeup</h3>
          </div>
          <div
            onClick={() => navigate(`/products?category=Haircare`)}
            className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition"
          >
            <h3 className="text-[#FF5C8D] font-semibold text-lg">Hair Care</h3>
          </div>
          <div
            onClick={() => navigate(`/products?category=Accessories`)}
            className="bg-[#FFC0D3]/20 p-6 rounded-2xl text-center hover:scale-105 transition"
          >
            <h3 className="text-[#FF5C8D] font-semibold text-lg">
              Accessories
            </h3>
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-[#FF5C8D]/10 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-4">
            Special Offers
          </h2>
          <p className="text-[#524A4E] mb-6">
            Get up to 30% off on selected items!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] px-6 py-3 rounded-full font-semibold shadow transition"
          >
            Grab Deals
          </button>
        </section>

        {/* Customer Reviews */}
  {/* Customer Reviews - ROTATING */}
<section className="text-center">
  <h2 className="text-3xl font-bold text-[#FF5C8D] mb-6 text-center">
    What Our Customers Say
  </h2>
  {reviews.length > 0 && (
    <div className="overflow-hidden max-w-6xl mx-auto relative">
      {/* Slide container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentReviewIndex * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="flex justify-center gap-6 flex-none w-full"
          >
            {slide.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md w-1/3 min-w-[200px]"
              >
                <h3 className="text-[#524A4E] font-bold mb-2">{review.name}</h3>
                <div className="flex gap-1 justify-center text-[#FF5C8D] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < review.rating ? "opacity-100" : "opacity-30"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#524A4E] text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={() =>
          setCurrentReviewIndex(
            currentReviewIndex === 0 ? totalSlides - 1 : currentReviewIndex - 1
          )
        }
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#FF5C8D]/20 p-2 rounded-full hover:bg-[#FF5C8D] transition"
      >
        ‹
      </button>
      <button
        onClick={() =>
          setCurrentReviewIndex(
            currentReviewIndex === totalSlides - 1 ? 0 : currentReviewIndex + 1
          )
        }
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#FF5C8D]/20 p-2 rounded-full hover:bg-[#FF5C8D] transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentReviewIndex ? "bg-[#FF5C8D]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentReviewIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  )}
</section>


        {/* Call to Action */}
        <section className="text-center py-16 bg-[#FFC0D3]/20 rounded-2xl mb-6">
          <h2 className="text-3xl font-bold text-[#FF5C8D] mb-4">
            Start Your Beauty Journey Today
          </h2>
          <p className="text-[#524A4E] mb-6">
            Explore our wide range of cosmetics and skincare products
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#FF5C8D] hover:bg-[#524A4E] text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Shop Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
