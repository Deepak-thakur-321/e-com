import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";

const STATUS = {
  Delivered:    { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  "In Transit": { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Processing:   { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  Cancelled:    { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

const MOCK_ORDERS = [
  { id: "VLR-8821", date: "12 Nov 2024", status: "Delivered",   items: 2, total: 8490  },
  { id: "VLR-7103", date: "28 Oct 2024", status: "In Transit",  items: 1, total: 4299  },
  { id: "VLR-5542", date: "05 Sep 2024", status: "Delivered",   items: 3, total: 13800 },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { wishlistItems, count: wishlistCount } = useWishlist();
  const cartCount = useSelector((s) => s.cart.totalQuantity);

  const [tab,      setTab]      = useState("details");
  const [editMode, setEditMode] = useState(false);
  const [form,     setForm]     = useState({
    name:  user?.name  || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) { navigate("/login"); return null; }

  const initials = (user.name || "U")
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "2024";

  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  const handleLogout = () => { logout(); navigate("/login"); };
  const handleSave   = () => { setEditMode(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .pf-wrap * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        /* Page shell - dark navy top, light body */
        .pf-wrap { min-height: 100vh; background: #f5f5f0; }

        /* ── TOP HERO BANNER ── */
        .pf-banner {
          background: linear-gradient(135deg, #06142B 0%, #0b2447 100%);
          padding: 40px clamp(20px,5vw,60px) 80px;
          position: relative;
          overflow: hidden;
        }
        .pf-banner::after {
          content: 'VELOR';
          position: absolute; right: -20px; bottom: -30px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 14vw, 160px);
          font-weight: 600;
          color: rgba(200,169,110,0.06);
          letter-spacing: 0.08em;
          pointer-events: none;
          user-select: none;
        }
        .pf-banner-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
        }

        /* Avatar */
        .pf-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #C8A96E, #e8c99a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 500; color: #06142B;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(200,169,110,0.3);
        }
        .pf-banner-text { flex: 1; }
        .pf-banner-tier {
          font-size: 9px; font-weight: 600; letter-spacing: 0.38em;
          color: #C8A96E; text-transform: uppercase; display: block; margin-bottom: 6px;
        }
        .pf-banner-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3.5vw, 34px); font-weight: 500;
          color: #fff; margin: 0 0 4px; letter-spacing: 0.02em;
        }
        .pf-banner-email { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
        .pf-banner-since { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; display: block; }

        /* Stat chips on banner */
        .pf-banner-stats { display: flex; gap: 10px; flex-wrap: wrap; margin-left: auto; }
        .pf-chip {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 12px 20px; text-align: center; min-width: 80px;
        }
        .pf-chip-val   { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 500; color: #fff; display: block; }
        .pf-chip-label { font-size: 9px; font-weight: 600; letter-spacing: 0.28em; color: rgba(255,255,255,0.35); display: block; margin-top: 3px; }

        /* ── MAIN CONTENT ── */
        .pf-content {
          max-width: 1100px; margin: -44px auto 0;
          padding: 0 clamp(16px,4vw,40px) 60px;
          position: relative; z-index: 1;
        }

        /* Tab nav */
        .pf-tabs {
          display: flex; gap: 4px; margin-bottom: 24px;
          background: #fff;
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        .pf-tab {
          flex: 1; padding: 10px 16px; border: none; border-radius: 8px;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          color: rgba(0,0,0,0.4); transition: all 0.2s;
          text-transform: uppercase;
        }
        .pf-tab:hover { color: rgba(0,0,0,0.7); background: rgba(0,0,0,0.03); }
        .pf-tab.active { background: #06142B; color: #C8A96E; }

        /* ── CARDS ── */
        .pf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .pf-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .pf-card-full { grid-column: 1 / -1; }
        .pf-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 500; color: #0f172a;
          margin: 0 0 20px; display: flex; justify-content: space-between; align-items: center;
        }
        .pf-card-edit {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
          color: #C8A96E; background: none; border: none;
          cursor: pointer; text-transform: uppercase;
          padding: 6px 12px; border: 1px solid rgba(200,169,110,0.3);
          border-radius: 6px; transition: background 0.2s;
        }
        .pf-card-edit:hover { background: rgba(200,169,110,0.08); }

        /* Detail rows inside cards */
        .pf-row {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 13px 0; border-bottom: 1px solid #f1f5f9; gap: 16px;
        }
        .pf-row:last-child { border-bottom: none; padding-bottom: 0; }
        .pf-row-label { font-size: 11px; font-weight: 500; color: #94a3b8; flex-shrink: 0; }
        .pf-row-val   { font-size: 14px; font-weight: 500; color: #0f172a; text-align: right; }

        /* Form inside card */
        .pf-field { margin-bottom: 20px; }
        .pf-field label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; }
        .pf-field input {
          width: 100%; background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px; color: #0f172a;
          font-size: 14px; font-weight: 500; padding: 11px 14px;
          outline: none; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .pf-field input:focus { border-color: #C8A96E; }

        /* ── ORDERS ── */
        .pf-order {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          padding: 16px 0; border-bottom: 1px solid #f1f5f9;
        }
        .pf-order:last-child { border-bottom: none; }
        .pf-order-id   { font-size: 12px; font-weight: 700; color: #0f172a; letter-spacing: 0.05em; }
        .pf-order-meta { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .pf-order-amt  { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 500; color: #0f172a; }
        .pf-badge {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          padding: 4px 12px; border-radius: 999px; border: 1px solid;
        }
        .pf-view-btn {
          font-size: 10px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 7px 16px; border-radius: 8px;
          background: transparent; border: 1px solid #e2e8f0;
          color: #64748b; cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .pf-view-btn:hover { border-color: #C8A96E; color: #C8A96E; }

        /* ── WISHLIST PREVIEW ── */
        .pf-wish-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px;
        }
        .pf-wish-item {
          border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .pf-wish-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .pf-wish-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .pf-wish-info { padding: 10px 12px; }
        .pf-wish-name { font-size: 12px; font-weight: 600; color: #0f172a; margin: 0 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pf-wish-price { font-size: 12px; color: #C8A96E; font-weight: 600; }

        /* ── ACTIONS ── */
        .pf-btn-primary {
          padding: 11px 28px; background: #06142B; border: none; border-radius: 8px;
          color: #C8A96E; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s;
        }
        .pf-btn-primary:hover { background: #0b2447; }
        .pf-btn-ghost {
          padding: 11px 28px; background: transparent;
          border: 1px solid #e2e8f0; border-radius: 8px;
          color: #64748b; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; transition: border-color 0.2s;
        }
        .pf-btn-ghost:hover { border-color: #cbd5e1; color: #0f172a; }
        .pf-btn-danger {
          padding: 11px 28px; background: transparent;
          border: 1px solid #fecaca; border-radius: 8px;
          color: #ef4444; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s;
        }
        .pf-btn-danger:hover { background: #fef2f2; }

        /* ── ADDRESSES ── */
        .pf-addr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
        .pf-addr {
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          padding: 20px; position: relative; cursor: pointer;
          transition: border-color 0.2s;
        }
        .pf-addr.default { border-color: #C8A96E; }
        .pf-addr:hover { border-color: #C8A96E; }
        .pf-addr-tag {
          position: absolute; top: -1px; right: 14px;
          background: #C8A96E; color: #06142B;
          font-size: 8px; font-weight: 700; letter-spacing: 0.2em;
          padding: 2px 10px; border-radius: 0 0 6px 6px;
        }
        .pf-addr-label { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; color: #C8A96E; text-transform: uppercase; margin-bottom: 10px; }
        .pf-addr-line  { font-size: 14px; font-weight: 500; color: #0f172a; margin: 0 0 2px; line-height: 1.5; }
        .pf-addr-line2 { font-size: 13px; color: #94a3b8; margin: 0 0 16px; }
        .pf-addr-btn {
          font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 6px; border: 1px solid #e2e8f0;
          background: transparent; color: #64748b; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, color 0.2s;
        }
        .pf-addr-btn:hover { border-color: #C8A96E; color: #C8A96E; }
        .pf-addr-add {
          border: 1.5px dashed #e2e8f0; border-radius: 12px; padding: 20px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; cursor: pointer; min-height: 130px;
          background: transparent; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, background 0.2s;
        }
        .pf-addr-add:hover { border-color: #C8A96E; background: rgba(200,169,110,0.03); }
        .pf-addr-add span:first-child { font-size: 28px; color: #C8A96E; line-height: 1; }
        .pf-addr-add span:last-child  { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; color: #94a3b8; text-transform: uppercase; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .pf-grid { grid-template-columns: 1fr; }
          .pf-card-full { grid-column: 1; }
          .pf-banner-stats { width: 100%; }
          .pf-chip { flex: 1; min-width: 60px; padding: 10px 12px; }
          .pf-chip-val { font-size: 18px; }
        }
        @media (max-width: 480px) {
          .pf-tabs { flex-wrap: wrap; }
          .pf-tab { flex: none; width: calc(50% - 2px); font-size: 10px; }
          .pf-order { flex-direction: column; align-items: flex-start; }
          .pf-banner { padding-bottom: 72px; }
        }
      `}</style>

      <div className="pf-wrap">

        {/* ── DARK BANNER ── */}
        <div className="pf-banner">
          <div className="pf-banner-inner">
            <div className="pf-avatar">{initials}</div>
            <div className="pf-banner-text">
              <span className="pf-banner-tier">VELOR INSIDER</span>
              <h1 className="pf-banner-name">{user.name}</h1>
              <p className="pf-banner-email">{user.email}</p>
              <span className="pf-banner-since">Member since {memberSince}</span>
            </div>
            <div className="pf-banner-stats">
              {[
                { val: MOCK_ORDERS.length,                    label: "ORDERS"   },
                { val: `₹${totalSpent.toLocaleString()}`,     label: "SPENT"    },
                { val: wishlistCount,                          label: "WISHLIST" },
                { val: cartCount || 0,                         label: "IN CART"  },
              ].map((s) => (
                <div key={s.label} className="pf-chip">
                  <span className="pf-chip-val">{s.val}</span>
                  <span className="pf-chip-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="pf-content">

          {/* Tabs */}
          <div className="pf-tabs">
            {[
              { key: "details",   label: "My Details"    },
              { key: "orders",    label: "Orders"        },
              { key: "wishlist",  label: "Wishlist"      },
              { key: "addresses", label: "Addresses"     },
            ].map((t) => (
              <button
                key={t.key}
                className={`pf-tab ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >{t.label}</button>
            ))}
          </div>

          {/* ── DETAILS TAB ── */}
          {tab === "details" && (
            <div className="pf-grid">

              {/* Account Info */}
              <div className="pf-card">
                <div className="pf-card-title">
                  Account Details
                  {!editMode && (
                    <button className="pf-card-edit" onClick={() => setEditMode(true)}>
                      Edit
                    </button>
                  )}
                </div>
                {editMode ? (
                  <>
                    {[
                      { label: "Full Name",     key: "name",  type: "text"  },
                      { label: "Email Address", key: "email", type: "email" },
                      { label: "Phone Number",  key: "phone", type: "tel"   },
                    ].map((f) => (
                      <div key={f.key} className="pf-field">
                        <label>{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                      <button className="pf-btn-primary" onClick={handleSave}>Save Changes</button>
                      <button className="pf-btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { label: "Full Name",    value: user.name  },
                      { label: "Email",        value: user.email },
                      { label: "Phone",        value: form.phone || "Not added" },
                      { label: "Member Since", value: memberSince },
                      { label: "Account Type", value: "VELOR INSIDER" },
                    ].map((r) => (
                      <div key={r.label} className="pf-row">
                        <span className="pf-row-label">{r.label}</span>
                        <span className="pf-row-val">{r.value}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Sign out card */}
              <div className="pf-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="pf-card-title" style={{ marginBottom: 12 }}>Session</div>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 24px" }}>
                    You are currently signed in as <strong style={{ color: "#0f172a" }}>{user.name}</strong>.
                    Signing out will clear your session.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="pf-btn-danger" onClick={handleLogout}>Sign Out</button>
                </div>

                {/* Quick nav */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 12px" }}>Quick Links</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      { label: "Wishlist",    to: "/wishlist"        },
                      { label: "Cart",        to: "/cart"            },
                      { label: "Collection",  to: "/view-collection" },
                      { label: "Best Sellers",to: "/best-sellers"    },
                    ].map((l) => (
                      <Link key={l.to} to={l.to} style={{
                        fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                        padding: "6px 14px", borderRadius: 6,
                        border: "1px solid #e2e8f0",
                        color: "#475569", textDecoration: "none",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A96E"; e.currentTarget.style.color = "#C8A96E"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {tab === "orders" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">Order History</div>
              {MOCK_ORDERS.map((order) => {
                const s = STATUS[order.status] || STATUS.Processing;
                return (
                  <div key={order.id} className="pf-order">
                    <div>
                      <div className="pf-order-id">{order.id}</div>
                      <div className="pf-order-meta">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</div>
                    </div>
                    <div className="pf-order-amt">₹{order.total.toLocaleString()}</div>
                    <span className="pf-badge" style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                      {order.status}
                    </span>
                    <button className="pf-view-btn">View Order</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── WISHLIST TAB ── */}
          {tab === "wishlist" && (
            <div className="pf-card" style={{ width: "100%" }}>
              <div className="pf-card-title">
                Wishlist
                <Link to="/wishlist" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#C8A96E", textDecoration: "none", border: "1px solid rgba(200,169,110,0.3)", padding: "6px 14px", borderRadius: 6 }}>
                  VIEW ALL →
                </Link>
              </div>
              {wishlistItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <p style={{ color: "#94a3b8", fontSize: 14 }}>No items in your wishlist yet.</p>
                  <Link to="/view-collection" style={{ display: "inline-block", marginTop: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: "#C8A96E", textDecoration: "none", borderBottom: "1px solid rgba(200,169,110,0.4)", paddingBottom: 2 }}>
                    BROWSE COLLECTION
                  </Link>
                </div>
              ) : (
                <div className="pf-wish-grid">
                  {wishlistItems.slice(0, 6).map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                      <div className="pf-wish-item">
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name}
                          className="pf-wish-img"
                        />
                        <div className="pf-wish-info">
                          <p className="pf-wish-name">{item.name}</p>
                          <p className="pf-wish-price">₹{Number(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ADDRESSES TAB ── */}
          {tab === "addresses" && (
            <div className="pf-card" style={{ width: "100%" }}>
              <div className="pf-card-title">Saved Addresses</div>
              <div className="pf-addr-grid">
                {[
                  { id: 1, label: "Home",   line1: "42, Safdarjung Enclave", line2: "New Delhi — 110029",      isDefault: true  },
                  { id: 2, label: "Office", line1: "B-12, Sector 62, Noida", line2: "Uttar Pradesh — 201301", isDefault: false },
                ].map((addr) => (
                  <div key={addr.id} className={`pf-addr ${addr.isDefault ? "default" : ""}`}>
                    {addr.isDefault && <span className="pf-addr-tag">DEFAULT</span>}
                    <div className="pf-addr-label">{addr.label}</div>
                    <p className="pf-addr-line">{addr.line1}</p>
                    <p className="pf-addr-line2">{addr.line2}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="pf-addr-btn">Edit</button>
                      {!addr.isDefault && <button className="pf-addr-btn">Set Default</button>}
                    </div>
                  </div>
                ))}
                <button className="pf-addr-add">
                  <span>+</span>
                  <span>Add New Address</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Profile;