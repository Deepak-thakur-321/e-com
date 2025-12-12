import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [
      { id: 1, name: 'Olive Green Essential Tee', price: 749, image: 'https://i.pinimg.com/1200x/03/7a/ea/037aea0187a20d0818d6320533355778.jpg', color: 'Olive', sizes: ['S', 'M', 'L', 'XL'], category: 'essentials' },

      { id: 2, name: 'Cream Classic Comfort Tee', price: 659, image: 'https://i.pinimg.com/736x/5a/c8/85/5ac885d681ed16a1f84db683722ddf21.jpg', color: 'Beige', sizes: ['M', 'L', 'XL', 'XXL'], category: 'vintage' },

      { id: 3, name: 'ACE White Performance Tee', price: 879, image: 'https://i.pinimg.com/1200x/98/60/5e/98605e2e9c5e3a35d8f7871f75162af1.jpg', color: 'White', sizes: ['S', 'M', 'L', 'XL'], category: 'oversized' },

      { id: 4, name: 'Maroon Premium Pocket Tee', price: 559, image: 'https://i.pinimg.com/1200x/cf/47/c8/cf47c89fe4846694322406a3e93e8048.jpg', color: 'Red', sizes: ['S', 'M', 'L'], category: 'premium' },

      { id: 5, name: 'Navy Blue Relaxed Fit Tee', price: 979, image: 'https://i.pinimg.com/736x/9e/79/c7/9e79c7086cb7604c456c5322a6ec8c1e.jpg', color: 'Navy', sizes: ['M', 'L', 'XL', 'XXL'], category: 'essentials' },

      { id: 6, name: 'Navy Dual-Pack Heritage Tees', price: 889, image: 'https://i.pinimg.com/1200x/94/53/b1/9453b1a807389cde21c5c0c6f3524dc7.jpg', color: 'Navy', sizes: ['S', 'M', 'L', 'XL'], category: 'heritage' },

      { id: 7, name: 'Black & Gold Graphic Duo Pack', price: 1079, image: 'https://i.pinimg.com/1200x/d1/ce/62/d1ce62523f2b1b6bd1e691d2b5b51947.jpg', color: 'Black', sizes: ['S', 'M', 'L', 'XL'], category: 'graphics' },

      { id: 8, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/03/5f/e3/035fe3006275340452f9891c81499ca0.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'minimal' },
   ]

}

export const tShirtCategorySlice = createSlice({
   name: 'tShirtCategory',
   initialState,
   reducers: {},
})

export default tShirtCategorySlice.reducer
export const tShirtCategoryProducts = (state) => state.tShirtCategory.products;
