import React, { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

const CurvedCarousel = () => {
   const [scrollPosition, setScrollPosition] = useState(0);

   const products = [
      {
         id: 1,
         image: "https://i.pinimg.com/736x/95/2d/32/952d32f553258f71821b51bb1a2cc70c.jpg",
      },
      {
         id: 2,

         image: "https://i.pinimg.com/736x/cf/fd/36/cffd3607b8f1534abc914c38c8443a2d.jpg",
      },
      {
         id: 3,
         image: "https://i.pinimg.com/1200x/5c/e9/c2/5ce9c24a5fc4f5d3d4482a035882cbe1.jpg",
      },
      {
         id: 4,
         image: "https://i.pinimg.com/1200x/a8/41/28/a8412865b5d86775217054a45f27304d.jpg",
      },
      {
         id: 5,
         image: "https://i.pinimg.com/736x/08/55/20/08552002c7108a103b7eac4a4eb3a71b.jpg",
      },
      {
         id: 6,
         image: "https://i.pinimg.com/736x/36/46/f4/3646f4e769c00ba4767a3e7ddc443c45.jpg",
      },
      {
         id: 7,
         image: "https://i.pinimg.com/736x/e4/24/95/e42495a95c0f88b4c1740be652dd3ee0.jpg",
      },
      {
         id: 8,
         image: "https://i.pinimg.com/736x/a7/76/7c/a7767c0105dc2f8b72e77efb24820330.jpg",
      },
   ];

   useEffect(() => {
      const interval = setInterval(() => {
         setScrollPosition((prev) => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="min-h-screen bg-gradient-to-br overflow-hidden">
         {/* Hero Section */}
         

         {/* 3D Curved Carousel */}
         <div className="relative h-[600px] mt-10" style={{ perspective: "2000px" }}>
            <div className="absolute inset-0 flex items-center justify-center">
               <div
                  className="relative w-full h-full"
                  style={{
                     transformStyle: "preserve-3d",
                     transform: `rotateY(${-scrollPosition}deg)`,
                  }}
               >
                  {products.map((product, index) => {
                     const angle = (360 / products.length) * index;
                     const isCenter = Math.abs(((scrollPosition - angle + 540) % 360) - 180) < 45;

                     return (
                        <div
                           key={product.id}
                           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                           style={{
                              transform: `rotateY(${angle}deg) translateZ(650px)`,
                              transformStyle: "preserve-3d",
                           }}
                        >
                           <div
                              className={`group relative w-72 h-96 rounded-3xl overflow-hidden transition-all duration-700 ${isCenter
                                    ? "scale-110 shadow-2xl shadow-blue-500/50"
                                    : "scale-90 opacity-60"
                                 }`}
                              style={{
                                 transform: "rotateY(180deg)",
                                 transformStyle: "preserve-3d",
                              }}
                           >
                              {/* Card Background with Glassmorphism */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20"></div>

                              {/* Image */}
                              <div className="relative h-full overflow-hidden">
                                 <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                              </div>

                              {/* Content Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                 <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                                    <p className="text-sm text-gray-300 mb-3">{product.subtitle}</p>
                                    <div className="flex items-center justify-between">
                                       <span className="text-xl font-bold text-blue-400">{product.price}</span>
                                       <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-all">
                                          View
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              {/* Hover Border Effect */}
                              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-3xl transition-all duration-500"></div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* Features Section */}
         
      </div>
   );
};

export default CurvedCarousel;