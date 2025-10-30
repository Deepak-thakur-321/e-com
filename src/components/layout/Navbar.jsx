import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux"; // ✅ import this
 import {NavLink} from "react-router-dom";
export default function Navbar() {
   const [isSearchFocused, setIsSearchFocused] = useState(false);
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);

   // ✅ use Redux selector to get totalQuantity
   const cartCount = useSelector((state) => state.cart.totalQuantity); // <-- this line replaces const cartCount = 3;

   const categories = [
      "Electronics",
      "Fashion",
      "Home & Living",
      "Beauty & Health",
      "Sports & Outdoors",
      "Books & Media",
      "Toys & Games",
      "Automotive",
   ];

   return (
      <nav className="border-b border-gray-200 sticky top-0 z-50 backdrop-blur-xl bg-white/95">
         {/* Top Bar */}
         <div className="border-b border-gray-100 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs text-gray-600">
               <div className="flex items-center space-x-6">
                  <span className="hover:text-gray-900 cursor-pointer transition">Store Locator</span>
                  <span className="hover:text-gray-900 cursor-pointer transition">Help</span>
                  <span className="hover:text-gray-900 cursor-pointer transition">Track Order</span>
               </div>
               <div className="flex items-center space-x-4">
                  <span className="hover:text-gray-900 cursor-pointer transition">Sign In</span>
                  <span className="text-gray-300">|</span>
                  <span className="hover:text-gray-900 cursor-pointer transition">Join Us</span>
               </div>
            </div>
         </div>

         {/* Main Navbar */}
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex items-center space-x-8">
                  <NavLink to="/">
                     <div className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
                        MyStore
                     </div>
                  </NavLink>


                  {/* Categories Dropdown */}
                  <div className="relative hidden lg:block">
                     <button
                        onMouseEnter={() => setIsCategoryOpen(true)}
                        onMouseLeave={() => setIsCategoryOpen(false)}
                        className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition py-2"
                     >
                        <span>Categories</span>
                        <FaChevronDown
                           className={`w-3 h-3 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""
                              }`}
                        />
                     </button>

                     {isCategoryOpen && (
                        <div
                           onMouseEnter={() => setIsCategoryOpen(true)}
                           onMouseLeave={() => setIsCategoryOpen(false)}
                           className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                        >
                           {categories.map((category, index) => (
                              <a
                                 key={index}
                                 href="#"
                                 className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
                              >
                                 {category}
                              </a>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Nav Links */}
                  <div className="hidden lg:flex items-center space-x-8">
                     <a
                        href="/"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                     >
                        New Arrivals
                     </a>
                     <a
                        href="/shop"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                     >
                        Best Sellers
                     </a>
                     <a
                        href="/showcase"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                     >
                        Sale
                     </a>
                  </div>
               </div>

               {/* Search Bar */}
               <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
                  <div
                     className={`relative w-full transition-all duration-300 ${isSearchFocused ? "scale-105" : ""
                        }`}
                  >
                     <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                     <input
                        type="text"
                        placeholder="Search products..."
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-full text-sm focus:outline-none transition-all duration-300 ${isSearchFocused
                           ? "border-gray-900 bg-white shadow-lg"
                           : "border-gray-200 hover:bg-gray-100"
                           }`}
                     />
                  </div>
               </div>

               {/* Right Icons */}
               <div className="flex items-center space-x-4">
                  {/* Wishlist */}
                  <a href="/wishlist" className="group relative">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition">
                        <FaHeart className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition" />
                     </div>
                  </a>

                  {/* Cart */}
                  <a href="/cart" className="group relative">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition">
                        <FaShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition" />
                     </div>
                     {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                           {cartCount}
                        </span>
                     )}
                  </a>

                  {/* Profile */}
                  <a href="/profile" className="group">
                     <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition">
                        <FaUser className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition" />
                     </div>
                  </a>
               </div>
            </div>
         </div>
      </nav>
   );
}
