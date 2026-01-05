import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, X, Sparkles } from 'lucide-react';

const LuxurySalePage = () => {
   const [scrollY, setScrollY] = useState(0);
   const [selectedItem, setSelectedItem] = useState(null);
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [favorites, setFavorites] = useState([]);
   const [activeCollection, setActiveCollection] = useState(0);

   useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouse);

      return () => {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('mousemove', handleMouse);
      };
   }, []);

   const collections = [
      {
         title: 'Winter Essentials',
         subtitle: 'Timeless pieces for the season',
         items: [
            { id: 1, name: 'Cashmere Noir', desc: 'Pure Italian cashmere', price: 1890, original: 2850, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800' },
            { id: 2, name: 'Heritage Coat', desc: 'Handcrafted in Milano', price: 2340, original: 3900, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800' },
            { id: 3, name: 'Silk Essence', desc: 'Limited edition', price: 1560, original: 2600, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800' }
         ]
      },
      {
         title: 'Atelier Collection',
         subtitle: 'Crafted by master artisans',
         items: [
            { id: 4, name: 'Leather Chronicle', desc: 'Vegetable-tanned leather', price: 980, original: 1650, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800' },
            { id: 5, name: 'Tailored Legacy', desc: 'Bespoke construction', price: 1680, original: 2800, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800' },
            { id: 6, name: 'Merino Heritage', desc: 'Australian merino wool', price: 540, original: 900, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800' }
         ]
      }
   ];

   const featuredStory = {
      title: 'The Art of Reduction',
      description: 'In celebration of our 10th anniversary, we present a curated selection of our most iconic pieces. Each item represents a decade of craftsmanship, innovation, and unwavering commitment to excellence.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600'
   };

   return (
      <div className="bg-zinc-950 text-white overflow-hidden">
         {/* Cursor Follower */}
         <div
            className="fixed w-6 h-6 border border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300"
            style={{
               left: `${mousePosition.x}px`,
               top: `${mousePosition.y}px`,
               transform: 'translate(-50%, -50%)'
            }}
         />

         {/* Hero Section */}
         <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
               className="absolute inset-0 opacity-40"
               style={{
                  backgroundImage: 'url(https://i.pinimg.com/736x/db/98/21/db9821ac9ea20cbc217c2e1c09a5f4fd.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `scale(${1.1 + scrollY * 0.0001}) translateY(${scrollY * 0.3}px)`
               }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

            <div className="relative z-10 text-center px-4 max-w-9xl">
               <div className="mb-8 flex items-center justify-center gap-3 opacity-0 animate-fadeIn">
                  <div className="h-px w-12 bg-white/50" />
                  <Sparkles className="w-4 h-4" />
                  <span className="font-light tracking-[0.3em] text-xs">ANNIVERSARY COLLECTION</span>
                  <Sparkles className="w-4 h-4" />
                  <div className="h-px w-12 bg-white/50" />
               </div>

               <h1 className="!text-white text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 tracking-tight leading-none opacity-0 animate-fadeInUp">
                  Private<br />
                  <span className="italic font-serif">Sale</span>
               </h1>


               <p className="text-lg md:text-xl font-light mb-12 tracking-wide max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  An exclusive offering for our distinguished patrons
               </p>

               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <button className="group relative px-12 py-5 overflow-hidden">
                     <div className="absolute inset-0 bg-white transition-transform duration-500 origin-left group-hover:scale-x-100 scale-x-0" />
                     <span className="relative z-10 text-sm tracking-[0.2em] font-light group-hover:text-black transition-colors duration-500">
                        EXPLORE COLLECTION
                     </span>
                  </button>
                  <div className="text-sm font-light tracking-wider text-white/60">
                     Up to <span className="text-2xl text-white">40%</span> select pieces
                  </div>
               </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
               <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
         </div>

         {/* Story Section */}
         <div className="relative py-32 px-4">
            <div className="max-w-7xl mx-auto">
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div
                     className="relative h-[600px] overflow-hidden"
                     style={{
                        transform: `translateY(${scrollY * 0.1}px)`
                     }}
                  >
                     <img
                        src={featuredStory.image}
                        alt="Story"
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-8">
                     <div className="inline-block">
                        <div className="h-px w-16 bg-white/30 mb-6" />
                        <h2 className="!text-white text-5xl md:text-6xl font-extralight mb-6 leading-tight">
                           {featuredStory.title}
                        </h2>
                     </div>
                     <p className="text-lg font-light leading-relaxed text-white/70">
                        {featuredStory.description}
                     </p>
                     <div className="flex items-center gap-4 pt-6">
                        <span className="text-sm tracking-widest font-light">DISCOVER MORE</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Collections */}
         {collections.map((collection, collectionIdx) => (
            <div key={collectionIdx} className="py-24 px-4">
               <div className="max-w-9xl mx-auto">
                  <div className="text-center mb-20">
                     <h2 className="!text-white text-4xl md:text-6xl font-extralight mb-4 tracking-tight">
                        {collection.title}
                     </h2>
                     <p className="text-white/50 font-light tracking-wider">{collection.subtitle}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                     {collection.items.map((item, idx) => (
                        <div
                           key={item.id}
                           className="group cursor-pointer"
                           onClick={() => setSelectedItem(item)}
                           style={{
                              animation: `fadeInScale 0.8s ease-out ${idx * 0.15}s both`
                           }}
                        >
                           <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-zinc-900">
                              <img
                                 src={item.image}
                                 alt={item.name}
                                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                              <button
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    setFavorites(prev =>
                                       prev.includes(item.id) ? prev.filter(f => f !== item.id) : [...prev, item.id]
                                    );
                                 }}
                                 className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black"
                              >
                                 <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                              </button>

                              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                 <div className="flex items-center justify-between text-sm">
                                    <span className="font-light tracking-wider">VIEW DETAILS</span>
                                    <ShoppingBag className="w-5 h-5" />
                                 </div>
                              </div>

                              <div className="absolute top-6 left-6 px-4 py-2 bg-white text-black text-xs tracking-widest font-light">
                                 SAVE {Math.round((1 - item.price / item.original) * 100)}%
                              </div>
                           </div>

                           <div className="space-y-3">
                              <h3 className="text-xl font-light tracking-wide">{item.name}</h3>
                              <p className="text-sm text-white/50 font-light tracking-wide">{item.desc}</p>
                              <div className="flex items-baseline gap-4">
                                 <span className="text-2xl font-light">${item.price}</span>
                                 <span className="text-sm text-white/30 line-through">${item.original}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         ))}

         {/* Immersive Parallax Banner */}
         <div className="relative h-screen flex items-center justify-center overflow-hidden my-24">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed'
               }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 text-center px-4 max-w-4xl">
               <h2 className="!text-white text-5xl md:text-7xl font-extralight mb-8 leading-tight">
                  Crafted for those who<br />
                  <span className="italic font-serif">appreciate excellence</span>
               </h2>
               <p className="text-lg font-light text-white/70 tracking-wide">
                  Limited time. Exceptional value. Uncompromising quality.
               </p>
            </div>
         </div>

         {/* Product Modal */}
         {selectedItem && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
               <div className="bg-zinc-900 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                  <button
                     onClick={() => setSelectedItem(null)}
                     className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                     <X className="w-6 h-6" />
                  </button>

                  <div className="grid lg:grid-cols-2">
                     <div className="relative aspect-square lg:aspect-auto lg:min-h-[700px]">
                        <img
                           src={selectedItem.image}
                           alt={selectedItem.name}
                           className="w-full h-full object-cover"
                        />
                     </div>

                     <div className="p-12 lg:p-16 flex flex-col justify-center space-y-8">
                        <div>
                           <div className="inline-block px-4 py-1 bg-white text-black text-xs tracking-widest mb-6">
                              EXCLUSIVE OFFER
                           </div>
                           <h3 className="text-4xl md:text-5xl font-extralight mb-4">{selectedItem.name}</h3>
                           <p className="text-white/60 text-lg font-light tracking-wide mb-8">{selectedItem.desc}</p>

                           <div className="flex items-baseline gap-6 mb-8">
                              <span className="text-5xl font-extralight">${selectedItem.price}</span>
                              <span className="text-2xl text-white/30 line-through">${selectedItem.original}</span>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <label className="block text-sm tracking-widest mb-4 font-light">SELECT SIZE</label>
                              <div className="grid grid-cols-4 gap-3">
                                 {['XS', 'S', 'M', 'L'].map(size => (
                                    <button
                                       key={size}
                                       className="py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider font-light"
                                    >
                                       {size}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <button className="w-full py-6 bg-white text-black text-sm tracking-[0.2em] font-light hover:bg-white/90 transition-all duration-300 group relative overflow-hidden">
                              <span className="relative z-10">ADD TO COLLECTION</span>
                              <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                           </button>

                           <p className="text-sm text-white/50 leading-relaxed font-light pt-4">
                              Each piece is carefully crafted using traditional techniques passed down through generations. Limited quantities available.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Newsletter */}
         <div className="py-32 px-4 border-t border-white/10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
               <h2 className="!text-white text-4xl md:text-6xl font-extralight tracking-tight">Join Our Circle</h2>
               <p className="text-white/60 font-light tracking-wide">
                  Receive exclusive invitations to private sales and collection previews
               </p>
               <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
                  <input
                     type="email"
                     placeholder="Enter your email"
                     className="flex-1 px-6 py-5 bg-transparent border border-white/20 focus:border-white/60 outline-none transition-colors text-sm tracking-wider font-light"
                  />
                  <button className="px-10 py-5 bg-white text-black text-sm tracking-[0.2em] font-light hover:bg-white/90 transition-colors whitespace-nowrap">
                     SUBSCRIBE
                  </button>
               </div>
            </div>
         </div>

         <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out both; }
        .animate-fadeInUp { animation: fadeInUp 1.2s ease-out both; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
      </div>
   );
};

export default LuxurySalePage;