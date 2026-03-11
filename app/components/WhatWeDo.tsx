"use client";
import React, { useEffect, useRef, useState } from "react";
import scrollToId from "../scrollTo";

const C = {
  blue:   "#00aaff",
  yellow: "#ffe234",
  white:  "#ffffff",
  muted:  "rgba(220,235,255,0.65)",
  border: "rgba(0,170,255,0.15)",
  bg:     "#080c18",
  card:   "rgba(6,10,22,0.92)",
};

const SERVICES = [
  { num: "01", title: "Last-Mile Delivery",    body: "The final leg handled with care. We get packages to their destination quickly, safely, and on schedule — every time.", accent: C.yellow },
  { num: "02", title: "Parcel Distribution",   body: "High-volume B2B and B2C parcel movement for businesses of all sizes. Organised, tracked, dependable.", accent: C.blue },
  { num: "03", title: "Contract Courier",      body: "Long-term delivery partnerships with logistics companies and courier networks. We embed into your operation.", accent: C.yellow },
  { num: "04", title: "Scheduled Routes",      body: "Daily or weekly pickup and delivery schedules tailored to your workflow. Consistent, predictable, reliable.", accent: C.blue },
  { num: "05", title: "Surge Capacity",        body: "Need extra drivers during peak periods? We scale fast with trained drivers and additional vehicles ready to deploy.", accent: C.yellow },
  { num: "06", title: "Logistics Support",     body: "Beyond driving — route planning, reporting, and operational guidance to help you manage high delivery volumes.", accent: C.blue },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
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

function useTablet() {
  const [t, setT] = useState(false);
  useEffect(() => {
    const check = () => setT(window.innerWidth >= 768 && window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return t;
}

export default function WhatWeDo() {
  const { ref, v } = useInView();
  const mob = useMobile();
  const tab = useTablet();
  const [hovered, setHovered] = useState<number | null>(null);

  const cols = mob ? "1fr" : tab ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes wdUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .wd-up{ animation: wdUp 0.65s ease both }
        .d0{animation-delay:0ms}   .d1{animation-delay:100ms} .d2{animation-delay:190ms}
        .d3{animation-delay:270ms} .d4{animation-delay:350ms} .d5{animation-delay:420ms}
        .d6{animation-delay:490ms} .d7{animation-delay:560ms} .d8{animation-delay:620ms}
      `}</style>

      <section id="services" ref={ref} style={{ background: C.bg, fontFamily: "'DM Sans',sans-serif", padding: mob ? "3.5rem 1.2rem" : "clamp(4rem,9vw,7rem) clamp(2rem,7vw,5rem)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* Header */}
          <div className={v ? "wd-up d0" : "opacity-0"} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1.5, background: `linear-gradient(90deg,${C.yellow},${C.blue})` }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.blue }}>What We Do</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: mob ? "2rem" : "3.5rem", gap: 16 }}>
            <h2
              className={v ? "wd-up d1" : "opacity-0"}
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mob ? "2.2rem" : "clamp(2.4rem,5vw,4rem)", lineHeight: 1, letterSpacing: "0.05em", color: C.white, margin: 0 }}
            >
              Services built for<br />
              <span style={{ color: C.yellow }}>businesses that move.</span>
            </h2>
            {!mob && (
              <div className={v ? "wd-up d2" : "opacity-0"} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(4rem,7vw,6.5rem)", color: "rgba(0,170,255,0.06)", lineHeight: 1, userSelect: "none", flexShrink: 0 }}>
                06
              </div>
            )}
          </div>

          {/* Services grid */}
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: 2 }}>
            {SERVICES.map(({ num, title, body, accent }, i) => {
              const isH = hovered === i;
              return (
                <div
                  key={num}
                  className={v ? `wd-up d${i + 2}` : "opacity-0"}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: mob ? "24px 20px" : "30px 26px",
                    background: isH ? "rgba(0,170,255,0.06)" : C.card,
                    border: `1px solid ${isH ? "rgba(0,170,255,0.28)" : C.border}`,
                    borderTop: `2px solid ${isH ? accent : "transparent"}`,
                    transition: "all 0.25s ease",
                    position: "relative", overflow: "hidden", cursor: "default",
                  }}
                >
                  {/* Watermark */}
                  <div style={{ position: "absolute", bottom: -8, right: 14, fontFamily: "'Bebas Neue',sans-serif", fontSize: "4.5rem", color: isH ? `${accent}12` : "rgba(255,255,255,0.025)", lineHeight: 1, userSelect: "none", transition: "color 0.25s", pointerEvents: "none" }}>
                    {num}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: accent, marginBottom: 14, opacity: 0.85 }}>{num}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", letterSpacing: "0.08em", color: C.white, marginBottom: 12, lineHeight: 1 }}>{title}</div>
                  <div style={{ width: isH ? 44 : 22, height: 1.5, background: `linear-gradient(90deg,${accent},transparent)`, marginBottom: 14, transition: "width 0.3s ease" }} />
                  <p style={{ fontSize: "0.84rem", fontWeight: 300, lineHeight: 1.72, color: C.muted, margin: 0 }}>{body}</p>
                </div>
              );
            })}
          </div>

          {/* CTA strip */}
          <div
            className={v ? "wd-up d8" : "opacity-0"}
            style={{
              marginTop: 2, padding: mob ? "22px 20px" : "26px 32px",
              background: "rgba(255,226,52,0.04)", border: `1px solid rgba(255,226,52,0.14)`,
              display: "flex", alignItems: mob ? "flex-start" : "center",
              justifyContent: "space-between", flexDirection: mob ? "column" : "row",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.2rem", letterSpacing: "0.08em", color: C.white, marginBottom: 4 }}>Need something specific?</div>
              <p style={{ fontSize: "0.84rem", fontWeight: 300, color: C.muted, margin: 0 }}>We build custom delivery arrangements around your business — not the other way around.</p>
            </div>
            <button
              style={{
                padding: "12px 28px", flexShrink: 0, fontFamily: "'DM Sans',sans-serif",
                fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase",
                color: C.bg, background: C.yellow, border: "none", cursor: "pointer", outline: "none",
                boxShadow: "0 0 20px rgba(255,226,52,0.32)", transition: "all 0.22s ease",
                width: mob ? "100%" : "auto",
              }}
              onClick={() => scrollToId('contact')}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 0 32px rgba(255,226,52,0.52)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.boxShadow = "0 0 20px rgba(255,226,52,0.32)"; }}
            >
              Let&apos;s Talk
            </button>
          </div>

        </div>
      </section>
    </>
  );
}