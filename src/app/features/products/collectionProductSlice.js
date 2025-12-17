import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [
      {
         id: 1,
         name: "Infinite Classic Cap",
         price: 699,
         originalPrice: 999,
         discount: 30,
         category: "caps",
         tag: "New Arrival",
         image: "https://i.pinimg.com/1200x/cc/a2/ec/cca2ece0d2002f73e8a37027d9e45d73.jpg",
         images: [
            "https://i.pinimg.com/1200x/cc/a2/ec/cca2ece0d2002f73e8a37027d9e45d73.jpg",
            "https://i.pinimg.com/736x/34/c6/b0/34c6b0f6adff9b8b3ba0832c63cc1f19.jpg"
         ],
         hoverImage: "https://i.pinimg.com/736x/34/c6/b0/34c6b0f6adff9b8b3ba0832c63cc1f19.jpg",
         description: "High quality classic cap made for every occasion.",
         features: ["Lightweight", "Adjustable strap", "Durable stitching"],
         specifications: { Material: "Cotton", Fit: "One Size" },
         sizes: ["S", "M", "L"],
         colors: [
            { name: "black", hex: "#000000" },
            { name: "white", hex: "#FFFFFF" }
         ],
         rating: 4.5,
         reviews: 120
      },
      {
         id: 2,
         name: "Midnight Luxe Hoodie",
         price: 1499,
         originalPrice: 1799,
         discount: 17,
         category: "hoodies",
         tag: "Limited",
         image: "https://i.pinimg.com/736x/d6/9e/91/d69e919897a74e6ec1ca927ad3df5f81.jpg",
         images: [
            "https://i.pinimg.com/736x/d6/9e/91/d69e919897a74e6ec1ca927ad3df5f81.jpg",
            "https://i.pinimg.com/1200x/96/83/79/968379f61ed0ed9eec4d286fdcdebda5.jpg"
         ],
         hoverImage: "https://i.pinimg.com/1200x/96/83/79/968379f61ed0ed9eec4d286fdcdebda5.jpg",
         description: "Soft, premium hoodie with a luxury feel.",
         features: ["Comfortable", "Durable stitching", "Stylish design"],
         specifications: { Material: "Fleece", Fit: "Regular" },
         sizes: ["S", "M", "L", "XL"],
         colors: [
            { name: "black", hex: "#000000" },
            { name: "navy", hex: "#001F3F" }
         ],
         rating: 4.2,
         reviews: 80
      },
      {
         id: 3,
         name: "Classic Oxford White",
         price: 1999,
         originalPrice: 2499,
         discount: 20,
         category: "shirts",
         tag: "Bestseller",
         image: "https://i.pinimg.com/736x/4a/35/20/4a3520d4c40991cab3d14543be2c8f05.jpg",
         images: [
            "https://i.pinimg.com/736x/4a/35/20/4a3520d4c40991cab3d14543be2c8f05.jpg",
            "https://i.pinimg.com/1200x/2f/db/b0/2fdbb070c58594f6afcdc1b160eb10df.jpg"
         ],
         description: "Classic Oxford shirt for formal and casual occasions.",
         features: ["Breathable fabric", "Slim fit", "Easy care"],
         specifications: { Material: "Cotton", Fit: "Slim" },
         sizes: ["S", "M", "L", "XL"],
         colors: [
            { name: "white", hex: "#FFFFFF" },
            { name: "olive", hex: "#556B2F" }




         ],
         rating: 4.7,
         reviews: 200
      },
      {
         id: 4,
         name: "Asian Signature White Shoes",
         price: 1299,
         originalPrice: 1599,
         discount: 19,
         category: "shoes",
         tag: "Luxury",
         image: "https://i.pinimg.com/736x/21/07/1e/21071e51f3e74416cfbe18fa9283c2c3.jpg",
         images: [
            "https://i.pinimg.com/736x/21/07/1e/21071e51f3e74416cfbe18fa9283c2c3.jpg",
            "https://i.pinimg.com/736x/b9/04/e0/b904e0a9d99fb25c13e48a424130b61f.jpg"
         ],
         description: "Comfortable and stylish white shoes from Asian.",
         features: ["Durable sole", "Comfort fit", "Lightweight"],
         specifications: { Material: "Leather", Fit: "Regular" },
         sizes: ["7", "8", "9", "10"],
         colors: [
            { name: "white", hex: "#FFFFFF" },
            { name: "black", hex: "#000000" }
         ],
         rating: 4.3,
         reviews: 95
      },
      {
         id: 5,
         name: "Navy Tech-Flex Track Set",
         price: 1999,
         originalPrice: 2499,
         discount: 20,
         category: "trousers",
         tag: "Bestseller",
         image: "https://i.pinimg.com/736x/6b/18/09/6b1809b55980111891b4452db778b423.jpg",
         images: [
            "https://i.pinimg.com/736x/6b/18/09/6b1809b55980111891b4452db778b423.jpg",
            "https://i.pinimg.com/736x/51/59/3d/51593ddd0ae415c387644b0d71249e88.jpg"
         ],
         description: "Tech-Flex track set for comfort and style.",
         features: ["Breathable fabric", "Stretchable", "Easy care"],
         specifications: { Material: "Polyester", Fit: "Regular" },
         sizes: ["S", "M", "L", "XL"],
         colors: [
            { name: "navy", hex: "#001F3F" },
            { name: "black", hex: "#000000" }
         ],
         rating: 4.6,
         reviews: 110
      },
      {
         id: 6,
         name: "Jersey Rich Look T-Shirt",
         price: 699,
         originalPrice: 899,
         discount: 22,
         category: "t-shirt",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/736x/60/3c/f6/603cf6a9c02f3b45d9bc392baf87eb87.jpg",
         images: [
            "https://i.pinimg.com/736x/60/3c/f6/603cf6a9c02f3b45d9bc392baf87eb87.jpg",
            "https://i.pinimg.com/736x/78/24/96/78249624cef6d365b8bc6388bb6c274a.jpg"
         ],

         description: "Premium jersey t-shirt with a rich look.",
         features: ["Soft fabric", "Slim fit", "Durable stitching"],
         specifications: { Material: "Cotton", Fit: "Slim" },
         sizes: ["S", "M", "L"],
         colors: [
            { name: "black", hex: "#000000" },
            { name: "white", hex: "#FFFFFF" }
         ],
         rating: 4.1,
         reviews: 70
      },
      {
         id: 7,
         name: "Carhartt Utility Workwear One-Piece",
         price: 2469,
         originalPrice: 2999,
         discount: 18,
         category: "dresses",
         tag: "Bestseller",
         image: "https://i.pinimg.com/1200x/07/f3/2f/07f32faf29cdc0192992ca7cd86b98aa.jpg",
         images: [
            "https://i.pinimg.com/1200x/07/f3/2f/07f32faf29cdc0192992ca7cd86b98aa.jpg",
            "https://i.pinimg.com/736x/37/09/b0/3709b00d65990153dbbf0030f2b4d4d5.jpg"
         ],
         description: "Durable and stylish one-piece workwear.",
         features: ["Comfort fit", "Durable material", "Easy to wear"],
         specifications: { Material: "Denim", Fit: "Regular" },
         sizes: ["S", "M", "L", "XL"],
         colors: [
            { name: "blue", hex: "#1E40AF" },
            { name: "black", hex: "#000000" }
         ],
         rating: 4.4,
         reviews: 85
      },
      {
         id: 8,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: 2779,
         originalPrice: 3499,
         discount: 21,
         category: "jackets",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/736x/db/d3/00/dbd300aff5a04fdd2b9d48f643561be9.jpg",
         images: [
            "https://i.pinimg.com/736x/db/d3/00/dbd300aff5a04fdd2b9d48f643561be9.jpg",
            "https://i.pinimg.com/736x/0f/42/23/0f42232b6316088804a7dd51300b6ea6.jpg"
         ],
         hoverImage: "https://i.pinimg.com/736x/0f/42/23/0f42232b6316088804a7dd51300b6ea6.jpg",
         description: "Premium leather varsity jacket for modern style.",
         features: ["Durable leather", "Warm lining", "Stylish design"],
         specifications: { Material: "Leather", Fit: "Regular" },
         sizes: ["S", "M", "L", "XL"],
         colors: [
            { name: "black", hex: "#000000" },
            { name: "brown", hex: "#654321" }
         ],
         rating: 4.8,
         reviews: 150
      }
   ]
};

const collectProductSlice = createSlice({
   name: "collectionProducts",
   initialState,
   reducers: {},
});

export default collectProductSlice.reducer;
export const selectCollectionProducts = (state) => state.collection.products;
