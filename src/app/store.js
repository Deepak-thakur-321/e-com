import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import collectionReducer from "./features/products/collectionProductSlice";
import tShirtCategoryReducer from "./features/products/tShirtCategorySlice";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      products: productReducer,
      collection: collectionReducer,
      tShirtCategory: tShirtCategoryReducer,
   },
});

export default store;
