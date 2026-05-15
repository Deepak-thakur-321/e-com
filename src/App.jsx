import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import PageLoader from "./components/layout/PageLoader";

import Navbar   from "./components/layout/Navbar";
import Footer   from "./components/layout/Footer";

import Home               from "./pages/home/Home";
import CartPage           from "./components/products/CartPage";
import ProductDescription from "./pages/description/ProductDescription";
import BestSeller         from "./pages/bestseller/BestSeller";
import ViewCollection     from "./pages/collection/ViewCollection";
import ProductDetailPage  from "./pages/productDetail/ProductDetailPage";
import TShirtCollection   from "./pages/categories/TShirtPage";
import LuxurySalePage     from "../src/pages/sale/LuxurySalePage";
import Login              from "./pages/auth/Login";
import Register           from "./pages/auth/Register";
import PaymentGateway     from "../src/pages/checkout/PaymentGateway";
import ThankYou           from "../src/pages/checkout/ThankYou";
import Wishlist           from "../src/pages/wishlist/Wishlist";
import Profile            from "../src/pages/profile/Profile";

function Layout() {
  const location  = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#06142B" }}>
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Default → Login */}
          <Route path="/"                       element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login"                  element={<Login />} />
          <Route path="/register"               element={<Register />} />

          {/* Main */}
          <Route path="/home"                   element={<Home />} />
          <Route path="/cart"                   element={<CartPage />} />
          <Route path="/best-sellers"           element={<BestSeller />} />
          <Route path="/view-collection"        element={<ViewCollection />} />
          <Route path="/sale"                   element={<LuxurySalePage />} />

          {/* Checkout */}
          <Route path="/payment"                element={<PaymentGateway />} />
          <Route path="/thank-you"              element={<ThankYou />} />

          {/* Category */}
          <Route path="/category/:slug"         element={<TShirtCollection />} />

          {/* Products */}
          <Route path="/product/:id"            element={<ProductDescription />} />
          <Route path="/collection/product/:id" element={<ProductDetailPage />} />

          {/* Wishlist & Profile */}
          <Route path="/wishlist"               element={<Wishlist />} />
          <Route path="/profile"                element={<Profile />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    // Dark background on body — no white flash ever
    <div style={{ background: "#06142B", minHeight: "100vh" }}>

      {/* ── LOADER ── shows on top until complete, then unmounts */}
      {!loaderDone && (
        <PageLoader onComplete={() => setLoaderDone(true)} />
      )}

      {/*
        ── APP ──
        Renders underneath loader the whole time (pre-loads assets).
        visibility:hidden until loader done → no white flash,
        no layout shift, instant reveal when loader exits.
      */}
      <div style={{
        visibility: loaderDone ? "visible" : "hidden",
        opacity:    loaderDone ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <Router>
          <Layout />
        </Router>
      </div>

    </div>
  );
}

export default App;