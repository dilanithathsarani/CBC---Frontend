import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import CartPage from "./client/cart";
import ProductOverview from "./client/productOverview";
import CheckoutPage from "./client/checkout";
import ReviewPage from "./client/review";
import ContactPage from "./client/contact";
import LandingPage from "./client/landingPage";

export default function HomePage(){
    return(
        <div className="w-full h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/overview/:id" element={<ProductOverview/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/reviews" element= {<ReviewPage/>}/>
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    )
}