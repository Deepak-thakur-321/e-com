import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-white pt-12 pb-6 mt-6">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand & About */}
            <div className="text-white">
               <p className="text-2xl text-white font-bold mb-4">ShopMate</p>
               <p className="text-gray-400">
                  Curated collections for modern living. Experience premium quality and exclusive drops.
               </p>
               <div className="flex mt-4 space-x-3">
                  <a href="#" className="hover:text-white transition">
                     <FaFacebookF />
                  </a>
                  <a href="#" className="hover:text-white transition">
                     <FaInstagram />
                  </a>
                  <a href="#" className="hover:text-white transition">
                     <FaTwitter />
                  </a>
                  <a href="#" className="hover:text-white transition">
                     <FaLinkedinIn />
                  </a>
               </div>
            </div>

            {/* Quick Links */}
            <div>
               <p className="text-white font-semibold mb-4">Quick Links</p>
               <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Home</a></li>
                  <li><a href="#" className="hover:text-white transition">Shop</a></li>
                  <li><a href="#" className="hover:text-white transition">Collections</a></li>
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
               </ul>
            </div>

            {/* Customer Support */}
            <div>
               <p className="text-white font-semibold mb-4">Customer Support</p>
               <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition">Shipping & Delivery</a></li>
                  <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
                  <li><a href="#" className="hover:text-white transition">Payment Options</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
               </ul>
            </div>

            {/* Newsletter */}
            <div>
               <p className="text-white font-semibold mb-4">Newsletter</p>
               <p className="text-gray-400 mb-4">Subscribe to get latest updates and exclusive offers.</p>
               <form className="flex flex-col sm:flex-row gap-2">
                  <input
                     type="email"
                     placeholder="Your email"
                     className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none"
                  />
                  <button
                     type="submit"
                     className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                     Subscribe
                  </button>
               </form>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
         </div>
      </footer>
   );
};

export default Footer;
