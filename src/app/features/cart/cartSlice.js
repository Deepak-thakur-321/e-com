// src/app/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage, saveCartToLocalStorage, calculateTotals } from "./cartUtils";

const persisted = getCartFromLocalStorage();

const initialState = {
   items: persisted.items || [],
   totalQuantity: persisted.totalQuantity || 0,
   totalPrice: persisted.totalPrice || 0,
};

const findIndex = (items, id) => items.findIndex(i => i.id === id);

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart(state, action) {
         // payload: { id, title, price, image?, ... }
         const product = action.payload;
         const idx = findIndex(state.items, product.id);
         if (idx >= 0) {
            // already exists -> increment quantity
            state.items[idx].quantity += 1;
         } else {
            state.items.push({ ...product, quantity: 1 });
         }
         const totals = calculateTotals(state.items);
         state.totalQuantity = totals.totalQuantity;
         state.totalPrice = totals.totalPrice;
         saveCartToLocalStorage(state.items);
      },

      incrementItem(state, action) {
         const id = action.payload;
         const idx = findIndex(state.items, id);
         if (idx >= 0) {
            state.items[idx].quantity += 1;
            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToLocalStorage(state.items);
         }
      },

      decrementItem(state, action) {
         const id = action.payload;
         const idx = findIndex(state.items, id);
         if (idx >= 0) {
            if (state.items[idx].quantity > 1) {
               state.items[idx].quantity -= 1;
            } else {
               // remove completely
               state.items.splice(idx, 1);
            }
            const totals = calculateTotals(state.items);
            state.totalQuantity = totals.totalQuantity;
            state.totalPrice = totals.totalPrice;
            saveCartToLocalStorage(state.items);
         }
      },

      removeItem(state, action) {
         const id = action.payload;
         state.items = state.items.filter(i => i.id !== id);
         const totals = calculateTotals(state.items);
         state.totalQuantity = totals.totalQuantity;
         state.totalPrice = totals.totalPrice;
         saveCartToLocalStorage(state.items);
      },

      clearCart(state) {
         state.items = [];
         state.totalQuantity = 0;
         state.totalPrice = 0;
         saveCartToLocalStorage(state.items);
      },

      // Optional: replace entire cart (useful for sync)
      setCart(state, action) {
         state.items = action.payload || [];
         const totals = calculateTotals(state.items);
         state.totalQuantity = totals.totalQuantity;
         state.totalPrice = totals.totalPrice;
         saveCartToLocalStorage(state.items);
      }
   }
});

export const { addToCart, incrementItem, decrementItem, removeItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
