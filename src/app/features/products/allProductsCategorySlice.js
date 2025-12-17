import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [
      { id: 1, name: 'Olive Green Essential Tee', price: 749, image: 'https://i.pinimg.com/1200x/03/7a/ea/037aea0187a20d0818d6320533355778.jpg', color: 'Olive', sizes: ['S', 'M', 'L', 'XL'], category: 't-shirts' },

      { id: 2, name: 'Cream Classic Comfort Tee', price: 659, image: 'https://i.pinimg.com/736x/5a/c8/85/5ac885d681ed16a1f84db683722ddf21.jpg', color: 'Beige', sizes: ['M', 'L', 'XL', 'XXL'], category: 't-shirts' },

      { id: 3, name: 'ACE White Performance Tee', price: 879, image: 'https://i.pinimg.com/1200x/98/60/5e/98605e2e9c5e3a35d8f7871f75162af1.jpg', color: 'White', sizes: ['S', 'M', 'L', 'XL'], category: 't-shirts' },

      { id: 4, name: 'Maroon Premium Pocket Tee', price: 559, image: 'https://i.pinimg.com/1200x/cf/47/c8/cf47c89fe4846694322406a3e93e8048.jpg', color: 'Red', sizes: ['S', 'M', 'L'], category: 't-shirts' },

      { id: 5, name: 'Navy Blue Relaxed Fit Tee', price: 979, image: 'https://i.pinimg.com/736x/9e/79/c7/9e79c7086cb7604c456c5322a6ec8c1e.jpg', color: 'Navy', sizes: ['M', 'L', 'XL', 'XXL'], category: 't-shirts' },

      { id: 6, name: 'Navy Dual-Pack Heritage Tees', price: 889, image: 'https://i.pinimg.com/1200x/94/53/b1/9453b1a807389cde21c5c0c6f3524dc7.jpg', color: 'Navy', sizes: ['S', 'M', 'L', 'XL'], category: 't-shirts' },

      { id: 7, name: 'Black & Gold Graphic Duo Pack', price: 1079, image: 'https://i.pinimg.com/1200x/d1/ce/62/d1ce62523f2b1b6bd1e691d2b5b51947.jpg', color: 'Black', sizes: ['S', 'M', 'L', 'XL'], category: 't-shirts' },

      { id: 8, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/03/5f/e3/035fe3006275340452f9891c81499ca0.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 't-shirts' },

      { id: 9, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/2e/34/c5/2e34c5886b9f908b94b6ee45b67a93e1.jpg', color: 'Olive', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 10, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/59/4e/c4/594ec47f45326d1fc45dfa5af61d1f54.jpg', color: 'Dark yellow', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 11, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/87/8f/6d/878f6d2e49a303563162411d9ea2a06c.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 12, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/34/fe/aa/34feaa2a61ac7bb17dfd639381aa34d5.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 13, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/2c/04/db/2c04dbbb5c389ca80d592d48b3698cdf.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 14, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/91/7e/de/917edec06c9b2e7fe36aba29b01d0a83.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 15, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/54/27/4a/54274a0ebe46c71e2d58ff1d57b6b706.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 16, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/83/3a/2f/833a2fc178d34408c7be6ddbbdc39f78.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shirts' },

      { id: 17, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/6b/2a/f8/6b2af8d9f91d64a1623e39dd96d1dbc8.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 18, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/6a/18/b3/6a18b303b97fbb9385b9ceb7d9c2b18e.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 19, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/71/53/77/7153779a20fbe6dcaf829393b35c08a6.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 20, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/91/e5/72/91e572d6a29d1114f61ed698d293f0ef.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 21, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/be/76/10/be7610834ea4fc245c1f170ceae8de78.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 22, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/80/5b/9b/805b9b9febd3af990fc6249d3d268613.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 23, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/85/df/9a/85df9ab5b7fca7f62cba6b619dc563ed.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 24, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/46/ba/f3/46baf39cb9c7869cdaac5abc3cf233d0.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jackets' },

      { id: 25, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/da/6d/8d/da6d8d670f496213cbe1a9c7d6868461.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 26, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/6b/ca/70/6bca70fc5173dcc4ad831f89c5d07d85.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 27, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/22/49/42/224942da0af747a30eb13530e05bbed9.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 28, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/d1/ac/87/d1ac871a188d7b3397db51e0912ba325.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 29, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/29/8e/84/298e843b4e8e00d02e2a8b1b9b592203.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 30, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/26/c2/05/26c205d639f1b3a5840b38ef70a5c814.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 31, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/25/26/71/252671deebf80c1e679226ee9ed0baf0.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 32, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/10/07/af/1007afbde676b67d61ede9249b93e11d.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'jeans' },

      { id: 33, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/fc/16/ef/fc16ef83e035eea32468ddea37027957.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 34, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/ec/d6/f1/ecd6f1429e880903d21d4227d060787d.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 35, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/90/dc/a7/90dca7328d5985cd59113283a6858815.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 36, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/474x/9c/ab/32/9cab327c6123512416d86c43d1ca7397.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 37, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/70/87/bf/7087bfebfdcba374321a999e84640688.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 38, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/79/4e/34/794e34a7639ab87976303e895cf63396.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 39, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/98/8b/b2/988bb23d1b7619f0e8602b863cf9a98a.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 40, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/be/b0/6d/beb06d250890468c9df7986722d6d67f.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'bags' },

      { id: 41, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/79/0f/cd/790fcde05bd047f52b4ef81ed03d64a1.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 42, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/d3/1f/3a/d31f3ad3bab78dff5514f4a208eeb78b.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 43, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/e8/22/a7/e822a796618d9cdace880c84fd360b1d.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 44, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/f3/f5/f5/f3f5f5075ffce8c24cb059f413f1031e.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 45, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/55/fd/b5/55fdb573e653fd6b2b5615615b31e25c.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 46, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/a3/43/fd/a343fdb4efe4e4d4b09d8d233c4b8f98.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 47, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/e7/be/08/e7be08f735dcca6eed803f1f2cf3b649.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 48, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/474x/6e/b9/c7/6eb9c75267e22b74c54a7c7aaae578e1.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'shoes' },

      { id: 49, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/ee/c1/00/eec100a81c32984ace73a7677227375c.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 50, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/f0/50/11/f0501104abb954a42fd237d904e22d4e.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 51, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/7d/d6/0f/7dd60fb7b4c97ae1e1759fb4f7ab663f.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 52, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/0d/07/9f/0d079fc13bb82481dc75e9cd49ab5f22.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 53, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/a6/39/03/a6390367605098b6fbac9ecf811d41c6.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 54, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/d6/5d/f6/d65df649f97afd7607aa09a62dc5ef40.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 55, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/f5/32/15/f532157746cb277d5c397c2e83884915.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 56, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/3e/07/69/3e07697c295a2c3eb29b719ed6dc7e00.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'watches' },

      { id: 56, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/a6/20/62/a62062b1e2da048a0007ea5baa8bf872.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 57, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/ca/88/8e/ca888eb066b9be9c15dcf91bd73c407d.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 58, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/da/5c/63/da5c63dac4247f774b6d65352cda748e.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 59, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/29/78/4b/29784be153a81dca7c99569bc7c44239.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 60, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/b3/09/dd/b309dd89ac745f2a7e7e33796181d220.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 61, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/c4/af/52/c4af5237d8c54fe14d0f78458e1f656d.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 62, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/1200x/2a/61/38/2a6138d9a02d76bf4364918e0b6546e8.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },

      { id: 63, name: 'White & Gold Minimal Duo Pack', price: 2229, image: 'https://i.pinimg.com/736x/7f/57/ba/7f57ba344963c64f7665f375ac98caf4.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'caps' },





   ]

}

const allProductsSlice = createSlice({
   name: "allProducts",
   initialState,
   reducers: {},
});

export default allProductsSlice.reducer;
export const selectAllProducts = (state) => state.allProducts.products;
