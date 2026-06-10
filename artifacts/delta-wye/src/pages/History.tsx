import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Mail, MapPin, ChevronRight, Zap } from "lucide-react";
import { useState } from "react";
import logoPath from "@/assets/images/logo.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#mission" },
  { label: "Contact", href: "/#contact" },
];

const milestones = [
  {
    year: "Oct 2011",
    title: "The Foundation",
    body: "Lee and Karen Cowling established Cowling Electric PLLC. From day one, the company built its reputation on honest work, dependable service, and treating customers and employees like family — principles that still define Delta Wye Group today.",
  },
  {
    year: "2017",
    title: "Jonathan Joins the Team",
    body: "Jonathan Cupples joined Cowling Electric as a junior project estimator and job lead. He quickly demonstrated a commitment to quality and a talent for building lasting client relationships.",
  },
  {
    year: "Late 2018",
    title: "Rising Into Leadership",
    body: "Following David Hickman's retirement, Jonathan stepped into the project manager role. He built several key relationships in early 2019 that led into a major large-scale project later that year.",
  },
  {
    year: "2020",
    title: "Navigating the Unknown",
    body: "With the onset of COVID-19, Jonathan took over primary operations. Under Lee Cowling's continued guidance and Jonathan's persistence, the company navigated extraordinary uncertainty — and came out stronger.",
  },
  {
    year: "2022",
    title: "New Ownership, Same Values",
    body: "Jonathan Cupples purchased the company with a clear vision: preserve the legacy Lee and Karen built while modernizing operations and preparing for the future.",
  },
  {
    year: "July 2025",
    title: "Delta Wye Group Is Born",
    body: "Through an expanded partnership, Delta Wye Group was officially founded — broadening the company's scope into commercial construction, HVAC, and controls work alongside electrical service operations.",
  },
  {
    year: "Jan 2026",
    title: "Sharpened Focus",
    body: "Partners returned to pursue their independent visions. Jonathan continued forward as sole owner and formally rebranded the company as Delta Wye Group — sharpening its focus on commercial and residential electrical service, national accounts, emergency response, and lighting retrofits throughout Arkansas and beyond.",
  },
];

export default function History() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden dark" style={{ backgroundColor: "#0A1628", color: "#fff" }}>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 md:h-12 md:w-12">
              <img src={logoPath} alt="Delta Wye Group Logo" className="object-contain w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-widest leading-none uppercase text-white">Delta Wye</span>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#00B4CC] uppercase">Group</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">24/7 Dispatch</span>
              <a href="tel:5017339922" className="text-sm font-bold text-white hover:text-[#00B4CC] transition-colors">501.733.9922</a>
            </div>
            <a
              href="/#contact"
              className="font-bold tracking-widest uppercase text-sm px-6 h-10 inline-flex items-center rounded-md"
              style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
            >
              Request Service
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-6 flex flex-col gap-4" style={{ backgroundColor: "#0A1628" }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white uppercase tracking-widest text-sm font-medium py-1"
              >
                {item.label}
              </a>
            ))}
            <a href="tel:5017339922" className="text-xl font-display tracking-widest text-white mt-2">501.733.9922</a>
            <a
              href="/#contact"
              className="mt-2 font-bold uppercase tracking-widest w-full h-12 inline-flex items-center justify-center rounded-md"
              style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
            >
              Request Service
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 md:pt-52 md:pb-28"
        style={{ background: "linear-gradient(135deg, #0D2B8C 0%, #1A5BC4 50%, #0A1628 100%)" }}
      >
        {/* Decorative triangles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -top-10 -right-10 w-72 h-72 opacity-10" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute bottom-0 -left-10 w-56 h-56 opacity-10" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#00B4CC]" />
              <span className="text-[#00B4CC] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Est. 2011 · Little Rock, Arkansas</span>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-wide mb-6 uppercase leading-none"
            >
              Our<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #1A5BC4, #00B4CC)" }}
              >
                Story
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
              From a single electrical contractor in Little Rock to a full-service building solutions company — built on family, hard work, and the belief that good service starts with good people.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Vertical line */}
            <div
              className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
              style={{ background: "linear-gradient(to bottom, #1A5BC4, #00B4CC, #1A5BC444)" }}
            />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  variants={fadeIn}
                  className={`relative flex items-start gap-6 md:gap-0 mb-14 md:mb-16 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-10 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] block mb-2">{m.year}</span>
                    <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wide mb-3">{m.title}</h3>
                    <p className="text-white/60 leading-relaxed">{m.body}</p>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 w-9 h-9 rounded-full border-2 border-[#1A5BC4] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#0A1628" }}
                  >
                    <Zap className="h-4 w-4 text-[#00B4CC]" />
                  </div>

                  {/* Spacer for alternating side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Today ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(135deg, #0D2B8C 0%, #1A5BC4 100%)" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.span variants={fadeIn} className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] block mb-5">
              Today
            </motion.span>
            <motion.h2 variants={fadeIn} className="font-display text-4xl md:text-6xl text-white uppercase leading-tight tracking-wide mb-8">
              More Than Wires<br />& Equipment
            </motion.h2>
            <motion.p variants={fadeIn} className="text-white/80 text-lg leading-relaxed mb-6">
              Delta Wye Group continues to flourish with the belief that good service is about more than just wires and equipment. Our mission is centered around responsiveness, professionalism, accountability, and building trust with every customer we serve.
            </motion.p>
            <motion.p variants={fadeIn} className="text-white/70 text-lg leading-relaxed mb-12">
              Whether responding to an emergency service call in the middle of the night, supporting large commercial facilities, or helping a homeowner solve a problem, our goal remains the same: provide dependable electrical solutions while treating people with honesty, respect, and urgency. We believe in answering the phone, showing up when we say we will, and leaving every customer better taken care of than when they called.
            </motion.p>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-3 gap-8 mb-12">
              {[
                { stat: "2011", label: "Year Founded" },
                { stat: "< 15 min", label: "Emergency Wheels-Up" },
                { stat: "Statewide", label: "Arkansas Coverage" },
              ].map((item) => (
                <motion.div key={item.stat} variants={fadeIn} className="text-center">
                  <div className="font-display text-4xl md:text-5xl text-white tracking-wide mb-1">{item.stat}</div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.2em]">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="font-bold tracking-widest uppercase text-base h-14 px-8 inline-flex items-center justify-center rounded-md gap-2"
                style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
              >
                Request Service
                <ChevronRight className="h-5 w-5" />
              </a>
              <a
                href="tel:5017339922"
                className="font-bold tracking-widest uppercase text-base h-14 px-8 inline-flex items-center justify-center rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                501.733.9922
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#060E1E" }} className="border-t border-white/10 pt-14 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10">
                  <img src={logoPath} alt="Delta Wye Group Logo" className="object-contain w-full h-full opacity-90" />
                </div>
                <div>
                  <div className="font-display text-base tracking-widest uppercase text-white">Delta Wye Group</div>
                  <div className="text-[10px] text-[#00B4CC] uppercase tracking-[0.2em] font-medium">Trusted since 2011</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Full-service electrical contractor serving commercial, industrial, and residential clients across Arkansas.
              </p>
            </div>

            <div>
              <h5 className="font-display text-base tracking-widest uppercase text-white mb-5">Contact</h5>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-white/50">
                  <MapPin className="h-4 w-4 text-[#00B4CC] mt-0.5 shrink-0" />
                  <span>1415 Pratt Road, Little Rock, AR 72206</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#00B4CC] shrink-0" />
                  <a href="tel:5017339922" className="text-white/50 hover:text-white transition-colors">501.733.9922</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#00B4CC] shrink-0" />
                  <a href="mailto:dispatch@deltawyegroup.com" className="text-white/50 hover:text-white transition-colors">dispatch@deltawyegroup.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-display text-base tracking-widest uppercase text-white mb-5">Credentials</h5>
              <ul className="space-y-2">
                {[
                  "Licensed, Insured & Bonded",
                  "OSHA Certified",
                  "NFPA 70E Certified",
                  "Certified Lighting Management Consultant (CLMC)",
                  "Lighting Controls Certified",
                  "Thermography Certified",
                ].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-white/40 text-xs">
                    <CheckCircle2 className="h-3 w-3 text-[#00B4CC] shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} Delta Wye Group. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs font-medium">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
