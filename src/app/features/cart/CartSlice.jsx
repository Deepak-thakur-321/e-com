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
            state.items.push({
               ...product,
               quantity: product.quantity ? product.quantity : 1,
            });
         }

         // ✅ Recalculate totals in one pass
         let totalQ = 0;
         let totalA = 0;
         state.items.forEach((item) => {
            totalQ += item.quantity;
            totalA += item.price * item.quantity;
         });

         state.totalQuantity = totalQ;
         state.totalAmount = totalA;

         console.log("🟢 addItem →", { added: product, updatedCart: state.items });
      },

      decrementItem: (state, action) => {
         const id = action.payload;
         const existing = state.items.find((item) => item.id === id);

         if (existing) {
            existing.quantity -= 1;
            if (existing.quantity <= 0) {
               state.items = state.items.filter((i) => i.id !== id);
            }
         }

         // Recalculate totals
         let totalQ = 0;
         let totalA = 0;
         state.items.forEach((item) => {
            totalQ += item.quantity;
            totalA += item.price * item.quantity;
         });

         state.totalQuantity = totalQ;
         state.totalAmount = totalA;

         console.log("🟡 decrementItem →", id);
      },

      removeItem: (state, action) => {
         const id = action.payload;
         state.items = state.items.filter((item) => item.id !== id);

         // Recalculate totals
         let totalQ = 0;
         let totalA = 0;
         state.items.forEach((item) => {
            totalQ += item.quantity;
            totalA += item.price * item.quantity;
         });

         state.totalQuantity = totalQ;
         state.totalAmount = totalA;

         console.log("🔴 removeItem →", id);
      },

      clearCart: (state) => {
         state.items = [];
         state.totalQuantity = 0;
         state.totalAmount = 0;
         console.log("⚪ clearCart → Cart emptied");
      },
   },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
