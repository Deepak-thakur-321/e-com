import React, { useState, useEffect } from "react";
import {
   FaShoppingCart,
   FaHeart,
   FaUser,
   FaSearch,
   FaBars,
   FaTimes,
   FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isSearchFocused, setIsSearchFocused] = useState(false);
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);
   const [mobileCatOpen, setMobileCatOpen] = useState(false);
   const [query, setQuery] = useState("");
   const [results, setResults] = useState([]);


   const cartCount = useSelector((state) => state.cart.totalQuantity);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const handleSearch = (value) => {
      setQuery(value);

      if (!value.trim()) {
         setResults([]);
         return;
      }

      const filteredResults = categories.filter((category) =>
         category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
   };


   const categories = ["TShirts", "Shirts"];

   const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

   return (
      <>
         {/* Announcement Bar */}
         <div className="bg-black text-white text-center py-2 text-xs tracking-widest">
            FREE SHIPPING ON ORDERS ABOVE ₹2999 | NEW COLLECTION OUT NOW
         </div>

         {/* Main Navbar */}
         <nav
            className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-200 ${isScrolled
               ? "bg-gray-300/95 backdrop-blur-md shadow-sm"
               : "bg-white"
               }`}
         >

            {/* Main Navigation */}
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex items-center justify-between h-16">

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden">
                     <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 text-gray-700"
                     >
                        <FaBars size={22} />
                     </button>
                  </div>

                  {/* Logo */}
                  <NavLink to="/" className="text-2xl font-bold tracking-tight text-gray-900">
                     MyStore
                  </NavLink>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center space-x-6">
                     {/* Categories Dropdown */}
                     <div className="relative">
                        <button
                           onMouseEnter={() => setIsCategoryOpen(true)}
                           onMouseLeave={() => setIsCategoryOpen(false)}
                           className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition"
                        >
                           Categories
                           <FaChevronDown
                              className={`w-3 h-3 transition-transform duration-400 ${isCategoryOpen ? "rotate-180" : ""}`}
                           />
                        </button>

                        {isCategoryOpen && (
                           <div
                              onMouseEnter={() => setIsCategoryOpen(true)}
                              onMouseLeave={() => setIsCategoryOpen(false)}
                              className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-gray-100 rounded-xl py-2 opacity-100 scale-100 transition-all"
                           >
                              {categories.map((cat) => (
                                 <Link
                                    key={cat}
                                    to={`/category/${slugify(cat)}`}
                                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                                 >
                                    {cat}
                                 </Link>
                              ))}
                           </div>
                        )}
                     </div>

                     {/* Other Links */}
                     <Link to="/" className="text-sm text-gray-700 hover:text-black">New Arrivals</Link>
                     <Link to="/best-sellers" className="text-sm text-gray-700 hover:text-black">Best Sellers</Link>
                     <Link to="/view-collection" className="text-sm text-gray-700 hover:text-black">New Collection</Link>
                     <Link to="/showcase" className="text-sm text-gray-700 hover:text-black">Sale</Link>
                  </div>

                  {/* Search */}
                  <div className="hidden md:flex flex-1 max-w-md mx-6">
                     <div
                        className={`relative transition-all w-full ${isSearchFocused ? "scale-105" : ""
                           }`}
                        tabIndex={0}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                     >
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                           type="text"
                           value={query}
                           onChange={(e) => handleSearch(e.target.value)}
                           placeholder="Search products..."
                           className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-full text-sm transition ${isSearchFocused
                              ? "border-black bg-white shadow-lg"
                              : "border-gray-200 hover:bg-gray-100"
                              }`}
                        />

                        {results.length > 0 && (
                           <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
                              {results.map((item) => (
                                 <Link
                                    key={item.id}
                                    to={`/product/${item.slug}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                       setQuery("");
                                       setResults([]);
                                    }}
                                 >
                                    {item.name}
                                 </Link>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>


                  {/* Right Icons */}
                  <div className="flex items-center space-x-4">
                     <Link to="/wishlist" className="group relative p-2">
                        <FaHeart className="text-gray-700 group-hover:text-red-500 transition" />
                     </Link>

                     <Link to="/cart" className="group relative p-2">
                        <FaShoppingCart className="text-gray-700 group-hover:text-black transition" />
                        {cartCount > 0 && (
                           <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {cartCount}
                           </span>
                        )}
                     </Link>

                     <Link to="/profile" className="group p-2">
                        <FaUser className="text-gray-700 group-hover:text-black transition" />
                     </Link>
                  </div>
               </div>
            </div>
         </nav>

         {/* Mobile Slide-in Menu (from 2nd doc) */}
         {mobileOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
               {/* Backdrop */}
               <div
                  onClick={() => setMobileOpen(false)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
               />

               {/* Drawer */}
               <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto">
                  <div className="p-6">
                     {/* Close Button */}
                     <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-light tracking-[0.2em]">MENU</span>
                        <button
                           onClick={() => setMobileOpen(false)}
                           className="p-2 hover:bg-gray-50 rounded-full"
                        >
                           <FaTimes size={20} />
                        </button>
                     </div>

                     {/* User Actions */}
                     <div className="flex items-center gap-4 pb-6 mb-6 border-b">
                        <Link to="/login" className="text-sm font-light tracking-wide hover:text-gray-600">
                           Sign In
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/register" className="text-sm font-light tracking-wide hover:text-gray-600">
                           Register
                        </Link>
                     </div>

                     {/* Mobile Categories Accordion */}
                     <div className="border-b border-gray-100">
                        <button
                           onClick={() => setMobileCatOpen(!mobileCatOpen)}
                           className="w-full flex justify-between items-center py-4 text-left"
                        >
                           <span className="text-sm font-light tracking-widest text-gray-900">
                              Categories
                           </span>
                           <span className={`text-sm transition-transform ${mobileCatOpen ? 'rotate-180' : ''}`}>
                              ▼
                           </span>
                        </button>

                        {mobileCatOpen && (
                           <div className="pb-4 pl-4 space-y-3">
                              {categories.map((cat) => (
                                 <Link
                                    key={cat}
                                    to={`/category/${slugify(cat)}`}
                                    className="block text-sm font-light text-gray-600 hover:text-black"
                                    onClick={() => setMobileOpen(false)}
                                 >
                                    {cat}
                                 </Link>
                              ))}
                           </div>
                        )}
                     </div>

                     {/* Other Links */}
                     <div className="mt-6 space-y-4">
                        <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-light tracking-wide text-gray-800">
                           New Arrivals
                        </Link>
                        <Link to="/best-sellers" onClick={() => setMobileOpen(false)} className="block text-sm font-light tracking-wide text-gray-800">
                           Best Sellers
                        </Link>
                        <Link to="/view-collection" onClick={() => setMobileOpen(false)} className="block text-sm font-light tracking-wide text-gray-800">
                           New Collection
                        </Link>
                        <Link to="/showcase" onClick={() => setMobileOpen(false)} className="block text-sm font-light tracking-wide text-gray-800">
                           Sale
                        </Link>
                     </div>

                     {/* Additional Links */}
                     <div className="mt-8 pt-6 border-t space-y-4">
                        <Link to="/wishlist" className="flex items-center gap-3 text-sm font-light tracking-wide">
                           <FaHeart size={16} />
                           Wishlist
                        </Link>
                        <Link to="/stores" className="block text-sm font-light tracking-wide">
                           Find a Store
                        </Link>
                        <Link to="/help" className="block text-sm font-light tracking-wide">
                           Customer Care
                        </Link>
                        <Link to="/track" className="block text-sm font-light tracking-wide">
                           Track Order
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}