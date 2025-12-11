import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TShirtCollection() {

   const slug = useParams()

   const [currentSlide, setCurrentSlide] = useState(0);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

   const [cart, setCart] = useState([]);
   const [filterOpen, setFilterOpen] = useState(false);
   const [selectedSize, setSelectedSize] = useState('all');
   const [selectedColor, setSelectedColor] = useState('all');
   const [sortBy, setSortBy] = useState('featured');
   const [wishlist, setWishlist] = useState([]);

   const slides = [
      {
         image: "https://i.pinimg.com/1200x/0f/94/2c/0f942c91dfacf3d761158146a73d9ed5.jpg",
         title: "SUSTAINABLE FABRICS",
         subtitle: "Timeless comfort meets modern design",
         cta: "DISCOVER COLLECTION"
      },
      {
         image: "https://i.pinimg.com/1200x/97/18/89/971889993c6ef00cee2dc11e8ba0f428.jpg",
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


   useEffect(() => {
      if (!isAutoPlaying) return;

      const interval = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
   }, [isAutoPlaying, slides.length]);

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
         <div className="relative h-[90vh] overflow-hidden group">
            {/* Slides */}
            {slides.map((slide, index) => (
               <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                     }`}
               >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-black">
                     <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                     <div className="max-w-4xl text-center space-y-6 animate-fadeIn">
                        <p className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                           {slide.title}
                        </p>
                        <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
                           {slide.subtitle}
                        </p>
                        <div className="pt-4">
                           <button className="bg-white text-black px-10 py-4 font-semibold text-sm tracking-wider hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                              {slide.cta}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            ))}

            {/* Navigation Arrows */}
            <button
               onClick={prevSlide}
               className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
               aria-label="Previous slide"
            >
               <ChevronLeft size={24} />
            </button>
            <button
               onClick={nextSlide}
               className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
               aria-label="Next slide"
            >
               <ChevronRight size={24} />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
               {slides.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => goToSlide(index)}
                     className={`transition-all duration-300 rounded-full ${index === currentSlide
                        ? "bg-white w-10 h-2"
                        : "bg-white/40 hover:bg-white/60 w-2 h-2"
                        }`}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
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