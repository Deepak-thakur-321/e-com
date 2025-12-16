// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/layout/Footer";
import CartPage from "../src/components/products/CartPage";
import ProductDescription from "./pages/description/ProductDescription";
import BestSeller from "./pages/bestseller/BestSeller";
import ViewCollection from "./pages/collection/ViewCollection.jsx";
import ProductDetailPage from "./pages/productDetail/ProductDetailPage.jsx";
import TShirtCollection from "./pages/categories/TShirtPage.jsx";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        {/* Main Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/best-sellers" element={<BestSeller />} />
            <Route path="/view-collection" element={<ViewCollection />} />

            <Route path="/category/:slug" element={<TShirtCollection />} />



            {/* Placeholder until ProductDescription page is built */}
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/collection/product/:id" element={<ProductDetailPage />} />

          </Routes>


        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
