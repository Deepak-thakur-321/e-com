import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Heart, TrendingUp } from "lucide-react";
import { addToCart } from "../../app/features/cart/cartSlice";
import { selectAllProducts } from "../../app/features/products/allProductsCategorySlice";
import { useWishlist } from "../../context/WishlistContext";

// Heights cycle for masonry feel
const H_CYCLE = [260, 320, 230, 290, 350, 250, 310, 210, 270, 340];
const getH = (i) => H_CYCLE[i % H_CYCLE.length];

// Category display names
const CAT_LABELS = {
   "t-shirts": "T-Shirts",
   shirts: "Shirts",
   jackets: "Jackets",
   jeans: "Jeans",
   bags: "Bags",
   shoes: "Shoes",
   watches: "Watches",
   caps: "Caps",
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Gallery() {
   const dispatch = useDispatch();
   const { addToWishlist } = useWishlist() || {};
   const allProducts = useSelector(selectAllProducts);

   const [filter, setFilter] = useState("all");
   const [lightbox, setLightbox] = useState(null);
   const [wishSet, setWishSet] = useState(new Set());
   const [addedSet, setAddedSet] = useState(new Set());

   // Unique categories from real product data (preserve order)
   const categories = useMemo(() => {
      const seen = new Set();
      const cats = [];
      allProducts.forEach((p) => {
         if (!seen.has(p.category)) { seen.add(p.category); cats.push(p.category); }
      });
      return cats;
   }, [allProducts]);

   // Deduplicated products (remove duplicate IDs)
   const uniqueProducts = useMemo(() => {
      const seen = new Set();
      return allProducts.filter((p) => {
         if (seen.has(p.id)) return false;
         seen.add(p.id);
         return true;
      });
   }, [allProducts]);

   const filtered = useMemo(() =>
      filter === "all"
         ? uniqueProducts
         : uniqueProducts.filter((p) => p.category === filter),
      [filter, uniqueProducts]
   );

   // Lightbox
   const openLightbox = useCallback((idx) => setLightbox(idx), []);
   const closeLightbox = useCallback(() => setLightbox(null), []);
   const prevImg = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
   const nextImg = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length]);

   const toggleWish = (product, e) => {
      e.stopPropagation();
      setWishSet((s) => {
         const n = new Set(s);
         n.has(product.id) ? n.delete(product.id) : n.add(product.id);
         return n;
      });
      if (addToWishlist) addToWishlist(product);
   };

   const handleAddCart = (product, e) => {
      e.stopPropagation();
      dispatch(addToCart({
         id: product.id,
         name: product.name,
         price: product.price,
         image: product.image,
      }));
      setAddedSet((s) => { const n = new Set(s); n.add(product.id); return n; });
      setTimeout(() => setAddedSet((s) => { const n = new Set(s); n.delete(product.id); return n; }), 1400);
   };

   const current = lightbox !== null ? filtered[lightbox] : null;

   return (
      <>
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .gl * { box-sizing: border-box; }
        .gl   { min-height: 100vh; background: rgb(251,252,253); font-family: 'DM Sans', sans-serif; }

        /* ══ HERO ══════════════════════════════════════════════════════════ */
        .gl-hero{
  background:linear-gradient(
      160deg,
      #06142B 0%,
      #0b2447 55%,
      #0f172a 100%
  );

  padding:clamp(36px,9vw,10px)
          clamp(20px,5vw,64px);

  text-align:center;
  position:relative;
  overflow:hidden;
}

        /* Faint watermark */
        .gl-hero::before{
  content:'VELOR';
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);

  font-family: Arial !important;
  font-size:clamp(80px,18vw,220px);
  font-weight:700;
  color:rgba(200,169,110,.045);
  letter-spacing:.06em;

  pointer-events:none;
  user-select:none;
  white-space:nowrap;
}

        /* Subtle radial glow */
        .gl-hero::after {
          content: '';
          position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
          width: 60%; height: 80%;
          background: radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .gl-hero-inner {
          max-width: 820px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        /* Centered badge */
        .gl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(200,169,110,0.1);
          border: 1px solid rgba(200,169,110,0.28);
          color: #C8A96E;
          padding: 7px 18px; border-radius: 30px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.26em;
          text-transform: uppercase; margin-bottom: 28px;
        }
        .gl-badge-icon { opacity: 0.85; }

        .gl-hero-title {
  font-family: Arial, sans-serif;
  font-size: clamp(30px, 5.5vw, 64px);
  font-weight: 500;
  color: #F5F0E8;

  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 18px;
}

.gl-hero-title em {
 color: #C8A96E;
   font-style: normal;
   font-weight: 600;
}

        .gl-hero-sub {
          font-size: clamp(13px, 1.5vw, 15px);
          color: rgba(245,240,232,0.48);
          line-height: 1.75; margin: 0 auto 36px;
          max-width: 520px;
        }

        .gl-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        .gl-btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: #C8A96E; color: #06142B;
          padding: 13px 28px; border-radius: 4px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: background .2s, gap .2s; font-family: 'DM Sans', sans-serif;
        }
        .gl-btn-gold:hover { background: #dfc080; gap: 12px; }

        .gl-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(245,240,232,0.7);
          padding: 13px 28px; border-radius: 4px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          border: 1.5px solid rgba(245,240,232,0.18);
          transition: all .2s;
        }
        .gl-btn-outline:hover { border-color: rgba(200,169,110,0.5); color: #C8A96E; gap: 12px; }

        /* Hero stat chips */
        .gl-hero-stats {
          display: flex; gap: 24px; justify-content: center;
          margin-top: 44px; flex-wrap: wrap;
        }
        .gl-hero-stat { text-align: center; }
        .gl-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 28px); font-weight: 500;
          color: #F5F0E8; display: block; line-height: 1;
        }
        .gl-stat-label {
          font-size: 9px; font-weight: 600; letter-spacing: 0.26em;
          color: rgba(245,240,232,0.3); text-transform: uppercase;
          display: block; margin-top: 5px;
        }
        .gl-stat-divider {
          width: 1px; background: rgba(255,255,255,0.08); align-self: stretch;
        }

        /* ══ FILTER BAR ════════════════════════════════════════════════════ */
        .gl-filter-bar {
          position: sticky; top: 0; z-index: 40;
          background: rgba(251,252,253,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 14px clamp(16px,4vw,48px);
        }
        .gl-filter-inner {
          max-width: 1600px; margin: 0 auto;
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .gl-count {
          font-size: 12px; color: #9CA3AF; font-weight: 500;
          padding: 8px 14px; border-radius: 30px;
          background: rgba(200,169,110,0.06);
          border: 1px solid rgba(200,169,110,0.15);
          color: #C8A96E; letter-spacing: 0.05em; white-space: nowrap;
        }
        .gl-spacer { flex: 1; min-width: 8px; }
        .gl-filter {
          padding: 8px 20px; border-radius: 30px;
          font-size: 12px; font-weight: 500; letter-spacing: 0.06em;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: transparent; color: #6B7280;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .2s; white-space: nowrap;
          text-transform: capitalize;
        }
        .gl-filter:hover  { border-color: #C8A96E; color: #C8A96E; background: rgba(200,169,110,0.05); }
        .gl-filter.active { background: #06142B; border-color: #06142B; color: #C8A96E; }

        /* ══ MASONRY GRID ══════════════════════════════════════════════════ */
        .gl-grid {
          columns: 4; column-gap: 10px;
          padding: 28px clamp(16px,4vw,48px) 40px;
          max-width: 1600px; margin: 0 auto;
        }
        @media (max-width: 1200px) { .gl-grid { columns: 3; } }
        @media (max-width: 800px)  { .gl-grid { columns: 2; } }
        @media (max-width: 400px)  { .gl-grid { columns: 2; column-gap: 6px; padding: 16px 12px; } }

        /* ── Card ────────────────────────────────────────────────────────── */
        .gl-card{
  break-inside:avoid;
  margin-bottom:10px;
  position:relative;
  overflow:hidden;
  border-radius:12px;
  cursor:pointer;
  background:#f5f5f5;

  display:flex;
  justify-content:center;
  align-items:center;
}
        @media (max-width: 400px) { .gl-card { margin-bottom: 6px; border-radius: 8px; } }

        .gl-card-img{
  width:100%;
  height:auto !important;

  object-fit:contain;      /* cover hata diya */
  object-position:center;

  display:block;
  transition:
    transform .5s cubic-bezier(.25,.8,.25,1);
}

        .gl-card:hover .gl-card-img{
  transform:scale(1.03);
}

        /* Overlay */
        .gl-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(6,20,43,0.88) 0%,
            rgba(6,20,43,0.12) 40%,
            transparent 65%);
          opacity: 0; transition: opacity .28s;
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 14px;
        }
        .gl-card:hover .gl-card-overlay { opacity: 1; }

        /* Category badge top-left */
        .gl-cat-badge {
          position: absolute; top: 8px; left: 8px;
          background: rgba(6,20,43,0.78); backdrop-filter: blur(8px);
          color: #C8A96E; border: 1px solid rgba(200,169,110,0.28);
          font-size: 7px; font-weight: 700; letter-spacing: 0.2em;
          padding: 3px 9px; border-radius: 20px; text-transform: uppercase;
          pointer-events: none;
        }

        .gl-card-price {
          position: absolute; top: 8px; right: 8px;
          background: rgba(6,20,43,0.78); backdrop-filter: blur(8px);
          color: #F5F0E8; border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Playfair Display', serif;
          font-size: 12px; font-weight: 500;
          padding: 3px 9px; border-radius: 20px;
          pointer-events: none;
        }

        .gl-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 400; font-style: italic;
          color: #F5F0E8; margin: 0 0 10px; line-height: 1.3;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .gl-card-actions { display: flex; gap: 6px; }

        .gl-act-cart {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
          background: #C8A96E; color: #06142B;
          padding: 8px 10px; border-radius: 4px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; cursor: pointer; border: none;
          transition: background .2s; font-family: 'DM Sans', sans-serif;
        }
        .gl-act-cart:hover { background: #dfc080; }
        .gl-act-cart.added { background: #16a34a; color: #fff; }

        .gl-act-wish {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 4px;
          background: rgba(245,240,232,0.1); border: none; cursor: pointer;
          color: rgba(245,240,232,0.7); transition: background .2s, color .2s;
        }
        .gl-act-wish:hover { background: rgba(200,169,110,0.2); color: #C8A96E; }
        .gl-act-wish.active { background: rgba(200,169,110,0.25); color: #C8A96E; }

        /* ══ LIGHTBOX ══════════════════════════════════════════════════════ */
        .gl-lb {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.95); backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .gl-lb-box {
          position: relative; max-width: 820px; width: 100%;
          display: flex; flex-direction: column; align-items: center;
        }
        .gl-lb-img {
          max-height: 78vh; max-width: 100%;
          object-fit: contain; border-radius: 8px;
          box-shadow: 0 32px 100px rgba(0,0,0,0.85);
          display: block;
        }
        .gl-lb-close {
          position: absolute; top: -14px; right: -14px;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(200,169,110,0.15); border: 1px solid rgba(200,169,110,0.3);
          color: #C8A96E; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s; z-index: 5;
        }
        .gl-lb-close:hover { background: rgba(200,169,110,0.3); }
        .gl-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(200,169,110,0.1); border: 1px solid rgba(200,169,110,0.22);
          color: #C8A96E; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s;
        }
        .gl-lb-nav:hover { background: rgba(200,169,110,0.22); }
        .gl-lb-prev { left: -56px; }
        .gl-lb-next { right: -56px; }
        .gl-lb-meta { margin-top: 18px; text-align: center; width: 100%; }
        .gl-lb-cat  { font-size: 9px; font-weight: 600; letter-spacing: 0.26em; color: #C8A96E; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .gl-lb-name { font-family: 'Playfair Display', serif; font-size: 18px; font-style: italic; color: #F5F0E8; margin: 0 0 3px; }
        .gl-lb-price { font-family: 'Playfair Display', serif; font-size: 15px; color: rgba(245,240,232,0.55); margin: 0 0 4px; }
        .gl-lb-count { font-size: 11px; color: rgba(245,240,232,0.28); letter-spacing: 0.1em; }
        .gl-lb-acts { display: flex; gap: 10px; justify-content: center; margin-top: 14px; flex-wrap: wrap; }
        .gl-lb-cart {
          display: inline-flex; align-items: center; gap: 7px;
          background: #C8A96E; color: #06142B;
          padding: 10px 24px; border-radius: 4px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: background .2s;
        }
        .gl-lb-cart:hover { background: #dfc080; }
        .gl-lb-cart.added { background: #16a34a; color: #fff; }
        .gl-lb-wish-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(200,169,110,0.1); color: #C8A96E;
          padding: 10px 20px; border-radius: 4px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s;
          border: 1px solid rgba(200,169,110,0.28);
        }
        .gl-lb-wish-btn:hover { background: rgba(200,169,110,0.2); }
        .gl-lb-shop {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(245,240,232,0.06); color: rgba(245,240,232,0.6);
          padding: 10px 20px; border-radius: 4px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; border: 1px solid rgba(245,240,232,0.1);
          transition: all .2s;
        }
        .gl-lb-shop:hover { background: rgba(245,240,232,0.1); color: #F5F0E8; }

        /* ══ FOOTER STRIP ══════════════════════════════════════════════════ */
        .gl-footer {
          border-top: 1px solid rgba(0,0,0,0.06);
          padding: 28px clamp(16px,4vw,48px);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 14px;
          max-width: 1600px; margin: 0 auto;
        }

        /* Mobile lightbox nav */
        @media (max-width: 640px) {
          .gl-lb-prev { left: 4px; }
          .gl-lb-next { right: 4px; }
          .gl-lb-close { top: 4px; right: 4px; }
        }

        /* Scroll filter on mobile */
        @media (max-width: 640px) {
          .gl-filter-inner { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; gap: 6px; }
          .gl-filter-inner::-webkit-scrollbar { display: none; }
          .gl-spacer { display: none; }
          .gl-count   { flex-shrink: 0; }
          .gl-filter  { flex-shrink: 0; }
        }
      `}</style>

         <div className="gl">

            {/* ══ HERO ════════════════════════════════════════════════════════════ */}
            <div className="gl-hero">
               <div className="gl-hero-inner">

                  {/* Centered badge */}
                  <div className="gl-badge">
                     <TrendingUp size={11} className="gl-badge-icon" />
                     Top Rated by 50K+ Customers
                  </div>

                  {/* Title */}
                  <h1 className="gl-hero-title">
                     Best Sellers &amp; <em>Featured Products</em>
                  </h1>

                  <p className="gl-hero-sub">
                     Discover our most-loved products, handpicked for quality, style, and customer satisfaction. Each piece curated by the VELOR editorial team.
                  </p>

                  {/* CTAs */}
                  <div className="gl-hero-btns">
                     <a href="#gl-grid" className="gl-btn-gold">
                        Browse Gallery ↓
                     </a>
                     <Link to="/best-sellers" className="gl-btn-outline">
                        Best Seller
                     </Link>
                  </div>

                  {/* Stats */}

               </div>
            </div>

            {/* ══ STICKY FILTER BAR ════════════════════════════════════════════ */}
            <div className="gl-filter-bar" id="gl-grid">
               <div className="gl-filter-inner">
                  <span className="gl-count">{filtered.length} items</span>
                  <div className="gl-spacer" />
                  <button
                     className={`gl-filter ${filter === "all" ? "active" : ""}`}
                     onClick={() => { setFilter("all"); setLightbox(null); }}
                  >
                     All
                  </button>
                  {categories.map((cat) => (
                     <button
                        key={cat}
                        className={`gl-filter ${filter === cat ? "active" : ""}`}
                        onClick={() => { setFilter(cat); setLightbox(null); }}
                     >
                        {CAT_LABELS[cat] || cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* ══ MASONRY GRID ═════════════════════════════════════════════════ */}
            <div className="gl-grid">
               {filtered.map((product, idx) => (
                  <div
                     key={`${product.id}-${idx}`}
                     className="gl-card"
                     onClick={() => openLightbox(idx)}
                  >
                     {/* Category + price badges */}
                     <span className="gl-cat-badge">{CAT_LABELS[product.category] || product.category}</span>
                     <span className="gl-card-price">₹{product.price.toLocaleString("en-IN")}</span>

                     {/* Image */}
                     <img
                        src={product.image}
                        alt={product.name}
                        className="gl-card-img"
                        style={{ minHeight: getH(idx) }}
                        loading="lazy"
                     />

                     {/* Hover overlay */}
                     <div className="gl-card-overlay">
                        <p className="gl-card-name">{product.name}</p>
                        <div className="gl-card-actions">
                           <button
                              className={`gl-act-cart ${addedSet.has(product.id) ? "added" : ""}`}
                              onClick={(e) => handleAddCart(product, e)}
                           >
                              <ShoppingBag size={10} />
                              {addedSet.has(product.id) ? "Added ✓" : "Add to Cart"}
                           </button>
                           <button
                              className={`gl-act-wish ${wishSet.has(product.id) ? "active" : ""}`}
                              onClick={(e) => toggleWish(product, e)}
                           >
                              <Heart size={13} fill={wishSet.has(product.id) ? "currentColor" : "none"} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* ══ FOOTER STRIP ═════════════════════════════════════════════════ */}
            <div className="gl-footer">
               <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
                  Showing <strong style={{ color: "#0F0F0F" }}>{filtered.length}</strong> products
                  {filter !== "all" && (
                     <> in <strong style={{ color: "#C8A96E" }}>{CAT_LABELS[filter] || filter}</strong></>
                  )}
               </p>
               <Link to="/view-collection"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", background: "#06142B", color: "#C8A96E", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}
               >
                  Shop Full Collection →
               </Link>
            </div>

         </div>

         {/* ══ LIGHTBOX ═══════════════════════════════════════════════════════ */}
         {lightbox !== null && current && (
            <div className="gl-lb" onClick={closeLightbox}>
               <div className="gl-lb-box" onClick={(e) => e.stopPropagation()}>

                  <button className="gl-lb-close" onClick={closeLightbox}><X size={15} /></button>
                  <button className="gl-lb-nav gl-lb-prev" onClick={prevImg}><ChevronLeft size={17} /></button>
                  <button className="gl-lb-nav gl-lb-next" onClick={nextImg}><ChevronRight size={17} /></button>

                  <img src={current.image} alt={current.name} className="gl-lb-img" />

                  <div className="gl-lb-meta">
                     <span className="gl-lb-cat">{CAT_LABELS[current.category] || current.category}</span>
                     <p className="gl-lb-name">{current.name}</p>
                     <p className="gl-lb-price">₹{current.price.toLocaleString("en-IN")}</p>
                     <p className="gl-lb-count">{lightbox + 1} / {filtered.length}</p>
                     <div className="gl-lb-acts">
                        <button
                           className={`gl-lb-cart ${addedSet.has(current.id) ? "added" : ""}`}
                           onClick={(e) => handleAddCart(current, e)}
                        >
                           <ShoppingBag size={12} />
                           {addedSet.has(current.id) ? "Added to Cart ✓" : "Add to Cart"}
                        </button>
                        <button
                           className="gl-lb-wish-btn"
                           onClick={(e) => toggleWish(current, e)}
                        >
                           <Heart size={12} fill={wishSet.has(current.id) ? "currentColor" : "none"} />
                           {wishSet.has(current.id) ? "Saved" : "Save"}
                        </button>
                        <Link to={`/product/${current.id}`} className="gl-lb-shop">
                           View Product →
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}