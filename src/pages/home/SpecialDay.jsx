import React, { useState } from 'react';
import { Star, ShoppingBag, Heart, ChevronRight } from 'lucide-react';

const BrandCollaborationSection = () => {
   

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
         <div className="max-w-9xl">
            {/* Header Section */}
            <div className="text-center mb-16 relative">
               <div className="relative">
                  <span className="inline-block px-6 py-2 bg-blue-900 text-white text-sm font-semibold tracking-wider rounded-full mb-6">
                     SPECIAL EDITION
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-blue-900 mb-6 tracking-tight">
                     Brand Collaborations
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                     Exclusive partnerships bringing together iconic brands and visionary creators.
                     Limited quantities, infinite style.
                  </p>
               </div>
            </div>

            {/* Featured Banner */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 h-[130vh]">
               {/* === LEFT CONTENT + COLLAGE === */}
               <div className="relative flex-1 rounded-3xl  bg-gray-900 p-4 md:p-6 shadow-2xl overflow-hidden flex flex-col">
                  {/* Background overlays */}
                  <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
                  <div className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-white rounded-full blur-3xl opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>

                  {/* Text Content */}
                  <div className="relative z-10 mb-4">
                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-100 mb-3">
                        Curated Excellence
                     </h2>
                     <p className="text-gray-300 text-sm sm:text-base md:text-base mb-4 max-w-full md:max-w-lg">
                        Each collaboration is meticulously crafted, merging heritage craftsmanship
                        with contemporary innovation. Experience the extraordinary.
                     </p>
                     <button className="bg-white text-gray-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow flex items-center gap-2">
                        Explore Collection
                        <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>

                  {/* Left-side Pinterest-style collage */}
                  <div className="relative z-10 flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 auto-rows-fr overflow-hidden">
                     <img
                        src="https://i.pinimg.com/736x/89/59/2d/89592db9afe519ba2a7325f248d34445.jpg"
                        alt="Collab 1"
                        className="w-full h-full object-top object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                     <img
                        src="https://i.pinimg.com/1200x/4a/ab/11/4aab11308057a402695f7c7690d2839a.jpg"
                        alt="Collab 2"
                        className="w-full h-full object-top object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                     <img
                        src="https://i.pinimg.com/1200x/65/44/45/654445101980ba00d6f10da7f7fc9ca8.jpg"
                        alt="Collab 3"
                        className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                     <img
                        src="https://i.pinimg.com/736x/81/a5/0c/81a50c1cde3e9f57140c6195650155a6.jpg"
                        alt="Collab 4"
                        className="w-full h-full object-top object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                  </div>
               </div>

               {/* === RIGHT IMAGE COLLAGE === */}
               <div className="relative flex-1 grid grid-cols-2 md:grid-cols-2 grid-rows-2 gap-2 rounded-3xl overflow-hidden auto-rows-fr">
                  <img
                     src="https://i.pinimg.com/1200x/f9/2c/33/f92c33de13a206c439190e673400d213.jpg"
                     alt="Collab 1"
                     className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                     src="https://i.pinimg.com/736x/77/22/ef/7722ef87b135757d8349014943812e55.jpg"
                     alt="Collab 2"
                     className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                     src="https://i.pinimg.com/736x/a3/8e/8f/a38e8fce0fe995dab722c5f1ead17f68.jpg"
                     alt="Collab 3"
                     className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <img
                     src="https://i.pinimg.com/736x/85/68/b9/8568b9e42dcd846d67ae1198fd31ddff.jpg"
                     alt="Collab 4"
                     className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default BrandCollaborationSection;