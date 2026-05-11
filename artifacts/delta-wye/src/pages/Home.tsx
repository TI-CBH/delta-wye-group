import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Zap, ShieldCheck, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";

import logoPath from "@assets/iconbackground-scaled_1778510519781.png";
import heroBgPath from "@/assets/images/hero_bg.png";

import indImgPath from "@assets/industrial-contract-electrical_1778511870964.jpg";
import resImgPath from "@assets/DWG_Thermal_1778513473193.png";
import comImgPath from "@assets/general-commercial-services_1778512818212.jpg";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(10, "Please provide more details about your project"),
});

export default function Home() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    toast({
      title: "Message Sent Successfully",
      description: "Our dispatch team has received your request and will contact you shortly.",
      duration: 5000,
    });
    form.reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "aboutus", "services", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            element.offsetTop <= scrollPosition && 
            (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => scrollTo("home")}
            data-testid="link-home-logo"
          >
            <div className="h-10 w-10 md:h-12 md:w-12 relative shadow-[0_0_15px_rgba(0,212,232,0.35)]">
              <img src={logoPath} alt="Delta Wye Group Logo" className="object-contain w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl tracking-tight leading-none uppercase text-white">Delta Wye</span>
              <span className="text-[10px] md:text-xs font-semibold tracking-widest text-primary uppercase">Group</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {["Home", "About Us", "Services", "Contact"].map((item) => {
              const id = item.toLowerCase().replace(" ", "");
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(id)}
                  data-testid={`link-nav-${id}`}
                  className={`uppercase tracking-wider transition-colors duration-200 hover:text-primary ${
                    activeSection === id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end text-right">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">24/7 Dispatch</span>
              <a href="tel:5017339922" className="text-sm font-bold text-white hover:text-primary transition-colors">501.733.9922</a>
            </div>
            <Button 
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide uppercase shadow-[0_0_20px_rgba(0,212,232,0.4)]"
              data-testid="button-nav-cta"
            >
              Request Service
            </Button>
          </div>
          
          {/* Mobile CTA */}
          <Button 
            className="md:hidden bg-primary hover:bg-primary/90 text-white"
            size="sm"
            onClick={() => scrollTo("contact")}
          >
            Service
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroBgPath}
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/electrical_hero.mp4" type="video/mp4" />
            <img src={heroBgPath} alt="Electrical infrastructure" className="w-full h-full object-cover opacity-50" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Commercial • Industrial • Residential</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] tracking-tight mb-6 uppercase"
              >
                PUTTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-300 to-primary animate-gradient-text">POWER</span> TO <br />
                WORK FOR YOU.
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl font-medium leading-relaxed"
              >
                Trusted Arkansas tradesmen since 2011. When the power goes out and no one else picks up, we answer the call. Raw capability, executed flawlessly.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollTo("contact")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide uppercase text-base h-14 px-8 shadow-[0_0_30px_rgba(0,212,232,0.3)] hover:shadow-[0_0_40px_rgba(0,212,232,0.5)] transition-all"
                  data-testid="button-hero-cta"
                >
                  Request Service
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollTo("services")}
                  className="border-white/20 text-white hover:bg-white/5 font-bold tracking-wide uppercase text-base h-14 px-8"
                  data-testid="button-hero-secondary"
                >
                  Our Capabilities
                </Button>
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-12 flex items-center gap-6 text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary h-5 w-5" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-primary h-5 w-5" />
                  <span>24/7/365 Dispatch</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="aboutus" className="py-24 md:py-32 bg-secondary/50 relative border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-display font-black text-white mb-6 uppercase tracking-tight">
                Deep Roots. <br />Real <span className="text-primary">Expertise.</span>
              </motion.h2>
              <motion.div variants={fadeIn} className="space-y-6 text-muted-foreground text-lg">
                <p>
                  Delta Wye Group isn't a big-box contractor. We're a crew-first operation founded in 2011, built on a reputation earned one job at a time across Arkansas. 
                </p>
                <p>
                  We are the handshake you trust when the stakes are high. Whether it's a massive industrial facility down, a commercial ground-up build, or an emergency residential call in the dead of night, we arrive with the knowledge to diagnose it and the grit to fix it.
                </p>
                <p className="font-bold text-white border-l-2 border-primary pl-4 py-2">
                  Confidence without arrogance. Real people, real stakes.
                </p>
              </motion.div>
              <motion.div variants={fadeIn} className="mt-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-display font-black text-white mb-2">2011</div>
                    <div className="text-sm font-bold text-primary uppercase tracking-widest">Year Founded</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-black text-white mb-2">24/7</div>
                    <div className="text-sm font-bold text-primary uppercase tracking-widest">Emergency Response</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative h-[600px] w-full rounded-lg overflow-hidden border border-white/10"
            >
              {/* Fallback pattern if image is missing */}
              <div className="absolute inset-0 bg-secondary flex items-center justify-center">
                <Zap className="h-32 w-32 text-white/5" />
              </div>
              <img 
                src={indImgPath} 
                alt="Industrial Electrical Work" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/80 backdrop-blur border border-white/10 p-6 rounded">
                  <div className="text-xl font-display font-bold text-white uppercase mb-2">The Delta Wye Standard</div>
                  <div className="text-sm text-muted-foreground font-medium">We don't leave until the power flows and the system is safe. No exceptions.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Our Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
              Full-Spectrum <br />Power Solutions
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Industrial Electrical",
                desc: "High-voltage systems, motor controls, manufacturing facilities, and heavy equipment wiring.",
                img: indImgPath
              },
              {
                title: "Commercial Electrical",
                desc: "Retail spaces, office buildings, data centers, and dedicated power solutions.",
                img: comImgPath
              },
              {
                title: "Residential Electrical",
                desc: "Home wiring, panel upgrades, troubleshooting, and smart home infrastructure.",
                img: resImgPath
              },
              {
                title: "Ground-up Builds",
                desc: "Comprehensive electrical design and installation for new construction projects.",
                icon: <Zap className="h-8 w-8 text-primary mb-4" />
              },
              {
                title: "Remodels & Upgrades",
                desc: "Modernizing outdated systems, lighting design, and efficiency improvements.",
                icon: <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              },
              {
                title: "24/7 Emergency",
                desc: "Rapid dispatch for critical failures. We answer when no one else does.",
                icon: <Clock className="h-8 w-8 text-primary mb-4" />,
                highlight: true
              }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
                }}
                className={`group relative overflow-hidden rounded-lg border ${service.highlight ? 'border-primary bg-primary/5' : 'border-white/10 bg-secondary'} p-8 h-full flex flex-col`}
              >
                {service.img ? (
                  <>
                    <div className="absolute inset-0 z-0">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
                    </div>
                    <div className="relative z-10 mt-auto pt-32">
                      <h4 className="text-2xl font-display font-bold text-white uppercase mb-3">{service.title}</h4>
                      <p className="text-muted-foreground font-medium">{service.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="relative z-10 flex flex-col h-full justify-center">
                    {service.icon}
                    <h4 className="text-2xl font-display font-bold text-white uppercase mb-3">{service.title}</h4>
                    <p className={`${service.highlight ? 'text-blue-100' : 'text-muted-foreground'} font-medium`}>{service.desc}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyME0yMCAwbC0yMCAyMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9zdmc+')] mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-2">Need an electrician right now?</h2>
            <p className="text-primary-foreground/80 font-medium text-lg">Our dispatch team is standing by 24/7/365.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-primary-foreground/70 uppercase tracking-widest">Call Dispatch</div>
              <div className="text-3xl font-display font-black text-white">501.733.9922</div>
            </div>
            <Button size="lg" variant="secondary" onClick={() => scrollTo("contact")} className="font-bold uppercase tracking-widest">
              Send a Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-24">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-4">
                  Request <br /><span className="text-primary">Service</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Reach out for a bid, schedule routine maintenance, or request immediate emergency dispatch.
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Direct Line</div>
                  <a href="tel:5017339922" className="text-2xl font-display font-bold text-white hover:text-primary transition-colors">
                    501.733.9922
                  </a>
                </div>
                <div>
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:dispatch@deltawyegroup.com" className="text-lg font-medium text-white hover:text-primary transition-colors">
                    dispatch@deltawyegroup.com
                  </a>
                </div>
                <div>
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-1">Service Area</div>
                  <div className="text-lg font-medium text-muted-foreground">
                    Serving commercial, industrial, and residential clients across Arkansas.
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-3 bg-background border border-white/10 p-8 md:p-10 rounded-xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Full Name</Label>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-secondary/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-contact-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Phone Number</Label>
                          <FormControl>
                            <Input placeholder="(501) 555-0123" className="bg-secondary/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-contact-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email Address</Label>
                        <FormControl>
                          <Input placeholder="john@example.com" className="bg-secondary/50 border-white/10 focus-visible:ring-primary h-12" {...field} data-testid="input-contact-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Project Details / Issue</Label>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe what you need help with..." 
                            className="bg-secondary/50 border-white/10 focus-visible:ring-primary min-h-[150px] resize-none" 
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
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide uppercase h-14 text-base mt-4 shadow-[0_0_20px_rgba(0,212,232,0.2)]"
                    data-testid="button-contact-submit"
                  >
                    Submit Request
                  </Button>
                </form>
              </Form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/10 py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 opacity-50">
              <img src={logoPath} alt="Delta Wye Group Logo" className="object-contain w-full h-full" />
            </div>
            <span className="font-display font-bold text-sm tracking-widest uppercase text-muted-foreground">Delta Wye Group</span>
          </div>
          
          <div className="text-sm font-medium text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Delta Wye Group. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <button onClick={() => scrollTo("home")} className="text-muted-foreground hover:text-white transition-colors uppercase tracking-widest text-xs">Home</button>
            <button onClick={() => scrollTo("services")} className="text-muted-foreground hover:text-white transition-colors uppercase tracking-widest text-xs">Services</button>
            <button onClick={() => scrollTo("contact")} className="text-muted-foreground hover:text-white transition-colors uppercase tracking-widest text-xs">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
