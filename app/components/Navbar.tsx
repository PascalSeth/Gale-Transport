"use client";
import React, { useState, useEffect, useRef } from "react";
import CONTACT from "../contactInfo";

const S = {
  bg:          "#06080f",
  bgScroll:    "linear-gradient(180deg, #080c18 0%, rgba(8,12,24,0.97) 100%)",
  blue:        "#00aaff",
  blueSoft:    "rgba(0,170,255,0.08)",
  blueGlow:    "rgba(0,170,255,0.25)",
  yellow:      "#ffe234",
  yellowGlow:  "rgba(255,226,52,0.3)",
  white:       "#ffffff",
  muted:       "rgba(232,240,255,0.4)",
  border:      "rgba(0,170,255,0.12)",
  dark:        "#06080f",
};

function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeLink, setActiveLink]   = useState("Home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!navRef.current) return;
      const r = navRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    navRef.current?.addEventListener("mousemove", onMove);
    return () => navRef.current?.removeEventListener("mousemove", onMove);
  }, []);

  const links = ["Home", "Services", "About", "Contact"];
  const sectionIds: Record<string, string> = {
    Home: "hero",
    Services: "services",
    About: "about",
    Contact: "contact",
  };

  const scrollToSection = (link: string) => {
    if (typeof window === "undefined") return;
    const id = sectionIds[link] || "hero";
    const el = document.getElementById(id);
    if (!el) return;
    const navH = navRef.current?.offsetHeight ?? 60;
    const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes gtePulse {
          0%,100% { box-shadow: 0 0 6px 1px #00aaff, 0 0 12px 2px rgba(0,170,255,0.25); }
          50%      { box-shadow: 0 0 10px 2px #00aaff, 0 0 24px 4px rgba(0,170,255,0.25); }
        }
        @keyframes gteStrip {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gteScan {
          0%,100% { transform: translateY(-100%); opacity: 0; }
          10%,90% { opacity: 0.4; }
          50%     { transform: translateY(36px); opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        .gte-pulse { animation: gtePulse 2s infinite; }
        .gte-strip { animation: gteStrip 3s linear infinite; background-size: 200% 100% !important; }
        .gte-scan  { animation: gteScan 4s linear infinite; }
        .gte-bebas { font-family: 'Bebas Neue', sans-serif !important; }
        .gte-dm    { font-family: 'DM Sans', sans-serif !important; }
      `}</style>

      {/* NAV */}
      <nav
        ref={navRef}
        className="gte-dm"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          overflow: "hidden",
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s, box-shadow 0.5s",
          background: scrolled ? S.bgScroll : "transparent",
          borderBottom: `1px solid ${scrolled ? S.border : "transparent"}`,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? `0 0 60px rgba(0,170,255,0.08)` : "none",
        }}
      >
        {/* Mouse glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,170,255,0.08), transparent 55%),
            radial-gradient(200px circle at ${mousePos.x - 40}px ${mousePos.y + 20}px, rgba(255,226,52,0.07), transparent 50%)
          `,
        }} />

        {/* Scanline */}
        {scrolled && (
          <div className="gte-scan" style={{
            position: "absolute", left: 0, right: 0, height: 1, pointerEvents: "none",
            background: `linear-gradient(90deg, transparent, ${S.blue}, ${S.yellow}, transparent)`,
          }} />
        )}

        {/* LOGO */}
        <div onClick={() => { setActiveLink("Home"); scrollToSection("Home"); }} style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }}>
          <div>
            <img
              src="/logoR.png"
              alt="Gale Transport"
              style={{ width: 40, height: 40, filter: "drop-shadow(0 0 8px rgba(0,170,255,0.6))" }}
            />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none",
              background: "radial-gradient(circle, rgba(0,170,255,0.25) 0%, transparent 70%)",
            }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span className="gte-bebas" style={{
              fontSize: 12, letterSpacing: "0.14em", color: S.white,
              textShadow: "0 0 20px rgba(0,170,255,0.3)",
            }}>
              GALE <span style={{ color: S.yellow, textShadow: "0 0 16px rgba(255,226,52,0.4)" }}>T</span>RANSPORT Express
            </span>
            <span className="gte-dm" style={{
              fontSize: 8, fontWeight: 300, letterSpacing: "0.4em",
              color: S.muted, textTransform: "uppercase", marginTop: 3,
            }}>
              Courier Services
            </span>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <ul style={{
          position: "relative", zIndex: 10, display: "none", alignItems: "center",
          gap: 0, listStyle: "none", margin: 0, padding: 0,
        }} className="md:!flex">
          {links.map((link) => {
            const isActive  = activeLink === link;
            const isHovered = hoveredLink === link;
            const showLine  = isActive || isHovered;
            return (
              <li key={link}>
                <button
                  onClick={() => { setActiveLink(link); scrollToSection(link); }}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="gte-dm"
                  style={{
                    position: "relative",
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    cursor: "pointer",
                    padding: "8px 14px",
                    fontSize: 10,
                    fontWeight: 400,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    transition: "color 0.2s, text-shadow 0.2s",
                    color: isActive ? S.yellow : isHovered ? S.white : S.muted,
                    textShadow: isActive
                      ? "0 0 12px rgba(255,226,52,0.5)"
                      : isHovered
                      ? "0 0 10px rgba(0,170,255,0.5)"
                      : "none",
                  }}
                >
                  {link}
                  {/* Underline */}
                  <span style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    width: "calc(100% - 28px)",
                    height: 1,
                    transformOrigin: "center",
                    transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), background 0.3s, box-shadow 0.3s",
                    transform: `translateX(-50%) scaleX(${showLine ? 1 : 0})`,
                    background: isActive
                      ? `linear-gradient(90deg, ${S.blue}, ${S.yellow})`
                      : S.blue,
                    boxShadow: isActive ? `0 0 8px ${S.blue}` : "none",
                  }} />
                </button>
              </li>
            );
          })}
        </ul>

          {/* DESKTOP CTA */}
          <div style={{ position: "relative", zIndex: 10, display: "none", alignItems: "center", gap: 16 }} className="md:!flex">
          {/* Pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            borderRadius: 999, padding: "5px 12px 5px 8px",
            background: "rgba(0,170,255,0.06)",
            border: `1px solid ${S.border}`,
            fontSize: 9, letterSpacing: "0.14em",
            color: S.muted, textTransform: "uppercase",
          }}>
            <span className="gte-pulse" style={{
              display: "block", width: 6, height: 6,
              borderRadius: "50%", background: S.blue, flexShrink: 0,
            }} />
            Accepting partners
          </div>

          {/* CTA Button */}
          <CTAButton label="Get a Quote" onClick={() => scrollToSection('Contact')} />
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            position: "relative", zIndex: 50,
            display: "flex", flexDirection: "column", gap: 5,
            border: "none", background: "transparent",
            padding: 8, outline: "none", cursor: "pointer",
          }}
          className="md:!hidden"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block",
              height: 1.5,
              width: i === 1 ? (menuOpen ? 0 : 18) : 28,
              background: `linear-gradient(90deg, ${S.blue}, ${S.yellow})`,
              boxShadow: `0 0 6px rgba(0,170,255,0.4)`,
              opacity: menuOpen && i === 1 ? 0 : 1,
              transform: menuOpen
                ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                : "none"
                : "none",
              transition: "all 0.3s ease",
            }} />
          ))}
        </button>

        {/* Bottom strip */}
        <div className="gte-strip" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${S.blue}, ${S.yellow}, ${S.blue}, transparent)`,
          boxShadow: `0 0 8px rgba(0,170,255,0.3)`,
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.5s",
        }} />
      </nav>

      {/* MOBILE MENU */}
      <div
        className="gte-dm"
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          display: "flex", flexDirection: "column", justifyContent: "center",
          overflow: "hidden",
          padding: "6rem 2.5rem 3rem",
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(0,170,255,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(255,226,52,0.05) 0%, transparent 50%),
            ${S.bg}
          `,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: "55vw", height: "55vw", borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(0,170,255,0.09), transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: "40vw", height: "40vw", borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,226,52,0.06), transparent 65%)",
        }} />

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
          {links.map((link, i) => {
            const isActive = activeLink === link;
            return (
              <li key={link} style={{ borderBottom: `1px solid ${S.border}`, overflow: "hidden" }}>
                <button
                  onClick={() => { setActiveLink(link); setMenuOpen(false); scrollToSection(link); }}
                  className="gte-dm"
                  style={{
                    display: "flex", width: "100%", alignItems: "center", gap: 16,
                    border: "none", background: "transparent", padding: "20px 0",
                    textAlign: "left", outline: "none", cursor: "pointer",
                    transition: "color 0.3s",
                    color: isActive ? S.yellow : S.muted,
                    textShadow: isActive ? "0 0 20px rgba(255,226,52,0.3)" : "none",
                  }}
                >
                  <span className="gte-dm" style={{
                    fontSize: 10, letterSpacing: "0.2em", color: S.blue,
                    alignSelf: "flex-end", marginBottom: 10, fontWeight: 300, opacity: 0.7,
                  }}>
                    0{i + 1}
                  </span>
                  <span className="gte-bebas" style={{
                    fontSize: "clamp(2.4rem, 9vw, 4.2rem)",
                    letterSpacing: "0.06em", lineHeight: 1,
                  }}>
                    {link}
                  </span>
                  {isActive && (
                    <span style={{
                      marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                      flexShrink: 0, background: S.yellow,
                      boxShadow: `0 0 10px ${S.yellow}`,
                    }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
          <CTAButton label="Get a Quote" onClick={() => { setMenuOpen(false); scrollToSection('Contact'); }} />
          <div className="gte-dm" style={{
            fontSize: 9, letterSpacing: "0.1em",
            color: S.muted, textTransform: "uppercase",
            textAlign: "right", lineHeight: 2,
          }}>
            <div style={{ color: S.blue }}>{CONTACT.email}</div>
            <div>{CONTACT.phone}</div>
          </div>
        </div>
      </div>
    </>
  );
}

function CTAButton({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="gte-dm"
      style={{
        border: "none", outline: "none", cursor: "pointer",
        padding: "11px 26px",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: S.dark,
        background: hovered ? S.white : `linear-gradient(135deg, ${S.yellow} 0%, #ffd000 100%)`,
        clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
        boxShadow: hovered
          ? "0 0 30px rgba(0,170,255,0.3), 0 4px 20px rgba(0,0,0,0.4)"
          : `0 0 20px ${S.yellowGlow}`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
    >
      {label}
    </button>
  );
}

export default Navbar;