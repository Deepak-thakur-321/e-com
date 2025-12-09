// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import collectionReducer from "./features/products/collectionProductSlice";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      products: productReducer,
      collection: collectionReducer,
   },
});

export default store;
