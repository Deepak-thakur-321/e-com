import React, { useState } from 'react';
import { ShoppingBag, Heart, X, ArrowRight, Tag, Truck, Shield, RefreshCw, Star, Grid, List } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/features/cart/cartSlice';

const STYLES = `
  @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
  @keyframes scaleIn  { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

  .sp-animate { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
  .sp-card-img { transition: transform 0.5s ease; }
  .sp-card:hover .sp-card-img { transform: scale(1.08); }
  .sp-cart-btn { opacity: 0; transform: translateY(8px); transition: opacity 0.25s ease, transform 0.25s ease; }
  .sp-card:hover .sp-cart-btn { opacity: 1; transform: translateY(0); }
  .sp-cat-card img { transition: transform 0.6s ease; }
  .sp-cat-card:hover img { transform: scale(1.06); }

  .sp-trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { .sp-trust-grid { grid-template-columns: repeat(4, 1fr); } }
  .sp-trust-item { display: flex; align-items: center; gap: 12px; padding: 18px 16px; border-bottom: 1px solid rgba(0,0,0,0.08); }
  @media (min-width: 1024px) {
    .sp-trust-item { padding: 22px 20px; border-bottom: none; }
    .sp-trust-item:not(:last-child) { border-right: 1px solid rgba(0,0,0,0.08); }
  }

  .sp-newsletter-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
  @media (min-width: 768px) { .sp-newsletter-grid { grid-template-columns: 1fr 1fr; gap: 64px; } }

  .sp-email-row { display: flex; flex-direction: column; }
  @media (min-width: 480px) { .sp-email-row { flex-direction: row; } }
  .sp-email-input {
    flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
    color: #fff; padding: 14px 18px; font-size: 14px; outline: none;
    border-radius: 8px; margin-bottom: 8px;
  }
  @media (min-width: 480px) { .sp-email-input { border-right: none; border-radius: 8px 0 0 8px; margin-bottom: 0; } }
  .sp-email-btn {
    background: #fff; color: #0f172a; border: none; padding: 14px 24px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    border-radius: 8px; cursor: pointer; transition: background 0.25s; white-space: nowrap;
  }
  @media (min-width: 480px) { .sp-email-btn { border-radius: 0 8px 8px 0; } }
  .sp-email-btn:hover { background: #fbbf24; }

  .sp-modal-grid { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .sp-modal-grid { grid-template-columns: 1fr 1fr; } }
  .sp-modal-img { height: 280px; }
  @media (min-width: 640px) { .sp-modal-img { height: 100%; min-height: 500px; } }
`;

const MARQUEE = "PRIVATE SALE  ·  UP TO 40% OFF  ·  LIMITED TIME  ·  FREE SHIPPING ABOVE ₹999  ·  EXCLUSIVE DROPS  ·  MEMBERS ONLY  ·  ";

const SALE_PRODUCTS = [
  { id: 1,  name: "NY Yankees Varsity Jacket",  category: "Jackets",  price: 2779, original: 3499, discount: 21, tag: "Limited Edition", rating: 4.8, reviews: 150,  image: "https://i.pinimg.com/1200x/2c/52/e6/2c52e669787f5f4db48134b2d0c2925a.jpg" },
  { id: 2,  name: "Cashmere Noir Sweater",       category: "Knitwear", price: 1890, original: 2850, discount: 34, tag: "Best Seller",     rating: 4.9, reviews: 230,  image: "https://i.pinimg.com/1200x/69/31/a0/6931a08f403a56485162f7f3d1bbf70d.jpg" },
  { id: 3,  name: "Heritage Wool Coat",           category: "Outerwear",price: 2340, original: 3900, discount: 40, tag: "Trending",        rating: 4.7, reviews: 189,  image: "https://i.pinimg.com/736x/76/64/bc/7664bce47e084de20931375e7e311cd7.jpg" },
  { id: 4,  name: "Silk Essence Dress",           category: "Dresses",  price: 1560, original: 2600, discount: 40, tag: "New Drop",        rating: 4.6, reviews: 98,   image: "https://i.pinimg.com/736x/43/ac/92/43ac9219cf9d83423c853ac4d481b75f.jpg" },
  { id: 5,  name: "Leather Chronicle Bag",        category: "Bags",     price: 980,  original: 1650, discount: 41, tag: "Exclusive",       rating: 4.9, reviews: 312,  image: "https://i.pinimg.com/736x/80/1f/a5/801fa5ede2995f6bffd10f98352cf573.jpg" },
  { id: 6,  name: "Tailored Legacy Blazer",       category: "Blazers",  price: 1680, original: 2800, discount: 40, tag: "Sale",            rating: 4.8, reviews: 201,  image: "https://i.pinimg.com/736x/2f/45/6a/2f456a86420febe96a164436d9400f92.jpg" },
  { id: 7,  name: "Merino Heritage Knit",         category: "Knitwear", price: 540,  original: 900,  discount: 40, tag: "Sale",            rating: 4.5, reviews: 145,  image: "https://i.pinimg.com/1200x/57/1f/db/571fdb73704b020cd775ff5fe38c6f58.jpg" },
  { id: 8,  name: "Midnight Luxe Hoodie",         category: "Hoodies",  price: 1499, original: 2100, discount: 29, tag: "Fan Favorite",    rating: 4.7, reviews: 178,  image: "https://i.pinimg.com/736x/bb/d9/49/bbd94912b8f5d2e6fe6d481a82bd9d3f.jpg" },
  { id: 9,  name: "Street Essential Tee",         category: "Hoodies",  price: 1499, original: 2100, discount: 29, tag: "Fan Favorite",    rating: 4.7, reviews: 178,  image: "https://i.pinimg.com/736x/f2/a5/88/f2a588aaa7d220d979e800389aca5882.jpg" },
  { id: 10, name: "Classic Varsity Pullover",     category: "Hoodies",  price: 1499, original: 2100, discount: 29, tag: "Fan Favorite",    rating: 4.7, reviews: 178,  image: "https://i.pinimg.com/736x/a7/4f/bb/a74fbbb0c501e604d58a8c0b6cd394ca.jpg" },
  { id: 11, name: "Urban Flex Hoodie",            category: "Hoodies",  price: 1499, original: 2100, discount: 29, tag: "Fan Favorite",    rating: 4.7, reviews: 178,  image: "https://i.pinimg.com/736x/86/c4/90/86c490cbc19ad0fa60a5d67f61bb502a.jpg" },
  { id: 12, name: "Essential Drop Shoulder",      category: "Hoodies",  price: 1499, original: 2100, discount: 29, tag: "Fan Favorite",    rating: 4.7, reviews: 178,  image: "https://i.pinimg.com/736x/49/85/03/498503c96bd12f1163c9c0530b8a63ff.jpg" },
];

const SHOP_CATS = [
  { name: "Outerwear", pct: "Up to 40% off",      img: "https://i.pinimg.com/736x/7d/e1/74/7de174cdb7f566d46deff070b13e16c8.jpg" },
  { name: "Knitwear",  pct: "Up to 35% off",      img: "https://i.pinimg.com/736x/6a/22/03/6a2203b2c6b80c252940f0d5ecc36a89.jpg" },
  { name: "Bags",      pct: "Up to 41% off",      img: "https://i.pinimg.com/736x/97/70/02/9770021b845483fcda337c59ddff471b.jpg" },
  { name: "Blazers",   pct: "Up to 40% off",      img: "https://i.pinimg.com/736x/85/38/49/85384943e0f2d98086729703a391fb92.jpg" },
  { name: "Shirts",    pct: "Tailored Collection", img: "https://i.pinimg.com/1200x/c8/20/b5/c820b5e4b9fd0b73cc74016161781888.jpg" },
];

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function LuxurySalePage() {
  const dispatch = useDispatch(); // ✅ real Redux dispatch

  const [filter, setFilter]       = useState("All");
  const [viewMode, setViewMode]   = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [added, setAdded]         = useState(new Set());
  const [modal, setModal]         = useState(null);
  const [hovered, setHovered]     = useState(null);

  const toggleFav = (id) => setFavorites((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // ✅ Real cart dispatch
  const handleCart = (e, item) => {
    e.stopPropagation();
    dispatch(addToCart({
      id:    item.id,
      name:  item.name,
      price: item.price,
      image: item.image,
    }));
    setAdded((p) => new Set([...p, item.id]));
    setTimeout(() => setAdded((p) => { const n = new Set(p); n.delete(item.id); return n; }), 1500);
  };

  const categories = ["All", ...new Set(SALE_PRODUCTS.map((p) => p.category))];
  const filtered   = filter === "All" ? SALE_PRODUCTS : SALE_PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen" style={{ background: "#0f172a" }}>
      <style>{STYLES}</style>

      {/* § 1 · MARQUEE */}
      <div style={{ background: "rgba(239,68,68,0.88)", overflow: "hidden", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 26s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{MARQUEE}</span>
          ))}
        </div>
      </div>

      {/* § 2 · HERO */}
      <section style={{ position: "relative", padding: "52px 5vw 40px", textAlign: "center", overflow: "hidden", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="sp-animate" style={{ animationDelay: "0.05s", display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 999, padding: "8px 20px", marginBottom: 24 }}>
          <Tag size={13} color="#fbbf24" />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em" }}>Anniversary Private Sale · 2024</span>
        </div>
        <h1 className="sp-animate" style={{ animationDelay: "0.12s", fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 800, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          Private{" "}
          <span style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sale.</span>
        </h1>
        <p className="sp-animate" style={{ animationDelay: "0.2s", fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.75, fontWeight: 300 }}>
          An exclusive offering for our patrons. Up to <strong style={{ color: "#fff" }}>40% off</strong> on handpicked pieces — for a limited time only.
        </p>
        <div className="sp-animate" style={{ animationDelay: "0.28s" }}>
          <a href="#sp-products" style={{ textDecoration: "none" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#0f172a", border: "none", borderRadius: 999, padding: "13px 28px", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.25s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#fbbf24"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
              Shop The Sale <ArrowRight size={14} />
            </button>
          </a>
        </div>
        <p className="sp-animate" style={{ animationDelay: "0.36s", marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em" }}>
          Ends in 72 hours · Free shipping above ₹999
        </p>
      </section>

      {/* § 3 · TRUST BAR */}
      <div style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sp-trust-grid">
            {[
              { Icon: Truck,     label: "Free Shipping",   sub: "Above ₹999"        },
              { Icon: Shield,    label: "Secure Payments", sub: "256-bit SSL"        },
              { Icon: RefreshCw, label: "Easy Returns",    sub: "30-day hassle-free" },
              { Icon: Tag,       label: "Up to 40% Off",   sub: "Genuine savings"    },
            ].map(({ Icon, label, sub }, i) => (
              <div key={i} className="sp-trust-item">
                <Icon size={20} color="#f59e0b" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 2px" }}>{label}</p>
                  <p style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", margin: 0 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* § 4 · SHOP BY CATEGORY */}
      <section className="max-w-9xl mx-aut px-4 sm:px-6 lg:px-8" style={{ padding: "64px 5vw" }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 10px" }}>Browse</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700, color: "#fff", margin: 0 }}>Shop by Category</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {SHOP_CATS.map((cat, i) => (
            <div key={i} className="sp-cat-card sp-animate" style={{ animationDelay: `${i * 0.08}s`, position: "relative", aspectRatio: "3/4", overflow: "hidden", cursor: "pointer", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
              <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.1) 60%)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
                <div style={{ display: "inline-block", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 999, padding: "2px 10px", marginBottom: 6 }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fbbf24", fontWeight: 700 }}>{cat.pct}</span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{cat.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* § 5 · PRODUCT GRID */}
      <section id="sp-products" className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingBottom: 72 }}>
        <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px" }}>This Week</p>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 38px)", fontWeight: 700, color: "#fff", margin: 0 }}>Sale Picks</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{filtered.length} items</span>
            <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: 4 }}>
              {[{ mode: "grid", Icon: Grid }, { mode: "list", Icon: List }].map(({ mode, Icon }) => (
                <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: 7, borderRadius: 6, border: "none", cursor: "pointer", transition: "all 0.2s", background: viewMode === mode ? "#fff" : "transparent", color: viewMode === mode ? "#0f172a" : "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: filter === cat ? "#fff" : "rgba(255,255,255,0.08)", color: filter === cat ? "#0f172a" : "rgba(255,255,255,0.6)", boxShadow: filter === cat ? "0 4px 20px rgba(0,0,0,0.35)" : "none", transform: filter === cat ? "scale(1.05)" : "scale(1)" }}>
              {cat}
            </button>
          ))}
        </div>

        {viewMode === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
            {filtered.map((item, i) => (
              <div key={item.id} className="sp-card sp-animate" style={{ animationDelay: `${i * 0.05}s`, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.3s, border-color 0.3s", boxShadow: hovered === item.id ? "0 24px 60px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.25)", borderColor: hovered === item.id ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)" }}
                onClick={() => setModal(item)} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                  <img src={item.image} alt={item.name} className="sp-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(239,68,68,0.9)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 999 }}>-{item.discount}%</div>
                  <div style={{ position: "absolute", top: 12, right: 44, background: "rgba(15,23,42,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999 }}>{item.tag}</div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }} style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Heart size={13} fill={favorites.has(item.id) ? "#ef4444" : "none"} color={favorites.has(item.id) ? "#ef4444" : "rgba(255,255,255,0.7)"} />
                  </button>
                  <div className="sp-cart-btn" style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                    <button onClick={(e) => handleCart(e, item)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "11px 0", background: added.has(item.id) ? "rgba(34,197,94,0.92)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: added.has(item.id) ? "#fff" : "#0f172a", cursor: "pointer", transition: "background 0.25s" }}>
                      <ShoppingBag size={13} />{added.has(item.id) ? "Added ✓" : "Add to Bag"}
                    </button>
                  </div>
                </div>
                <div style={{ padding: "14px 16px 18px" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 5px" }}>{item.category}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: "0 0 8px", lineHeight: 1.3 }}>{item.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                    <Star size={11} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600 }}>{item.rating}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>({item.reviews})</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{fmt(item.price)}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>{fmt(item.original)}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>SAVE {fmt(item.original - item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((item, i) => (
              <div key={item.id} className="sp-animate" style={{ animationDelay: `${i * 0.05}s`, display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", cursor: "pointer" }} onClick={() => setModal(item)}>
                <div style={{ width: 120, flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ flex: 1, padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 4px" }}>{item.category}</p>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 5px" }}>{item.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Star size={11} fill="#fbbf24" color="#fbbf24" />
                      <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600 }}>{item.rating}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{fmt(item.price)}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>{fmt(item.original)}</span>
                    <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>-{item.discount}%</span>
                    <button onClick={(e) => handleCart(e, item)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: added.has(item.id) ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.1)", border: `1px solid ${added.has(item.id) ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}`, borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: added.has(item.id) ? "#22c55e" : "rgba(255,255,255,0.8)", cursor: "pointer", transition: "all 0.25s" }}>
                      <ShoppingBag size={12} />{added.has(item.id) ? "Added ✓" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* § 6 · PARALLAX BANNER */}
      <section style={{ position: "relative", minHeight: "45vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://i.pinimg.com/1200x/91/08/4d/91084df80be494439a864d8b9cee68c9.jpg)", backgroundSize: "cover", backgroundPosition: "top", backgroundAttachment: "fixed" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.75) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "60px 5vw" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 999, padding: "6px 16px", marginBottom: 18 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#fbbf24", fontWeight: 600 }}>For Our Patrons</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 5vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Crafted for those who<br />
            <span style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>appreciate excellence.</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>Limited time. Exceptional value. Uncompromising quality.</p>
        </div>
      </section>

      {/* § 7 · NEWSLETTER */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "72px 5vw" }}>
        <div className="max-w-7xl mx-auto sp-newsletter-grid">
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 14px" }}>Stay Ahead</p>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px" }}>
              Join Our<br />
              <span style={{ background: "linear-gradient(90deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Inner Circle</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 360 }}>
              Receive exclusive invitations to private sales, early access to new drops, and members-only offers — before the world sees them.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="sp-email-row">
              <input type="email" placeholder="your@email.com" className="sp-email-input" />
              <button className="sp-email-btn">Subscribe</button>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>No spam. Unsubscribe anytime.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 4 }}>
              <div style={{ display: "flex" }}>
                {[1,2,3,4].map((_, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #0f172a", background: `hsl(${i*50+200},40%,45%)`, marginLeft: i > 0 ? -8 : 0 }} />
                ))}
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}><strong style={{ color: "#fff" }}>12,400+</strong> members subscribed</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.14em", color: "#fff" }}>MYSTORE</span>
        <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", margin: 0 }}>Private Sale · Fall / Winter 2024</p>
      </div>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, animation: "fadeIn 0.3s ease" }}>
          <div onClick={(e) => e.stopPropagation()} className="sp-modal-grid" style={{ background: "linear-gradient(135deg, #111827, #1e293b)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, maxWidth: 860, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", animation: "scaleIn 0.35s cubic-bezier(.22,1,.36,1)" }}>
            <img src={modal.image} alt={modal.name} className="sp-modal-img" style={{ width: "100%", objectFit: "cover", display: "block", borderRadius: "16px 16px 0 0" }} />
            <div style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 }}>-{modal.discount}% OFF</span>
                <span style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 }}>{modal.tag}</span>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px" }}>{modal.category}</p>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 12px" }}>{modal.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600 }}>{modal.rating}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>({modal.reviews} reviews)</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>{fmt(modal.price)}</span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>{fmt(modal.original)}</span>
                </div>
                <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 700, marginTop: 4 }}>You save {fmt(modal.original - modal.price)}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 10px" }}>Select Size</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["S","M","L","XL"].map((s) => (
                    <button key={s} style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.75)", fontSize: 12, cursor: "pointer", borderRadius: 8, transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.target.style.background = "#fff"; e.target.style.color = "#0f172a"; }}
                      onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "rgba(255,255,255,0.75)"; }}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={(e) => handleCart(e, modal)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "13px", background: "#fff", color: "#0f172a", border: "none", borderRadius: 10, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.25s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#fbbf24"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
                <ShoppingBag size={14} /> Add to Bag
              </button>
            </div>
            <button onClick={() => setModal(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}