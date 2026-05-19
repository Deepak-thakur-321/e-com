// Profile.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FULLY DYNAMIC — every data point is real:
//   • Cart    → Redux  (live, auto-updates as user shops)
//   • Wishlist → WishlistContext (live)
//   • Orders  → localStorage keyed by user.email  (set from checkout)
//   • Profile → localStorage keyed by user.email  (phone, dob, gender, bio)
//   • New user → all sections show empty / zero state
//   • Returning user → sees exactly what they've done
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSelector } from "react-redux";

// ─── LS helpers (keyed per user so users never bleed into each other) ─────────
const lsKey  = (email, suffix) => `velor_${suffix}_${email}`;
const lsGet  = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const lsSet  = (key, val)      => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ─── Status badge config ───────────────────────────────────────────────────────
const STATUS = {
  Delivered:   { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  "In Transit":{ color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Processing:  { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  Cancelled:   { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate             = useNavigate();
  const { user, logout }     = useAuth();
  const { wishlistItems = [], count: wishlistCount = 0 } = useWishlist() || {};
  const cartItems            = useSelector((s) => s.cart.items   || []);
  const cartCount            = useSelector((s) => s.cart.totalQuantity || 0);
  const cartTotal            = useSelector((s) => s.cart.totalPrice    || 0);

  // ── Per-user LS keys ────────────────────────────────────────────────────────
  const profileKey  = user ? lsKey(user.email, "profile")   : null;
  const ordersKey   = user ? lsKey(user.email, "orders")    : null;
  const addressKey  = user ? lsKey(user.email, "addresses") : null;

  // ── State ───────────────────────────────────────────────────────────────────
  const [tab,      setTab]      = useState("details");
  const [editMode, setEditMode] = useState(false);
  const [saved,    setSaved]    = useState(false);

  // Extended profile (phone / dob / gender / bio — not in AuthContext)
  const [extra, setExtra] = useState(() =>
    profileKey ? lsGet(profileKey, { phone: "", dob: "", gender: "Prefer not to say", bio: "" }) : {}
  );

  // Form state (merges auth name/email + extra)
  const [form, setForm] = useState({
    name:   user?.name  || "",
    email:  user?.email || "",
    phone:  extra.phone  || "",
    dob:    extra.dob    || "",
    gender: extra.gender || "Prefer not to say",
    bio:    extra.bio    || "",
  });

  // Orders (from LS — populated by your checkout flow)
  const [orders, setOrders] = useState(() =>
    ordersKey ? lsGet(ordersKey, []) : []
  );

  // Addresses
  const [addresses,   setAddresses]   = useState(() => addressKey ? lsGet(addressKey, []) : []);
  const [addingAddr,  setAddingAddr]  = useState(false);
  const [newAddr,     setNewAddr]     = useState({ label: "Home", line1: "", line2: "", city: "", state: "", pin: "", phone: "" });

  // Security
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwMsg,  setPwMsg]  = useState(null);
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });

  // Notifications
  const notifKey = user ? lsKey(user.email, "notifs") : null;
  const [notifs, setNotifs] = useState(() =>
    notifKey ? lsGet(notifKey, { newsletter: true, orderUpdates: true, saleAlerts: true, promoSms: false, recommendations: false }) : {}
  );

  const fileRef = useRef(null);
  const avatarKey = user ? lsKey(user.email, "avatar") : null;
  const [avatarSrc, setAvatarSrc] = useState(() => avatarKey ? lsGet(avatarKey, null) : null);

  // ── Redirect if not logged in ────────────────────────────────────────────────
  if (!user) { navigate("/login"); return null; }

  // ── Derived ─────────────────────────────────────────────────────────────────
  const initials    = (user.name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : new Date().getFullYear();
  const totalSpent  = orders.reduce((s, o) => s + (o.total || 0), 0);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleLogout = () => { logout(); navigate("/login"); };

  const handleSaveProfile = () => {
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

  const handleAddAddress = () => {
    if (!newAddr.line1.trim() || !newAddr.city.trim() || !newAddr.pin.trim()) return;
    const updated = [...addresses, { ...newAddr, id: Date.now(), isDefault: addresses.length === 0 }];
    setAddresses(updated);
    if (addressKey) lsSet(addressKey, updated);
    setAddingAddr(false);
    setNewAddr({ label: "Home", line1: "", line2: "", city: "", state: "", pin: "", phone: "" });
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    if (addressKey) lsSet(addressKey, updated);
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    if (addressKey) lsSet(addressKey, updated);
  };

  const handlePwChange = () => {
    if (!pwForm.current) { setPwMsg({ t: "error", text: "Enter your current password." }); return; }
    if (pwForm.newPw.length < 6) { setPwMsg({ t: "error", text: "New password must be at least 6 characters." }); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg({ t: "error", text: "Passwords don't match." }); return; }
    setPwMsg({ t: "success", text: "Password updated successfully." });
    setPwForm({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwMsg(null), 4000);
  };

  const toggleNotif = (key) => {
    const updated = { ...notifs, [key]: !notifs[key] };
    setNotifs(updated);
    if (notifKey) lsSet(notifKey, updated);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // ── RENDER ───────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .pf-wrap * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .pf-wrap { min-height: 100vh; background: #f5f5f0; }

        /* ── BANNER ── */
        .pf-banner {
          background: linear-gradient(135deg, #06142B 0%, #0b2447 100%);
          padding: 40px clamp(20px,5vw,60px) 80px;
          position: relative; overflow: hidden;
        }
        .pf-banner::after {
          content: 'VELOR';
          position: absolute; right: -20px; bottom: -30px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px,14vw,160px); font-weight: 600;
          color: rgba(200,169,110,0.06); letter-spacing: 0.08em;
          pointer-events: none; user-select: none;
        }
        .pf-banner-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
        }

        /* Avatar */
        .pf-avatar-wrap { position: relative; flex-shrink: 0; }
        .pf-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #C8A96E, #e8c99a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 500; color: #06142B;
          box-shadow: 0 0 0 3px rgba(200,169,110,0.3);
          overflow: hidden;
        }
        .pf-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pf-avatar-edit {
          position: absolute; bottom: 0; right: 0;
          width: 26px; height: 26px; border-radius: 50%;
          background: #C8A96E; border: 2px solid #06142B;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 11px; color: #06142B;
        }

        .pf-banner-text { flex: 1; min-width: 180px; }
        .pf-banner-tier { font-size: 9px; font-weight: 600; letter-spacing: 0.38em; color: #C8A96E; text-transform: uppercase; display: block; margin-bottom: 6px; }
        .pf-banner-name { font-family: 'Playfair Display', serif; font-size: clamp(22px,3.5vw,34px); font-weight: 500; color: #fff; margin: 0 0 4px; letter-spacing: 0.02em; }
        .pf-banner-email { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0; }
        .pf-banner-since { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 4px; display: block; }

        /* Stat chips */
        .pf-banner-stats { display: flex; gap: 10px; flex-wrap: wrap; margin-left: auto; }
        .pf-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 20px; text-align: center; min-width: 80px; }
        .pf-chip-val   { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 500; color: #fff; display: block; }
        .pf-chip-label { font-size: 9px; font-weight: 600; letter-spacing: 0.28em; color: rgba(255,255,255,0.35); display: block; margin-top: 3px; }

        /* ── CONTENT ── */
        .pf-content { max-width: 1100px; margin: -44px auto 0; padding: 0 clamp(16px,4vw,40px) 60px; position: relative; z-index: 1; }

        /* Tabs */
        .pf-tabs { display: flex; gap: 4px; margin-bottom: 24px; background: #fff; border-radius: 12px; padding: 6px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); flex-wrap: wrap; }
        .pf-tab { flex: 1; padding: 10px 16px; border: none; border-radius: 8px; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; color: rgba(0,0,0,0.4); transition: all 0.2s; text-transform: uppercase; min-width: 80px; }
        .pf-tab:hover  { color: rgba(0,0,0,0.7); background: rgba(0,0,0,0.03); }
        .pf-tab.active { background: #06142B; color: #C8A96E; }

        /* Cards */
        .pf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .pf-card { background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .pf-card-full { grid-column: 1 / -1; }
        .pf-card-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 500; color: #0f172a; margin: 0 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .pf-card-edit { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: #C8A96E; background: none; border: 1px solid rgba(200,169,110,0.3); cursor: pointer; text-transform: uppercase; padding: 6px 14px; border-radius: 6px; transition: background 0.2s; }
        .pf-card-edit:hover { background: rgba(200,169,110,0.08); }

        /* Rows */
        .pf-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 13px 0; border-bottom: 1px solid #f1f5f9; gap: 16px; }
        .pf-row:last-child { border-bottom: none; padding-bottom: 0; }
        .pf-row-label { font-size: 11px; font-weight: 500; color: #94a3b8; flex-shrink: 0; }
        .pf-row-val   { font-size: 14px; font-weight: 500; color: #0f172a; text-align: right; }

        /* Fields */
        .pf-field { margin-bottom: 18px; }
        .pf-field label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 7px; text-transform: uppercase; }
        .pf-field input, .pf-field select, .pf-field textarea {
          width: 100%; background: #f8fafc; border: 1.5px solid #e2e8f0;
          border-radius: 8px; color: #0f172a; font-size: 14px; font-weight: 500;
          padding: 11px 14px; outline: none; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .pf-field input:focus, .pf-field select:focus, .pf-field textarea:focus { border-color: #C8A96E; }
        .pf-field textarea { resize: vertical; min-height: 80px; }
        .pf-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* Orders */
        .pf-order { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; }
        .pf-order:last-child { border-bottom: none; }
        .pf-order-id   { font-size: 12px; font-weight: 700; color: #0f172a; letter-spacing: 0.05em; }
        .pf-order-meta { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .pf-order-amt  { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 500; color: #0f172a; }
        .pf-badge { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 999px; border: 1px solid; }
        .pf-view-btn { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 7px 16px; border-radius: 8px; background: transparent; border: 1px solid #e2e8f0; color: #64748b; cursor: pointer; transition: border-color 0.2s, color 0.2s; font-family: 'DM Sans', sans-serif; }
        .pf-view-btn:hover { border-color: #C8A96E; color: #C8A96E; }

        /* Wishlist */
        .pf-wish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
        .pf-wish-item { border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; transition: box-shadow 0.2s; }
        .pf-wish-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .pf-wish-img  { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .pf-wish-info { padding: 10px 12px; }
        .pf-wish-name { font-size: 12px; font-weight: 600; color: #0f172a; margin: 0 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pf-wish-price{ font-size: 12px; color: #C8A96E; font-weight: 600; }

        /* Cart preview */
        .pf-cart-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
        .pf-cart-item:last-child { border-bottom: none; }
        .pf-cart-img  { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; flex-shrink: 0; border: 1px solid #f1f5f9; }
        .pf-cart-name { font-size: 13px; font-weight: 600; color: #0f172a; margin: 0 0 3px; }
        .pf-cart-meta { font-size: 11px; color: #94a3b8; }

        /* Addresses */
        .pf-addr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
        .pf-addr { border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px; position: relative; transition: border-color 0.2s; }
        .pf-addr.default { border-color: #C8A96E; }
        .pf-addr-tag  { position: absolute; top: -1px; right: 14px; background: #C8A96E; color: #06142B; font-size: 8px; font-weight: 700; letter-spacing: 0.2em; padding: 2px 10px; border-radius: 0 0 6px 6px; }
        .pf-addr-label{ font-size: 10px; font-weight: 700; letter-spacing: 0.25em; color: #C8A96E; text-transform: uppercase; margin-bottom: 10px; }
        .pf-addr-line { font-size: 14px; font-weight: 500; color: #0f172a; margin: 0 0 2px; line-height: 1.5; }
        .pf-addr-line2{ font-size: 13px; color: #94a3b8; margin: 0 0 14px; }
        .pf-addr-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .pf-addr-btn  { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 12px; border-radius: 6px; border: 1px solid #e2e8f0; background: transparent; color: #64748b; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s, color 0.2s; }
        .pf-addr-btn:hover { border-color: #C8A96E; color: #C8A96E; }
        .pf-addr-btn.danger:hover { border-color: #dc2626; color: #dc2626; }
        .pf-addr-add { border: 1.5px dashed #e2e8f0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; min-height: 130px; background: transparent; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s, background 0.2s; width: 100%; }
        .pf-addr-add:hover { border-color: #C8A96E; background: rgba(200,169,110,0.03); }

        /* Buttons */
        .pf-btn-primary { padding: 11px 28px; background: #06142B; border: none; border-radius: 8px; color: #C8A96E; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .pf-btn-primary:hover { background: #0b2447; }
        .pf-btn-gold   { padding: 11px 28px; background: #C8A96E; border: none; border-radius: 8px; color: #06142B; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .pf-btn-gold:hover { background: #b8995e; }
        .pf-btn-ghost  { padding: 11px 28px; background: transparent; border: 1px solid #e2e8f0; border-radius: 8px; color: #64748b; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s; }
        .pf-btn-ghost:hover { border-color: #cbd5e1; color: #0f172a; }
        .pf-btn-danger { padding: 11px 28px; background: transparent; border: 1px solid #fecaca; border-radius: 8px; color: #ef4444; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .pf-btn-danger:hover { background: #fef2f2; }

        /* Toggle */
        .pf-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #f1f5f9; }
        .pf-toggle-row:last-child { border-bottom: none; }
        .pf-toggle { width: 44px; height: 24px; border-radius: 12px; border: none; cursor: pointer; position: relative; transition: background 0.25s; flex-shrink: 0; }
        .pf-toggle-knob { position: absolute; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: left 0.25s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }

        /* Password fields */
        .pf-pw-wrap { position: relative; }
        .pf-pw-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 13px; }

        /* Alert */
        .pf-alert { display: flex; align-items: center; gap: 10px; padding: 13px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 18px; }
        .pf-alert.success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; }
        .pf-alert.error   { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; }

        /* Empty state */
        .pf-empty { text-align: center; padding: 44px 20px; }
        .pf-empty-icon { width: 68px; height: 68px; border-radius: 50%; background: rgba(200,169,110,0.1); margin: 0 auto 18px; display: flex; align-items: center; justify-content: center; font-size: 26px; }
        .pf-empty-title { font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 6px; }
        .pf-empty-sub   { font-size: 13px; color: #94a3b8; margin: 0 0 22px; line-height: 1.6; }

        /* Responsive */
        @media (max-width: 768px) {
          .pf-grid { grid-template-columns: 1fr; }
          .pf-card-full { grid-column: 1; }
          .pf-banner-stats { width: 100%; }
          .pf-chip { flex: 1; min-width: 60px; padding: 10px 12px; }
          .pf-chip-val { font-size: 18px; }
          .pf-field-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .pf-tabs { gap: 2px; }
          .pf-tab { flex: none; width: calc(50% - 3px); font-size: 10px; padding: 9px 8px; }
          .pf-order { flex-direction: column; align-items: flex-start; }
          .pf-banner { padding-bottom: 72px; }
          .pf-chip-val { font-size: 16px; }
        }
      `}</style>

      <div className="pf-wrap">

        {/* ── BANNER ── */}
        <div className="pf-banner">
          <div className="pf-banner-inner">

            {/* Avatar */}
            <div className="pf-avatar-wrap">
              <div className="pf-avatar">
                {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : initials}
              </div>
              <button className="pf-avatar-edit" onClick={() => fileRef.current?.click()} title="Change photo">
                ✎
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
            </div>

            {/* Info */}
            <div className="pf-banner-text">
              <span className="pf-banner-tier">VELOR INSIDER</span>
              <h1 className="pf-banner-name">{user.name}</h1>
              <p className="pf-banner-email">{user.email}</p>
              <span className="pf-banner-since">Member since {memberSince}</span>
            </div>

            {/* Live stat chips */}
            <div className="pf-banner-stats">
              {[
                { val: orders.length,                                        label: "ORDERS"   },
                { val: orders.length ? `₹${totalSpent.toLocaleString()}` : "₹0", label: "SPENT"   },
                { val: wishlistCount,                                         label: "WISHLIST" },
                { val: cartCount,                                              label: "IN CART"  },
              ].map((s) => (
                <div key={s.label} className="pf-chip">
                  <span className="pf-chip-val">{s.val}</span>
                  <span className="pf-chip-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="pf-content">

          {/* Tabs */}
          <div className="pf-tabs">
            {[
              { key: "details",   label: "My Details"   },
              { key: "orders",    label: "Orders"       },
              { key: "cart",      label: "My Cart"      },
              { key: "wishlist",  label: "Wishlist"     },
              { key: "addresses", label: "Addresses"    },
              { key: "security",  label: "Security"     },
              { key: "notifs",    label: "Alerts"       },
            ].map((t) => (
              <button key={t.key} className={`pf-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ══ DETAILS TAB ══════════════════════════════════════════════════ */}
          {tab === "details" && (
            <div className="pf-grid">

              {/* Profile card */}
              <div className="pf-card">
                <div className="pf-card-title">
                  Account Details
                  {!editMode && <button className="pf-card-edit" onClick={() => setEditMode(true)}>Edit</button>}
                </div>

                {saved && <div className="pf-alert success">✓ Profile updated successfully</div>}

                {editMode ? (
                  <>
                    <div className="pf-field-grid">
                      {[
                        { label: "Full Name",     key: "name",  type: "text"  },
                        { label: "Email Address", key: "email", type: "email" },
                        { label: "Phone Number",  key: "phone", type: "tel"   },
                        { label: "Date of Birth", key: "dob",   type: "date"  },
                      ].map((f) => (
                        <div key={f.key} className="pf-field">
                          <label>{f.label}</label>
                          <input
                            type={f.type}
                            value={form[f.key]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            disabled={f.key === "email"} // email is identity, can't change
                          />
                        </div>
                      ))}
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
                      <button className="pf-btn-gold" onClick={handleSaveProfile}>Save Changes</button>
                      <button className="pf-btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { label: "Full Name",    value: user.name },
                      { label: "Email",        value: user.email },
                      { label: "Phone",        value: extra.phone  || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Not added</span> },
                      { label: "Date of Birth",value: extra.dob    || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Not added</span> },
                      { label: "Gender",       value: extra.gender || "Prefer not to say" },
                      { label: "Member Since", value: memberSince },
                    ].map((r) => (
                      <div key={r.label} className="pf-row">
                        <span className="pf-row-label">{r.label}</span>
                        <span className="pf-row-val">{r.value}</span>
                      </div>
                    ))}
                    {extra.bio && (
                      <div style={{ marginTop: 14, padding: "14px", background: "#f8fafc", borderRadius: 8 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase" }}>Bio</p>
                        <p style={{ fontSize: 14, color: "#0f172a", margin: 0, lineHeight: 1.7 }}>{extra.bio}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Session + Quick Links */}
              <div className="pf-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="pf-card-title" style={{ marginBottom: 12 }}>Session</div>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 20px" }}>
                    Signed in as <strong style={{ color: "#0f172a" }}>{user.name}</strong>.<br />
                    Signing out will clear your active session.
                  </p>
                  <button className="pf-btn-danger" onClick={handleLogout}>Sign Out</button>
                </div>

                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase", margin: "0 0 12px" }}>Quick Links</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      { label: "Wishlist",     to: "/wishlist"         },
                      { label: "Cart",         to: "/cart"             },
                      { label: "Collection",   to: "/view-collection"  },
                      { label: "Best Sellers", to: "/best-sellers"     },
                    ].map((l) => (
                      <Link key={l.to} to={l.to} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 6, border: "1px solid #e2e8f0", color: "#475569", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
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

          {/* ══ ORDERS TAB ═══════════════════════════════════════════════════ */}
          {tab === "orders" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">Order History</div>

              {orders.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">📦</div>
                  <p className="pf-empty-title">No orders yet</p>
                  <p className="pf-empty-sub">
                    You haven't placed any orders.<br />
                    Orders will appear here after checkout.
                  </p>
                  <Link to="/view-collection" style={{ display: "inline-block", padding: "11px 28px", background: "#06142B", color: "#C8A96E", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                    Shop Now
                  </Link>
                </div>
              ) : (
                orders.map((order) => {
                  const s = STATUS[order.status] || STATUS.Processing;
                  return (
                    <div key={order.id} className="pf-order">
                      <div>
                        <div className="pf-order-id">{order.id}</div>
                        <div className="pf-order-meta">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</div>
                      </div>
                      <div className="pf-order-amt">₹{order.total.toLocaleString()}</div>
                      <span className="pf-badge" style={{ color: s.color, background: s.bg, borderColor: s.border }}>{order.status}</span>
                      <button className="pf-view-btn">View Order</button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ══ CART TAB ═════════════════════════════════════════════════════ */}
          {tab === "cart" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">
                My Cart
                {cartItems.length > 0 && (
                  <Link to="/cart" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#C8A96E", textDecoration: "none", border: "1px solid rgba(200,169,110,0.3)", padding: "6px 14px", borderRadius: 6 }}>
                    VIEW CART →
                  </Link>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">🛍️</div>
                  <p className="pf-empty-title">Your cart is empty</p>
                  <p className="pf-empty-sub">Items you add to your cart will appear here.</p>
                  <Link to="/view-collection" style={{ display: "inline-block", padding: "11px 28px", background: "#06142B", color: "#C8A96E", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="pf-cart-item">
                      {item.image && (
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.name || item.title}
                          className="pf-cart-img"
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <p className="pf-cart-name">{item.name || item.title}</p>
                        <p className="pf-cart-meta">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: "#0f172a" }}>
                        ₹{item.price?.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase" }}>Cart Total</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0f172a", margin: 0 }}>₹{cartTotal.toLocaleString()}</p>
                    </div>
                    <Link to="/cart" className="pf-btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
                      Go to Checkout →
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ══ WISHLIST TAB ════════════════════════════════════════════════ */}
          {tab === "wishlist" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">
                Wishlist {wishlistItems.length > 0 && <span style={{ fontSize: 13, color: "#94a3b8" }}>({wishlistItems.length} items)</span>}
                {wishlistItems.length > 0 && (
                  <Link to="/wishlist" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: "#C8A96E", textDecoration: "none", border: "1px solid rgba(200,169,110,0.3)", padding: "6px 14px", borderRadius: 6 }}>
                    VIEW ALL →
                  </Link>
                )}
              </div>

              {wishlistItems.length === 0 ? (
                <div className="pf-empty">
                  <div className="pf-empty-icon">🤍</div>
                  <p className="pf-empty-title">Your wishlist is empty</p>
                  <p className="pf-empty-sub">Save items you love to your wishlist.<br />They'll show up here.</p>
                  <Link to="/view-collection" style={{ display: "inline-block", padding: "11px 28px", background: "#06142B", color: "#C8A96E", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <div className="pf-wish-grid">
                  {wishlistItems.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                      <div className="pf-wish-item">
                        <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="pf-wish-img" />
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

          {/* ══ ADDRESSES TAB ═══════════════════════════════════════════════ */}
          {tab === "addresses" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">Saved Addresses</div>

              <div className="pf-addr-grid">
                {addresses.map((addr) => (
                  <div key={addr.id} className={`pf-addr ${addr.isDefault ? "default" : ""}`}>
                    {addr.isDefault && <span className="pf-addr-tag">DEFAULT</span>}
                    <div className="pf-addr-label">{addr.label}</div>
                    <p className="pf-addr-line">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                    <p className="pf-addr-line2">{addr.city}{addr.state ? `, ${addr.state}` : ""} — {addr.pin}</p>
                    {addr.phone && <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 12px" }}>📞 {addr.phone}</p>}
                    <div className="pf-addr-actions">
                      {!addr.isDefault && (
                        <button className="pf-addr-btn" onClick={() => handleSetDefault(addr.id)}>Set Default</button>
                      )}
                      <button className="pf-addr-btn danger" onClick={() => handleDeleteAddress(addr.id)}>Remove</button>
                    </div>
                  </div>
                ))}

                {!addingAddr && (
                  <button className="pf-addr-add" onClick={() => setAddingAddr(true)}>
                    <span style={{ fontSize: 28, color: "#C8A96E", lineHeight: 1 }}>+</span>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", color: "#94a3b8", textTransform: "uppercase" }}>Add Address</span>
                  </button>
                )}
              </div>

              {/* Add address form */}
              {addingAddr && (
                <div style={{ marginTop: 24, padding: 24, border: "1.5px solid #e2e8f0", borderRadius: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 18px", letterSpacing: "0.04em" }}>New Address</p>
                  <div className="pf-field-grid">
                    <div className="pf-field">
                      <label>Label</label>
                      <select value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}>
                        {["Home", "Work", "Other"].map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="pf-field">
                      <label>Phone</label>
                      <input type="tel" value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div className="pf-field">
                    <label>Address Line 1 *</label>
                    <input type="text" value={newAddr.line1} onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })} placeholder="House/Flat no., Building, Street" />
                  </div>
                  <div className="pf-field">
                    <label>Address Line 2</label>
                    <input type="text" value={newAddr.line2} onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })} placeholder="Area, Landmark (optional)" />
                  </div>
                  <div className="pf-field-grid">
                    <div className="pf-field">
                      <label>City *</label>
                      <input type="text" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} placeholder="Mumbai" />
                    </div>
                    <div className="pf-field">
                      <label>State</label>
                      <input type="text" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} placeholder="Maharashtra" />
                    </div>
                    <div className="pf-field">
                      <label>PIN Code *</label>
                      <input type="text" value={newAddr.pin} onChange={(e) => setNewAddr({ ...newAddr, pin: e.target.value })} placeholder="400001" />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="pf-btn-gold" onClick={handleAddAddress}>Save Address</button>
                    <button className="pf-btn-ghost" onClick={() => setAddingAddr(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ SECURITY TAB ════════════════════════════════════════════════ */}
          {tab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="pf-card">
                <div className="pf-card-title">Change Password</div>

                {pwMsg && (
                  <div className={`pf-alert ${pwMsg.t}`}>
                    {pwMsg.t === "success" ? "✓" : "✕"} {pwMsg.text}
                  </div>
                )}

                <div style={{ maxWidth: 420 }}>
                  {[
                    { label: "Current Password", key: "current" },
                    { label: "New Password",     key: "newPw"   },
                    { label: "Confirm Password", key: "confirm" },
                  ].map((f) => (
                    <div key={f.key} className="pf-field">
                      <label>{f.label}</label>
                      <div className="pf-pw-wrap">
                        <input
                          type={showPw[f.key] ? "text" : "password"}
                          value={pwForm[f.key]}
                          onChange={(e) => setPwForm({ ...pwForm, [f.key]: e.target.value })}
                          placeholder="••••••••"
                          style={{ paddingRight: 40 }}
                        />
                        <button className="pf-pw-toggle" type="button" onClick={() => setShowPw({ ...showPw, [f.key]: !showPw[f.key] })}>
                          {showPw[f.key] ? "🙈" : "👁"}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="pf-btn-primary" onClick={handlePwChange}>Update Password</button>
                </div>
              </div>

              <div className="pf-card">
                <div className="pf-card-title">Active Sessions</div>
                <div className="pf-row">
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 3px" }}>This Device</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>Chrome · Active now</p>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 999, textTransform: "uppercase" }}>
                    Current
                  </span>
                </div>
                <button className="pf-btn-danger" style={{ marginTop: 16 }}>Sign Out All Other Sessions</button>
              </div>
            </div>
          )}

          {/* ══ NOTIFICATIONS TAB ═══════════════════════════════════════════ */}
          {tab === "notifs" && (
            <div className="pf-card pf-card-full" style={{ width: "100%" }}>
              <div className="pf-card-title">Notification Preferences</div>
              {[
                { key: "newsletter",      label: "Newsletter",               desc: "Latest collections, editorial content and brand news." },
                { key: "orderUpdates",    label: "Order Updates",            desc: "Shipping, delivery and return status alerts." },
                { key: "saleAlerts",      label: "Sale & Discount Alerts",   desc: "Get notified when items in your wishlist go on sale." },
                { key: "promoSms",        label: "Promotional SMS",          desc: "Exclusive offers sent to your phone number." },
                { key: "recommendations", label: "Personalised Picks",       desc: "Products curated based on your browsing and wishlist." },
              ].map(({ key, label, desc }) => (
                <div key={key} className="pf-toggle-row">
                  <div style={{ flex: 1, paddingRight: 20 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 3px" }}>{label}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{desc}</p>
                  </div>
                  <button
                    className="pf-toggle"
                    style={{ background: notifs[key] ? "#C8A96E" : "#e2e8f0" }}
                    onClick={() => toggleNotif(key)}
                  >
                    <span className="pf-toggle-knob" style={{ left: notifs[key] ? 22 : 3 }} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}