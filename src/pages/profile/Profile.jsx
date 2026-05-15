import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";

// ── Status badge colors ────────────────────────────────────────────────────────
const STATUS = {
  Delivered:   { color: "#6fcf9a", bg: "rgba(111,207,154,0.08)", border: "rgba(111,207,154,0.3)"  },
  "In Transit":{ color: "#C8A96E", bg: "rgba(200,169,110,0.08)", border: "rgba(200,169,110,0.3)"  },
  Processing:  { color: "#7eb8f7", bg: "rgba(126,184,247,0.08)", border: "rgba(126,184,247,0.3)"  },
  Cancelled:   { color: "#f77e7e", bg: "rgba(247,126,126,0.08)", border: "rgba(247,126,126,0.3)"  },
};

// Mock orders — replace with real API orders once backend is ready
const MOCK_ORDERS = [
  { id: "VLR-8821", date: "12 Nov 2024", status: "Delivered",   items: 2, total: 8490  },
  { id: "VLR-7103", date: "28 Oct 2024", status: "In Transit",  items: 1, total: 4299  },
  { id: "VLR-5542", date: "05 Sep 2024", status: "Delivered",   items: 3, total: 13800 },
];

const Profile = () => {
  const navigate  = useNavigate();
  const { user, logout } = useAuth();          // ← real auth user
  const { count: wishlistCount } = useWishlist();
  const cartCount = useSelector((s) => s.cart.totalQuantity);

  const [tab,      setTab]      = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [form,     setForm]     = useState({
    name:  user?.name  || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // If somehow no user, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSave = () => {
    // dispatch(updateProfile(form)) — wire your action here when backend ready
    setEditMode(false);
  };

  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing:border-box; }

        .pf-page { min-height:100vh; background:#06142B; color:#fff; font-family:'DM Sans',sans-serif; }

        /* ── HERO ── */
        .pf-hero {
          background:linear-gradient(150deg,#0b1f3a 0%,#06142B 100%);
          border-bottom:1px solid rgba(200,169,110,0.15);
          padding:56px 60px 44px;
        }
        .pf-hero-inner { display:flex; align-items:center; gap:32px; flex-wrap:wrap; max-width:1100px; }

        /* Avatar */
        .pf-avatar {
          width:88px; height:88px; flex-shrink:0;
          border:1px solid #C8A96E;
          background:#0f2847;
          display:flex; align-items:center; justify-content:center;
          position:relative;
        }
        .pf-avatar::after {
          content:''; position:absolute; inset:3px;
          border:1px solid rgba(200,169,110,0.2);
          pointer-events:none;
        }
        .pf-avatar-initials {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:30px; font-weight:300; color:#C8A96E; letter-spacing:0.1em;
        }

        /* Identity */
        .pf-identity { flex:1; min-width:200px; }
        .pf-tier {
          display:inline-block; font-size:9px; font-weight:600;
          letter-spacing:0.35em; color:#C8A96E;
          background:rgba(200,169,110,0.1);
          border:1px solid rgba(200,169,110,0.2);
          padding:3px 14px; margin-bottom:12px;
        }
        .pf-name {
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(28px,4vw,44px); font-weight:300;
          letter-spacing:0.06em; color:#fff;
          margin:0 0 8px; line-height:1.1;
        }
        .pf-email { font-size:13px; font-weight:300; color:rgba(255,255,255,0.45); margin:0; }

        /* Stats row */
        .pf-stats { display:flex; align-items:center; gap:0; margin-left:auto; flex-wrap:wrap; }
        .pf-stat  { text-align:center; padding:0 28px; }
        .pf-stat + .pf-stat { border-left:1px solid rgba(200,169,110,0.15); }
        .pf-stat-val   { font-family:'Cormorant Garamond',Georgia,serif; font-size:28px; font-weight:300; color:#fff; display:block; }
        .pf-stat-label { font-size:8px; font-weight:600; letter-spacing:0.3em; color:rgba(255,255,255,0.35); display:block; margin-top:4px; }

        /* ── BODY ── */
        .pf-body { max-width:1100px; margin:0 auto; padding:0 60px 80px; }

        /* Tabs */
        .pf-tabs { display:flex; border-bottom:1px solid rgba(255,255,255,0.07); margin-bottom:48px; }
        .pf-tab  {
          background:transparent; border:none;
          border-bottom:2px solid transparent;
          padding:20px 28px; cursor:pointer;
          font-family:'DM Sans',sans-serif;
          font-size:10px; font-weight:600; letter-spacing:0.28em;
          color:rgba(255,255,255,0.35);
          transition:color 0.2s; position:relative; bottom:-1px;
        }
        .pf-tab:hover { color:rgba(255,255,255,0.7); }
        .pf-tab.active { color:#C8A96E; border-bottom-color:#C8A96E; }

        /* ── ORDERS ── */
        .pf-order-row {
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:16px;
          padding:22px 0;
          border-bottom:1px solid rgba(255,255,255,0.06);
          transition:background 0.2s;
        }
        .pf-order-id   { font-size:11px; font-weight:600; letter-spacing:0.1em; color:#fff; margin-bottom:4px; }
        .pf-order-meta { font-size:11px; font-weight:300; color:rgba(255,255,255,0.35); }
        .pf-order-price { font-family:'Cormorant Garamond',Georgia,serif; font-size:22px; font-weight:300; color:#fff; }
        .pf-order-badge {
          font-size:9px; font-weight:600; letter-spacing:0.2em;
          padding:5px 14px; border:1px solid; border-radius:0;
        }
        .pf-view-btn {
          background:transparent; border:1px solid rgba(200,169,110,0.2);
          color:rgba(255,255,255,0.4); font-family:'DM Sans',sans-serif;
          font-size:9px; font-weight:600; letter-spacing:0.22em;
          padding:8px 18px; cursor:pointer;
          transition:border-color 0.2s,color 0.2s;
        }
        .pf-view-btn:hover { border-color:#C8A96E; color:#C8A96E; }

        /* ── DETAILS ── */
        .pf-detail-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.06); gap:20px;
        }
        .pf-detail-label { font-size:9px; font-weight:600; letter-spacing:0.3em; color:rgba(255,255,255,0.35); flex-shrink:0; }
        .pf-detail-value { font-family:'Cormorant Garamond',Georgia,serif; font-size:18px; font-weight:400; color:#fff; text-align:right; }

        /* Form inputs */
        .pf-form-group { margin-bottom:28px; }
        .pf-form-label { display:block; font-size:9px; font-weight:600; letter-spacing:0.3em; color:rgba(255,255,255,0.4); margin-bottom:10px; }
        .pf-form-input {
          width:100%; background:#0b1f3a;
          border:none; border-bottom:1px solid #C8A96E;
          color:#fff; font-family:'Cormorant Garamond',Georgia,serif;
          font-size:18px; font-weight:400; padding:10px 6px;
          outline:none;
        }
        .pf-form-input:focus { border-bottom-color:#e8c99a; }

        /* Buttons */
        .pf-btn-gold {
          padding:14px 36px; background:#C8A96E; border:none;
          color:#06142B; font-family:'DM Sans',sans-serif;
          font-size:10px; font-weight:700; letter-spacing:0.28em;
          cursor:pointer; transition:background 0.25s;
        }
        .pf-btn-gold:hover { background:#e8c99a; }
        .pf-btn-ghost {
          padding:14px 36px; background:transparent;
          border:1px solid rgba(200,169,110,0.2);
          color:rgba(255,255,255,0.4); font-family:'DM Sans',sans-serif;
          font-size:10px; font-weight:500; letter-spacing:0.28em;
          cursor:pointer; transition:color 0.2s,border-color 0.2s;
        }
        .pf-btn-ghost:hover { color:#fff; border-color:rgba(255,255,255,0.3); }
        .pf-btn-danger {
          padding:14px 36px; background:transparent;
          border:1px solid rgba(247,126,126,0.25);
          color:#f77e7e; font-family:'DM Sans',sans-serif;
          font-size:10px; font-weight:500; letter-spacing:0.28em;
          cursor:pointer; transition:background 0.2s;
        }
        .pf-btn-danger:hover { background:rgba(247,126,126,0.08); }

        /* ── ADDRESSES ── */
        .pf-addr-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
        .pf-addr-card {
          border:1px solid rgba(255,255,255,0.08); padding:28px;
          position:relative; transition:border-color 0.2s;
        }
        .pf-addr-card.default { border-color:rgba(200,169,110,0.25); }
        .pf-addr-card:hover { border-color:rgba(200,169,110,0.3); }
        .pf-addr-default-tag {
          position:absolute; top:-1px; right:20px;
          background:#C8A96E; color:#06142B;
          font-size:8px; font-weight:700; letter-spacing:0.2em; padding:3px 10px;
        }
        .pf-addr-label { font-size:9px; font-weight:600; letter-spacing:0.32em; color:#C8A96E; margin-bottom:14px; display:block; }
        .pf-addr-line  { font-family:'Cormorant Garamond',Georgia,serif; font-size:17px; font-weight:300; color:#fff; margin:0 0 4px; line-height:1.6; }
        .pf-addr-line2 { font-family:'Cormorant Garamond',Georgia,serif; font-size:16px; font-weight:300; color:rgba(255,255,255,0.4); margin:0 0 22px; }
        .pf-addr-btn {
          background:transparent; border:1px solid rgba(255,255,255,0.08);
          color:rgba(255,255,255,0.35); font-family:'DM Sans',sans-serif;
          font-size:9px; font-weight:600; letter-spacing:0.2em;
          padding:7px 14px; cursor:pointer;
          transition:border-color 0.2s,color 0.2s;
        }
        .pf-addr-btn:hover { border-color:#C8A96E; color:#C8A96E; }
        .pf-addr-add {
          border:1px dashed rgba(200,169,110,0.2); background:transparent;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:10px; cursor:pointer; min-height:160px;
          color:rgba(255,255,255,0.3); transition:border-color 0.25s,background 0.25s;
        }
        .pf-addr-add:hover { border-color:#C8A96E; background:rgba(200,169,110,0.04); }
        .pf-addr-plus { font-family:'Cormorant Garamond',Georgia,serif; font-size:34px; font-weight:300; color:#C8A96E; line-height:1; }
        .pf-addr-add-text { font-size:9px; font-weight:600; letter-spacing:0.28em; }

        /* ── QUICK LINKS ── */
        .pf-quick { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }
        .pf-quick-link {
          display:flex; align-items:center; gap:8px;
          padding:12px 20px;
          border:1px solid rgba(255,255,255,0.07);
          color:rgba(255,255,255,0.5); text-decoration:none;
          font-size:10px; font-weight:500; letter-spacing:0.22em;
          transition:border-color 0.2s,color 0.2s;
          font-family:'DM Sans',sans-serif;
        }
        .pf-quick-link:hover { border-color:rgba(200,169,110,0.3); color:#C8A96E; }
        .pf-quick-badge {
          background:#C8A96E; color:#06142B;
          width:18px; height:18px; border-radius:50%;
          font-size:9px; font-weight:700;
          display:flex; align-items:center; justify-content:center;
        }

        /* Responsive */
        @media (max-width:1024px) {
          .pf-hero { padding:44px 32px 36px; }
          .pf-body { padding:0 32px 60px; }
          .pf-stats { margin-left:0; width:100%; justify-content:flex-start; }
        }
        @media (max-width:768px) {
          .pf-hero { padding:36px 20px 28px; }
          .pf-body { padding:0 20px 48px; }
          .pf-tab  { padding:16px 16px; font-size:9px; letter-spacing:0.18em; }
          .pf-stat { padding:0 16px; }
          .pf-detail-row { flex-direction:column; align-items:flex-start; gap:6px; }
          .pf-detail-value { text-align:left; }
          .pf-hero-inner { gap:20px; }
        }
        @media (max-width:480px) {
          .pf-avatar { width:72px; height:72px; }
          .pf-avatar-initials { font-size:24px; }
          .pf-stat-val { font-size:22px; }
          .pf-btn-gold,.pf-btn-ghost,.pf-btn-danger { width:100%; text-align:center; }
        }
      `}</style>

      <div className="pf-page">

        {/* ── HERO ── */}
        <div className="pf-hero">
          <div className="pf-hero-inner">

            {/* Avatar */}
            <div className="pf-avatar">
              <span className="pf-avatar-initials">{initials}</span>
            </div>

            {/* Identity */}
            <div className="pf-identity">
              <span className="pf-tier">VELOR INSIDER</span>
              <h1 className="pf-name">{user.name || "Member"}</h1>
              <p className="pf-email">
                {user.email}
                {user.createdAt && (
                  <span style={{ marginLeft: 12, color: "rgba(255,255,255,0.25)" }}>
                    · Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </span>
                )}
              </p>
            </div>

            {/* Stats */}
            <div className="pf-stats">
              {[
                { val: MOCK_ORDERS.length,              label: "ORDERS"    },
                { val: `₹${totalSpent.toLocaleString()}`, label: "SPENT"    },
                { val: wishlistCount,                    label: "WISHLIST"  },
                { val: cartCount,                        label: "IN CART"   },
              ].map((s) => (
                <div key={s.label} className="pf-stat">
                  <span className="pf-stat-val">{s.val}</span>
                  <span className="pf-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="pf-body">

          {/* Quick links */}
          <div className="pf-quick" style={{ paddingTop: 36 }}>
            <Link to="/wishlist" className="pf-quick-link">
              ♡ WISHLIST
              {wishlistCount > 0 && <span className="pf-quick-badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="pf-quick-link">
              ◻ CART
              {cartCount > 0 && <span className="pf-quick-badge">{cartCount}</span>}
            </Link>
            <Link to="/view-collection" className="pf-quick-link">↗ COLLECTION</Link>
          </div>

          {/* Tabs */}
          <div className="pf-tabs">
            {[
              { key: "orders",    label: "ORDER HISTORY" },
              { key: "details",   label: "MY DETAILS"    },
              { key: "addresses", label: "ADDRESSES"     },
            ].map((t) => (
              <button
                key={t.key}
                className={`pf-tab ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >{t.label}</button>
            ))}
          </div>

          {/* ── ORDER HISTORY ── */}
          {tab === "orders" && (
            <div>
              {MOCK_ORDERS.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300 }}>No orders yet.</p>
                  <Link to="/view-collection" style={{ display: "inline-block", marginTop: 16, padding: "12px 32px", border: "1px solid rgba(200,169,110,0.3)", color: "#C8A96E", textDecoration: "none", fontSize: 10, letterSpacing: "0.28em", fontWeight: 600 }}>
                    SHOP NOW
                  </Link>
                </div>
              ) : (
                MOCK_ORDERS.map((order) => {
                  const s = STATUS[order.status] || STATUS["Processing"];
                  return (
                    <div key={order.id} className="pf-order-row">
                      <div>
                        <div className="pf-order-id">{order.id}</div>
                        <div className="pf-order-meta">
                          {order.date} &nbsp;·&nbsp; {order.items} item{order.items > 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="pf-order-price">₹{order.total.toLocaleString()}</div>
                      <span
                        className="pf-order-badge"
                        style={{ color: s.color, background: s.bg, borderColor: s.border }}
                      >
                        {order.status}
                      </span>
                      <button className="pf-view-btn">VIEW ORDER</button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── MY DETAILS ── */}
          {tab === "details" && (
            <div style={{ maxWidth: 520 }}>
              {editMode ? (
                <div>
                  {[
                    { label: "FULL NAME",     key: "name",  type: "text"  },
                    { label: "EMAIL ADDRESS", key: "email", type: "email" },
                    { label: "PHONE NUMBER",  key: "phone", type: "tel"   },
                  ].map((f) => (
                    <div key={f.key} className="pf-form-group">
                      <label className="pf-form-label">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="pf-form-input"
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                    <button className="pf-btn-gold"  onClick={handleSave}>SAVE CHANGES</button>
                    <button className="pf-btn-ghost" onClick={() => setEditMode(false)}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <div>
                  {[
                    { label: "FULL NAME",     value: form.name            },
                    { label: "EMAIL ADDRESS", value: form.email           },
                    { label: "PHONE NUMBER",  value: form.phone || "—"   },
                    { label: "ACCOUNT TYPE",  value: "VELOR INSIDER"      },
                  ].map((row) => (
                    <div key={row.label} className="pf-detail-row">
                      <span className="pf-detail-label">{row.label}</span>
                      <span className="pf-detail-value">{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
                    <button className="pf-btn-gold"   onClick={() => setEditMode(true)}>EDIT DETAILS</button>
                    <button className="pf-btn-danger" onClick={handleLogout}>SIGN OUT</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ADDRESSES ── */}
          {tab === "addresses" && (
            <div className="pf-addr-grid">
              {[
                { id: 1, label: "Home",   line1: "42, Safdarjung Enclave", line2: "New Delhi — 110029",      isDefault: true  },
                { id: 2, label: "Office", line1: "B-12, Sector 62, Noida", line2: "Uttar Pradesh — 201301", isDefault: false },
              ].map((addr) => (
                <div key={addr.id} className={`pf-addr-card ${addr.isDefault ? "default" : ""}`}>
                  {addr.isDefault && <span className="pf-addr-default-tag">DEFAULT</span>}
                  <span className="pf-addr-label">{addr.label.toUpperCase()}</span>
                  <p className="pf-addr-line">{addr.line1}</p>
                  <p className="pf-addr-line2">{addr.line2}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="pf-addr-btn">EDIT</button>
                    {!addr.isDefault && <button className="pf-addr-btn">SET DEFAULT</button>}
                  </div>
                </div>
              ))}

              <button className="pf-addr-add">
                <span className="pf-addr-plus">+</span>
                <span className="pf-addr-add-text">ADD NEW ADDRESS</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Profile;