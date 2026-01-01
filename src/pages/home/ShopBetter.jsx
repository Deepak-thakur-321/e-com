import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";

/* ================= BRAND SYSTEM ================= */
const BRAND = {
   bg: "rgb(16,24,40)",
   surface: "rgba(255,255,255,0.06)",
   border: "rgba(255,255,255,0.12)",
   accent: "#E5E1D8",
};

/* ================= DATA ================= */
const products = [
   {
      id: 1,
      name: "Premium Cotton Hoodie",
      category: "WINTER COLLECTION",
      price: "₹2,499",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=650&fit=crop",
   },
   {
      id: 2,
      name: "Elegant Denim Jacket",
      category: "SIGNATURE SERIES",
      price: "₹3,999",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=650&fit=crop",
   },
   {
      id: 3,
      name: "Urban Streetwear Tee",
      category: "ESSENTIAL BASICS",
      price: "₹1,299",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=650&fit=crop",
   },
   {
      id: 4,
      name: "Classic Leather Jacket",
      category: "PREMIUM LINE",
      price: "₹8,999",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500&h=650&fit=crop",
   },
   {
      id: 5,
      name: "Casual Bomber Jacket",
      category: "STREET STYLE",
      price: "₹4,499",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=650&fit=crop",
   },
];

/* ================= COMPONENT ================= */
const ClothingCarousel = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);

   const next = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((p) => (p + 1) % products.length);
      setTimeout(() => setIsAnimating(false), 700);
   };

   const prev = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((p) => (p - 1 + products.length) % products.length);
      setTimeout(() => setIsAnimating(false), 700);
   };

   useEffect(() => {
      const id = setInterval(next, 6000);
      return () => clearInterval(id);
   }, [currentIndex]);

   const getStyle = (index) => {
      const diff = (index - currentIndex + products.length) % products.length;

      // CENTER
      if (diff === 0) {
         return {
            transform: "translateX(0%) scale(1.1)",
            zIndex: 50,
            opacity: 1,
            filter: "blur(0px)",
         };
      }

      // RIGHT
      if (diff === 1) {
         return {
            transform: "translateX(90%) scale(0.9)",
            zIndex: 40,
            opacity: 0.7,
            filter: "blur(1px)",
         };
      }

      // FAR RIGHT
      if (diff === 2) {
         return {
            transform: "translateX(180%) scale(0.75)",
            zIndex: 30,
            opacity: 0.35,
            filter: "blur(2px)",
         };
      }

      // LEFT
      if (diff === products.length - 1) {
         return {
            transform: "translateX(-90%) scale(0.9)",
            zIndex: 40,
            opacity: 0.7,
            filter: "blur(1px)",
         };
      }

      // FAR LEFT
      if (diff === products.length - 2) {
         return {
            transform: "translateX(-180%) scale(0.75)",
            zIndex: 30,
            opacity: 0.35,
            filter: "blur(2px)",
         };
      }

      // HIDDEN
      return {
         opacity: 0,
         zIndex: 0,
         pointerEvents: "none",
      };
   };


   return (
      <div
         className="min-h-screen flex items-center justify-center mt-10 overflow-hidden"
         style={{ background: BRAND.bg }}
      >
         <div className="relative w-full max-w-9xl px-6 mt-6">
            {/* ================= HEADER ================= */}
            <div className="text-center mb-14">
               <p className="text-6xl font-semibold tracking-tight text-white">
                  URBAN<span style={{ color: BRAND.accent }}>LUXE</span>
               </p>
               <p className="mt-3 text-sm tracking-[0.3em] text-white/60">
                  PREMIUM STREETWEAR
               </p>
            </div>

            {/* ================= CAROUSEL ================= */}
            <div className="relative h-[620px] flex items-center justify-center">
               {products.map((p, i) => {
                  const active = i === currentIndex;
                  return (
                     <div
                        key={p.id}
                        className="absolute w-80 h-[520px] transition-all duration-700 ease-out"
                        style={getStyle(i)}
                     >
                        <div
                           className="relative w-full h-full rounded-3xl overflow-hidden"
                           style={{
                              background: BRAND.surface,
                              border: `1px solid ${BRAND.border}`,
                           }}
                        >
                           {/* Image */}
                           <div className="relative h-[360px]">
                              <img
                                 src={p.image}
                                 alt={p.name}
                                 className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                           </div>

                           {/* Content */}
                           <div className="p-6 text-white">
                              <span className="text-xs tracking-widest text-white/60">
                                 {p.category}
                              </span>

                              <p className="text-2xl text-white font-semibold mt-2">
                                 {p.name}
                              </p>

                              <div className="flex items-center justify-between mt-4">
                                 <span
                                    className="text-2xl font-semibold"
                                    style={{ color: BRAND.accent }}
                                 >
                                    {p.price}
                                 </span>

                                 <div className="flex items-center gap-1 text-white/70">
                                    <Star className="w-4 h-4 fill-white" />
                                    {p.rating}
                                 </div>
                              </div>

                              {active && (
                                 <button className="mt-6 w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart
                                 </button>
                              )}
                           </div>

                           {/* Active ring */}
                           {active && (
                              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/30 pointer-events-none" />
                           )}
                        </div>
                     </div>
                  );
               })}

               {/* Controls */}
               <button
                  onClick={prev}
                  className="absolute left-0 z-40 w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
               >
                  <ChevronLeft />
               </button>

               <button
                  onClick={next}
                  className="absolute right-0 z-40 w-14 h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
               >
                  <ChevronRight />
               </button>
            </div>
         </div>
      </div>
   );
};

export default ClothingCarousel;
