export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector("nav");
  const navH = nav ? (nav as HTMLElement).offsetHeight : 60;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: "smooth" });
}

export default scrollToId;
