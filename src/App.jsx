import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/adminPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/admin/register.jsx";
import HomePage from "./pages/homePage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPassword from "./pages/client/forgetPassword.jsx";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes path="/*">
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget" element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
