import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronDownIcon, SlidersHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewCollection = () => {
   const navigate = useNavigate();

   const [selectedCategory, setSelectedCategory] = useState("all");
   const [selectedSort, setSelectedSort] = useState("featured");
   const [hoveredProduct, setHoveredProduct] = useState(null);
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const container = document.getElementById("collection-scroll");
      if (!container) return;

      const handleScroll = () => {
         setScrolled(container.scrollTop > 40);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
   }, []);

   const categories = [
      { id: "all", label: "All" },
      { id: "shirts", label: "Shirts" },
      { id: "blazers", label: "Blazers" },
      { id: "jackets", label: "Jackets" },
      { id: "trousers", label: "Trousers" },
      { id: "knitwear", label: "Knitwear" },
   ];

   const products = [
      {
         id: 1,
         name: "Infinite Classic Cap",
         price: "₹699",
         category: "caps",
         image:
            "https://i.pinimg.com/1200x/cc/a2/ec/cca2ece0d2002f73e8a37027d9e45d73.jpg",
         hoverImage:
            "https://i.pinimg.com/736x/34/c6/b0/34c6b0f6adff9b8b3ba0832c63cc1f19.jpg",
         tag: "New Arrival",
      },
      {
         id: 2,
         name: "Midnight Luxe Hoodie",
         price: "₹1,499",
         category: "hoodies",
         image:
            "https://i.pinimg.com/736x/d6/9e/91/d69e919897a74e6ec1ca927ad3df5f81.jpg",
         hoverImage:
            "https://i.pinimg.com/1200x/96/83/79/968379f61ed0ed9eec4d286fdcdebda5.jpg",
         tag: "Limited",
      },

      {
         id: 3,
         name: "Classic Oxford White",
         price: "₹1,999",
         category: "shirts",
         image:
            "https://i.pinimg.com/736x/fb/be/4c/fbbe4cacd4132363597e01080ab105f1.jpg",
         hoverImage:
            "https://i.pinimg.com/736x/03/59/38/03593891395f8d516568f0721c07e30e.jpg",
      },
      {
         id: 4,
         name: "Asian Signature White Shoes",
         price: "₹1,299",
         category: "Shoes",
         image:
            "https://i.pinimg.com/1200x/fc/e6/eb/fce6ebcf1e16f3934fd56a098a7840f4.jpg",
         hoverImage:
            "https://i.pinimg.com/736x/26/0c/ed/260ced40940b6aa5a540d487669d2feb.jpg",
         tag: "Luxury",
      },
      {
         id: 5,
         name: "Navy Tech-Flex Track Set",
         price: "₹1999",
         category: "tracksuits",
         image:
            "https://i.pinimg.com/736x/3a/a2/7b/3aa27bf10e19660d8087a6b4bcdb3edf.jpg",
         hoverImage:
            "https://i.pinimg.com/1200x/6a/a0/e6/6aa0e6aecf26b293e71b7b83322ddfd4.jpg",
         tag: "Bestseller",
      },
      {
         id: 6,
         name: "Jersey Rich Look T-Shirt",
         price: "₹699",
         category: "T-shirt",
         image:
            "https://i.pinimg.com/1200x/7f/ea/1e/7fea1ed1a0f67d2dd00802755f827184.jpg",
         hoverImage:
            "https://i.pinimg.com/1200x/df/8f/d4/df8fd4b316289b65aa6cea7319a6c40c.jpg",
         tag: "Limited Edition",
      },
      {
         id: 7,
         name: "Carhartt Utility Workwear One-Piece",
         price: "₹2,469",
         category: "dresses",
         image:
            "https://i.pinimg.com/1200x/f5/76/d5/f576d588ac2411b6d3f78c3ad6607c72.jpg",
         hoverImage:
            "https://i.pinimg.com/1200x/06/09/5c/06095c6a3f02363fd31cea266e203bd5.jpg",
         tag: "Bestseller",
      },
      {
         id: 8,
         name: "NY Yankees Premium Varsity Leather Jacket",
         price: "₹2,779",
         category: "jackets",
         image:
            "https://i.pinimg.com/736x/db/d3/00/dbd300aff5a04fdd2b9d48f643561be9.jpg",
         hoverImage:
            "https://i.pinimg.com/736x/0f/42/23/0f42232b6316088804a7dd51300b6ea6.jpg",
         tag: "Limited Edition",
      },
   ];

   const filteredProducts =
      selectedCategory === "all"
         ? products
         : products.filter((p) => p.category === selectedCategory);

   return (
      <div className="fixed inset-0 bg-stone-50 z-[500] flex flex-col">
         {/* HEADER */}

         <div
            className={`sticky top-0 z-50 transition-all px-6 lg:px-10 py-4 border-b ${scrolled
               ? "bg-white/70 backdrop-blur-xl shadow-sm"
               : "bg-gradient-to-b from-white/40 to-transparent backdrop-blur-sm"
               }`}
         >
            <div className="flex items-center justify-between">

               {/* Premium Title */}
               <div className="flex flex-col">
                  <h1 className="text-[1.9rem] font-light tracking-[0.20em] text-[rgb(16,24,40)">
                     NEW SEASON
                  </h1>
                  <p className="text-sm tracking-wide text-black -mt-1">
                     Exclusive Fashion Edit
                  </p>
               </div>

               {/* Premium Close Button */}
               <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full border border-neutral-200 hover:border-neutral-400 
                 transition-all hover:shadow-md hover:bg-white/60 backdrop-blur-xl"
               >
                  <X className="size-5 text-neutral-700" />
               </button>
            </div>
         </div>


         {/* SCROLL AREA */}
         <div
            id="collection-scroll"
            className="h-[calc(100vh-5rem)] overflow-y-auto scroll-smooth"
         >
            {/* HERO */}
            <div className="relative h-[68vh] overflow-hidden">
               <img
                  src="https://i.pinimg.com/1200x/10/01/7c/10017c76e7a9880d236072934cebff29.jpg"
                  className="absolute inset-0 w-full h-full object-cover object-top scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>

               <div className="relative z-10 h-full flex flex-col justify-end px-8 lg:px-16 pb-24">
                  <p className="text-stone-700 uppercase tracking-[0.35em] text-xs mb-4">
                     Fall / Winter 2024
                  </p>

                  <h2 className="text-blue-900 text-6xl md:text-7xl font-light leading-tight">
                     Timeless
                     <br />
                     Elegance
                  </h2>

                  <p className="text-stone-200 max-w-xl mt-6 text-lg font-light">
                     Designs crafted with precision and intention — made for those
                     who value subtle luxury and refined aesthetics.
                  </p>
               </div>
            </div>

            {/* FILTERS */}
            <div className="sticky z-20 bg-white/80 backdrop-blur-xl border-b border-stone-200/50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                     {/* Categories with subtle scroll indicator */}
                     <div className="relative flex-1">
                        <div className="flex overflow-x-auto space-x-3 pb-2 md:pb-0 scrollbar-hide scroll-smooth">

                           {categories.map((cat, index) => (
                              <button
                                 key={cat.id}
                                 onClick={() => setSelectedCategory(cat.id)}
                                 className={`relative px-8 py-3 rounded-full whitespace-nowrap text-sm font-light 
                    tracking-[0.1em] uppercase transition-all duration-500 
                    ${selectedCategory === cat.id
                                       ? "bg-gradient-to-r from-[rgb(16,24,40)] to-[rgb(16,24,40)] text-white shadow-xl"
                                       : "bg-[rgb(16,24,40)] text-white hover:bg-blue-900 hover:text-white hover:shadow-md"
                                    }`}
                                 style={{
                                    animation: `slideIn 0.4s ease-out ${index * 0.05}s both`,
                                 }}
                              >
                                 {selectedCategory === cat.id && (
                                    <span className="absolute inset-0 rounded-full bg-blue-600/40 blur-xl opacity-30 animate-pulse"></span>
                                 )}

                                 <span className="relative z-10">{cat.label}</span>
                              </button>
                           ))}

                        </div>

                        {/* Scroll Fade Indicator */}
                        <div className="absolute right-0 top-0 bottom-2 w-12 
                  bg-gradient-to-l from-white via-white/60 to-transparent 
                  pointer-events-none md:hidden"></div>
                     </div>


                     {/* Sort Dropdown - Minimal Luxury */}
                     <div className="flex items-center gap-4">
                        <div className="relative group">
                           <select
                              value={selectedSort}
                              onChange={(e) => setSelectedSort(e.target.value)}
                              className="appearance-none px-6 py-3 pr-12 bg-white border border-stone-200 rounded-full text-sm font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:border-transparent transition-all cursor-pointer hover:border-stone-400 hover:shadow-lg"
                           >
                              <option value="featured">Featured</option>
                              <option value="price-low">Price: Low to High</option>
                              <option value="price-high">Price: High to Low</option>
                              <option value="newest">Newest First</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ChevronDownIcon className="w-4 h-4 text-stone-600 group-hover:text-stone-900 transition-colors" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* PRODUCT GRID */}
            <div className="px-6 lg:px-10 py-14">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-5">
                  {filteredProducts.map((p, i) => (
                     <div
                        key={p.id}
                        className="group cursor-pointer"
                        onMouseEnter={() => setHoveredProduct(p.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        style={{
                           animation: `fadeInUp .7s ease-out ${i * 0.08}s both`,
                        }}
                     >
                        {/* CARD WRAPPER */}
                        <div
                           className="
            h-full flex flex-col rounded-2xl bg-white 
            border border-stone-200/80 
            shadow-[0_10px_30px_rgba(15,23,42,0.06)]
            overflow-hidden 
            transition-all duration-500
            group-hover:-translate-y-2
            group-hover:shadow-[0_22px_55px_rgba(15,23,42,0.20)]
          "
                        >
                           {/* IMAGE SECTION */}
                           <div className="relative px-4 pt-4 pb-3">
                              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100">
                                 {/* TAG */}
                                 {p.tag && (
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-stone-200/70 px-3 py-1 rounded-full">
                                       <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-stone-700">
                                          {p.tag}
                                       </span>
                                    </div>
                                 )}

                                 {/* IMAGE */}
                                 <img
                                    src={hoveredProduct === p.id ? p.hoverImage : p.image}
                                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                                 />

                                 {/* TOP GRADIENT OVERLAY */}
                                 <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 via-black/0 to-transparent" />
                              </div>
                           </div>

                           {/* CONTENT SECTION */}
                           <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
                              {/* NAME */}
                              <h3
                                 className="
                text-[1.05rem] md:text-[1.1rem] 
                font-light tracking-wide 
                text-stone-900 
                transition-colors duration-300
                group-hover:text-stone-700
              "
                              >
                                 {p.name}
                              </h3>

                              {/* PRICE + META */}
                              <div className="flex items-center justify-between mt-1">
                                 <p className="text-sm text-stone-700 font-normal">
                                    {p.price}
                                 </p>
                                 <span className="text-[11px] tracking-[0.22em] uppercase text-stone-400">
                                    {p.category}
                                 </span>
                              </div>

                              {/* BOTTOM CTA ROW */}
                              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase">
                                 <span className="text-stone-500">
                                    View Details
                                 </span>
                                 <span
                                    className="
                  inline-flex h-8 w-8 items-center justify-center 
                  rounded-full border border-stone-300 
                  text-stone-700 text-xs 
                  transition-all duration-300
                  group-hover:bg-[rgb(16,24,40)]
                  group-hover:text-white
                  group-hover:border-[rgb(16,24,40)]
                "
                                 >
                                    &rarr;
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>


            {/* FOOTER CTA */}
            <div className="bg-[rgb(16,24,40)] text-white py-20 text-center">
               <p className="text-4xl font-semibold    text-stone-300 tracking-tight">Join Our Story</p>
               <p className="text-stone-300 max-w-xl mx-auto mt-4 font-light">
                  Stay updated with new drops, editorial releases, and exclusive
                  previews.
               </p>

               <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <input
                     type="email"
                     placeholder="Email address"
                     className="px-6 py-3 bg-white/10 border border-white/20 rounded-full placeholder-stone-400 text-white w-full"
                  />
                  <button className="px-8 py-3 bg-white text-stone-900 rounded-full tracking-wide hover:bg-stone-100">
                     Subscribe
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ViewCollection;
