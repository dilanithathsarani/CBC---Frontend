import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/review")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !rating || !comment) {
      toast.error("Please complete all fields before submitting");
      return;
    }

    try {
      let response;

      if (editingReviewId) {
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/review/${editingReviewId}`,
          { name, rating, comment },
          { headers: { "Content-Type": "application/json" } }
        );
        setReviews(
          reviews.map((rev) =>
            rev._id === editingReviewId ? response.data : rev
          )
        );
        toast.success("Review updated successfully");
        setEditingReviewId(null);
      } else {
        response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/review",
          { name, rating, comment },
          { headers: { "Content-Type": "application/json" } }
        );
        setReviews([response.data, ...reviews]);
        toast.success("Review submitted successfully");
      }

      setName("");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review");
    }
  };

  const handleEdit = (review) => {
    setName(review.name);
    setRating(review.rating);
    setComment(review.comment);
    setEditingReviewId(review._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/review/${id}`
      );
      setReviews(reviews.filter((rev) => rev._id !== id));
      toast.success("Review deleted successfully");
    } catch (err) {
      console.error("Failed to delete review:", err);
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDEFF4] flex flex-col justify-center p-6">
      <Toaster position="top-right" />

      <div className="w-full max-w-5xl flex-1 w-full max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-[#FF5C8D] mb-12">
          Customer Reviews
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(82,74,78,0.15)] p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#FF5C8D] mb-6">
            {editingReviewId ? "Edit Your Review" : "Share Your Experience"}
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#FFC0D3] focus:ring-2 focus:ring-[#FF5C8D] outline-none mb-5"
          />

          <div className="flex gap-3 mb-5 text-3xl text-[#FF5C8D]">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`transition-transform hover:scale-110 ${
                  star <= rating ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full p-3 rounded-lg border border-[#FFC0D3] focus:ring-2 focus:ring-[#FF5C8D] outline-none mb-6"
          />

          <button
            type="submit"
            className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] font-semibold px-8 py-3 rounded-full shadow-[0_6px_15px_rgba(82,74,78,0.15)] transition"
          >
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </form>

        {reviews.length === 0 ? (
          <p className="text-[#524A4E] text-center">
            No reviews yet. Be the first to review this product.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-[#FFC0D3] rounded-2xl p-6 shadow-[0_6px_15px_rgba(82,74,78,0.15)] hover:shadow-[0_10px_20px_rgba(82,74,78,0.2)] transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#524A4E]">
                    {review.name}
                  </h3>

                  <div className="flex gap-1 text-[#FF5C8D] text-xl">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={
                          index < review.rating ? "opacity-100" : "opacity-30"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[#524A4E] leading-relaxed break-words">
                  {review.comment}
                </p>

                <div className="flex gap-4 mt-4">
                  <button
                    className="px-3 py-1 bg-yellow-300 rounded hover:bg-yellow-400 text-gray-800"
                    onClick={() => handleEdit(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-400 rounded hover:bg-red-500 text-white"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">ID: {review._id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
