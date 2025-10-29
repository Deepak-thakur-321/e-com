import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, decrementItem, clearCart } from "../../app/features/cart/cartSlice";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const cartItems = useSelector((state) => state.cart.items || []);
   // const state = useSelector((state) => state);

   console.log("Cart Component Items:", cartItems);
   // console.log("Full Redux State:", state);

   useEffect(() => {
      console.log("Cart re-rendered with items:", cartItems);
   }, [cartItems]);

   // 🔹 Handlers
   const handleIncrement = (item) => dispatch(addItem(item));
   const handleDecrement = (id) => dispatch(decrementItem(id));
   const handleRemove = (id) => dispatch(removeItem(id));

   const handleCheckout = () => {
      alert("Checkout Successful!");
      dispatch(clearCart());
      navigate("/");
   };

   // 🔹 Total Price
   const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );

   return (
      <div className="max-w-6xl mx-auto mt-10 px-4 md:px-6 lg:px-8">
         <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Your Shopping Cart
         </h2>

         {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
         ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* 🔹 Left Section — Product List */}
               <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-lg p-6 max-h-[70vh] overflow-y-auto">
                  {cartItems.map((item) => (
                     <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-none"
                     >
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                           <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain rounded-xl bg-gray-50"
                           />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                           <h3 className="text-lg font-semibold text-gray-900">
                              {item.name}
                           </h3>
                           <p className="text-sm text-gray-500 mt-1">
                              ₹{item.price}
                           </p>

                           {/* Quantity Controls */}
                           <div className="flex items-center mt-3 bg-gray-100 rounded-lg w-max">
                              <button
                                 onClick={() => handleDecrement(item.id)}
                                 disabled={item.quantity <= 1}
                                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                 <FiMinus className="w-4 h-4 text-gray-700" />
                              </button>

                              <span className="px-4 py-2 text-gray-900 font-semibold">
                                 {item.quantity}
                              </span>

                              <button
                                 onClick={() => handleIncrement(item)}
                                 className="p-2 hover:bg-gray-200 transition-colors"
                              >
                                 <FiPlus className="w-4 h-4 text-gray-700" />
                              </button>
                           </div>
                        </div>

                        {/* Price + Remove */}
                        <div className="flex flex-col items-end">
                           <p className="text-lg font-bold text-gray-900 mb-2">
                              ₹{(item.price * item.quantity).toFixed(2)}
                           </p>
                           <button
                              onClick={() => handleRemove(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                           >
                              <FiTrash2 className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* 🔹 Right Section — Summary */}
               <div className="bg-white rounded-3xl shadow-lg p-6 h-max sticky top-6 border-b">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                     Order Summary
                  </h3>

                  <div className="flex justify-between text-gray-600 mb-2">
                     <span>Subtotal</span>
                     <span>₹{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 mb-2">
                     <span>Shipping</span>
                     <span className="text-green-600 font-semibold">Free</span>
                  </div>

                  <hr className="my-4" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                     <span>Total</span>
                     <span>₹{totalPrice.toFixed(2)}</span>
                  </div>

                  <button
                     onClick={handleCheckout}
                     className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                     Proceed to Checkout
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Cart;
