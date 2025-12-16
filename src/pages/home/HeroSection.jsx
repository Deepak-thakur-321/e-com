import React, { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BestSeller from '../bestseller/BestSeller';


const heroImages = [
   "https://i.pinimg.com/736x/e3/5f/2d/e35f2d8255c2733a2d4bc4ca26f03e68.jpg",
   "https://i.pinimg.com/736x/f2/1a/f8/f21af88270e26b7d5e505511cf11eed3.jpg",
   "https://i.pinimg.com/736x/06/03/93/06039317986d02a21608b082d139f060.jpg"
];

export default function PremiumHero() {
   const [currentSlide, setCurrentSlide] = useState(0);

   const navigate = useNavigate();

   // Carousel auto-slide
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide(prev => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
         <div className="px-4 lg:px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

               {/* Main Hero - Left Section */}
               <div className="lg:col-span-8">
                  <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-3xl overflow-hidden h-full min-h-[400px] shadow-md">

                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-10">
                        <div
                           className="absolute inset-0"
                           style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                              backgroundSize: '40px 40px',
                           }}
                        ></div>
                     </div>

                     <div className="relative grid lg:grid-cols-2 h-full">

                        {/* Text Content */}
                        <div className="flex flex-col p-8 lg:p-12 z-10 space-y-5 animate-fadeIn">
                           {/* Badge */}
                           <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-full px-4 py-1.5 w-fit">
                              <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                 ))}
                              </span>
                              <span className="text-gray-800 text-xs font-medium">
                                 Rated 4.9/5 by 500K+ customers
                              </span>
                           </div>

                           <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight animate-fadeIn delay-100">
                              Upgrade Your
                              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                 Everyday Style
                              </span>
                           </h1>

                           <p className="text-gray-700 text-base lg:text-lg max-w-md leading-relaxed animate-fadeIn delay-200">
                              Discover premium fashion and lifestyle products curated for the modern you. Free shipping on orders over $50.
                           </p>

                           <div className="flex flex-wrap gap-4 pt-1 animate-fadeIn delay-300">
                              <button
                                 onClick={() => navigate("/best-sellers")}
                                 className="group bg-gray-900 text-white px-7 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:scale-[1.03]"
                              >
                                 Shop Now
                                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>

                              <button
                                 className="bg-white/80 backdrop-blur-sm border border-gray-300 
                                  text-gray-900 px-7 py-3 rounded-full font-semibold 
                                  hover:bg-white transition-all"
                                 onClick={() => navigate("/view-collection")}
                              >
                                 View Collection
                              </button>
                           </div>

                           <div className="grid grid-cols-3 gap-4 pb-5 w-full mt-6 animate-fadeIn delay-400">
                              <div className="text-center">
                                 <div className="text-2xl font-bold text-gray-900">10K+</div>
                                 <div className="text-sm text-gray-500">Happy Customers</div>
                              </div>
                              <div className="text-center">
                                 <div className="text-2xl font-bold text-gray-900">5K+</div>
                                 <div className="text-sm text-gray-500">Products</div>
                              </div>
                              <div className="text-center">
                                 <div className="text-2xl font-bold text-gray-900">24/7</div>
                                 <div className="text-sm text-gray-500">Support</div>
                              </div>
                           </div>


                        </div>

                        {/* Hero Image Carousel */}
                        <div className="relative hidden lg:flex flex-col justify-between p-6 h-full">
                           <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20">
                              {heroImages.map((img, idx) => (
                                 <img
                                    key={idx}
                                    src={img}
                                    alt={`Fashion ${idx}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'
                                       }`}
                                 />
                              ))}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 mix-blend-overlay"></div>
                           </div>

                           {/* Stats Section */}

                        </div>

                     </div>
                  </div>
               </div>

               {/* Right Side Card Section */}
               <div className="lg:col-span-4 animate-fadeIn delay-300">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full min-h-[400px] flex flex-col">

                     {/* Image */}
                     <div className="relative h-64 lg:h-72 overflow-hidden group">
                        <img
                           src="https://i.pinimg.com/1200x/33/1e/b3/331eb3685c412c48d9886d46ade2a9e5.jpg"
                           alt="New Collection"
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                           NEW
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     </div>

                     {/* Content */}
                     <div className="flex-1 p-6 lg:p-7 flex flex-col justify-between">
                        <div>
                           <div className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                              SPRING COLLECTION
                           </div>

                           <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                              Fashion Essentials for Every Occasion
                           </h3>

                           <p className="text-gray-600 mb-6 leading-relaxed">
                              Explore our curated selection of clothing, shoes, and accessories designed for the modern lifestyle.
                           </p>
                        </div>

                        <button onClick={() => navigate("/view-collection")} className="group w-full bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.03]">
                           Explore Collection
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/* Tailwind Animations */}

         <style>{`
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(40px) scale(0.98); }
    60% { opacity: 0.7; transform: translateY(10px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .animate-slideUpFade { 
    animation: slideUpFade 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards; 
  }

  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.25s; }
  .delay-300 { animation-delay: 0.4s; }
  .delay-400 { animation-delay: 0.55s; }
  .delay-500 { animation-delay: 0.7s; }
`}</style>

      </div>
   );
}
