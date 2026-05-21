// Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXED:
//   • VELOR brand name font-size was `clamp(52px, .5vw, 100px)` → fixed
//   • Font changed from Arial to Playfair Display for brand name
//   • Links cleaned — only routes that EXIST in the project
//   • Removed: /lookbook, /help, /shipping, /returns, /payment, /faq,
//              /about, /careers, /press, /sustainability, /contact
//   • Added: /gallery (new page we just created)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const B = {
  bg:          "#101828",
  bgElevated:  "#0F0F0F",
  border:      "rgba(255,255,255,0.07)",
  borderMid:   "rgba(255,255,255,0.12)",
  text:        "#F5F0E8",
  textMuted:   "rgba(245,240,232,0.42)",
  textDim:     "rgba(245,240,232,0.22)",
  accent:      "#C8A96E",
  accentHover: "#E2C895",
};

// ── Only routes that actually exist in this codebase ─────────────────────────
const FOOTER_COLS = [
  {
    heading: "Shop",
    links: [
      { label: "New Collection", to: "/view-collection" },
      { label: "Best Sellers",   to: "/best-sellers"    },
      { label: "Sale",           to: "/sale"            },
      { label: "Categories",     to: "/categories"      },
      { label: "Gallery",        to: "/gallery"         },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My Profile",     to: "/profile"         },
      { label: "My Wishlist",    to: "/wishlist"        },
      { label: "My Cart",        to: "/cart"            },
      { label: "Sign In",        to: "/login"           },
      { label: "Register",       to: "/register"        },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "FAQ",                to: "#faq"         },
      { label: "Shipping & Delivery",to: "#shipping"    },
      { label: "Returns Policy",     to: "#returns"     },
      { label: "Size Guide",         to: "#size-guide"  },
      { label: "Contact Us",         to: "#contact"     },
    ],
  },
];

const SOCIALS = [
  { icon: <FaInstagram  size={15} />, href: "#", label: "Instagram" },
  { icon: <FaTwitter    size={15} />, href: "#", label: "Twitter"   },
  { icon: <FaPinterestP size={15} />, href: "#", label: "Pinterest" },
  { icon: <FaYoutube    size={15} />, href: "#", label: "YouTube"   },
];

const BOTTOM_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const handleSubscribe = () => {
    if (email.trim().includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .vf-link:hover         { color: ${B.text} !important; }
        .vf-social:hover       { border-color: ${B.accent} !important; color: ${B.accent} !important; }
        .vf-sub-btn:hover      { background: ${B.accentHover} !important; }
        .vf-input::placeholder { color: ${B.textDim}; }

        @media (max-width: 768px) {
          .vf-grid   { grid-template-columns: 1fr 1fr !important; }
          .vf-hero   { flex-direction: column !important; align-items: flex-start !important; gap: 28px !important; }
          .vf-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .vf-bottom-links { flex-wrap: wrap !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .vf-grid      { grid-template-columns: 1fr !important; }
          .vf-brand-name { font-size: clamp(48px, 15vw, 80px) !important; }
          .vf-hero-pad  { padding: 40px 20px !important; }
          .vf-grid-pad  { padding: 40px 20px !important; }
          .vf-bottom-pad{ padding: 20px 20px !important; }
        }
      `}</style>

      <footer style={{
        background: B.bg,
        borderTop: `1px solid ${B.border}`,
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── HERO ROW ───────────────────────────────────────────────────── */}
        <div className="vf-hero-pad" style={{ borderBottom: `1px solid ${B.border}`, padding: "60px 40px 16px" }}>
          <div className="vf-hero" style={{
            maxWidth: 1440, margin: "0 auto",
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: 32,
          }}>
            {/* Brand */}
            <div>
              <span className="vf-brand-name" style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(52px, 7.5vw, 10px)", /* ← FIXED from .5vw */
                fontWeight: 500, color: B.text,
                letterSpacing: "-0.02em",
                display: "block", lineHeight: 0.95,
              }}>
                VELOR
              </span>
              <p style={{
                color: B.textMuted, fontSize: 11,
                letterSpacing: "0.22em", marginTop: 18,
                textTransform: "uppercase", fontWeight: 400,
              }}>
                Curated for the discerning few
              </p>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label} href={href} aria-label={label}
                  className="vf-social"
                  style={{
                    width: 44, height: 44,
                    border: `1px solid ${B.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: B.textMuted, textDecoration: "none", borderRadius: 2,
                    transition: "border-color .2s, color .2s",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ──────────────────────────────────────────────────── */}
        <div className="vf-grid-pad" style={{ borderBottom: `1px solid ${B.border}`, padding: "52px 40px" }}>
          <div className="vf-grid" style={{
            maxWidth: 1440, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px 32px",
          }}>

            {/* Link columns */}
            {FOOTER_COLS.map(({ heading, links }) => (
              <div key={heading}>
                <p style={{
                  fontSize: 10, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: B.accent,
                  marginBottom: 22, fontWeight: 600,
                }}>
                  {heading}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      {to.startsWith("#") ? (
                        <a href={to} className="vf-link"
                          style={{ color: B.textMuted, textDecoration: "none", fontSize: 14, letterSpacing: "0.03em", transition: "color .2s", display: "block" }}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link to={to} className="vf-link"
                          style={{ color: B.textMuted, textDecoration: "none", fontSize: 14, letterSpacing: "0.03em", transition: "color .2s", display: "block" }}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div>
              <p style={{
                fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", color: B.accent,
                marginBottom: 22, fontWeight: 600,
              }}>
                Newsletter
              </p>
              <p style={{
                color: B.textMuted, fontSize: 13,
                lineHeight: 1.75, marginBottom: 20, letterSpacing: "0.01em",
              }}>
                First access to drops, exclusive offers, and editorial content.
              </p>

              {subscribed ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 18px",
                  border: `1px solid ${B.accent}`, borderRadius: 2,
                }}>
                  <span style={{ color: B.accent, fontSize: 14 }}>✓</span>
                  <span style={{ color: B.accent, fontSize: 13, letterSpacing: "0.06em" }}>
                    You're on the list.
                  </span>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="Your email address"
                    className="vf-input"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${inputFocus ? B.accent : B.border}`,
                      borderRadius: 2, padding: "13px 16px",
                      color: B.text, fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none", letterSpacing: "0.04em",
                      width: "100%", boxSizing: "border-box",
                      transition: "border-color .2s",
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    className="vf-sub-btn"
                    style={{
                      background: B.accent, color: B.bg,
                      border: "none", borderRadius: 2,
                      padding: "13px 20px",
                      fontSize: 10, letterSpacing: "0.2em",
                      textTransform: "uppercase", fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer", transition: "background .2s", width: "100%",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────────────────────── */}
        <div className="vf-bottom-pad" style={{ padding: "22px 40px" }}>
          <div className="vf-bottom" style={{
            maxWidth: 1440, margin: "0 auto",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 16,
          }}>
            <p style={{ color: B.textMuted, fontSize: 12, letterSpacing: "0.07em", margin: 0 }}>
              © {new Date().getFullYear()} VELOR. All rights reserved.
            </p>
            <div className="vf-bottom-links" style={{ display: "flex", gap: 28 }}>
              {BOTTOM_LINKS.map((item) => (
                <a key={item} href="#"
                  className="vf-link"
                  style={{ color: B.textMuted, textDecoration: "none", fontSize: 12, letterSpacing: "0.06em", transition: "color .2s" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}