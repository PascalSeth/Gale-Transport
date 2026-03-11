"use client";
import React, { useEffect, useRef, useState } from "react";
import CONTACT from "../contactInfo";

/* ── TOKENS ─────────────────────────────────────────── */
const C = {
  blue:   "#00aaff",
  yellow: "#ffe234",
  white:  "#ffffff",
  muted:  "rgba(220,235,255,0.65)",
  border: "rgba(0,170,255,0.15)",
  bg:     "#06080f",
  card:   "rgba(8,14,28,0.88)",
};

const IMG = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80";

const VALUES = [
  { icon: "⚡", title: "Speed",       body: "Every route is optimised for the shortest delivery window. We move fast — always." },
  { icon: "🎯", title: "Reliability", body: "Our 98% on-time rate isn't a target. It's the standard we hold ourselves to every day." },
  { icon: "🤝", title: "Partnership", body: "We treat your brand at the doorstep as our own. Professional, accountable, consistent." },
];

/* ── HOOKS ──────────────────────────────────────────── */
function useInView(threshold = 0.14) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, v };
}

function useMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

/* ── COMPONENT ──────────────────────────────────────── */
export default function AboutUs() {
  const { ref, v } = useInView();
  const mob = useMobile();

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes auUp  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:none} }
        @keyframes auL   { from{opacity:0;transform:translateX(-26px)} to{opacity:1;transform:none} }
        @keyframes auR   { from{opacity:0;transform:translateX(26px)} to{opacity:1;transform:none} }
        .au-up{ animation: auUp 0.7s ease both } .au-l{ animation: auL 0.75s ease both } .au-r{ animation: auR 0.75s ease both }
        .d0{animation-delay:0ms} .d1{animation-delay:120ms} .d2{animation-delay:240ms}
        .d3{animation-delay:340ms} .d4{animation-delay:440ms} .d5{animation-delay:520ms} .d6{animation-delay:600ms}
      `}</style>

      <section id="about" ref={ref} style={{ background: C.bg, fontFamily: "'DM Sans',sans-serif", padding: mob ? "3.5rem 1.2rem" : "clamp(4rem,9vw,7rem) clamp(2rem,7vw,5rem)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* ── Label ── */}
          <div className={v ? "au-up d0" : "opacity-0"} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <div style={{ width: 32, height: 1.5, background: `linear-gradient(90deg,${C.yellow},${C.blue})` }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.blue }}>Who We Are</span>
          </div>

          {/* ── Split: text | image ── */}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? "2.5rem" : "clamp(2rem,5vw,5rem)", alignItems: "center", marginBottom: mob ? "2.5rem" : "clamp(3rem,6vw,5rem)" }}>

            {/* TEXT */}
            <div>
              <h2
                className={v ? "au-l d1" : "opacity-0"}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mob ? "2.2rem" : "clamp(2.4rem,5vw,4rem)", lineHeight: 1.02, letterSpacing: "0.05em", color: C.white, margin: "0 0 20px" }}
              >
                Built on the ground,<br />
                <span style={{ color: C.yellow }}>driven by trust.</span>
              </h2>

              <p className={v ? "au-up d2" : "opacity-0"} style={{ fontSize: mob ? "0.9rem" : "clamp(0.88rem,1.2vw,1rem)", fontWeight: 300, lineHeight: 1.8, color: C.muted, marginBottom: 16 }}>
                Gale Transport Express was founded with one purpose — to give businesses a courier partner they can actually rely on. Too many companies struggled with missed windows, unprofessional handoffs, and zero accountability. We built GTE to fix that.
              </p>
              <p className={v ? "au-up d3" : "opacity-0"} style={{ fontSize: mob ? "0.9rem" : "clamp(0.88rem,1.2vw,1rem)", fontWeight: 300, lineHeight: 1.8, color: C.muted, marginBottom: 28 }}>
                Our experienced drivers operate across the {CONTACT.regionLabel}, handling everything from daily scheduled routes to surge support. We don&apos;t just deliver parcels — we protect your brand at every doorstep.
              </p>

              {/* Mission quote */}
              <div className={v ? "au-up d4" : "opacity-0"} style={{ padding: "18px 20px", background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, backdropFilter: "blur(12px)" }}>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 400, lineHeight: 1.72, color: "rgba(220,235,255,0.88)", fontStyle: "italic" }}>
                  &quot;Our mission is to help businesses streamline their delivery operations by providing flexible courier solutions tailored to their needs.&quot;
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div className={v ? (mob ? "au-up d2" : "au-r d1") : "opacity-0"} style={{ position: "relative" }}>
              <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,15,0.35)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,rgba(0,170,255,0.10) 0%,transparent 50%)" }} />
              </div>

              {/* Floating badge */}
              <div style={{
                position: "absolute",
                bottom: mob ? -16 : -20, left: mob ? 12 : -20,
                padding: "14px 18px", background: C.card,
                backdropFilter: "blur(16px)", border: `1px solid ${C.border}`,
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mob ? "1.8rem" : "2.4rem", letterSpacing: "0.06em", color: C.yellow, lineHeight: 1 }}>100%</span>
                <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted }}>Committed</span>
              </div>

              {/* Corner accent */}
              {!mob && <div style={{ position: "absolute", top: -8, right: -8, width: 36, height: 36, borderTop: `2px solid ${C.blue}`, borderRight: `2px solid ${C.blue}`, opacity: 0.5 }} />}
            </div>
          </div>

          {/* ── Values cards ── */}
          <div className={v ? "au-up d5" : "opacity-0"} style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: 2, marginTop: mob ? "2.5rem" : 0 }}>
            {VALUES.map(({ icon, title, body }, i) => (
              <div key={title} style={{
                padding: mob ? "22px 20px" : "28px 24px",
                background: i === 1 ? "rgba(0,170,255,0.05)" : C.card,
                border: `1px solid ${C.border}`,
                borderTop: i === 1 ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: "1.3rem", marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem", letterSpacing: "0.1em", color: C.white, marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: "0.84rem", fontWeight: 300, lineHeight: 1.72, color: C.muted, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}