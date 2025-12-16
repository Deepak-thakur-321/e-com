import React from "react";
import { ShoppingBag } from "lucide-react";

const ShopBetter = () => {
   const products = [
      {
         id: 1,
         title: "Signature Edition 1",
         subtitle: "Limited Release",
         image: "https://i.pinimg.com/736x/95/2d/32/952d32f553258f71821b51bb1a2cc70c.jpg",
         price: "₹1,999",
      },
      {
         id: 2,
         title: "Signature Edition 2",
         subtitle: "Exclusive Drop",
         image: "https://i.pinimg.com/736x/cf/fd/36/cffd3607b8f1534abc914c38c8443a2d.jpg",
         price: "₹2,299",
      },
      {
         id: 3,
         title: "Signature Edition 3",
         subtitle: "Designer Series",
         image: "https://i.pinimg.com/1200x/5c/e9/c2/5ce9c24a5fc4f5d3d4482a035882cbe1.jpg",
         price: "₹2,499",
      },
      {
         id: 4,
         title: "Signature Edition 4",
         subtitle: "Premium Collection",
         image: "https://i.pinimg.com/1200x/a8/41/28/a8412865b5d86775217054a45f27304d.jpg",
         price: "₹2,799",
      },
      {
         id: 5,
         title: "Signature Edition 5",
         subtitle: "Luxury Fabric",
         image: "https://i.pinimg.com/736x/08/55/20/08552002c7108a103b7eac4a4eb3a71b.jpg",
         price: "₹2,999",
      },
      {
         id: 6,
         title: "Signature Edition 6",
         subtitle: "Handcrafted Fit",
         image: "https://i.pinimg.com/736x/36/46/f4/3646f4e769c00ba4767a3e7ddc443c45.jpg",
         price: "₹2,499",
      },
      {
         id: 7,
         title: "Signature Edition 7",
         subtitle: "Artisan Craft",
         image: "https://i.pinimg.com/736x/e4/24/95/e42495a95c0f88b4c1740be652dd3ee0.jpg",
         price: "₹1,899",
      },
      {
         id: 8,
         title: "Signature Edition 8",
         subtitle: "Urban Luxe",
         image: "https://i.pinimg.com/736x/a7/76/7c/a7767c0105dc2f8b72e77efb24820330.jpg",
         price: "₹2,299",
      },
      {
         id: 9,
         title: "Signature Edition 9",
         subtitle: "Modern Silhouette",
         image: "https://i.pinimg.com/736x/07/8c/c8/078cc81b982a6f8ddad608c9966d5faa.jpg",
         price: "₹2,799",
      },
      {
         id: 10,
         title: "Signature Edition 10",
         subtitle: "Essential Capsule",
         image: "https://i.pinimg.com/736x/92/ab/8f/92ab8f6c4dfcd8e7ff638793988be781.jpg",
         price: "₹2,999",
      },
      {
         id: 11,
         title: "Signature Edition 11",
         subtitle: "Seasonal Drop",
         image: "https://i.pinimg.com/736x/24/97/46/249746e41f39065ccbaf80694cd7e8d0.jpg",
         price: "₹2,199",
      },
      {
         id: 12,
         title: "Signature Edition 12",
         subtitle: "Midnight Classic",
         image: "https://i.pinimg.com/1200x/f4/68/81/f46881ba4562871236ddd8f4dd754b4a.jpg",
         price: "₹2,499",
      },

   ];

   return (
      <section className="py-14 relative overflow-hidden mt-3">
         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-center sm:text-left">
                  Our <span className="text-blue-600">Signature Collection</span>
               </h2>
               <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop All</span>
               </button>
            </div>

            {/* Responsive Carousel */}
            <div className="relative overflow-hidden">
               <div className="flex animate-slide gap-6 sm:gap-8 ">
                  {[...products, ...products].map((product, i) => (
                     <div
                        key={i}
                        className="group relative flex-shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] rounded-3xl overflow-hidden bg-gradient-to-br from-white/70 to-blue-100/50 backdrop-blur-md border border-white/40 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                     >
                        <div className="relative h-64 md:h-72 overflow-hidden">
                           <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                           <p className="text-lg font-semibold mb-1 text-slate-300">
                              {product.title}
                           </p>
                           <p className="text-sm opacity-90">{product.subtitle}</p>
                           <p className="text-sm font-medium mt-1 opacity-80">{product.price}</p>
                        </div>

                        <div className="absolute inset-0 border border-white/10 group-hover:border-blue-400/60 rounded-3xl transition-all duration-500"></div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default ShopBetter;
