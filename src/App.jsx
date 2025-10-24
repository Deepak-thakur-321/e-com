import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cart from "./components/Product/Cart";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Page content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/product/:id" element={<ProductCard />} key="product" /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
