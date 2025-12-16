import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import collectionReducer from "./features/products/collectionProductSlice";
import allProductsReducer from "../app/features/products/allProductsCategorySlice";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      products: productReducer,
      collection: collectionReducer,
      allProducts: allProductsReducer,
   },
});

export default store;
