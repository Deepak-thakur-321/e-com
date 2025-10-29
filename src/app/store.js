import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/ProductsSlice";



const store = configureStore({
   reducer: {
      cart: cartReducer,         // ✅ correct key name
      products: productsReducer, // ✅ matches your useSelector
   },
});

console.log("STORE INITIALIZED:", store.getState());
export default store;
