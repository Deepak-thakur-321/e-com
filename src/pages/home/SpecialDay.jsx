import React from 'react';
import { Star, ShoppingBag, Heart, ChevronRight } from 'lucide-react';

const BrandCollaborationSection = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
         <div className="max-w-9xl">
            {/* Header Section */}
            <div className="max-w-2xl mx-aut mb-10">
               <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide rounded-full mb-4">
                  SPECIAL EDITION
               </span>
               <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                  Brand Collaborations
               </h1>
               <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Exclusive partnerships between iconic brands and visionary creators —
                  limited drops, lasting impressions.
               </p>
            </div>


            {/* Featured Banner */}
            <div className="flex flex-col md:flex-row gap-6 mb-16 h-[130vh]">
               {/* === LEFT CONTENT + COLLAGE === */}
               <div className="relative flex-1 rounded-3xl bg-gray-900 p-4 md:p-6  overflow-hidden flex flex-col">
                  {/* Text Content */}
                  <div className="relative mb-4">
                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
                        Curated Excellence
                     </h2>

                     <p className="text-white text-sm sm:text-base md:text-base mb-4 max-w-full md:max-w-lg drop-shadow-md">
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