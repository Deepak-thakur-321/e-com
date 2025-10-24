// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//    items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
//    count: JSON.parse(localStorage.getItem("cart"))?.reduce((sum, i) => sum + i.quantity, 0) || 0,
// };

// const cartSlice = createSlice({
//    name: "cart",
//    initialState,
//    reducers: {
//       addItem: (state, action) => {
//          const item = action.payload;
//          const existingItem = state.items.find((i) => i.id === item.id);

//          if (existingItem) existingItem.quantity += 1;
//          else state.items.push({ ...item, quantity: 1 });

//          localStorage.setItem("cart", JSON.stringify(state.items));
//       },
//       decrementItem: (state, action) => {
//          const id = action.payload;
//          const existingItem = state.items.find((i) => i.id === id);

//          if (existingItem) {
//             if (existingItem.quantity > 1) existingItem.quantity -= 1;
//             else state.items = state.items.filter((i) => i.id !== id);
//          }

//          localStorage.setItem("cart", JSON.stringify(state.items));
//       },
//       removeItem: (state, action) => {
//          const id = action.payload;
//          state.items = state.items.filter((i) => i.id !== id);
//          localStorage.setItem("cart", JSON.stringify(state.items));
//       },
//       clearCart: (state) => {
//          state.items = [];
//          localStorage.removeItem("cart");
//       },
//    },
// });

// export const { addItem, removeItem, decrementItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
