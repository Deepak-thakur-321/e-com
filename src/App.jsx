import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/home/Home";
import CartPage from "./components/products/CartPage";
import ProductDescription from "./pages/description/ProductDescription";
import BestSeller from "./pages/bestseller/BestSeller";
import ViewCollection from "./pages/collection/ViewCollection";
import ProductDetailPage from "./pages/productDetail/ProductDetailPage";
import TShirtCollection from "./pages/categories/TShirtPage";
import LuxurySalePage from "../src/pages/sale/LuxurySalePage";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PaymentGateway from "../src/pages/checkout/PaymentGateway";
import ThankYou from '../src/pages/checkout/ThankYou';

function Layout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Hide Navbar on Auth Pages */}
      {!isAuthPage && <Navbar />}

      <main className="flex-1">
        <Routes>

          {/* Redirect Root Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* AUTH Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* MAIN Pages Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/best-sellers" element={<BestSeller />} />
          <Route path="/view-collection" element={<ViewCollection />} />
          <Route path="/sale" element={<LuxurySalePage />} />

          {/* Payments Routes */}
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* CATEGORY Route */}
          <Route path="/category/:slug" element={<TShirtCollection />} />

          {/* PRODUCT Page Route */}
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route
            path="/collection/product/:id"
            element={<ProductDetailPage />}
          />

        </Routes>
      </main>

      {/* Hide Footer on Auth Pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;