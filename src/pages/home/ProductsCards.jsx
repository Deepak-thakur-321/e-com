import React, { useState } from "react";
import { Heart, Star, ShoppingBag } from "lucide-react";

const CollaborationSection = () => {
   const [hoveredProduct, setHoveredProduct] = useState(null);
   const [favorites, setFavorites] = useState(new Set());

   const toggleFavorite = (id) => {
      setFavorites((prev) => {
         const updated = new Set(prev);
         updated.has(id) ? updated.delete(id) : updated.add(id);
         return updated;
      });
   };

   const collaborationProducts = [
      {
         id: 1,
         name: "Crimson Aura Draped Dress",
         brand: "Label Ritu Kumar × Global Desi",
         price: 6499,
         originalPrice: 8999,
         image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
         badge: "Limited Edition",
         rating: 4.8,
         reviews: 284
      },

      {
         id: 2,
         name: "Coastal Mirage Watch",
         brand: "Fastrack × Titan Luxe",
         price: 7299,
         originalPrice: 9499,
         image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&q=80",
         badge: "Exclusive",
         rating: 4.8,
         reviews: 198
      },
      {
         id: 3,
         name: "Kashmiri Weave Tote",
         brand: "FabIndia × Raw Mango",
         price: 4299,
         originalPrice: 5999,
         image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
         badge: "Artisan Collab",
         rating: 4.6,
         reviews: 265
      },
      {
         id: 4,
         name: "Aurora Street Hoodie",
         brand: "Bewakoof × Urban Tribe",
         price: 2499,
         originalPrice: 3299,
         image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500&q=80",
         badge: "New Drop",
         rating: 4.8,
         reviews: 421
      },
      {
         id: 5,
         name: "Desert Mirage Shades",
         brand: "The Souled Store × Ray-Ban India",
         price: 4999,
         originalPrice: 6999,
         image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
         badge: "Signature Collab",
         rating: 4.9,
         reviews: 167
      },
      {
         id: 6,
         name: "Monsoon Spirit Kurta Set",
         brand: "Manyavar × Sabyasachi",
         price: 11999,
         originalPrice: 14999,
         image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
         badge: "Luxury Edit",
         rating: 5.0,
         reviews: 246
      },
      {
         id: 7,
         name: "Luna Dusk Handbag",
         brand: "Lavie × Global Desi",
         price: 3999,
         originalPrice: 5499,
         image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
         badge: "Designer Pick",
         rating: 4.5,
         reviews: 194
      },
      {
         id: 8,
         name: "Amber Rhythm Headphones",
         brand: "boAt × House of Masaba",
         price: 6999,
         originalPrice: 8999,
         image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288
      }
   ];

   return (
      <section className="py-2 bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100">
         <div className="max-w-9xl mx-auto px-6">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {collaborationProducts.map((product) => (
                  <div
                     key={product.id}
                     className="group relative rounded-2xl overflow-hidden bg-white/90 shadow-lg hover:shadow-2xl backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2"
                     onMouseEnter={() => setHoveredProduct(product.id)}
                     onMouseLeave={() => setHoveredProduct(null)}
                  >
                     {/* Product Image */}
                     <div className="relative overflow-hidden aspect-square">
                        <img
                           src={product.image}
                           alt={product.name}
                           className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                           <span className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                              {product.badge}
                           </span>
                        </div>
                        <button
                           onClick={() => toggleFavorite(product.id)}
                           className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"
                        >
                           <Heart
                              className={`w-5 h-5 ${favorites.has(product.id)
                                 ? "fill-red-500 text-red-500"
                                 : "text-slate-400"
                                 }`}
                           />
                        </button>

                        {/* Hover Overlay */}
                        <div
                           className={`absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
                              }`}
                        >
                           <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              Quick Add
                           </button>
                        </div>
                     </div>

                     {/* Product Info */}
                     <div className="p-6">
                        <div className="flex items-center gap-1 mb-2">
                           {[...Array(5)].map((_, i) => (
                              <Star
                                 key={i}
                                 className={`w-4 h-4 ${i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                                    }`}
                              />
                           ))}
                           <span className="text-sm text-slate-600 ml-2">
                              ({product.reviews})
                           </span>
                        </div>

                        <h3 className="text-lg font-bold text-blue-950 mb-1 group-hover:text-blue-700 transition-colors">
                           {product.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 font-medium">
                           {product.brand}
                        </p>

                        <div className="flex items-center gap-3">
                           <span className="text-2xl font-black text-blue-900">
                              ₹{product.price}
                           </span>
                           <span className="text-sm text-slate-400 line-through">
                              ${product.originalPrice}
                           </span>
                           <span className="ml-auto text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                              {Math.round(
                                 ((product.originalPrice - product.price) /
                                    product.originalPrice) *
                                 100
                              )}
                              % OFF
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default CollaborationSection;
