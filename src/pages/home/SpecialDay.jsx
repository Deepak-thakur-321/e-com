import React from 'react';
import { Star, ShoppingBag, Heart, ChevronRight } from 'lucide-react';

const SpecialDay = () => {
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
         <div className="max-w-9xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
               {/* Left Content */}
               <div className="max-w-4xl text-left">
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide rounded-xl mb-4">
                     VISUAL COLLECTION
                  </span>

                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                     A Gallery of <span className="text-blue-600">Modern Aesthetics</span>
                  </h1>

                  <p className="lg:hidden md:hidden block text-base md:text-lg text-slate-600 leading-relaxed mb-0 md:mb-0 lg:max-w-xl">
                     Explore a curated showcase of style and creativity — each frame tells a story of
                     craftsmanship, innovation, and individuality. Discover how art and commerce merge
                     seamlessly in our visual collection.
                  </p>
               </div>

               {/* Right CTA Buttons */}
               <div className="flex sm:flex-row items-center gap-4 shrink-0">
                  <button className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300">
                     Explore Gallery
                  </button>
                  <button className="px-6 py-3 border border-slate-900 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300">
                     Learn More
                  </button>
               </div>
            </div>


            {/* Featured Banner */}
            <div className="flex flex-col md:flex-row gap-6 mb-7 h-[130vh]">
               {/* === LEFT CONTENT + COLLAGE === */}
               <div className="relative flex-1 rounded-3xl bg-gray-900 p-4 md:p-6  overflow-hidden flex flex-col">
                  {/* Text Content */}
                  <div className="relative mb-4">
                     <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                        Curated Excellence
                     </p>

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
                        src="https://i.pinimg.com/736x/9b/16/96/9b1696f4524fa67e65bc12664b47864f.jpg"
                        alt="Collab 2"
                        className="w-full h-full object-center object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                     <img
                        src="https://i.pinimg.com/1200x/65/44/45/654445101980ba00d6f10da7f7fc9ca8.jpg"
                        alt="Collab 3"
                        className="w-full h-full object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                     />
                     <img
                        src="https://i.pinimg.com/1200x/11/a1/2d/11a12d435f954835ae17d1a88032ece8.jpg"
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
                     src="https://i.pinimg.com/1200x/98/a9/9f/98a99f1ac451540d0593243dfd977fdf.jpg"
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

export default SpecialDay;