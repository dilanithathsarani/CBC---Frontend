import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="w-full bg-[#FF5C8D] text-white py-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Column 1 - Brand */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Crystal Beauty Clear
                        </h3>
                        <p className="text-sm opacity-90">
                            Enhancing your natural beauty with premium cosmetic products.
                        </p>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="hover:underline">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:underline">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                        <div className="flex justify-center md:justify-start gap-5">
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-200 transition"
                            >
                                <FaTwitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/30 mt-8 pt-4 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
