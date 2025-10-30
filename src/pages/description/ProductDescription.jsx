import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

export default function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const products = useSelector((state) => state.products.items); // adjust based on where your product data is
   const product = products.find((p) => p.id === parseInt(id));

   if (!product) {
      return (
         <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
            Product not found.
         </div>
      );
   }

   // Similar products: same category (excluding current product)
   const similar = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

   return (
      <div className="max-w-7xl mx-auto px-6 py-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-50 p-6">
               <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[450px] object-cover object-top hover:scale-105 transition-transform duration-500"
               />
            </div>

            {/* Product Info */}
            <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
               </h1>
               <p className="text-gray-500 mb-4">{product.brand}</p>
               <p className="text-2xl font-semibold text-blue-600 mb-6">
                  ₹{product.price.toLocaleString()}
               </p>

               <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description ||
                     "This premium product is crafted with top-quality materials and designed to deliver exceptional performance, durability, and style. Perfect for everyday use or as a thoughtful gift."}
               </p>

               <div className="flex items-center space-x-4">
                  <button
                     onClick={() => dispatch(addToCart(product))}
                     className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition"
                  >
                     Add to Cart
                  </button>
                  <button
                     onClick={() => navigate("/cart")}
                     className="px-6 py-3 border border-gray-800 rounded-full font-semibold hover:bg-gray-100 transition"
                  >
                     Go to Cart
                  </button>
               </div>

               <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                     Key Features:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                     <li>Premium build quality</li>
                     <li>Latest technology for smooth performance</li>
                     <li>1-year warranty & customer support</li>
                     <li>Fast delivery & easy returns</li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Similar Products Section */}
         <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
               You may also like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {similar.map((item) => (
                  <div
                     key={item.id}
                     onClick={() => navigate(`/product/${item.id}`)}
                     className="cursor-pointer group bg-white rounded-xl shadow hover:shadow-lg transition p-4"
                  >
                     <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-52 object-contain mb-3 rounded-lg group-hover:scale-105 transition-transform duration-300"
                     />
                     <h3 className="text-base font-semibold text-gray-800 group-hover:text-black transition">
                        {item.name}
                     </h3>
                     <p className="text-gray-600 text-sm mt-1">₹{item.price}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
