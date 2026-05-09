import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCollectionProducts } from "../../app/features/products/collectionProductSlice";
import { Grid, List, ChevronDown, Heart, Star } from "lucide-react";

const MARQUEE_TEXT = "NEW COLLECTION  ·  FALL / WINTER 2024  ·  TIMELESS ELEGANCE  ·  FREE SHIPPING OVER ₹5,000  ·  EXCLUSIVE DROPS  ·  MEMBERS ONLY ACCESS  ·  ";

const CATEGORIES = [
   { id: "all", label: "All Pieces" },
   { id: "shirts", label: "Shirts" },
   { id: "shoes", label: "Shoes" },
   { id: "jackets", label: "Jackets" },
   { id: "trousers", label: "Trousers" },
];

const ViewCollection = () => {
   const navigate = useNavigate();
   const products = useSelector(selectCollectionProducts);

   const [category, setCategory] = useState("all");
   const [sort, setSort] = useState("featured");
   const [viewMode, setViewMode] = useState("grid");
   const [favorites, setFavorites] = useState(new Set());
   const [hovered, setHovered] = useState(null);

   const toggleFav = (id) => {
      setFavorites((prev) => {
         const next = new Set(prev);
         next.has(id) ? next.delete(id) : next.add(id);
         return next;
      });
   };

   const filtered = useMemo(() => {
      const base = category === "all"
         ? products
         : products.filter((p) => p.category?.toLowerCase() === category);
      switch (sort) {
         case "price-low": return [...base].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
         case "price-high": return [...base].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
         default: return base;
      }
   }, [products, category, sort]);

   return (
      <div className="min-h-screen" style={{ background: "linea-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
         <style>{`
        @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .col-animate { animation: fadeInUp 0.6s ease-out forwards; }
        .col-card-img { transition: transform 0.5s ease; }
        .col-card:hover .col-card-img { transform: scale(1.1); }
      `}</style>

         {/* ── MARQUEE ── */}
         <div style={{
            background: "rgba(0,0,0,0.4)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden", padding: "10px 0",
         }}>
            <div style={{ display: "flex", width: "max-content", animation: "marquee 28s linear infinite" }}>
               {[...Array(4)].map((_, i) => (
                  <span key={i} style={{
                     fontSize: 10, letterSpacing: "0.28em",
                     textTransform: "uppercase",
                     color: "#ffffff",                   // ✅ white
                     whiteSpace: "nowrap",
                     fontWeight: 500,
                  }}>
                     {MARQUEE_TEXT}
                  </span>
               ))}
            </div>
         </div>

         {/* ── HERO TEXT ── */}
         <div style={{ padding: "48px 24px 40px", textAlign: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>   {/* ✅ reduced height */}
            <div style={{
               display: "inline-flex", alignItems: "center", gap: 8,
               background: "rgba(255,255,255,0.07)",
               border: "1px solid rgba(255,255,255,0.1)",
               borderRadius: 999, padding: "7px 18px", marginBottom: 20,
            }}>
               <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>
                  ✦  Fall / Winter 2024 - New Collection
               </span>
            </div>

            <h1 style={{
               fontSize: "clamp(36px, 5.5vw, 64px)",
               fontWeight: 700, color: "#fff",
               lineHeight: 1.05, margin: "0 0 14px",
               letterSpacing: "-0.03em",
            }}>
               New Collection & {" "}
               <span style={{
                  background: "linear-gradient(90deg, #f59e0b, #f97316)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
               }}>
                 Luxury Redefined
               </span>
            </h1>

            <p style={{
               fontSize: 16, color: "rgba(255,255,255,0.45)",
               maxWidth: 480, margin: "0 auto",
               lineHeight: 1.7, fontWeight: 300,
            }}>
               Designs crafted with precision  made for those who value subtle luxury and refined aesthetics.
            </p>
         </div>

         {/* ── FILTER BAR ── */}
         <div style={{
            position: "sticky", top: 0, zIndex: 40,
            background: "rgba(15,23,42,0.88)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
         }}>
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
               <div style={{ padding: "14px 0 10px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

                     {/* Category pills — same style as BestSeller */}
                     <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CATEGORIES.map((cat) => (
                           <button
                              key={cat.id}
                              onClick={() => setCategory(cat.id)}
                              style={{
                                 display: "flex", alignItems: "center", gap: 6,
                                 padding: "8px 18px", borderRadius: 999,
                                 fontSize: 13, fontWeight: 600,
                                 border: "none", cursor: "pointer",
                                 transition: "all 0.2s",
                                 background: category === cat.id ? "#fff" : "rgba(255,255,255,0.08)",
                                 color: category === cat.id ? "#0f172a" : "rgba(255,255,255,0.6)",
                                 boxShadow: category === cat.id ? "0 4px 20px rgba(0,0,0,0.35)" : "none",
                                 transform: category === cat.id ? "scale(1.05)" : "scale(1)",
                              }}
                           >
                              {cat.label}
                           </button>
                        ))}
                     </div>

                     {/* View toggle + Sort */}
                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                           display: "flex", gap: 3,
                           background: "rgba(255,255,255,0.07)",
                           borderRadius: 8, padding: 4,
                        }}>
                           {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                              <button
                                 key={mode}
                                 onClick={() => setViewMode(mode)}
                                 style={{
                                    padding: 7, borderRadius: 6, border: "none", cursor: "pointer",
                                    transition: "all 0.2s",
                                    background: viewMode === mode ? "#fff" : "transparent",
                                    color: viewMode === mode ? "#0f172a" : "rgba(255,255,255,0.45)",
                                    display: "flex", alignItems: "center",
                                 }}
                              >
                                 <Icon size={15} />
                              </button>
                           ))}
                        </div>

                        <div style={{ position: "relative" }}>
                           <select
                              value={sort}
                              onChange={(e) => setSort(e.target.value)}
                              style={{
                                 appearance: "none",
                                 background: "rgba(255,255,255,0.08)",
                                 border: "1px solid rgba(255,255,255,0.1)",
                                 color: "rgba(255,255,255,0.75)",
                                 borderRadius: 8, padding: "8px 36px 8px 14px",
                                 fontSize: 13, fontWeight: 500,
                                 cursor: "pointer", outline: "none",
                              }}
                           >
                              <option value="featured" style={{ background: "#1e293b" }}>Featured</option>
                              <option value="price-low" style={{ background: "#1e293b" }}>Price: Low → High</option>
                              <option value="price-high" style={{ background: "#1e293b" }}>Price: High → Low</option>
                           </select>
                           <ChevronDown size={13} style={{
                              position: "absolute", right: 10, top: "50%",
                              transform: "translateY(-50%)",
                              color: "rgba(255,255,255,0.45)", pointerEvents: "none",
                           }} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* ── PRODUCTS ── */}
         <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* GRID */}
            {viewMode === "grid" && (
               <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 20,
               }}>
                  {filtered.map((p, i) => {
                     const img = hovered === p.id
                        ? (Array.isArray(p.hoverImage) ? p.hoverImage[0] : p.hoverImage) || (Array.isArray(p.image) ? p.image[0] : p.image)
                        : (Array.isArray(p.image) ? p.image[0] : p.image);

                     return (
                        <div
                           key={p.id}
                           className="col-card col-animate"
                           style={{
                              animationDelay: `${i * 50}ms`,
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16, overflow: "hidden",
                              cursor: "pointer",
                              transition: "box-shadow 0.3s, border-color 0.3s",
                              boxShadow: hovered === p.id
                                 ? "0 20px 60px rgba(0,0,0,0.5)"
                                 : "0 4px 16px rgba(0,0,0,0.2)",
                           }}
                           onClick={() => navigate(`/collection/product/${p.id}`)}
                           onMouseEnter={() => setHovered(p.id)}
                           onMouseLeave={() => setHovered(null)}
                        >
                           {/* Image */}
                           <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
                              <img
                                 src={img}
                                 alt={p.name}
                                 className="col-card-img"
                                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                              />
                              {p.tag && (
                                 <div style={{
                                    position: "absolute", top: 12, left: 12,
                                    background: "rgba(15,23,42,0.82)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 999, padding: "4px 12px",
                                    fontSize: 10, letterSpacing: "0.18em",
                                    textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                                 }}>
                                    {p.tag}
                                 </div>
                              )}
                              <button
                                 onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
                                 style={{
                                    position: "absolute", top: 12, right: 12,
                                    background: "rgba(15,23,42,0.7)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "50%", width: 36, height: 36,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer",
                                 }}
                              >
                                 <Heart
                                    size={15}
                                    fill={favorites.has(p.id) ? "#ef4444" : "none"}
                                    color={favorites.has(p.id) ? "#ef4444" : "rgba(255,255,255,0.7)"}
                                 />
                              </button>
                           </div>

                           {/* Info */}
                           <div style={{ padding: "16px 18px 20px" }}>
                              <h3 style={{ fontSize: 15, fontWeight: 600, color: "gray", margin: "0 0 4px", lineHeight: 1.3 }}>
                                 {p.name}
                              </h3>
                              <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "black", margin: "0 0 14px" }}>
                                 {p.category}
                              </p>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                 <span style={{ fontSize: 20, fontWeight: 700, color: "black" }}>{p.price}</span>
                                 <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "black" }}>
                                    View →
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}

            {/* LIST */}
            {viewMode === "list" && (
               <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {filtered.map((p, i) => {
                     const img = Array.isArray(p.image) ? p.image[0] : p.image;
                     return (
                        <div
                           key={p.id}
                           className="col-animate"
                           style={{
                              animationDelay: `${i * 50}ms`,
                              display: "flex", gap: 0,
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 16, overflow: "hidden",
                              cursor: "pointer",
                           }}
                           onClick={() => navigate(`/collection/product/${p.id}`)}
                        >
                           <div style={{ width: 140, flexShrink: 0, overflow: "hidden" }}>
                              <img src={img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                           </div>
                           <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                              <div>
                                 <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 6px" }}>
                                    {p.category}
                                 </p>
                                 <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{p.name}</h3>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                 <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{p.price}</span>
                                 <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                    View Details →
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}

            {filtered.length === 0 && (
               <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <p style={{ fontSize: 18, color: "rgba(255,255,255,0.25)" }}>No pieces found in this category.</p>
               </div>
            )}
         </div>
         <div className="mx-auto text-center">
            <button className="bg-blue-950 px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 text-2xl text-white">View More Product</button>
         </div>
      </div>
   );
};

export default ViewCollection;