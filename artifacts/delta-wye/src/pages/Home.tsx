import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Zap, ShieldCheck, Clock, CheckCircle2, ChevronRight,
  Phone, Mail, MapPin, Star, AlertTriangle, Wrench, Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";

import logoPath from "@/assets/images/logo.png";
import heroBgPath from "@/assets/images/hero_bg.jpg";
import indImgPath from "@/assets/images/industrial-real.jpg";
import resImgPath from "@/assets/images/thermal.jpg";
import comImgPath from "@/assets/images/commercial-real.jpg";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Please describe your project or issue"),
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (_data: z.infer<typeof contactSchema>) => {
    toast({
      title: "Request Received",
      description: "Our dispatch team will be in touch shortly. For emergencies, call 501.733.9922.",
      duration: 6000,
    });
    form.reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "mission", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About", id: "mission" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden dark">

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-navy backdrop-blur-md border-b border-white/10 transition-all duration-300" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("home")}
            data-testid="link-home-logo"
          >
            <div className="h-10 w-10 md:h-12 md:w-12">
              <img src={logoPath} alt="Delta Wye Group Logo" className="object-contain w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-widest leading-none uppercase text-white">Delta Wye</span>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#00B4CC] uppercase">Group</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-testid={`link-nav-${item.id}`}
                className={`uppercase tracking-widest transition-colors duration-200 hover:text-white ${
                  activeSection === item.id ? "text-white" : "text-white/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">24/7 Dispatch</span>
              <a href="tel:5017339922" className="text-sm font-bold text-white hover:text-[#00B4CC] transition-colors">501.733.9922</a>
            </div>
            <Button
              onClick={() => scrollTo("contact")}
              className="font-bold tracking-widest uppercase text-sm px-6"
              style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
              data-testid="button-nav-cta"
            >
              Request Service
            </Button>
          </div>

          {/* Mobile menu toggle */}
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

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-6 flex flex-col gap-4" style={{ backgroundColor: "#0A1628" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-white/80 hover:text-white uppercase tracking-widest text-sm font-medium py-1"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:5017339922"
              className="text-xl font-display tracking-widest text-white mt-2"
            >
              501.733.9922
            </a>
            <Button
              onClick={() => scrollTo("contact")}
              className="mt-2 font-bold uppercase tracking-widest w-full"
              style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
            >
              Request Service
            </Button>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[92vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay muted loop playsInline
            poster={heroBgPath}
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/electrical_hero.mp4" type="video/mp4" />
            <img src={heroBgPath} alt="Electrical infrastructure" className="w-full h-full object-cover opacity-40" />
          </video>
          {/* Deep blue gradient overlay — brand blue */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A1628 10%, #0D2B8C88 60%, #0D2B8C44 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0A162899 0%, #0A162844 60%, transparent 100%)" }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#00B4CC]" />
                <span className="text-[#00B4CC] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Commercial · Industrial · Residential</span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="font-display md:text-[6.5rem] lg:text-[8rem] text-white tracking-wide mb-6 uppercase text-[80px]"
              >
                PUTTING<br />
                <span
                  className="text-transparent bg-clip-text animate-gradient-text font-bold"
                  style={{ backgroundImage: "linear-gradient(90deg, #1A5BC4, #00B4CC, #1A5BC4)" }}
                >
                  POWER
                </span> TO<br />
                WORK FOR YOU.
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-white/70 mb-10 max-w-xl font-medium leading-relaxed"
              >
                Trusted Arkansas electricians since 2011.{" "}<br />
                We show up. We fix it right.{" "}<br />
                When no one else picks up — we answer.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollTo("contact")}
                  className="font-bold tracking-widest uppercase text-base h-14 px-8"
                  style={{ backgroundColor: "#1A5BC4", color: "#fff" }}
                  data-testid="button-hero-cta"
                >
                  Request Service
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("services")}
                  className="border-2 border-teal bg-transparent text-teal hover:bg-teal hover:text-navy font-bold tracking-widest uppercase text-base h-14 px-8 transition-colors"
                  style={{ borderColor: "#00B4CC", color: "#00B4CC" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00B4CC"; (e.currentTarget as HTMLButtonElement).style.color = "#0A1628"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#00B4CC"; }}
                  data-testid="button-hero-secondary"
                >
                  Our Services
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-12 flex flex-wrap gap-6 text-sm font-semibold text-white/60 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#00B4CC]" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#00B4CC]" />
                  <span>24/7/365 Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#00B4CC]" />
                  <span>Est. 2011</span>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ──────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#0D2B8C" }} className="border-y border-white/10 py-5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-0">
            {[
              { label: "Licensed, Insured & Bonded" },
              { label: "OSHA Certified" },
              { label: "NFPA 70E Certified" },
              { label: "Thermography Certified" },
              { label: "Est. 2011" },
              { label: "24/7/365 Response" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4">
                <CheckCircle2 className="h-4 w-4 text-[#00B4CC] shrink-0" />
                <span className="text-white/80 text-xs font-semibold uppercase tracking-widest whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="py-24 md:py-32 relative" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          >
            <motion.span variants={fadeIn} className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
              Our Services
            </motion.span>
            <motion.h2 variants={fadeIn} className="font-display text-5xl md:text-7xl text-white uppercase leading-none tracking-wide">
              Full-Spectrum<br />Power Solutions
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Commercial & Industrial",
                desc: "Retail, office, data centers, manufacturing facilities, heavy equipment wiring, and motor controls.",
                img: comImgPath,
                icon: null,
              },
              {
                title: "Residential Service",
                desc: "Panel upgrades, whole-home wiring, troubleshooting, and smart home infrastructure.",
                img: resImgPath,
                icon: null,
              },
              {
                title: "New Construction & Remodels",
                desc: "Ground-up electrical design and installation — from blueprint to breaker. Renovations too.",
                img: indImgPath,
                icon: null,
              },
              {
                title: "Vandal Deterrents",
                desc: "Even light distribution, motion sensing, trespass alerting, and hardware upgrades. Make the bad guys look like bad guys.",
                img: null,
                icon: <Eye className="h-8 w-8 text-[#00B4CC] mb-4" />,
              },
              {
                title: "Generator Installation",
                desc: "Whole-home and commercial standby generators. Power back in the blink of an eye — with a 1-year worry-free maintenance guarantee.",
                img: null,
                icon: <Zap className="h-8 w-8 text-[#00B4CC] mb-4" />,
              },
              {
                title: "Property Audits",
                desc: "Day and night audits, LED retrofits, energy efficiency reviews. Night audits are free in most cases.",
                img: null,
                icon: <Wrench className="h-8 w-8 text-[#00B4CC] mb-4" />,
                highlight: true,
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } } }}
                className="group relative overflow-hidden rounded-lg border border-white/10 flex flex-col"
                style={{
                  backgroundColor: service.highlight ? "rgba(26,91,196,0.12)" : "rgba(255,255,255,0.04)",
                  borderTopWidth: "3px",
                  borderTopColor: service.highlight ? "#00B4CC" : "#1A5BC4",
                }}
              >
                {service.img ? (
                  <>
                    <div className="absolute inset-0 z-0">
                      <img src={service.img} alt={service.title}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A1628 40%, transparent)" }} />
                    </div>
                    <div className="relative z-10 mt-auto pt-40 p-8">
                      <h4 className="font-display text-2xl text-white uppercase tracking-wide mb-2">{service.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    {service.icon}
                    <h4 className="font-display text-2xl text-white uppercase tracking-wide mb-2">{service.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Additional services list */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 border border-white/10 rounded-lg p-8"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.2em] mb-5">Also Available</p>
            <div className="flex flex-wrap gap-3">
              {[
                "Lighting Retrofits & Controls",
                "Thermographic Inspections",
                "24/7/365 Emergency Response",
                "Planned Maintenance Agreements",
                "Lighting Upgrades",
                "National Accounts & Big Box Retail",
                "Electrical Troubleshooting & Diagnostics",
              ].map((s) => (
                <span
                  key={s}
                  className="border border-white/15 rounded px-3 py-1.5 text-white/70 text-xs font-medium uppercase tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Values ───────────────────────────────────── */}
      <section id="mission" className="py-24 md:py-36 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0D2B8C 0%, #1A5BC4 100%)" }}>
        {/* Decorative triangle watermarks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-10" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute -bottom-16 -left-16 w-80 h-80 opacity-10" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,95 5,95" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] block mb-5"
            >
              Our Mission
            </motion.span>
            <motion.blockquote
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="font-display text-3xl md:text-5xl text-white uppercase leading-tight tracking-wide mb-10"
            >
              "We take care of our people.<br className="hidden md:block" />
              Our people take care of our customers.<br className="hidden md:block" />
              Our customers take care of us."
            </motion.blockquote>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Delta Wye Group was built on the belief that excellent service starts with an
              excellent team. We invest in our people so they can invest in you. That's not
              a mission statement — it's how we operate, every day, on every job.
            </motion.p>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-3 gap-8"
            >
              {[
                { stat: "2011", label: "Year Founded" },
                { stat: "< 15 min", label: "Emergency Wheels-Up" },
                { stat: "< 5 Days", label: "Standard Service Lead Time" },
              ].map((item) => (
                <motion.div key={item.stat} variants={fadeIn} className="text-center">
                  <div className="font-display text-4xl md:text-5xl text-white tracking-wide mb-1">{item.stat}</div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.2em]">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Delta Wye ──────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F0F6FF" }}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl mb-14"
          >
            <motion.span variants={fadeIn} className="text-[#1A5BC4] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
              Why Delta Wye
            </motion.span>
            <motion.h2 variants={fadeIn} className="font-display text-5xl md:text-6xl text-[#0D2B8C] uppercase leading-none tracking-wide">
              We Do Things<br />Differently.
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="h-7 w-7 text-[#1A5BC4]" />,
                title: "Same-Day Emergency Response",
                body: "Typical wheels-up time: under 15 minutes. When it's urgent, call 501.733.9922 x1 — we always have electricians on call.",
              },
              {
                icon: <Phone className="h-7 w-7 text-[#1A5BC4]" />,
                title: "You'll Reach an Actual Human",
                body: "Live call answering 7 days a week. No call centers, no runaround. No labyrinth required.",
              },
              {
                icon: <CheckCircle2 className="h-7 w-7 text-[#1A5BC4]" />,
                title: "Less Than 5-Day Lead Times",
                body: "For standard service calls, email dispatch@deltawyegroup.com. That's our preferred method — and we keep our schedule tight.",
              },
              {
                icon: <ShieldCheck className="h-7 w-7 text-[#1A5BC4]" />,
                title: "Fully Credentialed",
                body: "Licensed, Insured, Bonded. OSHA, NFPA 70E, and Thermography certified. We bring the paperwork — and the know-how.",
              },
              {
                icon: <MapPin className="h-7 w-7 text-[#1A5BC4]" />,
                title: "Statewide Coverage",
                body: "We serve commercial, industrial, and residential clients across all of Arkansas — and can respond regionally when disaster strikes.",
              },
              {
                icon: <Star className="h-7 w-7 text-[#1A5BC4]" />,
                title: "Generator Worry-Free Guarantee",
                body: "All generator installs come with a 1-year worry-free maintenance guarantee. Because nobody should think about a generator twice.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } } }}
                className="bg-white rounded-lg p-7 shadow-[0_4px_20px_rgba(10,22,40,0.10)] border-l-4 border-[#1A5BC4]"
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="font-display text-xl text-[#0D2B8C] uppercase tracking-wide mb-2">{item.title}</h4>
                <p className="text-[#2D2D2D] text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Star className="h-8 w-8 text-[#00B4CC] mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6 italic">
              "Delta Wye took our property from darkness to 90% in 6 months keeping with my budget."
            </blockquote>
            <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em]">Kyle — Commercial Property Manager</div>
          </motion.div>
        </div>
      </section>

      {/* ── Emergency CTA Strip ────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#0D2B8C" }}>
        {/* Subtle diagonal line pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-[#00B4CC]" />
              <span className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em]">Emergency Service</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wide">
              Need an electrician<br className="hidden md:block" /> right now?
            </h2>
            <p className="text-white/70 font-medium mt-2">
              24/7/365. When it matters, we answer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0">
            <a
              href="tel:5017339922"
              className="font-display text-3xl md:text-4xl text-white tracking-widest hover:text-[#00B4CC] transition-colors"
            >
              501.733.9922
            </a>
            <Button
              size="lg"
              onClick={() => scrollTo("contact")}
              className="font-bold uppercase tracking-widest h-14 px-8 text-base"
              style={{ backgroundColor: "#00B4CC", color: "#0A1628" }}
            >
              Send a Message
            </Button>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32" style={{ backgroundColor: "#0A1628" }}>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <span className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] block mb-4">Contact Us</span>
                <h2 className="font-display text-5xl md:text-6xl text-white uppercase tracking-wide leading-none mb-4">
                  Request<br /><span style={{ color: "#1A5BC4" }}>Service</span>
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  Email is our preferred method for standard requests. For anything urgent — especially after hours — please call.
                  Our inbox doesn't operate around the clock. Our phone does.
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] mb-1">Emergency Line</div>
                  <a href="tel:5017339922" className="font-display text-3xl text-white hover:text-[#00B4CC] tracking-widest transition-colors">
                    501.733.9922
                  </a>
                  <p className="text-white/50 text-xs mt-1">Press x1 for emergency dispatch</p>
                </div>
                <div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] mb-1">Email Dispatch</div>
                  <a href="mailto:dispatch@deltawyegroup.com" className="text-base font-medium text-white/80 hover:text-white transition-colors">
                    dispatch@deltawyegroup.com
                  </a>
                </div>
                <div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] mb-1">Address</div>
                  <address className="text-base text-white/60 not-italic leading-relaxed">
                    1415 Pratt Road<br />
                    Little Rock, AR 72206
                  </address>
                </div>
                <div>
                  <div className="text-[#00B4CC] text-xs font-bold uppercase tracking-[0.25em] mb-1">Service Area</div>
                  <p className="text-base text-white/60 leading-relaxed">
                    All of Arkansas. Regional & disaster response beyond state lines.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-3 border border-white/10 p-8 md:p-10 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control} name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs font-bold text-white/50 uppercase tracking-widest">Full Name</Label>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 text-white placeholder:text-white/30" {...field} data-testid="input-contact-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control} name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs font-bold text-white/50 uppercase tracking-widest">Phone Number</Label>
                          <FormControl>
                            <Input placeholder="(501) 555-0123" className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 text-white placeholder:text-white/30" {...field} data-testid="input-contact-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control} name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs font-bold text-white/50 uppercase tracking-widest">Email Address</Label>
                        <FormControl>
                          <Input placeholder="you@example.com" className="bg-white/5 border-white/10 focus-visible:ring-primary h-12 text-white placeholder:text-white/30" {...field} data-testid="input-contact-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control} name="message"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs font-bold text-white/50 uppercase tracking-widest">Project Details / Issue</Label>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what you need help with. Include access instructions (codes, keys, secret handshakes, etc.)."
                            className="bg-white/5 border-white/10 focus-visible:ring-primary min-h-[140px] resize-none text-white placeholder:text-white/30"
                            {...field}
                            data-testid="input-contact-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full font-bold tracking-widest uppercase h-14 text-base mt-2"
                    style={{ backgroundColor: "#1A5BC4", color: "#fff" }}
                    data-testid="button-contact-submit"
                  >
                    Submit Request
                  </Button>

                  <p className="text-white/30 text-xs text-center leading-relaxed">
                    For emergencies after hours, call <a href="tel:5017339922" className="text-[#00B4CC] hover:underline">501.733.9922</a> instead.
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#060E1E" }} className="border-t border-white/10 pt-14 pb-8">
        <div className="container mx-auto px-4 md:px-6">

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
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

            {/* Contact */}
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

            {/* Certifications */}
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
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
