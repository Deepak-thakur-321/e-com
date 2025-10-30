import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

export default function ProductDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [selectedImage, setSelectedImage] = useState(0);
   const [quantity, setQuantity] = useState(1);

   const products = useSelector((state) => state.products.items);
   const product = products.find((p) => p.id === parseInt(id));

   // Scroll to top when product changes
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [id]);

   if (!product) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
               <h2 className="text-2xl font-light text-gray-800 mb-4">Product not found</h2>
               <button
                  onClick={() => navigate("/")}
                  className="text-sm tracking-wider text-gray-600 hover:text-black transition underline"
               >
                  RETURN TO SHOP
               </button>
            </div>
         </div>
      );
   }

   // Similar products
   const similar = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

   // Mock multiple images (in real app, product would have multiple images)
   const productImages = [product.image, product.image, product.image];

   const handleAddToCart = () => {
      for (let i = 0; i < quantity; i++) {
         dispatch(addToCart(product));
      }
   };

   return (
      <div className="min-h-screen bg-white">
         {/* Breadcrumb */}
         <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
               <div className="flex items-center space-x-2 text-sm">
                  <button
                     onClick={() => navigate("/")}
                     className="text-gray-500 hover:text-black transition"
                  >
                     Home
                  </button>
                  <span className="text-gray-300">/</span>
                  <button
                     onClick={() => navigate(`/category/${product.category}`)}
                     className="text-gray-500 hover:text-black transition capitalize"
                  >
                     {product.category}
                  </button>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-900 font-medium truncate max-w-xs">
                     {product.name}
                  </span>
               </div>
            </div>
         </div>

         {/* Main Product Section */}
         <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
               {/* Left: Images */}
               <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative group">
                     <img
                        src={productImages[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  </div>

                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-3 gap-3">
                     {productImages.map((img, idx) => (
                        <button
                           key={idx}
                           onClick={() => setSelectedImage(idx)}
                           className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                 ? "border-black shadow-md"
                                 : "border-transparent hover:border-gray-300"
                              }`}
                        >
                           <img
                              src={img}
                              alt={`${product.name} view ${idx + 1}`}
                              className="w-full h-full object-cover"
                           />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Right: Product Info */}
               <div className="flex flex-col">
                  {/* Brand */}
                  {product.brand && (
                     <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
                        {product.brand}
                     </p>
                  )}

                  {/* Product Name */}
                  <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
                     {product.name}
                  </h1>

                  {/* Price */}
                  <div className="mb-8">
                     <div className="flex items-baseline space-x-3">
                        <span className="text-3xl font-semibold text-gray-900">
                           ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">Inclusive of all taxes</span>
                     </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                     <p className="text-gray-600 leading-relaxed">
                        {product.description ||
                           "Expertly crafted with meticulous attention to detail, this piece embodies sophistication and modern elegance. Designed for those who appreciate quality and timeless style."}
                     </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                     <label className="block text-sm font-medium text-gray-900 mb-3">
                        Quantity
                     </label>
                     <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                           <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition"
                           >
                              −
                           </button>
                           <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
                              {quantity}
                           </span>
                           <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition"
                           >
                              +
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 mb-10">
                     <button
                        onClick={handleAddToCart}
                        className="w-full py-4 bg-black text-white text-sm tracking-widest uppercase font-medium rounded-md hover:bg-gray-900 transition-all duration-300 hover:shadow-lg"
                     >
                        Add to Cart
                     </button>
                     <button
                        onClick={() => navigate("/cart")}
                        className="w-full py-4 border-2 border-black text-black text-sm tracking-widest uppercase font-medium rounded-md hover:bg-black hover:text-white transition-all duration-300"
                     >
                        View Cart
                     </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 pt-8 border-t border-gray-200">
                     <h3 className="text-sm tracking-widest text-gray-900 uppercase font-medium mb-4">
                        Product Features
                     </h3>
                     <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                           <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           <span className="text-gray-600 text-sm">Premium craftsmanship & materials</span>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           <span className="text-gray-600 text-sm">Complimentary shipping on orders above ₹2,999</span>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           <span className="text-gray-600 text-sm">Easy returns within 30 days</span>
                        </div>
                        <div className="flex items-start space-x-3">
                           <svg className="w-5 h-5 text-gray-900 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           <span className="text-gray-600 text-sm">1-year warranty & dedicated support</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Similar Products Section */}
         {similar.length > 0 && (
            <div className="bg-gray-50 py-16">
               <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-light text-gray-900 mb-10 text-center">
                     You May Also Like
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {similar.map((item) => (
                        <div
                           key={item.id}
                           onClick={() => navigate(`/product/${item.id}`)}
                           className="cursor-pointer group bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
                        >
                           <div className="aspect-square bg-gray-50 overflow-hidden">
                              <img
                                 src={item.image}
                                 alt={item.name}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                           </div>
                           <div className="p-4">
                              <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition truncate">
                                 {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                 ₹{item.price.toLocaleString()}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}