import { useState } from "react";
import { useNavigate } from "react-router-dom";
// ── If you use Redux auth: import { useSelector, useDispatch } from "react-redux";
// ── If you use Context auth: import { useAuth } from "../../context/AuthContext";

// ─── Replace this with your actual user from Redux / AuthContext ───────────────
const mockUser = {
   name: "Arjun Sharma",
   email: "arjun.sharma@email.com",
   phone: "+91 98765 43210",
   memberSince: "January 2024",
   orders: [
      { id: "VLR-8821", date: "12 Nov 2024", status: "Delivered", items: 2, total: 8490 },
      { id: "VLR-7103", date: "28 Oct 2024", status: "In Transit", items: 1, total: 4299 },
      { id: "VLR-5542", date: "05 Sep 2024", status: "Delivered", items: 3, total: 13800 },
   ],
   addresses: [
      { id: 1, label: "Home", line1: "42, Safdarjung Enclave", line2: "New Delhi — 110029", isDefault: true },
      { id: 2, label: "Office", line1: "B-12, Sector 62, Noida", line2: "Uttar Pradesh — 201301", isDefault: false },
   ],
};
// ──────────────────────────────────────────────────────────────────────────────

const C = {
   navy: "#0b1120",
   navy2: "#131c2e",
   navy3: "#1a2540",
   gold: "#c9a070",
   text: "#e8e4dc",
   muted: "#7a8499",
   border: "rgba(201,160,112,0.15)",
   borderW: "rgba(255,255,255,0.07)",
};

const statusStyle = {
   Delivered: { color: "#6fcf9a", border: "1px solid rgba(111,207,154,0.3)", background: "rgba(111,207,154,0.08)" },
   "In Transit": { color: C.gold, border: `1px solid ${C.border}`, background: "rgba(201,160,112,0.08)" },
   Processing: { color: "#7eb8f7", border: "1px solid rgba(126,184,247,0.3)", background: "rgba(126,184,247,0.08)" },
   Cancelled: { color: "#f77e7e", border: "1px solid rgba(247,126,126,0.3)", background: "rgba(247,126,126,0.08)" },
};

const Profile = () => {
   const user = mockUser; // swap with useSelector or useAuth()
   const navigate = useNavigate();
   const [tab, setTab] = useState("orders");
   const [editMode, setEditMode] = useState(false);
   const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone });

   const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase();

   const handleLogout = () => {
      // dispatch(logout()) — your action here
      navigate("/");
   };

   const handleSave = () => {
      // dispatch(updateProfile(form)) — your action here
      setEditMode(false);
   };

   return (
      <div style={{ minHeight: "100vh", background: C.navy, color: C.text, fontFamily: "'Montserrat', sans-serif" }}>

         {/* ── HERO ── */}
         <div style={{
            background: `linear-gradient(150deg, ${C.navy2} 0%, ${C.navy} 100%)`,
            borderBottom: `1px solid ${C.border}`,
            padding: "60px 60px 40px",
         }}>
            <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>

               {/* Avatar */}
               <div style={{
                  width: 80, height: 80,
                  border: `1px solid ${C.gold}`,
                  background: C.navy3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
               }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "26px", fontWeight: 300, color: C.gold, letterSpacing: "0.1em" }}>
                     {initials}
                  </span>
               </div>

               {/* Name / Email */}
               <div style={{ flex: 1, minWidth: "200px" }}>
                  <span style={{
                     display: "inline-block", fontSize: "9px", fontWeight: 600, letterSpacing: "0.32em",
                     color: C.gold, background: "rgba(201,160,112,0.1)", border: `1px solid ${C.border}`,
                     padding: "3px 12px", marginBottom: "10px",
                  }}>
                     VELOR INSIDER
                  </span>
                  <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 300, letterSpacing: "0.08em", margin: "0 0 6px", color: C.text }}>
                     {user.name}
                  </h1>
                  <p style={{ fontSize: "12px", fontWeight: 300, color: C.muted, margin: 0, letterSpacing: "0.04em" }}>
                     {user.email} · Member since {user.memberSince}
                  </p>
               </div>

               {/* Stats */}
               <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
                  {[
                     { val: user.orders.length, label: "ORDERS" },
                     { val: `₹${user.orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, label: "SPENT" },
                     { val: user.addresses.length, label: "ADDRESSES" },
                  ].map((s, i, arr) => (
                     <div key={s.label} style={{ display: "flex", gap: "28px", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                           <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 300, color: C.text }}>{s.val}</div>
                           <div style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.28em", color: C.muted }}>{s.label}</div>
                        </div>
                        {i < arr.length - 1 && <div style={{ width: "1px", height: "32px", background: C.border }} />}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ── TABS ── */}
         <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 60px 80px" }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${C.borderW}`, marginBottom: "44px" }}>
               {["orders", "details", "addresses"].map((t) => (
                  <button key={t} onClick={() => setTab(t)} style={{
                     background: "transparent", border: "none",
                     borderBottom: tab === t ? `2px solid ${C.gold}` : "2px solid transparent",
                     color: tab === t ? C.gold : C.muted,
                     fontFamily: "'Montserrat', sans-serif",
                     fontSize: "10px", fontWeight: 500, letterSpacing: "0.28em",
                     padding: "18px 24px", cursor: "pointer",
                     position: "relative", bottom: "-1px",
                     transition: "color 0.2s",
                  }}>
                     {t === "orders" ? "ORDER HISTORY" : t === "details" ? "MY DETAILS" : "ADDRESSES"}
                  </button>
               ))}
            </div>

            {/* ── ORDER HISTORY ── */}
            {tab === "orders" && (
               <div>
                  {user.orders.map((order) => (
                     <div key={order.id} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        flexWrap: "wrap", gap: "12px",
                        padding: "20px 0",
                        borderBottom: `1px solid ${C.borderW}`,
                     }}>
                        <div>
                           <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", color: C.text, marginBottom: "4px" }}>
                              {order.id}
                           </div>
                           <div style={{ fontSize: "11px", fontWeight: 300, color: C.muted }}>
                              {order.date} · {order.items} item{order.items > 1 ? "s" : ""}
                           </div>
                        </div>
                        <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 300, color: C.text }}>
                           ₹{order.total.toLocaleString()}
                        </div>
                        <span style={{
                           fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em",
                           padding: "5px 12px",
                           ...(statusStyle[order.status] || statusStyle["Processing"]),
                        }}>
                           {order.status}
                        </span>
                        <button style={{
                           background: "transparent", border: `1px solid ${C.border}`,
                           color: C.muted, fontFamily: "'Montserrat', sans-serif",
                           fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em",
                           padding: "7px 16px", cursor: "pointer",
                        }}>
                           VIEW
                        </button>
                     </div>
                  ))}
               </div>
            )}

            {/* ── MY DETAILS ── */}
            {tab === "details" && (
               <div style={{ maxWidth: "500px" }}>
                  {editMode ? (
                     <div>
                        {[
                           { label: "FULL NAME", key: "name", type: "text" },
                           { label: "EMAIL ADDRESS", key: "email", type: "email" },
                           { label: "PHONE NUMBER", key: "phone", type: "tel" },
                        ].map((field) => (
                           <div key={field.key} style={{ marginBottom: "28px" }}>
                              <label style={{ display: "block", fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", color: C.muted, marginBottom: "10px" }}>
                                 {field.label}
                              </label>
                              <input
                                 type={field.type}
                                 value={form[field.key]}
                                 onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                 style={{
                                    width: "100%", background: C.navy2,
                                    border: "none", borderBottom: `1px solid ${C.gold}`,
                                    color: C.text, fontFamily: "Georgia, serif",
                                    fontSize: "17px", fontWeight: 400, padding: "10px 4px",
                                    outline: "none", boxSizing: "border-box",
                                 }}
                              />
                           </div>
                        ))}
                        <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
                           <button onClick={handleSave} style={{ padding: "13px 34px", background: C.gold, border: "none", color: C.navy, fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", cursor: "pointer" }}>
                              SAVE CHANGES
                           </button>
                           <button onClick={() => setEditMode(false)} style={{ padding: "13px 34px", background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em", cursor: "pointer" }}>
                              CANCEL
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div>
                        {[
                           { label: "FULL NAME", value: form.name },
                           { label: "EMAIL ADDRESS", value: form.email },
                           { label: "PHONE NUMBER", value: form.phone },
                           { label: "MEMBER SINCE", value: user.memberSince },
                        ].map((row) => (
                           <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: `1px solid ${C.borderW}`, gap: "16px" }}>
                              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", color: C.muted, flexShrink: 0 }}>{row.label}</span>
                              <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 400, color: C.text, textAlign: "right" }}>{row.value}</span>
                           </div>
                        ))}
                        <div style={{ display: "flex", gap: "14px", marginTop: "36px", flexWrap: "wrap" }}>
                           <button onClick={() => setEditMode(true)} style={{ padding: "13px 34px", background: C.gold, border: "none", color: C.navy, fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", cursor: "pointer" }}>
                              EDIT DETAILS
                           </button>
                           <button onClick={handleLogout} style={{ padding: "13px 34px", background: "transparent", border: "1px solid rgba(247,126,126,0.3)", color: "#f77e7e", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.25em", cursor: "pointer" }}>
                              SIGN OUT
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* ── ADDRESSES ── */}
            {tab === "addresses" && (
               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "20px" }}>
                  {user.addresses.map((addr) => (
                     <div key={addr.id} style={{
                        border: addr.isDefault ? `1px solid ${C.border}` : `1px solid ${C.borderW}`,
                        padding: "28px", position: "relative",
                     }}>
                        {addr.isDefault && (
                           <span style={{
                              position: "absolute", top: "-1px", right: "20px",
                              background: C.gold, color: C.navy,
                              fontSize: "8px", fontWeight: 600, letterSpacing: "0.2em", padding: "3px 10px",
                           }}>DEFAULT</span>
                        )}
                        <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.3em", color: C.gold, marginBottom: "12px" }}>{addr.label.toUpperCase()}</div>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 300, color: C.text, margin: "0 0 4px", lineHeight: 1.6 }}>{addr.line1}</p>
                        <p style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 300, color: C.muted, margin: "0 0 20px" }}>{addr.line2}</p>
                        <div style={{ display: "flex", gap: "10px" }}>
                           {["EDIT", !addr.isDefault && "SET DEFAULT"].filter(Boolean).map((label) => (
                              <button key={label} style={{
                                 background: "transparent", border: `1px solid ${C.border}`,
                                 color: C.muted, fontFamily: "'Montserrat', sans-serif",
                                 fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em", padding: "7px 14px", cursor: "pointer",
                              }}>{label}</button>
                           ))}
                        </div>
                     </div>
                  ))}

                  {/* Add new */}
                  <button style={{
                     border: `1px dashed rgba(201,160,112,0.25)`, background: "transparent",
                     display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                     gap: "10px", cursor: "pointer", minHeight: "160px",
                     color: C.muted,
                  }}>
                     <span style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 300, color: C.gold }}>+</span>
                     <span style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.28em" }}>ADD NEW ADDRESS</span>
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Profile;