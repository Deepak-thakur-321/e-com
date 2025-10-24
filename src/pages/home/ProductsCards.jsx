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
         image: "https://i.pinimg.com/736x/f3/80/72/f38072ef708889bc2c13f4bfd8acd1f1.jpg",
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
         image: "https://i.pinimg.com/736x/eb/7b/25/eb7b25805c1a6847dd0e867150d2b5e9.jpg",
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
         image: "https://i.pinimg.com/1200x/d8/20/68/d8206835e100174a6affd66aa0c52f34.jpg",
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
         image: "https://i.pinimg.com/736x/9d/2d/63/9d2d63546fabc1e4f4ffa5ca190fb869.jpg",
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
         image: "https://i.pinimg.com/736x/34/83/b3/3483b3cf929def8326075ba1dc6b8f97.jpg",
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
         image: "https://i.pinimg.com/474x/18/d6/6b/18d66b7202d380afc46e5b3a963413ba.jpg",
         
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
         image: "https://i.pinimg.com/1200x/1c/3a/ae/1c3aae41b8d49b366546a60fe966d4a9.jpg",
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
         image: "https://i.pinimg.com/736x/15/60/71/1560718dca9bbcfd6fdbd09dcc0f2fc1.jpg",
         badge: "Style Collab",
         rating: 4.9,
         reviews: 288
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
         reviews: 288
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
         reviews: 288
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
         reviews: 288
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
         reviews: 288
      },
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
