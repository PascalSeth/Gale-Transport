"use client";
import React, { useEffect, useRef, useState } from "react";

const C = {
  blue:   "#00aaff",
  yellow: "#ffe234",
  white:  "#ffffff",
  muted:  "rgba(220,235,255,0.65)",
  border: "rgba(0,170,255,0.15)",
  bg:     "#06080f",
  card:   "rgba(8,14,28,0.88)",
};
import CONTACT from "../contactInfo";

const INFO = [
  { label: "Email", value: CONTACT.email, icon: "✉" },
  { label: "Phone", value: CONTACT.phone, icon: "☎" },
  { label: "Region", value: CONTACT.regionLabel, icon: "📍" },
  { label: "Hours", value: CONTACT.hours, icon: "⏱" },
];

const SERVICES = ["Last-Mile Delivery","Parcel Distribution","Contract Courier","Scheduled Routes","Surge Capacity","Other"];

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

/* ── FIELD ── */
type FP = {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  multiline?: boolean; select?: boolean; options?: string[];
};

function Field({ label, name, type = "text", placeholder, value, onChange, multiline, select, options }: FP) {
  const [focused, setFocused] = useState(false);
  const base: React.CSSProperties = {
    width: "100%", padding: "11px 13px",
    background: "rgba(6,10,22,0.7)",
    border: `1px solid ${focused ? C.blue : "rgba(0,170,255,0.18)"}`,
    color: C.white, outline: "none", resize: "none",
    fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", fontWeight: 300,
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused ? "0 0 0 2px rgba(0,170,255,0.09)" : "none",
    borderRadius: 0,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: focused ? C.blue : C.muted, transition: "color 0.2s" }}>
        {label}
      </label>
      {select ? (
        <select name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, appearance: "none", cursor: "pointer" }}>
          <option value="" disabled hidden>{placeholder}</option>
          {options?.map(o => <option key={o} value={o} style={{ background: "#080c18" }}>{o}</option>)}
        </select>
      ) : multiline ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={5}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base} />
      )}
    </div>
  );
}

/* ── COMPONENT ── */
export default function ContactUs() {
  const { ref, v } = useInView();
  const mob = useMobile();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes cuUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes cuL   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
        @keyframes cuR   { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
        @keyframes cuPop { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .cu-up { animation: cuUp 0.7s ease both } .cu-l { animation: cuL 0.75s ease both }
        .cu-r  { animation: cuR 0.75s ease both } .cu-pop{ animation: cuPop 0.5s ease both }
        .d0{animation-delay:0ms}   .d1{animation-delay:100ms} .d2{animation-delay:200ms}
        .d3{animation-delay:300ms} .d4{animation-delay:400ms}
        ::placeholder { color: rgba(180,200,255,0.28); }
        select option { background: #080c18; }
      `}</style>

      <section id="contact" ref={ref} style={{ background: C.bg, fontFamily: "'DM Sans',sans-serif", padding: mob ? "3.5rem 1.2rem" : "clamp(4rem,9vw,7rem) clamp(2rem,7vw,5rem)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>

          {/* Header */}
          <div className={v ? "cu-up d0" : "opacity-0"} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1.5, background: `linear-gradient(90deg,${C.yellow},${C.blue})` }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: C.blue }}>Get In Touch</span>
          </div>

          <h2
            className={v ? "cu-up d1" : "opacity-0"}
            style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mob ? "2.2rem" : "clamp(2.4rem,5vw,4rem)", lineHeight: 1, letterSpacing: "0.05em", color: C.white, margin: "0 0 clamp(2rem,5vw,3.5rem)" }}
          >
            Ready to partner with<br />
            <span style={{ color: C.yellow }}>Gale Transport?</span>
          </h2>

          {/* Grid: info | form */}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.65fr", gap: mob ? "2.5rem" : "clamp(2.5rem,5vw,5rem)", alignItems: "start" }}>

            {/* LEFT — info */}
            <div className={v ? (mob ? "cu-up d2" : "cu-l d2") : "opacity-0"}>
              <p style={{ fontSize: mob ? "0.9rem" : "clamp(0.88rem,1.1vw,0.96rem)", fontWeight: 300, lineHeight: 1.8, color: C.muted, marginBottom: 28 }}>
                Whether you need a quote, want to discuss a contract arrangement, or just want to learn how we can support your operation — reach out. We respond fast.
              </p>

              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 24 }}>
                {INFO.map(({ label, value, icon }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: C.card, border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: "1rem", width: 20, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.blue }}>{label}</span>
                      <span style={{ fontSize: "0.86rem", fontWeight: 400, color: C.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership note */}
              <div style={{ padding: "18px 18px", background: "rgba(0,170,255,0.05)", border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.blue}` }}>
                <p style={{ margin: 0, fontSize: "0.84rem", fontWeight: 300, lineHeight: 1.72, color: C.muted }}>
                  We&apos;re actively seeking <span style={{ color: C.white }}>long-term partnerships</span> with e-commerce brands, fulfilment centres, and logistics networks in the Accra region.
                </p>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className={v ? (mob ? "cu-up d3" : "cu-r d2") : "opacity-0"}>
              {sent ? (
                <div className="cu-pop" style={{ padding: mob ? "36px 24px" : "48px 36px", textAlign: "center", background: "rgba(0,170,255,0.05)", border: `1px solid rgba(0,170,255,0.22)` }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>✓</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", letterSpacing: "0.08em", color: C.white, marginBottom: 8 }}>Message Sent</div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 300, color: C.muted, margin: 0 }}>We&apos;ll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Name + Company */}
                  <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
                    <Field label="Your Name"  name="name"    placeholder="John Mensah"       value={form.name}    onChange={handle} />
                    <Field label="Company"    name="company" placeholder="ACME Ltd."          value={form.company} onChange={handle} />
                  </div>

                  {/* Email + Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
                    <Field label="Email" name="email" type="email" placeholder="john@company.com"   value={form.email} onChange={handle} />
                    <Field label="Phone" name="phone" type="tel"   placeholder={CONTACT.phone}   value={form.phone} onChange={handle} />
                  </div>

                  {/* Service */}
                  <Field label="Service Needed" name="service" placeholder="Select a service…" value={form.service} onChange={handle} select options={SERVICES} />

                  {/* Message */}
                  <Field label="Message" name="message" placeholder="Tell us about your delivery needs, volumes, or any questions…" value={form.message} onChange={handle} multiline />

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      padding: "13px 32px", alignSelf: mob ? "stretch" : "flex-start",
                      fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
                      letterSpacing: "0.16em", textTransform: "uppercase",
                      color: C.bg, background: C.yellow,
                      border: "none", cursor: "pointer", outline: "none",
                      boxShadow: "0 0 20px rgba(255,226,52,0.32)", transition: "all 0.22s ease",
                    }}
                    onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 0 32px rgba(255,226,52,0.52)"; }}
                    onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.boxShadow = "0 0 20px rgba(255,226,52,0.32)"; }}
                  >
                    Send Message →
                  </button>

                </form>
              )}
            </div>

          </div>

          {/* Bottom divider */}
          <div style={{ marginTop: "clamp(3rem,7vw,6rem)", height: 1, background: `linear-gradient(90deg,transparent,${C.blue} 30%,${C.yellow} 70%,transparent)`, opacity: 0.2 }} />
        </div>
      </section>
    </>
  );
}