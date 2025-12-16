import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Heart, SlidersHorizontal, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { addToCart } from '../../app/features/cart/cartSlice';
import { selectAllProducts } from '../../app/features/products/allProductsCategorySlice';


export default function TShirtCollection() {

   const { slug } = useParams();


   const dispatch = useDispatch();
   const navigate = useNavigate();
   const allProducts = useSelector(selectAllProducts)
   const cartItems = useSelector((state) => state.cart.items);
   const totalQuantity = useSelector((state) => state.cart.totalQuantity);

   const [currentSlide, setCurrentSlide] = useState(0);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
   const [showCartNotification, setShowCartNotification] = useState(false);
   const [lastAddedProduct, setLastAddedProduct] = useState(null);
   const [filterOpen, setFilterOpen] = useState(false);
   const [selectedSize, setSelectedSize] = useState([]);
   const [selectedColor, setSelectedColor] = useState([]);
   const [sortBy, setSortBy] = useState('featured');
   const [wishlist, setWishlist] = useState([]);
   const [priceRange, setPriceRange] = useState([0, 5000]);

   const slides = [
      {
         image: "https://i.pinimg.com/1200x/0f/94/2c/0f942c91dfacf3d761158146a73d9ed5.jpg",
         title: "SUSTAINABLE FABRICS",
         subtitle: "Timeless comfort meets modern design",
         cta: "DISCOVER COLLECTION"
      },
      {
         image: "https://i.pinimg.com/736x/4f/9d/51/4f9d5155305b8605ada76cb3ed6ea7dc.jpg",
         title: "PREMIUM ESSENTIALS",
         subtitle: "Crafted with care for you and the planet",
         cta: "SHOP SUSTAINABLE"
      },
      {
         image: "https://i.pinimg.com/1200x/63/2d/24/632d2468cfd6497e75c3c6e82c77dc07.jpg",
         title: "EVERYDAY LUXURY",
         subtitle: "Elevated basics for every moment",
         cta: "EXPLORE STYLES"
      }
   ];

   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
   const colors = [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1e3a8a' },
      { name: 'Gray', hex: '#6b7280' },
      { name: 'Olive', hex: '#4b5320' }
   ];

   useEffect(() => {
      if (!isAutoPlaying) return;
      const interval = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
   }, [isAutoPlaying]);

   const goToSlide = (index) => {
      setCurrentSlide(index);
      setIsAutoPlaying(false);
   };

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAutoPlaying(false);
   };

   const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAutoPlaying(false);
   };

   const addToCartHandler = (product) => {
      dispatch(addToCart({
         id: product.id,
         name: product.name,
         price: product.price,
         image: product.image,
         color: product.color,
         sizes: product.sizes
      }));

      // Show notification
      setLastAddedProduct(product);
      setShowCartNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
         setShowCartNotification(false);
      }, 3000);
   };

   const goToCart = () => {
      navigate('/cart');
   };

   const toggleWishlist = (id) => {
      setWishlist(prev =>
         prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
   };

   const toggleSize = (size) => {
      setSelectedSize(prev =>
         prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
      );
   };

   const toggleColor = (color) => {
      setSelectedColor(prev =>
         prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
      );
   };

   const clearAll = () => {
      setSelectedSize([]);
      setSelectedColor([]);
      setPriceRange([0, 5000]);
   };

   const filteredProducts = allProducts.filter(p => {
      if (p.category !== slug) return false;

      if (selectedColor.length > 0 && !selectedColor.includes(p.color)) {
         return false;
      }

      if (selectedSize.length > 0 && !p.sizes.some(s => selectedSize.includes(s))) {
         return false;
      }

      if (p.price < priceRange[0] || p.price > priceRange[1]) {
         return false;
      }

      return true;
   });


   console.log("slug:", slug);
   console.log(
      "categories:",
      allProducts.map(p => p.category)
   );


   const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
   });

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
         {/* Hero Carousel */}
         <div className="relative h-[70vh] md:h-[80vh] overflow-hidden group">
            {slides.map((slide, index) => (
               <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                     }`}
               >
                  <div className="absolute inset-0 bg-black">
                     <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-70"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                     <div className="max-w-4xl text-center space-y-6">
                        <p className="text-4xl text-white md:text-7xl font-bold tracking-tight leading-tight animate-fadeIn">
                           {slide.title}
                        </p>
                        <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto animate-fadeIn">
                           {slide.subtitle}
                        </p>
                        <div className="pt-4 animate-fadeIn">
                           <button className="bg-white text-black px-8 md:px-12 py-3 md:py-4 font-semibold text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg rounded-sm">
                              {slide.cta}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            ))}

            <button
               onClick={prevSlide}
               className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
               <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
               onClick={nextSlide}
               className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
               <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
               {slides.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToSlide(index)}
                     className={`transition-all duration-300 rounded-full ${index === currentSlide ? 'bg-white w-8 md:w-10 h-2' : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                        }`}
                  />
               ))}
            </div>
         </div>

         {/* Filter Bar */}
         <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-14 md:h-16">
                  <div className="flex items-center gap-4 md:gap-6">
                     <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 text-sm md:text-base font-semibold hover:text-gray-600 transition-colors"
                     >
                        <SlidersHorizontal className="w-4 h-4" />
                        FILTER
                     </button>
                     <span className="text-xs md:text-sm text-gray-600 font-medium">
                        {sortedProducts.length} Products
                     </span>
                  </div>
                  <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="text-xs md:text-sm font-semibold cursor-pointer bg-transparent border-none focus:outline-none"
                  >
                     <option value="featured">FEATURED</option>
                     <option value="low">PRICE: LOW TO HIGH</option>
                     <option value="high">PRICE: HIGH TO LOW</option>
                  </select>
               </div>
            </div>
         </div>

         {/* Mobile Filter */}
         {filterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
               <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterOpen(false)}></div>
               <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">FILTERS</h3>
                        <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                           <X className="w-6 h-6" />
                        </button>
                     </div>
                     <MobileFilterContent
                        selectedSize={selectedSize}
                        toggleSize={toggleSize}
                        selectedColor={selectedColor}
                        toggleColor={toggleColor}
                        sizes={sizes}
                        colors={colors}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        clearAll={clearAll}
                     />
                  </div>
               </div>
            </div>
         )}

         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex gap-6 md:gap-8">
               {/* Desktop Filters */}
               <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                           <SlidersHorizontal className="text-white" size={20} />
                           <p className="text-xl font-bold text-white tracking-tight">Filters</p>
                        </div>
                        {(selectedSize.length > 0 || selectedColor.length > 0) && (
                           <button onClick={clearAll} className="text-xs px-4 py-2 bg-gray-600 rounded-lg border-gray-900 text-white hover:text-white transition-colors">
                              Clear All
                           </button>
                        )}
                     </div>
                     <p className="text-sm text-gray-400">Refine your selection</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-900">
                     <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Size</h3>
                     <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                           <button
                              key={size}
                              onClick={() => toggleSize(size)}
                              className={`py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${selectedSize.includes(size)
                                 ? 'bg-gray-900 text-white shadow-md scale-105'
                                 : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                 }`}
                           >
                              {size}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-900">
                     <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Color</h3>
                     <div className="grid grid-cols-3 gap-3">
                        {colors.map((color) => (
                           <button
                              key={color.name}
                              onClick={() => toggleColor(color.name)}
                              className="group relative"
                           >
                              <div
                                 className={`w-full aspect-square rounded-lg transition-all duration-200 ${selectedColor.includes(color.name)
                                    ? 'ring-4 ring-gray-900 ring-offset-2 scale-110'
                                    : 'ring-2 ring-gray-200 hover:ring-gray-400'
                                    }`}
                                 style={{ backgroundColor: color.hex }}
                              >
                                 {selectedColor.includes(color.name) && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                          <Check className="w-3 h-3 text-gray-900" />
                                       </div>
                                    </div>
                                 )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1 text-center">{color.name}</p>
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-300 rounded-2xl p-6 shadow-lg border border-gray-900">
                     <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                     <div className="space-y-4">
                        <input
                           type="range"
                           min="0"
                           max="2000"
                           value={priceRange[1]}
                           onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                           className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                           style={{
                              background: `linear-gradient(to right, #111827 0%, #111827 ${(priceRange[1] / 2000) * 100}%, #d1d5db ${(priceRange[1] / 5000) * 100}%, #d1d5db 100%)`
                           }}
                        />
                        <div className="flex items-center justify-between text-sm">
                           <span className="font-semibold text-gray-700">₹{priceRange[0]}</span>
                           <span className="text-gray-500">to</span>
                           <span className="font-semibold text-gray-900">₹{priceRange[1]}</span>
                        </div>
                     </div>
                  </div>

                  {(selectedSize.length > 0 || selectedColor.length > 0) && (
                     <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3">Active Filters</h3>
                        <div className="flex flex-wrap gap-2">
                           {selectedSize.map((size) => (
                              <span key={size} className="inline-flex items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded-lg text-xs font-medium shadow-sm">
                                 {size}
                                 <X size={14} className="cursor-pointer hover:text-red-600" onClick={() => toggleSize(size)} />
                              </span>
                           ))}
                           {selectedColor.map((color) => (
                              <span key={color} className="inline-flex items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded-lg text-xs font-medium shadow-sm">
                                 {color}
                                 <X size={14} className="cursor-pointer hover:text-red-600" onClick={() => toggleColor(color)} />
                              </span>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               {/* Product Grid */}
               <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                     {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-300">
                           <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4]">
                              {/* Badges Row */}
                              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                 <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    NEW
                                 </div>
                                 <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                                 >
                                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                                 </button>
                              </div>

                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                              />

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                 <div className="absolute bottom-4 left-4 right-4">
                                    <button
                                       onClick={() => addToCartHandler(product)}
                                       className="w-full bg-white text-gray-900 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-100 shadow-2xl"
                                    >
                                       <ShoppingCart className="w-4 h-4" />
                                       ADD TO CART
                                    </button>
                                 </div>
                              </div>
                           </div>

                           <div className="p-4">
                              {/* Title & Rating Row */}
                              <div className="flex items-start justify-between gap-3 mb-2">
                                 <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 truncate">
                                       {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{product.color}</p>
                                 </div>
                                 <div className="flex items-center gap-1 flex-shrink-0">
                                    <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-gray-700">4.0</span>
                                 </div>
                              </div>

                              {/* Sizes & Price Row */}
                              <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                 <div className="flex gap-1">
                                    {product.sizes.slice(0, 3).map((size, idx) => (
                                       <span
                                          key={idx}
                                          className="text-xs bg-gray-900 text-white px-2 py-1 rounded font-bold"
                                       >
                                          {size}
                                       </span>
                                    ))}
                                    {product.sizes.length > 3 && (
                                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold">
                                          +{product.sizes.length - 3}
                                       </span>
                                    )}
                                 </div>

                                 <div className="flex items-center gap-3">
                                    <div className="text-right">
                                       <p className="font-bold text-lg text-gray-900">₹{product.price}</p>
                                       <p className="text-xs text-gray-400 line-through">₹{Math.floor(product.price * 1.3)}</p>
                                    </div>
                                    <button
                                       onClick={() => addToCartHandler(product)}
                                       className="bg-gray-900 text-white p-2 rounded-lg hover:bg-black transition-all duration-300 hover:scale-110 shadow-md"
                                    >
                                       <ShoppingCart className="w-4 h-4" />
                                    </button>
                                 </div>
                              </div>

                              {/* Mobile Cart Button */}
                              <button
                                 onClick={() => addToCartHandler(product)}
                                 className="w-full mt-3 lg:hidden bg-gray-900 text-white py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-black"
                              >
                                 <ShoppingCart className="w-4 h-4" />
                                 ADD TO CART
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Cart Notification */}
         {showCartNotification && lastAddedProduct && (
            <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slideIn max-w-sm">
               <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                     <img
                        src={lastAddedProduct.image}
                        alt={lastAddedProduct.name}
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                           <Check className="w-4 h-4 text-white" />
                        </div>
                        <p className="font-bold text-sm">Added to cart!</p>
                     </div>
                     <p className="text-sm text-gray-300 truncate">{lastAddedProduct.name}</p>
                     <p className="text-xs text-gray-400 mt-1">₹{lastAddedProduct.price}</p>
                  </div>
               </div>
               <div className="flex gap-2 mt-4">
                  <button
                     onClick={() => setShowCartNotification(false)}
                     className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                     Continue Shopping
                  </button>
                  <button
                     onClick={goToCart}
                     className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-gray-100"
                  >
                     View Cart ({totalQuantity})
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

function MobileFilterContent({ selectedSize, toggleSize, selectedColor, toggleColor, sizes, colors, priceRange, setPriceRange, clearAll }) {
   return (
      <div className="space-y-6">
         <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Size</h3>
            <div className="grid grid-cols-3 gap-2">
               {sizes.map((size) => (
                  <button
                     key={size}
                     onClick={() => toggleSize(size)}
                     className={`py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${selectedSize.includes(size)
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                  >
                     {size}
                  </button>
               ))}
            </div>
         </div>

         <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Color</h3>
            <div className="grid grid-cols-3 gap-3">
               {colors.map((color) => (
                  <button key={color.name} onClick={() => toggleColor(color.name)} className="group relative">
                     <div
                        className={`w-full aspect-square rounded-lg transition-all duration-200 ${selectedColor.includes(color.name)
                           ? 'ring-4 ring-gray-900 ring-offset-2'
                           : 'ring-2 ring-gray-200'
                           }`}
                        style={{ backgroundColor: color.hex }}
                     >
                        {selectedColor.includes(color.name) && (
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                 <Check className="w-3 h-3 text-gray-900" />
                              </div>
                           </div>
                        )}
                     </div>
                     <p className="text-xs text-gray-600 mt-1 text-center">{color.name}</p>
                  </button>
               ))}
            </div>
         </div>

         <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
            <input
               type="range"
               min="0"
               max="5000"
               value={priceRange[1]}
               onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
               className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between text-sm mt-3">
               <span className="font-semibold text-gray-700">₹{priceRange[0]}</span>
               <span className="font-semibold text-gray-900">₹{priceRange[1]}</span>
            </div>
         </div>

         <button
            onClick={clearAll}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors"
         >
            Clear All Filters
         </button>
      </div>
   );
}