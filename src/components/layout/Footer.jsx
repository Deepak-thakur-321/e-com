import React, { useState } from "react";
import {
   FaInstagram,
   FaTwitter,
   FaPinterestP,
   FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = {
   bg:          "#101828",
   bgElevated:  "#101828",
   border:      "rgba(255,255,255,0.07)",
   borderMid:   "rgba(255,255,255,0.12)",
   text:        "#F5F0E8",
   textMuted:   "rgba(245,240,232,0.42)",
   textDim:     "rgba(245,240,232,0.22)",
   accent:      "#C8A96E",
   accentHover: "#E2C895",
};

const FOOTER_COLS = [
   {
      heading: "Shop",
      links: [
         { label: "New Collection", to: "/view-collection" },
         { label: "Best Sellers",   to: "/best-sellers"    },
         { label: "Sale",           to: "/sale"            },
         { label: "Lookbook",       to: "/lookbook"        },
         { label: "All Categories", to: "/categories"      },
      ],
   },
   {
      heading: "Support",
      links: [
         { label: "Help Center",        to: "/help"      },
         { label: "Shipping & Delivery",to: "/shipping"  },
         { label: "Returns & Exchanges",to: "/returns"   },
         { label: "Payment Options",    to: "/payment"   },
         { label: "FAQ",                to: "/faq"       },
      ],
   },
   {
      heading: "Company",
      links: [
         { label: "About VELOR", to: "/about"         },
         { label: "Careers",     to: "/careers"       },
         { label: "Press",       to: "/press"         },
         { label: "Sustainability", to: "/sustainability" },
         { label: "Contact",     to: "/contact"       },
      ],
   },
];

const SOCIALS = [
   { icon: <FaInstagram size={15} />, href: "#", label: "Instagram" },
   { icon: <FaTwitter   size={15} />, href: "#", label: "Twitter"   },
   { icon: <FaPinterestP size={15}/>, href: "#", label: "Pinterest" },
   { icon: <FaYoutube   size={15} />, href: "#", label: "YouTube"   },
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

   const linkStyle = {
      color: B.textMuted, textDecoration: "none",
      fontSize: 14, letterSpacing: "0.03em",
      transition: "color .2s",
      display: "block", lineHeight: 1,
   };

   return (
      <>
         <style>{`
            @media (max-width: 768px) {
               .velor-footer-grid    { grid-template-columns: 1fr 1fr !important; }
               .velor-footer-hero    { flex-direction: column !important; align-items: flex-start !important; gap: 28px !important; }
               .velor-footer-bottom  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
               .velor-bottom-links   { flex-wrap: wrap !important; gap: 12px !important; }
            }
            @media (max-width: 480px) {
               .velor-footer-grid    { grid-template-columns: 1fr !important; }
               .velor-brand-name     { font-size: clamp(52px, 16vw, 88px) !important; }
            }
            .velor-footer-link:hover { color: ${B.text} !important; }
            .velor-social-btn:hover  { border-color: ${B.accent} !important; color: ${B.accent} !important; }
            .velor-sub-btn:hover     { background: ${B.accentHover} !important; }
            .velor-newsletter-input::placeholder { color: ${B.textDim}; }
         `}</style>

         <footer style={{
            background: B.bg,
            borderTop: `1px solid ${B.border}`,
            fontFamily: "'DM Sans', sans-serif",
            marginTop: "40px",
         }}>

            {/* ── HERO ROW ─────────────────────────────────────────────────── */}
            <div style={{ borderBottom: `1px solid ${B.border}`, padding: "64px 40px 60px" }}>
               <div
                  className="velor-footer-hero"
                  style={{
                     maxWidth: 1440, margin: "0 auto",
                     display: "flex", alignItems: "flex-end",
                     justifyContent: "space-between", gap: 32,
                  }}
               >
                  {/* Brand name + tagline */}
                  <div>
                     <span
                        className="velor-brand-name"
                        style={{
                           fontFamily: "'Arial', serif",
                           fontSize: "clamp(52px, .5vw, 100px)",
                           fontWeight: 700, color: B.text,
                           letterSpacing: "-0.02em",
                           display: "block", lineHeight: 0.95,
                        }}
                     >
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
                  <div style={{ display: "flex", gap: 10 }}>
                     {SOCIALS.map(({ icon, href, label }) => (
                        <a
                           key={label}
                           href={href}
                           aria-label={label}
                           className="velor-social-btn"
                           style={{
                              width: 44, height: 44,
                              border: `1px solid ${B.border}`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: B.textMuted, textDecoration: "none",
                              borderRadius: 2,
                              transition: "border-color .2s, color .2s",
                           }}
                        >
                           {icon}
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            {/* ── MAIN GRID ────────────────────────────────────────────────── */}
            <div style={{ borderBottom: `1px solid ${B.border}`, padding: "56px 40px" }}>
               <div
                  className="velor-footer-grid"
                  style={{
                     maxWidth: 1440, margin: "0 auto",
                     display: "grid",
                     gridTemplateColumns: "repeat(4, 1fr)",
                     gap: "40px 32px",
                  }}
               >
                  {/* Link columns */}
                  {FOOTER_COLS.map(({ heading, links }) => (
                     <div key={heading}>
                        <p style={{
                           fontSize: 10, letterSpacing: "0.22em",
                           textTransform: "uppercase", color: B.accent,
                           marginBottom: 24, fontWeight: 500,
                        }}>
                           {heading}
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                           {links.map(({ label, to }) => (
                              <li key={label}>
                                 <Link
                                    to={to}
                                    className="velor-footer-link"
                                    style={linkStyle}
                                 >
                                    {label}
                                 </Link>
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
                        marginBottom: 24, fontWeight: 500,
                     }}>
                        Newsletter
                     </p>
                     <p style={{
                        color: B.textMuted, fontSize: 14,
                        lineHeight: 1.75, marginBottom: 20,
                        letterSpacing: "0.01em",
                     }}>
                        First access to drops, exclusive offers, and editorial content.
                     </p>

                     {subscribed ? (
                        <div style={{
                           display: "flex", alignItems: "center", gap: 10,
                           padding: "14px 18px",
                           border: `1px solid ${B.accent}`,
                           borderRadius: 2,
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
                              className="velor-newsletter-input"
                              style={{
                                 background: "rgba(255,255,255,0.04)",
                                 border: `1px solid ${inputFocus ? B.accent : B.border}`,
                                 borderRadius: 2,
                                 padding: "13px 16px",
                                 color: B.text, fontSize: 13,
                                 fontFamily: "'DM Sans', sans-serif",
                                 outline: "none", letterSpacing: "0.04em",
                                 width: "100%", boxSizing: "border-box",
                                 transition: "border-color .2s",
                              }}
                           />
                           <button
                              onClick={handleSubscribe}
                              className="velor-sub-btn"
                              style={{
                                 background: B.accent,
                                 color: B.bg,
                                 border: "none", borderRadius: 2,
                                 padding: "13px 20px",
                                 fontSize: 10, letterSpacing: "0.2em",
                                 textTransform: "uppercase",
                                 fontWeight: 600,
                                 fontFamily: "'DM Sans', sans-serif",
                                 cursor: "pointer",
                                 transition: "background .2s",
                                 width: "100%",
                              }}
                           >
                              Subscribe
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* ── BOTTOM BAR ───────────────────────────────────────────────── */}
            <div style={{ padding: "22px 40px" }}>
               <div
                  className="velor-footer-bottom"
                  style={{
                     maxWidth: 1440, margin: "0 auto",
                     display: "flex", alignItems: "center",
                     justifyContent: "space-between", gap: 16,
                  }}
               >
                  <p style={{ color: B.textMuted, fontSize: 12, letterSpacing: "0.07em", margin: 0 }}>
                     © {new Date().getFullYear()} VELOR. All rights reserved.
                  </p>

                  <div className="velor-bottom-links" style={{ display: "flex", gap: 28 }}>
                     {BOTTOM_LINKS.map((item) => (
                        <a
                           key={item} href="#"
                           className="velor-footer-link"
                           style={{ ...linkStyle, fontSize: 12, letterSpacing: "0.06em" }}
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