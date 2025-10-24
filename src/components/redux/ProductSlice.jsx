// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//    const res = await fetch("https://fakestoreapi.com/products");
//    const data = await res.json();
//    return data;
// });

// const initialState = {
//    items: [],
//    status: "idle",
//    error: null,
// };

// const productSlice = createSlice({
//    name: "products",
//    initialState,
//    extraReducers: (builder) => {
//       builder
//          .addCase(fetchProducts.pending, (state) => {
//             state.status = "loading";
//             state.error = null;
//          })
//          .addCase(fetchProducts.fulfilled, (state, action) => {
//             state.items = action.payload;
//             state.status = "success";
//          })
//          .addCase(fetchProducts.rejected, (state, action) => {
//             state.status = "failed";
//             state.error = action.error.message;
//          });
//    },
// });

// export default productSlice.reducer;
