import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   items: [],
   totalQuantity: 0,
   totalAmount: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem: (state, action) => {
         const product = action.payload;
         const existing = state.items.find((item) => item.id === product.id);

         if (existing) {
            existing.quantity += 1;
         } else {
            state.items.push({ ...product, quantity: 1 });
         }

         // update totals
         state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
         state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      decrementItem: (state, action) => {
         const item = state.items.find((i) => i.id === action.payload);
         if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
               state.items = state.items.filter((i) => i.id !== action.payload);
            }
         }

         state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
         state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      removeItem: (state, action) => {
         state.items = state.items.filter((item) => item.id !== action.payload);

         state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
         state.totalAmount = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      clearCart: (state) => {
         state.items = [];
         state.totalQuantity = 0;
         state.totalAmount = 0;
      },
   },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
