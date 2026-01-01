import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';

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
      image: "https://i.pinimg.com/1200x/b0/53/01/b05301f3bfc07343f83b534ff43ff296.jpg",
   },
   {
      id: 2,
      name: "Elegant Denim Jacket",
      category: "SIGNATURE SERIES",
      price: "₹3,999",
      rating: 4.9,
      image: "https://i.pinimg.com/736x/d4/90/dd/d490dd9d04fee793e91ce978b0b4643b.jpg",
   },
   {
      id: 3,
      name: "Urban Streetwear Tee",
      category: "ESSENTIAL BASICS",
      price: "₹1,299",
      rating: 4.7,
      image: "https://i.pinimg.com/736x/4b/9a/cc/4b9acc96d067310fc7fedb18655c6a20.jpg",
   },
   {
      id: 4,
      name: "Classic Leather Jacket",
      category: "PREMIUM LINE",
      price: "₹8,999",
      rating: 5.0,
      image: "https://i.pinimg.com/1200x/64/ff/78/64ff7874221678854a70a7945b20c500.jpg",
   },
   {
      id: 5,
      name: "Casual Bomber Jacket",
      category: "STREET STYLE",
      price: "₹4,499",
      rating: 4.6,
      image: "https://i.pinimg.com/736x/87/f0/48/87f04892702ebe5beab73fcda1185fe4.jpg",
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
            zIndex: 20,
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
         className="h-[90vh] lg:h-[130vh] flex items-center justify-center mt-10 lg:py-10  overflow-hidden"
         style={{ background: BRAND.bg }}
      >
         <div className="relative w-full max-w-9xl px-4 sm:px-6">
            {/* ================= HEADER ================= */}
            <div className="text-center mb-8 sm:mb-14">
               <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                  URBAN<span style={{ color: BRAND.accent }}>LUXE</span>
               </p>
               <p className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-white/60">
                  PREMIUM STREETWEAR
               </p>
            </div>

            {/* ================= CAROUSEL ================= */}
            <div className="relative h-[500px] sm:h-[560px] lg:h-[620px] flex items-center justify-center">
               {products.map((p, i) => {
                  const active = i === currentIndex;
                  return (
                     <div
                        key={p.id}
                        className="absolute w-72 sm:w-80 h-[440px] sm:h-[480px] lg:h-[520px] transition-all duration-700 ease-out"
                        style={getStyle(i)}
                     >
                        <div
                           className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                           style={{
                              background: BRAND.surface,
                              border: `1px solid ${BRAND.border}`,
                           }}
                        >
                           {/* Image */}
                           <div className="relative h-[300px] sm:h-[330px] lg:h-[360px]">
                              <img
                                 src={p.image}
                                 alt={p.name}
                                 className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                           </div>

                           {/* Content */}
                           <div className="p-4 sm:p-5 lg:p-6 text-white">
                              <span className="text-xs tracking-widest text-white/60">
                                 {p.category}
                              </span>

                              <p className="text-xl sm:text-2xl text-white font-semibold mt-1 sm:mt-2">
                                 {p.name}
                              </p>

                              <div className="flex items-center justify-between mt-3 sm:mt-4">
                                 <span
                                    className="text-xl sm:text-2xl font-semibold"
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
                                 <button className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 rounded-xl bg-white text-black text-sm sm:text-base font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Add to Cart
                                 </button>
                              )}
                           </div>

                           {/* Active ring */}
                           {active && (
                              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-white/30 pointer-events-none" />
                           )}
                        </div>
                     </div>
                  );
               })}

               {/* Controls */}
               <button
                  onClick={prev}
                  className="absolute left-0 sm:left-4 z-[60] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
               >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
               </button>

               <button
                  onClick={next}
                  className="absolute right-0 sm:right-4 z-[60] w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition"
               >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
               </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8 sm:mt-10">
               {products.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => {
                        if (!isAnimating) {
                           setIsAnimating(true);
                           setCurrentIndex(index);
                           setTimeout(() => setIsAnimating(false), 700);
                        }
                     }}
                     className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentIndex
                           ? 'w-8 sm:w-12 bg-white'
                           : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                        }`}
                     style={index === currentIndex ? { backgroundColor: BRAND.accent } : {}}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default ClothingCarousel;