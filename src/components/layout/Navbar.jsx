import React, { useState, useEffect } from "react";
import {
   FaShoppingBag, FaHeart, FaUser,
   FaSearch, FaBars, FaTimes, FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const B = {
   bg: "#06142B",

   bgElevated: "rgba(255,255,255,0.04)",

   border: "rgba(255,255,255,0.08)",
   borderMid: "rgba(255,255,255,0.14)",

   text: "#FFFFFF",

   textMuted: "rgba(255,255,255,0.82)",

   textDim: "rgba(255,255,255,0.55)",

   accent: "#C8A96E",

   accentHover: "#F4D03F",
};

const NAV_LINKS = [
   { label: "Best Sellers",   to: "/best-sellers"    },
   { label: "New Collection", to: "/view-collection"  },
   { label: "Sale",           to: "/sale", accent: true },
];

const slugify = (t) => t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function Navbar() {
   const [isScrolled,    setIsScrolled]    = useState(false);
   const [catOpen,       setCatOpen]       = useState(false);
   const [mobileOpen,    setMobileOpen]    = useState(false);
   const [mobileCatOpen, setMobileCatOpen] = useState(false);
   const [query,         setQuery]         = useState("");
   const [results,       setResults]       = useState([]);
   const [searchFocused, setSearchFocused] = useState(false);

   const cartCount   = useSelector((s) => s.cart.totalQuantity);
   const allProducts = useSelector((s) => s.allProducts.products);
   const categories  = [...new Set(allProducts.map((p) => p.category))];

   useEffect(() => {
      const link = document.createElement("link");
      link.href  = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
      link.rel   = "stylesheet";
      document.head.appendChild(link);
      const onScroll = () => setIsScrolled(window.scrollY > 12);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   const handleSearch = (val) => {
      setQuery(val);
      if (!val.trim()) { setResults([]); return; }
      const q    = val.toLowerCase();
      const seen = new Set();
      setResults(
         allProducts
            .filter((p) => {
               if (seen.has(p.id)) return false;
               seen.add(p.id);
               return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
            })
            .slice(0, 6)
      );
   };

   const rowIn  = (e) => { e.currentTarget.style.background = "rgba(200,169,110,0.06)"; };
   const rowOut = (e) => { e.currentTarget.style.background = "transparent"; };

   const iconBtn = {
      width: 40, height: 40,
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 2, color: B.textMuted, textDecoration: "none",
      border: "1px solid transparent",
      transition: "color .2s, border-color .2s",
      cursor: "pointer", background: "none",
   };

   return (
      <>
         <style>{`
            @media (max-width: 1023px) {
               .vn-desktop { display: none !important; }
               .vn-hamburger { display: flex !important; }
               .vn-search-wrap { display: none !important; }
            }
            @media (min-width: 1024px) {
               .vn-hamburger { display: none !important; }
            }
            .vn-search::placeholder { color: ${B.textDim}; }
            .vn-icon:hover { color: ${B.accent} !important; border-color: ${B.borderMid} !important; }
            .vn-link:hover { color: ${B.text} !important; padding-left: 22px !important; }
         `}</style>

         {/* Announcement */}
         <div style={{
            background: B.accent, color: B.bg,
            textAlign: "center", padding: "10px 16px",
            fontSize: 11, letterSpacing: "0.2em",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
         }}>
            FREE SHIPPING ON ORDERS ABOVE ₹2999 · USE CODE{" "}
            <strong>VELOR10</strong> FOR 10% OFF
         </div>

         {/* Navbar */}
         <nav style={{
            position: "sticky", top: 0, zIndex: 50,
            background: isScrolled ? "rgba(10,10,10,0.97)" : B.bg,
            backdropFilter: isScrolled ? "blur(24px)" : "none",
            borderBottom: `1px solid ${B.border}`,
            boxShadow: isScrolled ? "0 8px 48px rgba(0,0,0,0.55)" : "none",
            transition: "box-shadow .3s, background .3s",
            fontFamily: "'DM Sans', sans-serif",
         }}>
            <div style={{
               maxWidth: 1440, margin: "0 auto", padding: "0 32px",
               height: 80, display: "flex", alignItems: "center",
               justifyContent: "space-between",
            }}>
               {/* Left */}
               <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                  <button className="vn-hamburger"
                     onClick={() => setMobileOpen(true)}
                     style={{ ...iconBtn, display: "none" }}
                  >
                     <FaBars size={17} />
                  </button>
                  <NavLink to="/home" style={{ textDecoration: "none" }}>
                     <span style={{
                        fontFamily: "'Arial', serif",
                        fontSize: 26, fontWeight: 700,
                        color: B.text, letterSpacing: "0.06em",
                     }}>VELOR</span>
                  </NavLink>
               </div>

               {/* Center */}
               <div className="vn-desktop"
                  style={{ display: "flex", alignItems: "center", gap: 44 }}
               >
                  {/* ── DROPDOWN FIX ──────────────────────────────────────────
                      Root cause: top: "calc(100% + Xpx)" creates a physical gap
                      OUTSIDE the parent div. Mouse crossing it triggers onMouseLeave.

                      Fix: use top:"100%" and add paddingTop to the absolute wrapper.
                      Padding space IS a descendant → onMouseLeave won't fire there.
                  ─────────────────────────────────────────────────────────── */}
                  <div
                     style={{ position: "relative" }}
                     onMouseEnter={() => setCatOpen(true)}
                     onMouseLeave={() => setCatOpen(false)}
                  >
                     <button style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 7,
                        fontSize: 12, letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: catOpen ? B.text : B.textMuted,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "color .2s", padding: "4px 0",
                     }}>
                        Categories
                        <FaChevronDown style={{
                           fontSize: 9, color: B.accent,
                           transition: "transform .3s",
                           transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }} />
                     </button>

                     {/* paddingTop = invisible bridge between button and menu */}
                     <div style={{
                        position: "absolute", top: "100%", left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: 14,              /* ← THE FIX */
                        opacity: catOpen ? 1 : 0,
                        visibility: catOpen ? "visible" : "hidden",
                        transition: "opacity .2s, visibility .2s",
                        pointerEvents: catOpen ? "all" : "none",
                        zIndex: 60,
                     }}>
                        <div style={{
                           background: "#0B1B34",
                           border: `1px solid ${B.borderMid}`,
                           borderRadius: 2, minWidth: 224,
                           overflow: "hidden",
                           boxShadow: "0 28px 72px rgba(0,0,0,0.65)",
                        }}>
                           <div style={{ height: 2, background: `linear-gradient(90deg,${B.accent},transparent)` }} />
                           {categories.map((cat, i) => (
                              <Link
                                 key={cat}
                                 to={`/category/${slugify(cat)}`}
                                 className="vn-link"
                                 style={{
                                    display: "flex", alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "13px 20px",
                                    fontSize: 12, letterSpacing: "0.11em",
                                    textTransform: "uppercase",
                                    color: B.textMuted, textDecoration: "none",
                                    borderBottom: i < categories.length - 1 ? `1px solid ${B.border}` : "none",
                                    background: "transparent",
                                    transition: "background .18s, color .18s, padding-left .18s",
                                 }}
                                 onMouseEnter={rowIn} onMouseLeave={rowOut}
                              >
                                 {cat}
                                 <span style={{ color: B.accent, fontSize: 12 }}>→</span>
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>

                  {NAV_LINKS.map(({ label, to, accent }) => (
                     <Link key={to} to={to}
                        style={{
                           textDecoration: "none",
                           fontSize: 12, letterSpacing: "0.14em",
                           textTransform: "uppercase",
                           color: accent ? B.accent : B.textMuted,
                           transition: "color .2s", padding: "4px 0",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = accent ? B.accentHover : B.text; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = accent ? B.accent : B.textMuted; }}
                     >
                        {label}
                     </Link>
                  ))}
               </div>

               {/* Right */}
               <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "flex-end" }}>

                  {/* Search */}
                  <div className="vn-search-wrap" style={{ position: "relative", marginRight: 8 }}>
                     <FaSearch style={{
                        position: "absolute", left: 13, top: "50%",
                        transform: "translateY(-50%)",
                        color: B.textDim, fontSize: 11, zIndex: 1,
                     }} />
                     <input
                        type="text"
                        className="vn-search"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                        placeholder="Search products..."
                        style={{
                           width: searchFocused ? 260 : 170,
                           height: 40, paddingLeft: 34, paddingRight: 14,
                           background: "rgba(255,255,255,0.05)",
                           border: `1px solid ${searchFocused ? B.accent : B.border}`,
                           borderRadius: 2,
                           color: B.text, fontSize: 13,
                           fontFamily: "'DM Sans', sans-serif",
                           outline: "none", letterSpacing: "0.04em",
                           transition: "width .3s, border-color .2s",
                        }}
                     />

                     {/* Results */}
                     {results.length > 0 && (
                        <div style={{
                           position: "absolute", top: "calc(100% + 6px)", right: 0,
                           width: 340, background: B.bgElevated,
                           border: `1px solid ${B.borderMid}`,
                           borderRadius: 2, overflow: "hidden",
                           boxShadow: "0 24px 64px rgba(0,0,0,0.65)", zIndex: 100,
                        }}>
                           <div style={{ height: 2, background: `linear-gradient(90deg,${B.accent},transparent)` }} />
                           {results.map((item, i) => (
                              <Link
                                 key={item.id}
                                 to={`/product/${item.id}`}
                                 onClick={() => { setQuery(""); setResults([]); }}
                                 style={{
                                    display: "flex", alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "12px 16px", textDecoration: "none",
                                    borderBottom: i < results.length - 1 ? `1px solid ${B.border}` : "none",
                                    transition: "background .18s",
                                 }}
                                 onMouseEnter={rowIn} onMouseLeave={rowOut}
                              >
                                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <img
                                       src={item.image} alt={item.name}
                                       style={{ width: 42, height: 42, objectFit: "cover", borderRadius: 2, border: `1px solid ${B.border}` }}
                                    />
                                    <div>
                                       <p style={{ fontSize: 13, color: B.text, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                                       <p style={{ fontSize: 10, color: B.accent, margin: "4px 0 0", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                          {item.category} · ₹{item.price.toLocaleString()}
                                       </p>
                                    </div>
                                 </div>
                                 <FaSearch style={{ color: B.textDim, fontSize: 11, flexShrink: 0 }} />
                              </Link>
                           ))}
                        </div>
                     )}

                     {query.trim() && results.length === 0 && (
                        <div style={{
                           position: "absolute", top: "calc(100% + 6px)", right: 0,
                           width: 260, background: B.bgElevated,
                           border: `1px solid ${B.borderMid}`,
                           borderRadius: 2, padding: "18px 20px", zIndex: 100,
                           boxShadow: "0 20px 56px rgba(0,0,0,0.55)",
                        }}>
                           <p style={{ fontSize: 13, color: B.textMuted, margin: 0 }}>
                              No results for{" "}
                              <span style={{ color: B.text }}>"{query}"</span>
                           </p>
                        </div>
                     )}
                  </div>

                  <Link to="/wishlist" className="vn-icon" style={iconBtn}>
                     <FaHeart style={{ fontSize: 14 }} />
                  </Link>

                  <Link to="/cart" className="vn-icon" style={{ ...iconBtn, position: "relative" }}>
                     <FaShoppingBag style={{ fontSize: 14 }} />
                     {cartCount > 0 && (
                        <span style={{
                           position: "absolute", top: 5, right: 5,
                           minWidth: 15, height: 15, borderRadius: "50%",
                           background: B.accent, color: B.bg,
                           fontSize: 8, fontWeight: 700,
                           display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{cartCount}</span>
                     )}
                  </Link>

                  <Link to="/profile" className="vn-icon" style={iconBtn}>
                     <FaUser style={{ fontSize: 14 }} />
                  </Link>
               </div>
            </div>
         </nav>

         {/* Mobile Drawer */}
         {mobileOpen && (
            <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
               <div onClick={() => setMobileOpen(false)}
                  style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
               />
               <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "82%", maxWidth: 340, height: "100%",
                  background: "#0D0D0D",
                  borderRight: `1px solid ${B.border}`, overflowY: "auto",
                  fontFamily: "'DM Sans', sans-serif",
               }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg,${B.accent},transparent)` }} />
                  <div style={{ padding: "28px 28px 48px" }}>
                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: B.text, letterSpacing: "0.06em" }}>VELOR</span>
                        <button onClick={() => setMobileOpen(false)}
                           style={{ background: "none", cursor: "pointer", border: `1px solid ${B.border}`, borderRadius: 2, color: B.textMuted, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                           <FaTimes size={12} />
                        </button>
                     </div>

                     {/* Mobile search */}
                     <div style={{ position: "relative", marginBottom: 20 }}>
                        <FaSearch style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: B.textDim, fontSize: 12 }} />
                        <input type="text" className="vn-search" placeholder="Search products…"
                           onChange={(e) => handleSearch(e.target.value)}
                           style={{
                              width: "100%", height: 46, paddingLeft: 36, paddingRight: 14, boxSizing: "border-box",
                              background: "rgba(255,255,255,0.04)", border: `1px solid ${B.border}`,
                              borderRadius: 2, color: B.text, fontSize: 13,
                              fontFamily: "'DM Sans', sans-serif", outline: "none",
                           }}
                        />
                     </div>

                     {/* Mobile search results */}
                     {results.length > 0 && (
                        <div style={{ border: `1px solid ${B.border}`, borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
                           {results.map((item, i) => (
                              <Link key={item.id} to={`/product/${item.id}`}
                                 onClick={() => { setMobileOpen(false); setQuery(""); setResults([]); }}
                                 style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", textDecoration: "none", borderBottom: i < results.length - 1 ? `1px solid ${B.border}` : "none" }}
                              >
                                 <img src={item.image} alt={item.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 2 }} />
                                 <div>
                                    <p style={{ fontSize: 13, color: B.text, margin: 0 }}>{item.name}</p>
                                    <p style={{ fontSize: 10, color: B.accent, margin: "2px 0 0", letterSpacing: "0.1em", textTransform: "uppercase" }}>₹{item.price.toLocaleString()}</p>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     )}

                     {/* Nav */}
                     <div style={{ borderBottom: `1px solid ${B.border}` }}>
                        <button onClick={() => setMobileCatOpen(!mobileCatOpen)}
                           style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", background: "none", border: "none", cursor: "pointer", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: B.text, fontFamily: "'DM Sans', sans-serif" }}
                        >
                           Categories
                           <FaChevronDown style={{ fontSize: 9, color: B.accent, transition: "transform .3s", transform: mobileCatOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                        </button>
                        {mobileCatOpen && (
                           <div style={{ paddingLeft: 12, paddingBottom: 8 }}>
                              {categories.map((cat) => (
                                 <Link key={cat} to={`/category/${slugify(cat)}`}
                                    onClick={() => setMobileOpen(false)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 4px", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: B.textMuted, textDecoration: "none", borderBottom: `1px solid ${B.border}` }}
                                 >
                                    {cat}
                                    <span style={{ color: B.accent, fontSize: 11 }}>→</span>
                                 </Link>
                              ))}
                           </div>
                        )}
                     </div>

                     {NAV_LINKS.map(({ label, to, accent }) => (
                        <Link key={to} to={to}
                           onClick={() => setMobileOpen(false)}
                           style={{ display: "block", padding: "15px 0", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: accent ? B.accent : B.textMuted, textDecoration: "none", borderBottom: `1px solid ${B.border}` }}
                        >
                           {label}
                        </Link>
                     ))}

                     <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                        {[{ icon: <FaHeart size={13} />, to: "/wishlist", label: "Wishlist" }, { icon: <FaUser size={13} />, to: "/profile", label: "Account" }].map(({ icon, to, label }) => (
                           <Link key={to} to={to}
                              onClick={() => setMobileOpen(false)}
                              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 8px", border: `1px solid ${B.border}`, borderRadius: 2, color: B.textMuted, textDecoration: "none", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}
                           >
                              {icon} {label}
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}