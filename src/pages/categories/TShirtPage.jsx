import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

export default function TShirtCollection() {
   const [cart, setCart] = useState([]);
   const [filterOpen, setFilterOpen] = useState(false);
   const [selectedSize, setSelectedSize] = useState('all');
   const [selectedColor, setSelectedColor] = useState('all');
   const [sortBy, setSortBy] = useState('featured');
   const [wishlist, setWishlist] = useState([]);

   const products = [
      { id: 1, name: 'Essential Cotton Tee', price: 49, image: 'https://i.pinimg.com/1200x/03/7a/ea/037aea0187a20d0818d6320533355778.jpg', color: 'Olive', sizes: ['S', 'M', 'L', 'XL'], category: 'essentials' },
      { id: 2, name: 'Vintage Wash Tee', price: 59, image: 'https://i.pinimg.com/736x/5a/c8/85/5ac885d681ed16a1f84db683722ddf21.jpg', color: 'Beige', sizes: ['M', 'L', 'XL', 'XXL'], category: 'vintage' },
      { id: 3, name: 'Oversized Fit Tee', price: 65, image: 'https://i.pinimg.com/1200x/98/60/5e/98605e2e9c5e3a35d8f7871f75162af1.jpg', color: 'White', sizes: ['S', 'M', 'L', 'XL'], category: 'oversized' },
      { id: 4, name: 'Premium Pocket Tee', price: 55, image: 'https://i.pinimg.com/1200x/cf/47/c8/cf47c89fe4846694322406a3e93e8048.jpg', color: 'Red', sizes: ['S', 'M', 'L'], category: 'premium' },
      { id: 5, name: 'Relaxed Fit Tee', price: 52, image: 'https://i.pinimg.com/736x/9e/79/c7/9e79c7086cb7604c456c5322a6ec8c1e.jpg', color: 'Navy', sizes: ['M', 'L', 'XL', 'XXL'], category: 'essentials' },
      { id: 6, name: 'Heritage Box Tee', price: 68, image: 'https://i.pinimg.com/1200x/94/53/b1/9453b1a807389cde21c5c0c6f3524dc7.jpg', color: 'Navy', sizes: ['S', 'M', 'L', 'XL'], category: 'heritage' },
      { id: 7, name: 'Graphic Print Tee', price: 72, image: 'https://i.pinimg.com/1200x/d1/ce/62/d1ce62523f2b1b6bd1e691d2b5b51947.jpg', color: 'Black', sizes: ['S', 'M', 'L', 'XL'], category: 'graphics' },
      { id: 8, name: 'Minimal Crew Tee', price: 58, image: 'https://i.pinimg.com/736x/03/5f/e3/035fe3006275340452f9891c81499ca0.jpg', color: 'White', sizes: ['M', 'L', 'XL'], category: 'minimal' },
   ];

   const addToCart = (product) => {
      setCart([...cart, product]);
   };

   const toggleWishlist = (id) => {
      setWishlist(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
   };

   const filteredProducts = products.filter(p => {
      if (selectedColor !== 'all' && p.color !== selectedColor) return false;
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;
      return true;
   });

   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <div className="relative h-[70vh] bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
            <div className="absolute inset-0"></div>
            <img
               src="https://i.pinimg.com/736x/a2/fd/92/a2fd928aedeae3310dfb4c53cd0d4c64.jpg"
               alt="T-Shirt Collection"
               className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
               <p className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white">T-SHIRT COLLECTION</p>
               <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl text-center">
                  Timeless essentials crafted for everyday comfort and elevated style
               </p>
               <div className="flex gap-4">
                  <button className="bg-white rounded-xl text-black px-8 py-3 font-semibold hover:bg-gray-100 transition">
                     SHOP NOW
                  </button>
                  <button className="border-2 rounded-xl border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition">
                     EXPLORE
                  </button>
               </div>
            </div>
         </div>

         {/* Filter Bar */}
         <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-6">
                     <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 text-md font-medium hover:text-gray-600"
                     >
                        <SlidersHorizontal className="w-4 h-4" />
                        FILTER
                     </button>
                     <span className="text-md text-gray-500">{filteredProducts.length} Products</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-md cursor-pointer"
                     >
                        <option value="featured">FEATURED</option>
                        <option value="low">PRICE: LOW TO HIGH</option>
                        <option value="high">PRICE: HIGH TO LOW</option>
                        <option value="new">NEWEST</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* Mobile Filter Overlay */}
         {filterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
               <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold">FILTERS</h3>
                     <button onClick={() => setFilterOpen(false)}>
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                  <FilterContent
                     selectedSize={selectedSize}
                     setSelectedSize={setSelectedSize}
                     selectedColor={selectedColor}
                     setSelectedColor={setSelectedColor}
                  />
               </div>
            </div>
         )}

         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex gap-8">
               {/* Desktop Filters */}
               <div className="hidden lg:block w-64 flex-shrink-0">
                  <FilterContent
                     selectedSize={selectedSize}
                     setSelectedSize={setSelectedSize}
                     selectedColor={selectedColor}
                     setSelectedColor={setSelectedColor}
                  />
               </div>

               {/* Product Grid */}
               <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {filteredProducts.map(product => (
                        <div key={product.id} className="group">
                           <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-[3/4]">
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              />
                              <button
                                 onClick={() => toggleWishlist(product.id)}
                                 className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                              >
                                 <Heart
                                    className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-black' : ''}`}
                                 />
                              </button>
                              <button
                                 onClick={() => addToCart(product)}
                                 className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 font-semibold opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-2"
                              >
                                 <ShoppingCart className="w-4 h-4" />
                                 ADD TO CART
                              </button>
                           </div>
                           <div className="space-y-1">
                              <h3 className="font-semibold text-sm uppercase tracking-wide">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.color}</p>
                              <p className="font-bold">${product.price}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Features Section */}
         <div className="bg-gray-50 py-16">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 uppercase">Premium Cotton</h3>
                     <p className="text-sm text-gray-600">100% organic cotton for ultimate comfort and breathability</p>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 uppercase">Perfect Fit</h3>
                     <p className="text-sm text-gray-600">Designed for the modern silhouette with attention to detail</p>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 uppercase">Built to Last</h3>
                     <p className="text-sm text-gray-600">Reinforced stitching and fade-resistant dyes for longevity</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Cart Notification */}
         {cart.length > 0 && (
            <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 z-50">
               <ShoppingCart className="w-5 h-5" />
               <span className="font-semibold">{cart.length} item(s) in cart</span>
            </div>
         )}
      </div>
   );
}

function FilterContent({ selectedSize, setSelectedSize, selectedColor, setSelectedColor }) {
   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
   const colors = ['White', 'Black', 'Grey', 'Navy', 'Olive', 'Beige'];

   return (
      <div className="space-y-8">
         <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-wide">Size</h3>
            <div className="space-y-2">
               <label className="flex items-center">
                  <input
                     type="radio"
                     name="size"
                     checked={selectedSize === 'all'}
                     onChange={() => setSelectedSize('all')}
                     className="mr-2"
                  />
                  <span className="text-sm">All Sizes</span>
               </label>
               {sizes.map(size => (
                  <label key={size} className="flex items-center">
                     <input
                        type="radio"
                        name="size"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                        className="mr-2"
                     />
                     <span className="text-sm">{size}</span>
                  </label>
               ))}
            </div>
         </div>

         <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-wide">Color</h3>
            <div className="space-y-2">
               <label className="flex items-center">
                  <input
                     type="radio"
                     name="color"
                     checked={selectedColor === 'all'}
                     onChange={() => setSelectedColor('all')}
                     className="mr-2"
                  />
                  <span className="text-sm">All Colors</span>
               </label>
               {colors.map(color => (
                  <label key={color} className="flex items-center">
                     <input
                        type="radio"
                        name="color"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                        className="mr-2"
                     />
                     <span className="text-sm">{color}</span>
                  </label>
               ))}
            </div>
         </div>
      </div>
   );
}