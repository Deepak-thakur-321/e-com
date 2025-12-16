import React, { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductsCards = () => {
   const [favorites, setFavorites] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const products = useSelector((state) => state.products.items || []);
   const cartItems = useSelector((state) => state.cart.items || []);

   console.log("🛒 Current Cart Items:", cartItems);
   console.log("Loaded Products:", products);

   // ✅ Toggle favorite handler
   const toggleFavorite = (id) => {
      setFavorites((prev) =>
         prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );
   };

   // ✅ Add product to cart
   const handleAddToCart = (product) => {
      if (!product?.id) {
         console.error("❌ Product missing ID:", product);
         return;
      }
      dispatch(addToCart({ ...product, quantity: 1 }));
      console.log("✅ Added to Cart:", product);
   };


   return (
      <section className="bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100 lg:mt-10">
         <div className="max-w-9xl mx-auto px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
               <div className="max-w-2xl">
                  <span className="inline-block lg:hidden px-4 py-1.5 bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide rounded-full mb-3 uppercase">
                     Collaborative Creations
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                     Where Brands & <span className="text-blue-600">Artistry Unite</span>
                  </h2>
               </div>

               <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-300">
                     Explore the Collection
                  </button>
                  <button className="px-6 py-3 border border-blue-700 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-300">
                     Learn More
                  </button>
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {products.map((product) => (
                  <div
                     key={product.id}
                     className="group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]"
                  >
                     {/* Product Image (clickable) */}
                     <div
                        className="relative overflow-hidden aspect-[4/5] cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)} // ✅ FIXED
                     >
                        <img
                           src={product.image}
                           alt={product.name}
                           className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110"
                        />

                        {/* Favorite Button */}
                        <button
                           onClick={(e) => {
                              e.stopPropagation(); // ✅ stops card navigation
                              toggleFavorite(product.id);
                           }}
                           className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
                        >
                           <Heart
                              className={`w-5 h-5 ${favorites.includes(product.id)
                                 ? "fill-red-500 text-red-500"
                                 : "text-slate-400"
                                 }`}
                           />
                        </button>
                     </div>

                     {/* Product Info (clickable except Add to Cart) */}
                     <div
                        className="p-6 flex-1 flex flex-col justify-between cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)} // ✅ FIXED
                     >
                        <div>
                           {/* Rating */}
                           <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                 <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating)
                                       ? "fill-yellow-400 text-yellow-400"
                                       : "text-slate-300"
                                       }`}
                                 />
                              ))}
                              <span className="text-sm text-slate-600 ml-2">
                                 ({product.reviews})
                              </span>
                           </div>

                           {/* Name + Brand */}
                           <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                              {product.name}
                           </h3>
                           <p className="text-sm text-gray-500 mb-4 font-medium">
                              {product.brand}
                           </p>

                           {/* Price */}
                           <div className="flex items-center gap-3 mb-4">
                              <span className="text-2xl font-extrabold text-gray-900">
                                 ₹{product.price}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                 ₹{product.originalPrice}
                              </span>
                              <span className="ml-auto text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                 {Math.round(
                                    ((product.originalPrice - product.price) /
                                       product.originalPrice) *
                                    100
                                 )}
                                 % OFF
                              </span>
                           </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                           onClick={(e) => {
                              e.stopPropagation(); // ✅ prevents navigation
                              handleAddToCart(product);
                           }}
                           className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                           <ShoppingBag className="w-5 h-5" />
                           Add to Cart
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ProductsCards;
