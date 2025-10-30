  // src/App.jsx
  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Navbar from "./components/layout/Navbar";
  import Home from "./pages/home/Home";
  import Footer from "./components/layout/Footer";
  import CartPage from "../src/components/products/CartPage";
  import ProductDescription from "./pages/description/ProductDescription";

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

              {/* Placeholder until ProductDescription page is built */}
              <Route path="/product/:id" element={<ProductDescription />} /> </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    );
  }

  export default App;
