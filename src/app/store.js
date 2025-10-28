import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      products: productReducer,
   },
});

export default store;
