import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/features/cart/cartSlice';
import { Star, Heart, ShoppingCart, Filter, Grid, List, ArrowUpDown, ChevronDown, TrendingUp, Award, Zap } from 'lucide-react';

const BestSeller = () => {
   const dispatch = useDispatch();
   const [viewMode, setViewMode] = useState('grid');
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [sortBy, setSortBy] = useState('popular');
   const [favorites, setFavorites] = useState(new Set());

   // Sample product data
   const products = [
      {
         id: 1,
         name: "Crimson Aura Draped Dress",
         brand: "Label Ritu Kumar × Global Desi",
         price: 6499,
         originalPrice: 8999,
         image: "https://i.pinimg.com/736x/f3/80/72/f38072ef708889bc2c13f4bfd8acd1f1.jpg",
         badge: "Limited Edition",
         rating: 4.8,
         reviews: 284,
      },
      {
         id: 2,
         name: "Coastal Mirage Watch",
         brand: "Fastrack × Titan Luxe",
         price: 7299,
         originalPrice: 9499,
         image: "https://i.pinimg.com/736x/eb/7b/25/eb7b25805c1a6847dd0e867150d2b5e9.jpg",
         badge: "Exclusive",
         rating: 4.8,
         reviews: 198,
      },
      {
         id: 3,
         name: "Kashmiri Weave Tote",
         brand: "FabIndia × Raw Mango",
         price: 4299,
         originalPrice: 5999,
         image: "https://i.pinimg.com/1200x/d8/20/68/d8206835e100174a6affd66aa0c52f34.jpg",
         badge: "Artisan Collab",
         rating: 4.6,
         reviews: 265,
      },
      {
         id: 4,
         name: "Aurora Street Hoodie",
         brand: "Bewakoof × Urban Tribe",
         price: 2499,
         originalPrice: 3299,
         image: "https://i.pinimg.com/736x/9d/2d/63/9d2d63546fabc1e4f4ffa5ca190fb869.jpg",
         badge: "New Drop",
         rating: 4.8,
         reviews: 421,
      },
      {
         id: 5,
         name: "Desert Mirage Shades",
         brand: "The Souled Store × Ray-Ban India",
         price: 4999,
         originalPrice: 6999,
         image: "https://i.pinimg.com/736x/34/83/b3/3483b3cf929def8326075ba1dc6b8f97.jpg",
         badge: "Signature Collab",
         rating: 4.9,
         reviews: 167,
      },
      {
         id: 6,
         name: "Monsoon Spirit Kurta Set",
         brand: "Manyavar × Sabyasachi",
         price: 11999,
         originalPrice: 14999,
         image: "https://i.pinimg.com/474x/18/d6/6b/18d66b7202d380afc46e5b3a963413ba.jpg",
         badge: "Luxury Edit",
         rating: 5.0,
         reviews: 246,
      },
      {
         id: 7,
         name: "Luna Dusk Handbag",
         brand: "Lavie × Global Desi",
         price: 3999,
         originalPrice: 5499,
         image: "https://i.pinimg.com/1200x/1c/3a/ae/1c3aae41b8d49b366546a60fe966d4a9.jpg",
         badge: "Designer Pick",
         rating: 4.5,
         reviews: 194,
      },
      {
         id: 8,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://i.pinimg.com/736x/15/60/71/1560718dca9bbcfd6fdbd09dcc0f2fc1.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288,
      },
      {
         id: 9,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://i.pinimg.com/736x/93/dc/e0/93dce081b85f8058ad2c6b6406a5a8b1.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288,
      },
      {
         id: 10,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://i.pinimg.com/736x/ec/5f/54/ec5f541bc23318353c411dd10bc6e5f2.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288,
      },
      {
         id: 11,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://i.pinimg.com/1200x/7c/3f/60/7c3f6069104cc1d4bffc34da56e69bb8.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288,
      },
      {
         id: 12,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://i.pinimg.com/1200x/c2/ae/d6/c2aed63a65e0627a2ffaa30df75e9d49.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288,
      },
   ];


   const categories = [
      { id: 'all', name: 'All Products', icon: Grid },
      { id: 'electronics', name: 'Electronics', icon: Zap },
      { id: 'fashion', name: 'Fashion', icon: Award },
      { id: 'furniture', name: 'Furniture', icon: TrendingUp },
      { id: 'lifestyle', name: 'Lifestyle', icon: Star }
   ];

   // Filter and Sort Products
   const filteredAndSortedProducts = useMemo(() => {
      let filtered = selectedCategory === 'all'
         ? products
         : products.filter(p => p.category === selectedCategory);

      // Sort products based on selection
      switch (sortBy) {
         case 'price-low':
            return [...filtered].sort((a, b) => a.price - b.price);
         case 'price-high':
            return [...filtered].sort((a, b) => b.price - a.price);
         case 'rating':
            return [...filtered].sort((a, b) => b.rating - a.rating);
         case 'popular':
         default:
            return [...filtered].sort((a, b) => {
               const aCount = a.soldCount ? Number(a.soldCount.replace("K+", "")) : 0;
               const bCount = b.soldCount ? Number(b.soldCount.replace("K+", "")) : 0;
               return bCount - aCount;

            });
      }
   }, [selectedCategory, sortBy, products]);

   const handleAddToCart = (product) => {
      dispatch(addToCart({
         id: product.id,
         title: product.title,
         price: product.price,
         image: product.image,
      }));
   };


   const toggleFavorite = (id) => {
      setFavorites(prev => {
         const newFavorites = new Set(prev);
         if (newFavorites.has(id)) {
            newFavorites.delete(id);
         } else {
            newFavorites.add(id);
         }
         return newFavorites;
      });
   };

   const getBadgeStyles = (badge) => {
      switch (badge) {
         case 'Best Seller':
            return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
         case 'Trending':
            return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white';
         case 'Featured':
            return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
         default:
            return 'bg-gray-900 text-white';
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
               <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                     <TrendingUp className="w-4 h-4" />
                     <span>Top Rated by 50K+ Customers</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                     Best Sellers & <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Featured Products</span>
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                     Discover our most-loved products, handpicked for quality and customer satisfaction
                  </p>
               </div>
            </div>
         </div>

         {/* Filters & Controls */}
         <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Category Filters */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                     {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                           <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id
                                 ? 'bg-gray-900 text-white shadow-lg scale-105'
                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                 }`}
                           >
                              <Icon className="w-4 h-4" />
                              {cat.name}
                           </button>
                        );
                     })}
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                           onClick={() => setViewMode('grid')}
                           className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                              }`}
                        >
                           <Grid className="w-4 h-4" />
                        </button>
                        <button
                           onClick={() => setViewMode('list')}
                           className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                              }`}
                        >
                           <List className="w-4 h-4" />
                        </button>
                     </div>

                     <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium border-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
                     >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                     </select>
                  </div>
               </div>
            </div>
         </div>

         {/* Products Grid/List */}
         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-6 flex items-center justify-between">
               <p className="text-gray-600 text-sm md:text-base">
                  Showing <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> products
               </p>
            </div>

            {viewMode === 'grid' ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredAndSortedProducts.map((product, index) => (
                     <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                     >
                        <div className="relative overflow-hidden aspect-square">
                           <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                           <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                              <span className={`${getBadgeStyles(product.badge)} px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                                 {product.badge}
                              </span>
                              <button
                                 onClick={() => toggleFavorite(product.id)}
                                 className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                              >
                                 <Heart
                                    className={`w-4 h-4 ${favorites.has(product.id)
                                       ? 'fill-red-500 text-red-500'
                                       : 'text-gray-600'
                                       }`}
                                 />
                              </button>
                           </div>
                           {product.discount > 0 && (
                              <div className="absolute top-3 right-3">
                                 <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                    -{product.discount}%
                                 </span>
                              </div>
                           )}
                           <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                              <span className="text-xs font-semibold text-gray-900">{product.soldCount} sold</span>
                           </div>
                        </div>

                        <div className="p-4 space-y-3">
                           <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                              {product.name}
                           </h3>

                           <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                 <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                           </div>

                           <div className="flex items-end gap-2">
                              <span className="text-2xl font-bold text-gray-900">
                                 ₹{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                 <span className="text-sm text-gray-500 line-through mb-1">
                                    ₹{product.originalPrice.toLocaleString()}
                                 </span>
                              )}
                           </div>

                           <button onClick={() => handleAddToCart(product)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg">
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="space-y-4">
                  {filteredAndSortedProducts.map((product, index) => (
                     <div
                        key={product.id}
                        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                     >
                        <div className="flex flex-col sm:flex-row gap-4 p-4">
                           <div className="relative sm:w-48 sm:h-48 w-full aspect-square flex-shrink-0 overflow-hidden rounded-xl">
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <span className={`absolute top-3 left-3 ${getBadgeStyles(product.badge)} px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                                 {product.badge}
                              </span>
                              {product.discount > 0 && (
                                 <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                    -{product.discount}%
                                 </span>
                              )}
                           </div>

                           <div className="flex-1 flex flex-col justify-between space-y-3">
                              <div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                    {product.name}
                                 </h3>

                                 <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1">
                                       <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                       <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
                                    <span className="text-sm font-semibold text-gray-600">{product.soldCount} sold</span>
                                 </div>

                                 <div className="flex items-end gap-2 mb-4">
                                    <span className="text-3xl font-bold text-gray-900">
                                       ₹{product.price.toLocaleString()}
                                    </span>
                                    {product.originalPrice && (
                                       <span className="text-lg text-gray-500 line-through mb-1">
                                          ₹{product.originalPrice.toLocaleString()}
                                       </span>
                                    )}
                                 </div>
                              </div>

                              <div className="flex items-center gap-3">
                                 <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                 </button>
                                 <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-all"
                                 >
                                    <Heart
                                       className={`w-6 h-6 ${favorites.has(product.id)
                                          ? 'fill-red-500 text-red-500'
                                          : 'text-gray-600'
                                          }`}
                                    />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* Load More Section */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
               Load More Products
            </button>
         </div>

         <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </div>
   );
};

export default BestSeller;