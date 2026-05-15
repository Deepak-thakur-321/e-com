import { useState, useEffect } from "react";

const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  // Inject Google Font via <link> tag (safe — no @import inside <style>)
  useEffect(() => {
    const id = "velor-loader-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id   = id;
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Progress ticker
  useEffect(() => {
    let current = 0;
    const tick = setInterval(() => {
      // Uneven increments feel organic
      const step = current < 70
        ? Math.random() * 12 + 5
        : Math.random() * 5 + 1;
      current = Math.min(current + step, 100);
      setProgress(Math.floor(current));

      if (current >= 100) {
        clearInterval(tick);
        // Start exit after a beat
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setGone(true);
            onComplete?.();
          }, 900);
        }, 300);
      }
    }, 110);

    return () => clearInterval(tick);
  }, [onComplete]);

  if (gone) return null;

  const letters = ["V", "E", "L", "O", "R"];

  return (
    <div style={{
      position:        "fixed",
      inset:           0,
      zIndex:          9999,
      background:      "#06142B",
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
      justifyContent:  "center",
      overflow:        "hidden",
      opacity:         exiting ? 0 : 1,
      transition:      exiting ? "opacity 0.9s cubic-bezier(0.76,0,0.24,1)" : "none",
      pointerEvents:   exiting ? "none" : "all",
    }}>

      {/* Keyframe injection — no @import, just animation definitions */}
      <style>{`
        @keyframes vl-drop {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes vl-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        @keyframes vl-fadein {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes vl-glow-pulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%     { opacity:1;   transform:scale(1.12); }
        }
        @keyframes vl-line-expand {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
      `}</style>

      {/* Radial gold glow */}
      <div style={{
        position:     "absolute",
        width:        "min(560px, 80vw)",
        height:       "min(560px, 80vw)",
        borderRadius: "50%",
        background:   "radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 68%)",
        animation:    "vl-glow-pulse 2.8s ease-in-out infinite",
        pointerEvents:"none",
      }} />

      {/* Top horizontal line */}
      <div style={{
        position:        "absolute",
        top:             "clamp(80px, 20vh, 140px)",
        left:            "50%",
        transform:       "translateX(-50%)",
        transformOrigin: "center",
        width:           "clamp(120px, 32vw, 320px)",
        height:          "1px",
        background:      "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)",
        animation:       "vl-line-expand 1s ease 0.4s both",
      }} />

      {/* Bottom horizontal line */}
      <div style={{
        position:        "absolute",
        bottom:          "clamp(80px, 20vh, 140px)",
        left:            "50%",
        transform:       "translateX(-50%)",
        transformOrigin: "center",
        width:           "clamp(120px, 32vw, 320px)",
        height:          "1px",
        background:      "linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent)",
        animation:       "vl-line-expand 1s ease 0.6s both",
      }} />

      {/* Corner TL */}
      <div style={{ position:"absolute", top:"clamp(20px,4vw,40px)", left:"clamp(20px,4vw,40px)", width:22, height:22, borderTop:"1px solid rgba(200,169,110,0.3)", borderLeft:"1px solid rgba(200,169,110,0.3)", animation:"vl-fadein 0.6s ease 0.5s both" }} />
      {/* Corner TR */}
      <div style={{ position:"absolute", top:"clamp(20px,4vw,40px)", right:"clamp(20px,4vw,40px)", width:22, height:22, borderTop:"1px solid rgba(200,169,110,0.3)", borderRight:"1px solid rgba(200,169,110,0.3)", animation:"vl-fadein 0.6s ease 0.5s both" }} />
      {/* Corner BL */}
      <div style={{ position:"absolute", bottom:"clamp(20px,4vw,40px)", left:"clamp(20px,4vw,40px)", width:22, height:22, borderBottom:"1px solid rgba(200,169,110,0.3)", borderLeft:"1px solid rgba(200,169,110,0.3)", animation:"vl-fadein 0.6s ease 0.5s both" }} />
      {/* Corner BR */}
      <div style={{ position:"absolute", bottom:"clamp(20px,4vw,40px)", right:"clamp(20px,4vw,40px)", width:22, height:22, borderBottom:"1px solid rgba(200,169,110,0.3)", borderRight:"1px solid rgba(200,169,110,0.3)", animation:"vl-fadein 0.6s ease 0.5s both" }} />

      {/* ── CENTER CONTENT ── */}
      <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", zIndex:1 }}>

        {/* VELOR letters */}
        <div style={{ display:"flex", alignItems:"baseline", gap:"clamp(3px,1vw,12px)", marginBottom:18 }}>
          {letters.map((letter, i) => (
            <span key={letter} style={{
              fontFamily:     "'Cormorant Garamond', Georgia, serif",
              fontSize:       "clamp(54px, 11vw, 100px)",
              fontWeight:     300,
              color:          "#fff",
              letterSpacing:  "0.04em",
              lineHeight:     1,
              display:        "inline-block",
              opacity:        0,
              animation:      `vl-drop 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 85}ms forwards`,
              position:       "relative",
            }}>
              {letter}
              {/* Gold shimmer overlay on each letter */}
              <span aria-hidden="true" style={{
                position:           "absolute",
                inset:              0,
                fontFamily:         "inherit",
                fontSize:           "inherit",
                fontWeight:         "inherit",
                lineHeight:         "inherit",
                background:         "linear-gradient(105deg, transparent 25%, rgba(200,169,110,0.95) 50%, transparent 75%)",
                WebkitBackgroundClip: "text",
                backgroundClip:     "text",
                WebkitTextFillColor:"transparent",
                backgroundSize:     "250% 100%",
                animation:          `vl-shimmer 2.2s ease ${1.2 + i * 0.05}s infinite`,
              }}>
                {letter}
              </span>
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily:    "'DM Sans', sans-serif",
          fontSize:      "clamp(9px, 1.1vw, 11px)",
          fontWeight:    300,
          letterSpacing: "0.44em",
          color:         "rgba(255,255,255,0.32)",
          textTransform: "uppercase",
          margin:        "0 0 44px",
          animation:     "vl-fadein 0.7s ease 0.85s both",
        }}>
          Curated for the discerning few
        </p>

        {/* Progress track */}
        <div style={{
          width:      "clamp(160px, 26vw, 260px)",
          height:     1,
          background: "rgba(255,255,255,0.08)",
          position:   "relative",
          overflow:   "hidden",
          animation:  "vl-fadein 0.5s ease 0.7s both",
        }}>
          <div style={{
            position:   "absolute",
            left:       0, top: 0, bottom: 0,
            width:      `${progress}%`,
            background: "linear-gradient(90deg, #C8A96E, #F4D03F 55%, #C8A96E)",
            backgroundSize: "200% 100%",
            animation:  "vl-shimmer 1.6s linear infinite",
            boxShadow:  "0 0 10px rgba(200,169,110,0.5)",
            transition: "width 0.1s linear",
          }} />
        </div>

        {/* Percent counter */}
        <span style={{
          fontFamily:     "'DM Sans', sans-serif",
          fontSize:       11,
          fontWeight:     300,
          letterSpacing:  "0.2em",
          color:          "rgba(200,169,110,0.65)",
          marginTop:      14,
          fontVariantNumeric: "tabular-nums",
          animation:      "vl-fadein 0.5s ease 0.8s both",
          minWidth:       "3ch",
          textAlign:      "center",
        }}>
          {progress}
        </span>
      </div>

      {/* Season label — bottom */}
      <span style={{
        position:      "absolute",
        bottom:        "clamp(20px, 4vw, 44px)",
        fontFamily:    "'DM Sans', sans-serif",
        fontSize:      9,
        fontWeight:    300,
        letterSpacing: "0.4em",
        color:         "rgba(255,255,255,0.16)",
        textTransform: "uppercase",
        animation:     "vl-fadein 0.6s ease 1s both",
      }}>
        Fall / Winter 2024 — New Collection
      </span>

    </div>
  );
};

export default PageLoader;