import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Footer } from "../../components/footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all fields!");
      return;
    }
    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#FDEFF4] flex flex-col items-center pt-10">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-[#FF5C8D] mb-8">Contact Us</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
        <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(82,74,78,0.15)] p-8">
          <h2 className="text-2xl font-semibold text-[#FF5C8D] mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#FFC0D3] focus:ring-2 focus:ring-[#FF5C8D] outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-[#FFC0D3] focus:ring-2 focus:ring-[#FF5C8D] outline-none"
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="6"
              className="w-full p-3 rounded-lg border border-[#FFC0D3] focus:ring-2 focus:ring-[#FF5C8D] outline-none"
            />

            <button
              type="submit"
              className="bg-[#FF5C8D] hover:bg-[#FFC0D3] text-white hover:text-[#524A4E] font-semibold px-6 py-3 rounded-xl transition-shadow shadow-[0_6px_15px_rgba(82,74,78,0.15)]"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="bg-white rounded-2xl shadow-[0_6px_20px_rgba(82,74,78,0.15)] p-6">
            <h2 className="text-2xl font-semibold text-[#FF5C8D] mb-4">
              Our Contact Details
            </h2>
            <p className="text-[#524A4E] mb-2">Email: support@cbcstore.com</p>
            <p className="text-[#524A4E] mb-2">Phone: +94 123 456 789</p>
            <p className="text-[#524A4E]">
              Address: 123 E-commerce St, Colombo, Sri Lanka
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(82,74,78,0.15)]">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259c9f5e2b1b7%3A0x8e123456789abc!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
