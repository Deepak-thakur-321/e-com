// src/pages/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   incrementItem,
   removeItem,
   decrementItem,
   clearCart,
} from "../../app/features/cart/cartSlice";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiLock, FiTruck, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { items: cartItems, totalPrice } = useSelector((state) => state.cart);

   const handleIncrement = (product) => {
      dispatch(incrementItem(product.id));
   };

   const handleDecrement = (product) => {
      dispatch(decrementItem(product.id));
   };

   const handleRemove = (id) => {
      dispatch(removeItem(id));
   };

   const handleCheckout = () => {
      alert("Checkout Successful!");
      dispatch(clearCart());
      navigate("/");
   };

   const savings = (totalPrice * 0.1).toFixed(2);
   const estimatedTax = (totalPrice * 0.08).toFixed(2);
   const finalTotal = (parseFloat(totalPrice) + parseFloat(estimatedTax)).toFixed(2);

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
         {/* Premium Header */}
         <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex items-center justify-between">
                  <div>
                     <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
                        Shopping Bag
                     </h1>
                     <p className="text-sm text-gray-500 mt-1">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                     </p>
                  </div>
                  <FiShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {cartItems.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 lg:py-32">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                     <FiShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-3">Your bag is empty</h2>
                  <p className="text-gray-500 mb-8 text-center max-w-md">
                     Discover our curated collection of premium fashion pieces
                  </p>
                  <button
                     onClick={() => navigate("/")}
                     className="px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                  >
                     CONTINUE SHOPPING
                  </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Product List Section */}
                  <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                     {/* Trust Badges */}
                     <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                           <div className="flex flex-col items-center gap-2">
                              <FiTruck className="w-5 h-5 text-gray-900" />
                              <span className="text-xs text-gray-600">Free Shipping</span>
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <FiRefreshCw className="w-5 h-5 text-gray-900" />
                              <span className="text-xs text-gray-600">Easy Returns</span>
                           </div>
                           <div className="flex flex-col items-center gap-2 col-span-2 sm:col-span-1">
                              <FiLock className="w-5 h-5 text-gray-900" />
                              <span className="text-xs text-gray-600">Secure Payment</span>
                           </div>
                        </div>
                     </div>

                     {/* Cart Items */}
                     {cartItems.map((product) => (
                        <div
                           key={product.id}
                           className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 group"
                        >
                           <div className="p-4 sm:p-6">
                              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                 {/* Product Image */}
                                 <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                                    <img
                                       src={product.image}
                                       alt={product.title}
                                       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                 </div>

                                 {/* Product Details */}
                                 <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                       <h3 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight">
                                          {product.name}
                                       </h3>
                                       <p className="text-sm text-gray-500">
                                          SKU: {product.id}
                                       </p>
                                       <div className="flex items-center gap-4 pt-2">
                                          <span className="text-lg font-semibold text-gray-900">
                                             ₹{product.price.toLocaleString()}
                                          </span>
                                          {product.quantity > 1 && (
                                             <span className="text-sm text-gray-500">
                                                × {product.quantity}
                                             </span>
                                          )}
                                       </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-4">
                                       <div className="flex items-center border border-gray-300 divide-x divide-gray-300">
                                          <button
                                             onClick={() => handleDecrement(product)}
                                             disabled={product.quantity <= 1}
                                             className="p-2 sm:p-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                          >
                                             <FiMinus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                                          </button>

                                          <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-gray-900 min-w-[50px] text-center">
                                             {product.quantity}
                                          </span>

                                          <button
                                             onClick={() => handleIncrement(product)}
                                             className="p-2 sm:p-3 hover:bg-gray-50 transition-colors"
                                          >
                                             <FiPlus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                                          </button>
                                       </div>

                                       <button
                                          onClick={() => handleRemove(product.id)}
                                          className="text-gray-400 hover:text-red-600 transition-colors p-2"
                                       >
                                          <FiTrash2 className="w-5 h-5" />
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              {/* Subtotal for this item */}
                              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                 <span className="text-sm text-gray-500">Item Subtotal</span>
                                 <span className="text-lg font-semibold text-gray-900">
                                    ₹{(product.price * product.quantity).toLocaleString()}
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Order Summary Section */}
                  <div className="lg:col-span-5 xl:col-span-4">
                     <div className="bg-white border border-gray-200 sticky top-28">
                        <div className="p-6 sm:p-8">
                           <h2 className="text-xl font-medium text-gray-900 mb-6 tracking-tight">
                              Order Summary
                           </h2>

                           <div className="space-y-4 mb-6">
                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-600">Subtotal</span>
                                 <span className="text-gray-900 font-medium">
                                    ₹{totalPrice.toLocaleString()}
                                 </span>
                              </div>

                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-600">Shipping</span>
                                 <span className="text-green-600 font-medium">FREE</span>
                              </div>

                              <div className="flex justify-between text-sm">
                                 <span className="text-gray-600">Estimated Tax</span>
                                 <span className="text-gray-900 font-medium">
                                    ₹{parseFloat(estimatedTax).toLocaleString()}
                                 </span>
                              </div>

                              {savings > 0 && (
                                 <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                                    <span className="text-gray-600">You Save</span>
                                    <span className="text-green-600 font-medium">
                                       -₹{parseFloat(savings).toLocaleString()}
                                    </span>
                                 </div>
                              )}
                           </div>

                           <div className="pt-6 border-t border-gray-200">
                              <div className="flex justify-between items-baseline mb-8">
                                 <span className="text-lg font-medium text-gray-900">Total</span>
                                 <div className="text-right">
                                    <div className="text-2xl font-semibold text-gray-900">
                                       ₹{parseFloat(finalTotal).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                       Including all taxes
                                    </div>
                                 </div>
                              </div>

                              <button
                                 onClick={handleCheckout}
                                 className="w-full bg-gray-900 text-white py-4 text-sm font-medium tracking-widest hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
                              >
                                 <FiLock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                 SECURE CHECKOUT
                              </button>

                              <button
                                 onClick={() => navigate("/")}
                                 className="w-full mt-3 border border-gray-300 text-gray-900 py-4 text-sm font-medium tracking-widest hover:bg-gray-50 transition-all duration-300"
                              >
                                 CONTINUE SHOPPING
                              </button>
                           </div>

                           {/* Trust Indicators */}
                           <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                              <div className="flex items-start gap-3 text-xs text-gray-600">
                                 <FiLock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                 <span>Secure payment with 256-bit SSL encryption</span>
                              </div>
                              <div className="flex items-start gap-3 text-xs text-gray-600">
                                 <FiRefreshCw className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                 <span>30-day hassle-free returns & exchanges</span>
                              </div>
                              <div className="flex items-start gap-3 text-xs text-gray-600">
                                 <FiTruck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                 <span>Express delivery available at checkout</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default CartPage;