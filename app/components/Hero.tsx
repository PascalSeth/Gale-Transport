"use client";
import React, { useEffect, useState, useRef } from "react";
import CONTACT from "../contactInfo";
import scrollToId from "../scrollTo";

const IMG = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=80";

const STATS = [
  { value: "5000", unit: "+", label: "Deliveries", sub: "per month",     fill: 0.82, accent: "#ffe234" },
  { value: "98",   unit: "%", label: "On-Time",    sub: "guaranteed",     fill: 0.98, accent: "#00aaff" },
  { value: "12",   unit: "+", label: "Partners",   sub: "active network", fill: 0.55, accent: "#3ddc84" },
  { value: "24",   unit: "/7",label: "Operations", sub: "zero downtime",  fill: 1.0,  accent: "#ff6b35" },
];

const TAGS = ["Last-Mile Delivery", "Parcel Distribution", "Contract Logistics"];

function Counter({ target, ready, delay }: { target: number; ready: boolean; delay: number }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const dur = 1100;
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target));
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [ready, target, delay]);
  return <>{val.toLocaleString()}</>;
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [fillBars, setFillBars] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 60);
    const t2 = setTimeout(() => setFillBars(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const a = (cls: string) => ready ? cls : "opacity-0";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      <style>{`
        .hbb  { font-family: 'Bebas Neue', sans-serif; }
        .hdm  { font-family: 'DM Sans', sans-serif; }
        .hmono{ font-family: 'JetBrains Mono', monospace; }

        @keyframes hIn   { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:none } }
        @keyframes hLeft { from { opacity:0; transform:translateX(-22px) } to { opacity:1; transform:none } }
        @keyframes hLine { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        @keyframes hPan  { from { transform:scale(1.07) translateX(0) } to { transform:scale(1.07) translateX(-14px) } }
        @keyframes hBlink{ 0%,100%{ opacity:1 } 50%{ opacity:0.3 } }
        @keyframes hGlow { 0%,100%{ box-shadow:0 0 7px #00aaff } 50%{ box-shadow:0 0 18px #00aaff, 0 0 30px rgba(0,170,255,0.3) } }
        @keyframes scanline { from { top:-30% } to { top:130% } }

        .ha-in   { animation: hIn   0.65s ease both; }
        .ha-left { animation: hLeft 0.75s cubic-bezier(0.23,1,0.32,1) both; }
        .ha-line { animation: hLine 0.6s ease both; transform-origin: left; }
        .ha-pan  { animation: hPan  18s ease-in-out infinite alternate; }
        .ha-blink{ animation: hBlink 2s ease-in-out infinite; }
        .ha-glow { animation: hGlow 2s infinite; }

        .d1{animation-delay:80ms}.d2{animation-delay:180ms}.d3{animation-delay:300ms}
        .d4{animation-delay:420ms}.d5{animation-delay:540ms}.d6{animation-delay:660ms}
        .d7{animation-delay:800ms}.d8{animation-delay:920ms}

        .hero-root { background: #06080f; padding-top: 72px; }
        .hero-mobile  { display: block; }
        .hero-desktop { display: none; }
        .hero-img-mobile { position:relative; width:100%; aspect-ratio:16/7; min-height:190px; overflow:hidden; }
        .hero-text-mobile { padding: 24px 20px 40px; }

        @media (min-width: 1024px) {
          .hero-mobile  { display: none; }
          .hero-desktop { display: block; }
        }

        /* ── Stats ── */
        .stats-bar {
          position: relative;
          background: #07090f;
          border-top: 1px solid rgba(0,170,255,0.12);
          overflow: hidden;
        }
        .stats-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 30%;
          background: linear-gradient(to bottom, transparent, rgba(0,170,255,0.03) 50%, transparent);
          animation: scanline 5s linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        .stats-header {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 8px;
          padding: 9px 20px 8px;
          border-bottom: 1px solid rgba(0,170,255,0.07);
        }
        .stats-header-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.52rem; text-transform: uppercase;
          letter-spacing: 0.22em; color: rgba(0,170,255,0.38);
        }
        .stats-header-sep { flex:1; height:1px; background: linear-gradient(90deg, rgba(0,170,255,0.10), transparent); }
        .stats-ts {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.5rem; color: rgba(183,210,255,0.15); letter-spacing: 0.08em;
        }
        .stats-inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: repeat(2,1fr);
        }
        @media (min-width: 768px) { .stats-inner { grid-template-columns: repeat(4,1fr); } }

        .stat-item {
          display: flex; flex-direction: column; gap: 4px;
          padding: 16px 20px 14px;
          border-right: 1px solid rgba(0,170,255,0.07);
          border-bottom: 1px solid rgba(0,170,255,0.07);
          transition: background 0.2s ease;
          cursor: default;
        }
        .stat-item:hover { background: rgba(0,170,255,0.035); }
        .stat-item:nth-child(2n)   { border-right: none; }
        .stat-item:nth-last-child(-n+2) { border-bottom: none; }
        @media (min-width: 768px) {
          .stat-item { border-right: 1px solid rgba(0,170,255,0.07); border-bottom: none; }
          .stat-item:last-child { border-right: none; }
        }

        .stat-num-row { display:flex; align-items:baseline; gap:1px; }

        .stat-number {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600; font-size: 1rem; line-height: 1;
          color: #dce8ff; letter-spacing: -0.02em;
        }
        .stat-unit {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 400; font-size: 0.6rem;
          align-self: flex-end; margin-bottom: 1px;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 0.58rem;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: rgba(183,210,255,0.4); margin-top: 1px;
        }
        .stat-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.5rem; color: rgba(183,210,255,0.18);
          letter-spacing: 0.03em;
        }
        .stat-bar-track {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.05);
          margin-top: 7px; overflow: hidden;
        }
        .stat-bar-fill {
          height: 100%;
          transform: scaleX(0); transform-origin: left;
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
          opacity: 0.5;
        }
        .stat-bar-fill.on { transform: scaleX(1); }
      `}</style>

      <div id="hero" className="hero-root hdm">

        {/* MOBILE */}
        <div className="hero-mobile">
          <div className="hero-img-mobile">
            <div className="ha-pan" style={{position:"absolute",inset:0,backgroundImage:`url(${IMG})`,backgroundSize:"cover",backgroundPosition:"center"}} />
            <div style={{position:"absolute",inset:0,background:"rgba(6,8,15,0.5)"}} />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,rgba(0,170,255,0.10) 0%,transparent 50%)"}} />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 40%,#06080f 100%)"}} />
            <div className={`hbb ${a("ha-in d6")}`} style={{position:"absolute",top:14,right:14,zIndex:20,display:"flex",flexDirection:"column",gap:4,border:"1px solid rgba(0,170,255,0.22)",background:"rgba(6,8,15,0.85)",padding:"10px 12px",backdropFilter:"blur(16px)"}}>
              <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.24em",color:"#00aaff"}}>Live Operations</span>
              <span className="hbb" style={{fontSize:18,lineHeight:1,letterSpacing:"0.06em",color:"#fff"}}>GTE NETWORK</span>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                <span className="ha-blink" style={{width:6,height:6,borderRadius:"50%",background:"#3ddc84",boxShadow:"0 0 8px #3ddc84",flexShrink:0}} />
                <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(183,210,255,0.5)"}}>{`Active · ${CONTACT.regionLabel}`}</span>
              </div>
            </div>
            <div className={a("ha-in d7")} style={{position:"absolute",bottom:14,left:14,zIndex:20,display:"flex",flexDirection:"column",gap:6}}>
              {TAGS.map((tag,i)=>(
                <div key={tag} style={{display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(6,8,15,0.65)",padding:"5px 10px",backdropFilter:"blur(8px)"}}>
                  <span style={{width:4,height:4,borderRadius:"50%",background:i===0?"#ffe234":"#00aaff",flexShrink:0}} />
                  <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.18em",color:"rgba(183,210,255,0.7)"}}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-text-mobile">
            <div className={a("ha-in d1")} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span className="ha-glow" style={{width:6,height:6,borderRadius:"50%",background:"#00aaff",flexShrink:0}} />
              <span className="hdm" style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.26em",color:"#00aaff"}}>Now Accepting Partners</span>
            </div>
            <div className={`ha-line ${a("ha-line d2")}`} style={{height:2,width:40,marginBottom:12,background:"linear-gradient(90deg,#ffe234,#00aaff)"}} />
            <h1 className={`hbb ${a("ha-left d3")}`} style={{fontSize:"clamp(2.8rem,12vw,4rem)",lineHeight:1,letterSpacing:"0.04em",color:"#fff",marginBottom:12,marginTop:0}}>
              Fast.<br/>Reliable.<br/>
              <span style={{color:"#ffe234",textShadow:"0 0 24px rgba(255,226,52,0.4)"}}>On Time.</span>
            </h1>
            <p className={`hdm ${a("ha-in d4")}`} style={{fontSize:13,fontWeight:300,lineHeight:1.7,color:"rgba(183,210,255,0.6)",marginBottom:24,maxWidth:"38ch"}}>
              Last-mile delivery & parcel logistics for businesses that demand dependability. We move your packages — you grow your business.
            </p>
              <div className={a("ha-in d5")} style={{display:"flex",flexWrap:"wrap",gap:10}}>
              <button onClick={() => scrollToId('contact')} className="hdm" style={{border:"none",cursor:"pointer",background:"#ffe234",padding:"11px 28px",fontSize:10,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.14em",color:"#06080f",boxShadow:"0 0 22px rgba(255,226,52,0.38)",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)"}}>Get a Quote</button>
              <button className="hdm" style={{border:"1px solid rgba(255,255,255,0.2)",cursor:"pointer",background:"rgba(255,255,255,0.05)",padding:"11px 24px",fontSize:10,fontWeight:300,textTransform:"uppercase",letterSpacing:"0.14em",color:"#fff",backdropFilter:"blur(8px)"}}>Our Services</button>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hero-desktop">
          <section style={{position:"relative",display:"flex",overflow:"hidden",height:"clamp(440px,56vh,600px)"}}>
            <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",justifyContent:"flex-end",flexShrink:0,width:"clamp(320px,48%,580px)",background:"#06080f",padding:"56px 64px 48px",clipPath:"polygon(0 0,100% 0,calc(100% - 60px) 100%,0 100%)"}}>
              <div className={a("ha-in d1")} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <span className="ha-glow" style={{width:6,height:6,borderRadius:"50%",background:"#00aaff",flexShrink:0}} />
                <span className="hdm" style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.26em",color:"#00aaff"}}>Now Accepting Partners</span>
              </div>
              <div className={`ha-line ${a("ha-line d2")}`} style={{height:2,width:40,marginBottom:12,background:"linear-gradient(90deg,#ffe234,#00aaff)"}} />
              <h1 className={`hbb ${a("ha-left d3")}`} style={{fontSize:"clamp(2.6rem,5vw,4.6rem)",lineHeight:1,letterSpacing:"0.04em",color:"#fff",marginBottom:12,marginTop:0}}>
                Fast.<br/>Reliable.<br/>
                <span style={{color:"#ffe234",textShadow:"0 0 28px rgba(255,226,52,0.4)"}}>On Time.</span>
              </h1>
              <p className={`hdm ${a("ha-in d4")}`} style={{fontSize:14,fontWeight:300,lineHeight:1.7,color:"rgba(183,210,255,0.6)",marginBottom:20,maxWidth:"36ch"}}>
                Last-mile delivery & parcel logistics for businesses that demand dependability. We move your packages — you grow your business.
              </p>
                <div className={a("ha-in d5")} style={{display:"flex",flexWrap:"wrap",gap:10}}>
                <button onClick={() => scrollToId('contact')} className="hdm" style={{border:"none",cursor:"pointer",background:"#ffe234",padding:"11px 28px",fontSize:10,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.14em",color:"#06080f",boxShadow:"0 0 22px rgba(255,226,52,0.38)",clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)"}}>Get a Quote</button>
                <button className="hdm" style={{border:"1px solid rgba(255,255,255,0.2)",cursor:"pointer",background:"rgba(255,255,255,0.05)",padding:"11px 24px",fontSize:10,fontWeight:300,textTransform:"uppercase",letterSpacing:"0.14em",color:"#fff",backdropFilter:"blur(8px)"}}>Our Services</button>
              </div>
            </div>
            <div style={{position:"absolute",top:0,bottom:0,right:0,left:"clamp(280px,43%,520px)",zIndex:0,overflow:"hidden"}}>
              <div className="ha-pan" style={{position:"absolute",inset:0,backgroundImage:`url(${IMG})`,backgroundSize:"cover",backgroundPosition:"center"}} />
              <div style={{position:"absolute",inset:0,zIndex:10,background:"rgba(6,8,15,0.4)"}} />
              <div style={{position:"absolute",inset:0,zIndex:10,background:"linear-gradient(to right,#06080f 0%,rgba(6,8,15,0.4) 28%,transparent 55%)"}} />
              <div style={{position:"absolute",inset:0,zIndex:10,background:"linear-gradient(160deg,rgba(0,170,255,0.10) 0%,transparent 48%)"}} />
              <div className={`hdm ${a("ha-in d6")}`} style={{position:"absolute",top:24,right:24,zIndex:20,display:"flex",flexDirection:"column",gap:4,border:"1px solid rgba(0,170,255,0.22)",background:"rgba(6,8,15,0.85)",padding:"12px 14px",backdropFilter:"blur(16px)"}}>
                <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.24em",color:"#00aaff"}}>Live Operations</span>
                <span className="hbb" style={{fontSize:20,lineHeight:1,letterSpacing:"0.06em",color:"#fff"}}>GTE NETWORK</span>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                  <span className="ha-blink" style={{width:6,height:6,borderRadius:"50%",background:"#3ddc84",boxShadow:"0 0 8px #3ddc84",flexShrink:0}} />
                  <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(183,210,255,0.5)"}}>{`Active · ${CONTACT.regionLabel}`}</span>
                </div>
              </div>
              <div className={a("ha-in d7")} style={{position:"absolute",bottom:24,left:24,zIndex:20,display:"flex",flexDirection:"column",gap:6}}>
                {TAGS.map((tag,i)=>(
                  <div key={tag} style={{display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(6,8,15,0.65)",padding:"5px 10px",backdropFilter:"blur(8px)"}}>
                    <span style={{width:4,height:4,borderRadius:"50%",background:i===0?"#ffe234":"#00aaff",flexShrink:0}} />
                    <span className="hdm" style={{fontSize:8,textTransform:"uppercase",letterSpacing:"0.18em",color:"rgba(183,210,255,0.7)"}}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:30,height:64,pointerEvents:"none",background:"linear-gradient(to top,#06080f,transparent)"}} />
          </section>
        </div>

        {/* ══ STATS BAR — compact instrument panel ══ */}
        <div className={`stats-bar ${a("ha-in d8")}`}>
          <div className="stats-scanline" />

          <div className="stats-header">
            <span className="ha-blink" style={{width:5,height:5,borderRadius:"50%",background:"#3ddc84",boxShadow:"0 0 6px #3ddc84",flexShrink:0}} />
            <span className="stats-header-label">sys.metrics</span>
            <div className="stats-header-sep" />
            <span className="stats-ts">updated · live</span>
          </div>

          <div className="stats-inner">
            {STATS.map(({ value, unit, label, sub, fill, accent }, i) => {
              const numVal = parseInt(value.replace(/,/g, ""), 10);
              return (
                <div key={label} className="stat-item">
                  <div className="stat-num-row">
                    <span className="stat-number">
                      <Counter target={numVal} ready={ready} delay={920 + i * 80} />
                    </span>
                    <span className="stat-unit" style={{ color: accent }}>{unit}</span>
                  </div>
                  <span className="stat-label">{label}</span>
                  <span className="stat-sub">{sub}</span>
                  <div className="stat-bar-track">
                    <div
                      className={`stat-bar-fill${fillBars ? " on" : ""}`}
                      style={{ width:`${fill*100}%`, background: accent, transitionDelay:`${i*120}ms` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}