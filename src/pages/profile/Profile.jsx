// Profile.jsx
// ─────────────────────────────────────────────────────────────────────────────
// DATA ARCHITECTURE
//   My Details  → localStorage (phone/dob/gender/bio)  + AuthContext (name/email)
//   Orders      → localStorage keyed by user.email (written by PaymentGateway on checkout)
//   My Cart     → Redux live state (current items in cart RIGHT NOW)
//   Wishlist    → WishlistContext live state
//
// BEHAVIOUR
//   • New user  → all tabs show empty / zero states
//   • After checkout → cart clears, order moves to Orders history
//   • Returning user → full history restored from localStorage
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth }     from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";

// ── localStorage helpers (per-user, no cross-user bleed) ──────────────────────
const lsKey = (email, k) => `velor_${k}_${email}`;
const lsGet = (key, fb)  => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; } catch { return fb; } };
const lsSet = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ── Order status badge colours ─────────────────────────────────────────────────
const STATUS_STYLE = {
  Delivered:    { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  "In Transit": { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Processing:   { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  Shipped:      { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  Cancelled:    { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// ─────────────────────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate         = useNavigate();
  const { user, logout } = useAuth();
  const { wishlistItems = [], count: wishlistCount = 0 } = useWishlist() || {};
  const cartItems  = useSelector((s) => s.cart.items        || []);
  const cartCount  = useSelector((s) => s.cart.totalQuantity || 0);
  const cartTotal  = useSelector((s) => s.cart.totalPrice    || 0);

  // ── Per-user keys ─────────────────────────────────────────────────────────
  const profileKey = user ? lsKey(user.email, "profile") : null;
  const ordersKey  = user ? lsKey(user.email, "orders")  : null;

  // ── Component state ───────────────────────────────────────────────────────
  const [tab,      setTab]      = useState("details");
  const [editMode, setEditMode] = useState(false);
  const [saved,    setSaved]    = useState(false);

  const [extra, setExtra] = useState(() =>
    profileKey ? lsGet(profileKey, { phone: "", dob: "", gender: "Prefer not to say", bio: "" }) : {}
  );

  const [form, setForm] = useState({
    name:   user?.name  || "",
    email:  user?.email || "",
    phone:  extra.phone  || "",
    dob:    extra.dob    || "",
    gender: extra.gender || "Prefer not to say",
    bio:    extra.bio    || "",
  });

  // Orders — written by PaymentGateway; read here as history
  const [orders] = useState(() => ordersKey ? lsGet(ordersKey, []) : []);

  const fileRef  = useRef(null);
  const avatarKey = user ? lsKey(user.email, "avatar") : null;
  const [avatarSrc, setAvatarSrc] = useState(() => avatarKey ? lsGet(avatarKey, null) : null);

  // ── Guard ─────────────────────────────────────────────────────────────────
  if (!user) { navigate("/login"); return null; }

  // ── Derived ───────────────────────────────────────────────────────────────
  const initials    = (user.name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : new Date().getFullYear();
  const totalSpent  = orders.reduce((s, o) => s + (o.total || 0), 0);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleLogout = () => { logout(); navigate("/login"); };

  const handleSave = () => {
    const updated = { phone: form.phone, dob: form.dob, gender: form.gender, bio: form.bio };
    setExtra(updated);
    if (profileKey) lsSet(profileKey, updated);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarSrc(ev.target.result);
      if (avatarKey) lsSet(avatarKey, ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // ── TABS CONFIG ───────────────────────────────────────────────────────────
  const TABS = [
    { key: "details",  label: "My Details" },
    { key: "orders",   label: "Orders",    badge: orders.length || null },
    { key: "cart",     label: "Cart",      badge: cartCount || null     },
    { key: "wishlist", label: "Wishlist",  badge: wishlistCount || null  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .pf * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .pf   { min-height: 100vh; background: rgb(251,252,253); }

        /* ── BANNER ─────────────────────────────────────────────────────── */
        .pf-banner {
          background: linear-gradient(135deg, #06142B 0%, #0b2447 100%);
          padding: 40px clamp(20px,5vw,60px) 84px;
          position: relative; overflow: hidden;
        }
        .pf-banner::after {
          content: 'VELOR';
          position: absolute; right: -20px; bottom: -28px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px,13vw,150px); font-weight: 600;
          color: rgba(200,169,110,0.055); letter-spacing: 0.08em;
          pointer-events: none; user-select: none;
        }
        .pf-banner-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
        }

        /* Avatar */
        .pf-av-wrap { position: relative; flex-shrink: 0; }
        .pf-av {
          width: 78px; height: 78px; border-radius: 50%;
          background: linear-gradient(135deg, #C8A96E, #e8c99a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 27px; font-weight: 500; color: #06142B;
          box-shadow: 0 0 0 3px rgba(200,169,110,0.28); overflow: hidden;
        }
        .pf-av img { width:100%; height:100%; object-fit:cover; }
        .pf-av-edit {
          position: absolute; bottom:0; right:0;
          width:26px; height:26px; border-radius:50%;
          background:#C8A96E; border:2px solid #06142B;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:11px; color:#06142B;
        }

        .pf-banner-text { flex:1; min-width:160px; }
        .pf-tier  { font-size:9px; font-weight:600; letter-spacing:.38em; color:#C8A96E; text-transform:uppercase; display:block; margin-bottom:5px; }
        .pf-name  { font-family:'Playfair Display',serif; font-size:clamp(20px,3.2vw,32px); font-weight:500; color:#fff; margin:0 0 3px; letter-spacing:.02em; }
        .pf-email { font-size:13px; color:rgba(255,255,255,.42); margin:0; }
        .pf-since { font-size:11px; color:rgba(255,255,255,.28); margin-top:4px; display:block; }

        /* Stat chips */
        .pf-chips { display:flex; gap:10px; flex-wrap:wrap; margin-left:auto; }
        .pf-chip  { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:11px 18px; text-align:center; min-width:76px; }
        .pf-chip-val   { font-family:'Playfair Display',serif; font-size:21px; font-weight:500; color:#fff; display:block; }
        .pf-chip-label { font-size:9px; font-weight:600; letter-spacing:.26em; color:rgba(255,255,255,.32); display:block; margin-top:3px; }

        /* ── CONTENT ─────────────────────────────────────────────────────── */
        .pf-content { max-width:1100px; margin:-44px auto 0; padding:0 clamp(16px,4vw,40px) 64px; position:relative; z-index:1; }

        /* Tabs */
        .pf-tabs { display:flex; gap:4px; margin-bottom:22px; background:#fff; border-radius:12px; padding:6px; box-shadow:0 2px 12px rgba(0,0,0,.07); flex-wrap:wrap; }
        .pf-tab  { flex:1; min-width:96px; padding:10px 14px; border:none; border-radius:8px; background:transparent; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:.1em; color:rgba(0,0,0,.38); transition:all .2s; text-transform:uppercase; position:relative; display:flex; align-items:center; justify-content:center; gap:7px; }
        .pf-tab:hover  { color:rgba(0,0,0,.7); background:rgba(0,0,0,.03); }
        .pf-tab.active { background:#06142B; color:#C8A96E; }
        .pf-tab-badge  { background:#C8A96E; color:#06142B; font-size:9px; font-weight:800; border-radius:20px; padding:1px 6px; line-height:14px; }
        .pf-tab.active .pf-tab-badge { background:rgba(200,169,110,.25); color:#C8A96E; }

        /* Cards */
        .pf-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .pf-card { background:#fff; border-radius:16px; padding:28px; box-shadow:0 2px 16px rgba(0,0,0,.055); }
        .pf-card-full { grid-column:1/-1; }
        .pf-card-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:500; color:#0f172a; margin:0 0 20px; display:flex; justify-content:space-between; align-items:center; gap:12px; }
        .pf-edit-btn   { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:.14em; color:#C8A96E; background:none; border:1px solid rgba(200,169,110,.3); cursor:pointer; text-transform:uppercase; padding:6px 14px; border-radius:6px; transition:background .2s; white-space:nowrap; }
        .pf-edit-btn:hover { background:rgba(200,169,110,.08); }

        /* Detail rows */
        .pf-row { display:flex; justify-content:space-between; align-items:flex-start; padding:13px 0; border-bottom:1px solid #f1f5f9; gap:16px; }
        .pf-row:last-child { border-bottom:none; padding-bottom:0; }
        .pf-row-l { font-size:11px; font-weight:500; color:#94a3b8; flex-shrink:0; }
        .pf-row-v { font-size:14px; font-weight:500; color:#0f172a; text-align:right; }

        /* Form fields */
        .pf-field { margin-bottom:16px; }
        .pf-field label { display:block; font-size:11px; font-weight:600; letter-spacing:.1em; color:#94a3b8; margin-bottom:7px; text-transform:uppercase; }
        .pf-field input, .pf-field select, .pf-field textarea {
          width:100%; background:#f8fafc; border:1.5px solid #e2e8f0;
          border-radius:8px; color:#0f172a; font-size:14px; font-weight:500;
          padding:11px 14px; outline:none; font-family:'DM Sans',sans-serif; transition:border-color .2s;
        }
        .pf-field input:focus, .pf-field select:focus, .pf-field textarea:focus { border-color:#C8A96E; }
        .pf-field input:disabled { background:#f1f5f9; color:#94a3b8; cursor:not-allowed; }
        .pf-field textarea { resize:vertical; min-height:76px; }
        .pf-field-2col { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

        /* Order rows */
        .pf-order { display:flex; align-items:center; flex-wrap:wrap; gap:12px; padding:18px 0; border-bottom:1px solid #f1f5f9; }
        .pf-order:last-child { border-bottom:none; }
        .pf-order-id   { font-size:12px; font-weight:700; color:#0f172a; letter-spacing:.05em; }
        .pf-order-meta { font-size:11px; color:#94a3b8; margin-top:2px; }
        .pf-order-amt  { font-family:'Playfair Display',serif; font-size:18px; font-weight:500; color:#0f172a; margin-left:auto; }
        .pf-badge { font-size:10px; font-weight:600; letter-spacing:.1em; padding:4px 12px; border-radius:999px; border:1px solid; white-space:nowrap; }
        .pf-view-btn { font-size:10px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; padding:7px 16px; border-radius:8px; background:transparent; border:1px solid #e2e8f0; color:#64748b; cursor:pointer; transition:border-color .2s,color .2s; font-family:'DM Sans',sans-serif; }
        .pf-view-btn:hover { border-color:#C8A96E; color:#C8A96E; }

        /* Order items preview inside order */
        .pf-order-items { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
        .pf-order-thumb { width:42px; height:50px; object-fit:cover; border-radius:6px; border:1px solid #f1f5f9; }

        /* Cart items */
        .pf-cart-row { display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid #f1f5f9; }
        .pf-cart-row:last-child { border-bottom:none; }
        .pf-cart-img  { width:54px; height:64px; object-fit:cover; border-radius:8px; flex-shrink:0; border:1px solid #f1f5f9; }
        .pf-cart-name { font-size:13px; font-weight:600; color:#0f172a; margin:0 0 3px; }
        .pf-cart-meta { font-size:11px; color:#94a3b8; }

        /* Wishlist grid */
        .pf-wish-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:14px; }
        .pf-wish-item { border:1px solid #f1f5f9; border-radius:12px; overflow:hidden; transition:box-shadow .2s; }
        .pf-wish-item:hover { box-shadow:0 4px 20px rgba(0,0,0,.1); }
        .pf-wish-img  { width:100%; aspect-ratio:3/4; object-fit:cover; display:block; }
        .pf-wish-info { padding:10px 12px; }
        .pf-wish-name { font-size:12px; font-weight:600; color:#0f172a; margin:0 0 3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .pf-wish-price{ font-size:12px; color:#C8A96E; font-weight:600; }

        /* Buttons */
        .pf-btn-dark   { padding:11px 26px; background:#06142B; border:none; border-radius:8px; color:#C8A96E; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; transition:background .2s; text-decoration:none; display:inline-block; }
        .pf-btn-dark:hover { background:#0b2447; }
        .pf-btn-gold   { padding:11px 26px; background:#C8A96E; border:none; border-radius:8px; color:#06142B; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; cursor:pointer; transition:background .2s; }
        .pf-btn-gold:hover { background:#b8995e; }
        .pf-btn-ghost  { padding:11px 22px; background:transparent; border:1px solid #e2e8f0; border-radius:8px; color:#64748b; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:border-color .2s; }
        .pf-btn-ghost:hover { border-color:#cbd5e1; color:#0f172a; }
        .pf-btn-danger { padding:11px 22px; background:transparent; border:1px solid #fecaca; border-radius:8px; color:#ef4444; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:background .2s; }
        .pf-btn-danger:hover { background:#fef2f2; }

        /* Empty state */
        .pf-empty { text-align:center; padding:44px 20px; }
        .pf-empty-icon { width:66px; height:66px; border-radius:50%; background:rgba(200,169,110,.1); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:26px; }
        .pf-empty-title { font-size:16px; font-weight:600; color:#0f172a; margin:0 0 6px; }
        .pf-empty-sub   { font-size:13px; color:#94a3b8; margin:0 0 22px; line-height:1.65; }

        /* Alert banners */
        .pf-alert { display:flex; align-items:center; gap:10px; padding:12px 16px; border-radius:10px; font-size:13px; margin-bottom:18px; }
        .pf-alert.ok  { background:#f0fdf4; border:1px solid #bbf7d0; color:#16a34a; }
        .pf-alert.err { background:#fef2f2; border:1px solid #fecaca; color:#dc2626; }

        /* Responsive */
        @media (max-width:768px) {
          .pf-grid { grid-template-columns:1fr; }
          .pf-card-full { grid-column:1; }
          .pf-chips { width:100%; }
          .pf-chip  { flex:1; min-width:60px; padding:10px 10px; }
          .pf-chip-val { font-size:18px; }
          .pf-field-2col { grid-template-columns:1fr; }
        }
        @media (max-width:480px) {
          .pf-tabs { gap:2px; }
          .pf-tab  { flex:none; width:calc(50% - 2px); font-size:10px; padding:9px 6px; min-width:0; }
          .pf-banner { padding-bottom:72px; }
        }
      `}</style>

      <div className="pf">

        {/* ── BANNER ────────────────────────────────────────────────────────── */}
        <div className="pf-banner">
          <div className="pf-banner-inner">

            <div className="pf-av-wrap">
              <div className="pf-av">
                {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : initials}
              </div>
              <button className="pf-av-edit" onClick={() => fileRef.current?.click()} title="Change photo">✎</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
            </div>

            <div className="pf-banner-text">
              <span className="pf-tier">VELOR INSIDER</span>
              <h1 className="pf-name">{user.name}</h1>
              <p className="pf-email">{user.email}</p>
              <span className="pf-since">Member since {memberSince}</span>
            </div>

            {/* Live stats */}
            <div className="pf-chips">
              {[
                { val: orders.length,                                           label: "ORDERS"   },
                { val: orders.length ? fmt(totalSpent) : "₹0",                 label: "SPENT"    },
                { val: wishlistCount,                                            label: "WISHLIST" },
                { val: cartCount,                                                label: "IN CART"  },
              ].map((s) => (
                <div key={s.label} className="pf-chip">
                  <span className="pf-chip-val">{s.val}</span>
                  <span className="pf-chip-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────────── */}
        <div className="pf-content">

          {/* Tab bar */}
          <div className="pf-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`pf-tab ${tab === t.key ? "active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                {t.badge ? <span className="pf-tab-badge">{t.badge}</span> : null}
              </button>
            ))}
          </div>

          {/* ══ MY DETAILS ══════════════════════════════════════════════════ */}
          {tab === "details" && (
            <div className="pf-grid">

              {/* Account details card */}
              <div className="pf-card">
                <div className="pf-card-title">
                  Account Details
                  {!editMode && <button className="pf-edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>}
                </div>

                {saved && <div className="pf-alert ok">✓ Profile updated successfully</div>}

                {editMode ? (
                  <>
                    <div className="pf-field-2col">
                      <div className="pf-field">
                        <label>Full Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="pf-field">
                        <label>Email</label>
                        <input type="email" value={form.email} disabled />
                      </div>
                      <div className="pf-field">
                        <label>Phone Number</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div className="pf-field">
                        <label>Date of Birth</label>
                        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                      </div>
                      <div className="pf-field">
                        <label>Gender</label>
                        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                          {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="pf-field">
                      <label>Short Bio</label>
                      <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell us a bit about yourself…" />
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button className="pf-btn-gold" onClick={handleSave}>Save Changes</button>
                      <button className="pf-btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { l: "Full Name",     v: user.name  },
                      { l: "Email",         v: user.email },
                      { l: "Phone",         v: extra.phone  || <em style={{ color: "#cbd5e1" }}>Not added</em>  },
                      { l: "Date of Birth", v: extra.dob    || <em style={{ color: "#cbd5e1" }}>Not added</em>  },
                      { l: "Gender",        v: extra.gender || "Prefer not to say" },
                      { l: "Member Since",  v: memberSince  },
                    ].map((r) => (
                      <div key={r.l} className="pf-row">
                        <span className="pf-row-l">{r.l}</span>
                        <span className="pf-row-v">{r.v}</span>
                      </div>
                    ))}
                    {extra.bio && (
                      <div style={{ marginTop: 14, padding: 14, background: "#f8fafc", borderRadius: 8 }}>
                        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase" }}>Bio</p>
                        <p style={{ fontSize: 14, color: "#0f172a", margin: 0, lineHeight: 1.7 }}>{extra.bio}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Session + quick links */}
              <div className="pf-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="pf-card-title" style={{ marginBottom: 10 }}>Session</div>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.75, margin: "0 0 20px" }}>
                    Signed in as <strong style={{ color: "#0f172a" }}>{user.name}</strong>.<br />
                    Signing out will clear your active session.
                  </p>
                  <button className="pf-btn-danger" onClick={handleLogout}>Sign Out</button>
                </div>

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 12px" }}>Quick Links</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      { label: "Wishlist",     to: "/wishlist"        },
                      { label: "Cart",         to: "/cart"            },
                      { label: "Collection",   to: "/view-collection" },
                      { label: "Best Sellers", to: "/best-sellers"    },
                    ].map((l) => (
                      <Link key={l.to} to={l.to}
                        style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 6, border: "1px solid #e2e8f0", color: "#475569", textDecoration: "none", transition: "border-color .2s, color .2s" }}
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

          {/* ══ ORDER HISTORY ═══════════════════════════════════════════════ */}
          {tab === "orders" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">
                Order History
                {orders.length > 0 && (
                  <span style={{ fontSize: 13, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                    {orders.length} order{orders.length > 1 ? "s" : ""} · {fmt(totalSpent)} total spent
                  </span>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">📦</div>
                  <p className="pf-empty-title">No orders yet</p>
                  <p className="pf-empty-sub">
                    You haven't placed any orders.<br />
                    Completed orders will appear here after checkout.
                  </p>
                  <Link to="/view-collection" className="pf-btn-dark">Shop Now</Link>
                </div>
              ) : (
                <>
                  {orders.map((order) => {
                    const s = STATUS_STYLE[order.status] || STATUS_STYLE.Processing;
                    return (
                      <div key={order.id} className="pf-order">
                        <div style={{ flex: 1, minWidth: 140 }}>
                          <div className="pf-order-id">{order.id}</div>
                          <div className="pf-order-meta">
                            {order.date} · {order.itemCount || order.items?.length || 0} item{(order.itemCount || order.items?.length || 0) !== 1 ? "s" : ""}
                            {order.coupon && <span style={{ color: "#16a34a", marginLeft: 8 }}>· Coupon: {order.coupon}</span>}
                          </div>
                          {/* Product thumbnails */}
                          {order.items?.length > 0 && (
                            <div className="pf-order-items">
                              {order.items.slice(0, 5).map((item, i) => (
                                item.image && (
                                  <img key={i} src={Array.isArray(item.image) ? item.image[0] : item.image}
                                    alt={item.name} className="pf-order-thumb" />
                                )
                              ))}
                              {order.items.length > 5 && (
                                <div style={{ width: 42, height: 50, borderRadius: 6, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>
                                  +{order.items.length - 5}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="pf-order-amt">{fmt(order.total)}</div>
                        <span className="pf-badge" style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                          {order.status}
                        </span>
                        <button className="pf-view-btn">View Order</button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* ══ CURRENT CART ════════════════════════════════════════════════ */}
          {tab === "cart" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">
                My Cart
                {cartItems.length > 0 && (
                  <Link to="/cart"
                    style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#C8A96E", textDecoration: "none", border: "1px solid rgba(200,169,110,.3)", padding: "6px 14px", borderRadius: 6 }}
                  >
                    GO TO CART →
                  </Link>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">🛍️</div>
                  <p className="pf-empty-title">Your cart is empty</p>
                  <p className="pf-empty-sub">
                    Items you add to the cart appear here in real time.<br />
                    Once you checkout, they'll move to your order history.
                  </p>
                  <Link to="/view-collection" className="pf-btn-dark">Browse Collection</Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="pf-cart-row">
                      {item.image && (
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name || item.title}
                          className="pf-cart-img"
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <p className="pf-cart-name">{item.name || item.title}</p>
                        <p className="pf-cart-meta">Qty: {item.quantity} &nbsp;·&nbsp; {fmt(item.price)} each</p>
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: "#0f172a", flexShrink: 0 }}>
                        {fmt(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}

                  {/* Cart total + CTA */}
                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase" }}>
                        Cart Total ({cartCount} item{cartCount !== 1 ? "s" : ""})
                      </p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#0f172a", margin: 0 }}>
                        {fmt(cartTotal)}
                      </p>
                      {cartTotal < 999 && (
                        <p style={{ fontSize: 11, color: "#C8A96E", margin: "4px 0 0" }}>
                          Add {fmt(999 - cartTotal)} more for free shipping
                        </p>
                      )}
                      {cartTotal >= 999 && (
                        <p style={{ fontSize: 11, color: "#16a34a", margin: "4px 0 0" }}>✓ Free shipping unlocked</p>
                      )}
                    </div>
                    <Link to="/cart" className="pf-btn-dark" style={{ textDecoration: "none" }}>
                      Proceed to Checkout →
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ WISHLIST ════════════════════════════════════════════════════ */}
          {tab === "wishlist" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">
                Wishlist
                {wishlistItems.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                      {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}
                    </span>
                    <Link to="/wishlist"
                      style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#C8A96E", textDecoration: "none", border: "1px solid rgba(200,169,110,.3)", padding: "6px 14px", borderRadius: 6 }}
                    >
                      VIEW ALL →
                    </Link>
                  </div>
                )}
              </div>

              {wishlistItems.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">🤍</div>
                  <p className="pf-empty-title">Your wishlist is empty</p>
                  <p className="pf-empty-sub">
                    Tap the heart icon on any product to save it here.<br />
                    Your wishlist is synced in real time.
                  </p>
                  <Link to="/view-collection" className="pf-btn-dark">Browse Collection</Link>
                </div>
              ) : (
                <div className="pf-wish-grid">
                  {wishlistItems.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                      <div className="pf-wish-item">
                        <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="pf-wish-img" />
                        <div className="pf-wish-info">
                          <p className="pf-wish-name">{item.name}</p>
                          <p className="pf-wish-price">{fmt(item.price)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}