import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const B = {
  navy:   "#0b1120",
  navy2:  "#131c2e",
  gold:   "#C8A96E",
  text:   "#FFFFFF",
  muted:  "rgba(255,255,255,0.55)",
  border: "rgba(255,255,255,0.08)",
  borderGold: "rgba(200,169,110,0.2)",
};

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const dispatch = useDispatch();

  // Add to cart → immediately remove from wishlist
  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));       // cartSlice expects product.id
    removeFromWishlist(product.id);     // remove using same id field
  };

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (wishlistItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: B.navy, color: B.text, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: "60px 24px" }}>
        <svg width="54" height="54" viewBox="0 0 48 48" fill="none" stroke={B.gold} strokeWidth="1.3">
          <path d="M24 42S6 30 6 18c0-5 3.8-9 8.7-9 3.4 0 6.3 2.2 8 5.4C24.3 11.2 27.3 9 30.7 9 35.5 9 39.3 13 39.3 18 39.3 30 24 42 24 42Z" strokeLinejoin="round" />
        </svg>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(22px,4vw,32px)", fontWeight: 300, letterSpacing: "0.12em", margin: 0 }}>
          YOUR WISHLIST IS EMPTY
        </h1>
        <p style={{ fontSize: 13, color: B.muted, maxWidth: 320, lineHeight: 1.8, margin: 0 }}>
          Save pieces you love. Come back when you're ready.
        </p>
        <Link
          to="/view-collection"
          style={{ marginTop: 8, padding: "13px 38px", border: `1px solid ${B.gold}`, color: B.gold, textDecoration: "none", fontSize: 10, fontWeight: 500, letterSpacing: "0.28em", fontFamily: "'DM Sans', sans-serif" }}
        >
          EXPLORE COLLECTION
        </Link>
      </div>
    );
  }

  // ── Filled state ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: B.navy, color: B.text, fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ padding: "60px 48px 32px", borderBottom: `1px solid ${B.border}` }}>
        <span style={{ display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.35em", color: B.gold, marginBottom: 8 }}>YOUR</span>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, letterSpacing: "0.1em", margin: "0 0 8px" }}>WISHLIST</h1>
        <span style={{ fontSize: 11, letterSpacing: "0.22em", color: B.muted }}>
          {wishlistItems.length} {wishlistItems.length === 1 ? "ITEM" : "ITEMS"}
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1px",
        background: B.border,
      }}>
        {wishlistItems.map((product) => (
          <div key={product.id} style={{ background: B.navy, display: "flex", flexDirection: "column", position: "relative" }}>

            {/* Remove button */}
            <button
              onClick={() => removeFromWishlist(product.id)}
              title="Remove from wishlist"
              style={{
                position: "absolute", top: 12, right: 12, zIndex: 10,
                width: 30, height: 30,
                background: "rgba(6,20,43,0.85)", border: `1px solid ${B.border}`,
                color: B.muted, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, lineHeight: 1, fontFamily: "sans-serif",
              }}
            >
              ×
            </button>

            {/* Image */}
            <Link
              to={`/product/${product.id}`}
              style={{ display: "block", aspectRatio: "3/4", overflow: "hidden", background: B.navy2 }}
            >
              <img
                src={product.image || "https://placehold.co/300x400/131c2e/555?text=VELOR"}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </Link>

            {/* Info */}
            <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {product.category && (
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", color: B.gold }}>
                  {product.category.toUpperCase()}
                </span>
              )}
              <Link
                to={`/product/${product.id}`}
                style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 400, color: B.text, textDecoration: "none", lineHeight: 1.3 }}
              >
                {product.name}
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {product.originalPrice && (
                  <span style={{ fontSize: 12, color: B.muted, textDecoration: "line-through" }}>
                    ₹{Number(product.originalPrice).toLocaleString()}
                  </span>
                )}
                <span style={{ fontSize: 14, fontWeight: 500, color: B.text }}>
                  ₹{Number(product.price).toLocaleString()}
                </span>
              </div>

              {/* Move to cart button */}
              <button
                onClick={() => handleMoveToCart(product)}
                style={{
                  marginTop: "auto",
                  width: "100%", padding: "13px",
                  background: "transparent",
                  border: `1px solid ${B.borderGold}`,
                  color: B.text,
                  fontSize: 10, fontWeight: 500, letterSpacing: "0.25em",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.25s, color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = B.gold;
                  e.currentTarget.style.color = "#06142B";
                  e.currentTarget.style.borderColor = B.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = B.text;
                  e.currentTarget.style.borderColor = B.borderGold;
                }}
              >
                MOVE TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;