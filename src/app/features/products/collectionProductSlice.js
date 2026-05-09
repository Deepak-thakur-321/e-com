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
         image: "https://i.pinimg.com/736x/1d/ab/64/1dab6417e94edbf4f1267e47e42c9395.jpg",
         images: [
            "https://i.pinimg.com/736x/1d/ab/64/1dab6417e94edbf4f1267e47e42c9395.jpg   ",
         ],
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
         image: "https://i.pinimg.com/736x/db/77/c3/db77c36139164f793db66ecab2dca0eb.jpg",
         images: [
            "https://i.pinimg.com/736x/db/77/c3/db77c36139164f793db66ecab2dca0eb.jpg",
         ],
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
         image: "https://i.pinimg.com/736x/35/6a/dd/356addb70b9d257c9a2a960d2073540a.jpg",
         images: [
            "https://i.pinimg.com/736x/35/6a/dd/356addb70b9d257c9a2a960d2073540a.jpg",
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
         image: "https://i.pinimg.com/736x/e4/99/17/e49917460888ec921c109ea87c08aee0.jpg",
         images: [
            "https://i.pinimg.com/736x/e4/99/17/e49917460888ec921c109ea87c08aee0.jpg",
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
         image: "https://i.pinimg.com/736x/52/08/b7/5208b7dc8afadc67e173b850123f351f.jpg",
         images: [
            "https://i.pinimg.com/736x/52/08/b7/5208b7dc8afadc67e173b850123f351f.jpg",
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
         image: "https://i.pinimg.com/736x/93/2c/25/932c256b9ab836369569c32568f842ca.jpg",
         images: [
            "https://i.pinimg.com/736x/93/2c/25/932c256b9ab836369569c32568f842ca.jpg",
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
         image: "https://i.pinimg.com/736x/be/ce/1d/bece1dcdf9f275c53f1a60b9f226cf17.jpg",
         images: [
            "https://i.pinimg.com/736x/be/ce/1d/bece1dcdf9f275c53f1a60b9f226cf17.jpg",
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
         image: "https://i.pinimg.com/736x/ba/8f/8a/ba8f8af906cbe50cb07af3d4c46bd504.jpg",
         images: [
            "https://i.pinimg.com/736x/ba/8f/8a/ba8f8af906cbe50cb07af3d4c46bd504.jpg",
         ],
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
      },
      {
         id: 9,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: 2779,
         originalPrice: 3499,
         discount: 21,
         category: "jackets",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/736x/eb/74/9a/eb749a60d899094f1df55db767715ae1.jpg",
         images: [
            "https://i.pinimg.com/736x/eb/74/9a/eb749a60d899094f1df55db767715ae1.jpg",
         ],
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
      },
      {
         id: 10,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: 2779,
         originalPrice: 3499,
         discount: 21,
         category: "jackets",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/736x/40/de/19/40de1965171a22e5993a9e7c7d8d5cd3.jpg",
         images: [
            "https://i.pinimg.com/736x/40/de/19/40de1965171a22e5993a9e7c7d8d5cd3.jpg",
         ],
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
      },
      {
         id: 11,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: 2779,
         originalPrice: 3499,
         discount: 21,
         category: "jackets",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/736x/be/38/73/be387323df5858a37227b1b760598997.jpg",
         images: [
            "https://i.pinimg.com/736x/be/38/73/be387323df5858a37227b1b760598997.jpg",
         ],
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
      },
      {
         id: 12,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: 2779,
         originalPrice: 3499,
         discount: 21,
         category: "jackets",
         tag: "Limited Edition",
         image: "https://i.pinimg.com/1200x/2c/52/e6/2c52e669787f5f4db48134b2d0c2925a.jpg",
         images: [
            "https://i.pinimg.com/1200x/2c/52/e6/2c52e669787f5f4db48134b2d0c2925a.jpg",
         ], 
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
      },
   ]
};

const collectProductSlice = createSlice({
   name: "collectionProducts",
   initialState,
   reducers: {},
});

export default collectProductSlice.reducer;
export const selectCollectionProducts = (state) => state.collection.products;
