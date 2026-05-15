import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const dispatch = useDispatch();
  const [movedIds, setMovedIds] = useState([]);

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    setMovedIds((p) => [...p, product.id]);
    setTimeout(() => removeFromWishlist(product.id), 600);
  };

  // ─── EMPTY ───────────────────────────────────────────────────────────────────
  if (wishlistItems.length === 0) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
          .wl-empty { min-height:100vh; background:#06142B; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; text-align:center; padding:60px 24px; font-family:'DM Sans',sans-serif; }
          .wl-empty-title { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(24px,4vw,36px); font-weight:300; letter-spacing:0.14em; color:#fff; margin:0; }
          .wl-empty-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,0.45); max-width:320px; line-height:1.8; margin:0; }
          .wl-empty-cta { margin-top:8px; padding:14px 40px; border:1px solid #C8A96E; color:#C8A96E; text-decoration:none; font-size:10px; font-weight:600; letter-spacing:0.3em; font-family:'DM Sans',sans-serif; transition:background 0.3s,color 0.3s; }
          .wl-empty-cta:hover { background:#C8A96E; color:#06142B; }
        `}</style>
        <div className="wl-empty">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#C8A96E" strokeWidth="1.2">
            <path d="M24 42C24 42 6 30 6 18c0-5 3.8-9 8.7-9 3.4 0 6.3 2.2 8 5.4C24.3 11.2 27.3 9 30.7 9 35.5 9 39.3 13 39.3 18c0 12-15.3 24-15.3 24Z" strokeLinejoin="round" />
          </svg>
          <h1 className="wl-empty-title">YOUR WISHLIST IS EMPTY</h1>
          <p className="wl-empty-sub">Save pieces you love and come back when you're ready.</p>
          <Link to="/view-collection" className="wl-empty-cta">EXPLORE COLLECTION</Link>
        </div>
      </>
    );
  }

  // ─── FILLED ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .wl-page { min-height:100vh; background:#06142B; font-family:'DM Sans',sans-serif; padding-bottom:80px; }

        /* Header */
        .wl-header { padding:60px 48px 36px; border-bottom:1px solid rgba(200,169,110,0.15); }
        .wl-label  { display:block; font-size:10px; font-weight:600; letter-spacing:0.38em; color:#C8A96E; margin-bottom:10px; }
        .wl-title  { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(40px,6vw,72px); font-weight:300; letter-spacing:0.1em; color:#fff; margin:0 0 10px; line-height:1; }
        .wl-count  { font-size:11px; letter-spacing:0.25em; color:rgba(255,255,255,0.4); }

        /* Grid */
        .wl-grid {
          display:grid;
          grid-template-columns:repeat(4, 1fr);
          gap:0;
          border-top:1px solid rgba(255,255,255,0.06);
        }

        /* Card */
        .wl-card {
          background:#06142B;
          border-right:1px solid rgba(255,255,255,0.06);
          border-bottom:1px solid rgba(255,255,255,0.06);
          display:flex; flex-direction:column;
          position:relative;
          transition:background 0.25s;
        }
        .wl-card:hover { background:#0b1f3a; }

        /* Remove btn */
        .wl-remove {
          position:absolute; top:14px; right:14px; z-index:10;
          width:32px; height:32px;
          background:rgba(6,20,43,0.85);
          border:1px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.5); cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; line-height:1;
          opacity:0; transition:opacity 0.2s,color 0.2s;
          border-radius:0;
        }
        .wl-card:hover .wl-remove { opacity:1; }
        .wl-remove:hover { color:#fff; border-color:rgba(255,255,255,0.3); }

        /* Image */
        .wl-img-wrap {
          display:block;
          aspect-ratio:3/4;
          overflow:hidden;
          background:#0b1f3a;
          flex-shrink:0;
        }
        .wl-img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform 0.5s ease;
        }
        .wl-card:hover .wl-img { transform:scale(1.04); }

        /* Body */
        .wl-body { padding:20px 22px 24px; display:flex; flex-direction:column; gap:8px; flex:1; }
        .wl-cat  { font-size:9px; font-weight:600; letter-spacing:0.32em; color:#C8A96E; }
        .wl-name {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:18px; font-weight:400; color:#fff;
          text-decoration:none; line-height:1.3; display:block;
          transition:color 0.2s;
        }
        .wl-name:hover { color:#C8A96E; }
        .wl-price-row { display:flex; align-items:center; gap:10px; margin-top:2px; }
        .wl-orig  { font-size:12px; color:rgba(255,255,255,0.35); text-decoration:line-through; }
        .wl-price { font-size:15px; font-weight:500; color:#fff; letter-spacing:0.04em; }

        /* CTA */
        .wl-cta {
          margin-top:auto;
          width:100%; padding:13px;
          background:transparent;
          border:1px solid rgba(200,169,110,0.25);
          color:rgba(255,255,255,0.85);
          font-size:10px; font-weight:600; letter-spacing:0.25em;
          cursor:pointer; font-family:'DM Sans',sans-serif;
          transition:background 0.25s,color 0.25s,border-color 0.25s;
        }
        .wl-cta:hover  { background:#C8A96E; color:#06142B; border-color:#C8A96E; }
        .wl-cta.moved  { background:rgba(111,207,154,0.12); border-color:rgba(111,207,154,0.4); color:#6fcf9a; pointer-events:none; }

        /* Responsive */
        @media (max-width:1200px) { .wl-grid { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:860px)  {
          .wl-grid { grid-template-columns:repeat(2,1fr); }
          .wl-header { padding:48px 24px 28px; }
        }
        @media (max-width:480px)  {
          .wl-grid { grid-template-columns:1fr; }
          .wl-header { padding:36px 20px 24px; }
          .wl-remove { opacity:1; }
          .wl-title { font-size:40px; }
        }
      `}</style>

      <div className="wl-page">

        {/* Header */}
        <div className="wl-header">
          <span className="wl-label">YOUR</span>
          <h1 className="wl-title">WISHLIST</h1>
          <span className="wl-count">
            {wishlistItems.length} {wishlistItems.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        </div>

        {/* Grid */}
        <div className="wl-grid">
          {wishlistItems.map((product) => {
            const img = Array.isArray(product.image) ? product.image[0] : product.image;
            const moved = movedIds.includes(product.id);
            return (
              <div key={product.id} className="wl-card">

                {/* Remove × */}
                <button
                  className="wl-remove"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove"
                >×</button>

                {/* Image */}
                <Link to={`/product/${product.id}`} className="wl-img-wrap">
                  <img
                    src={img || "https://placehold.co/300x400/0b1f3a/C8A96E?text=VELOR"}
                    alt={product.name}
                    className="wl-img"
                  />
                </Link>

                {/* Info */}
                <div className="wl-body">
                  {product.category && (
                    <span className="wl-cat">{String(product.category).toUpperCase()}</span>
                  )}
                  <Link to={`/product/${product.id}`} className="wl-name">
                    {product.name}
                  </Link>
                  <div className="wl-price-row">
                    {product.originalPrice && (
                      <span className="wl-orig">₹{Number(product.originalPrice).toLocaleString()}</span>
                    )}
                    <span className="wl-price">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                  </div>

                  <button
                    className={`wl-cta ${moved ? "moved" : ""}`}
                    onClick={() => handleMoveToCart(product)}
                  >
                    {moved ? "✓ ADDED TO CART" : "MOVE TO CART"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wishlist;