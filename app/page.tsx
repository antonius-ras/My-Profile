"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Reusable Reveal Wrappers ──────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideLeft({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideRight({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** เส้นไล่สีกวาดจากซ้ายไปขวาเมื่อ section เข้าจอ */
function SweepLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      style={{ originX: 0 }}
      className="h-px bg-gradient-to-r from-gray-500/60 via-white/50 to-transparent mb-8"
    />
  );
}

// ─── Image Carousel ───────────────────────────────────────────────
function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative h-48 md:h-44 rounded-xl border border-gray-800 overflow-hidden bg-[#1a1a1a]">
      {images.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={src} alt={`slide ${i + 1}`} fill className="object-cover" />
        </div>
      ))}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white w-4" : "bg-gray-500 w-1.5"}`} />
        ))}
      </div>
      <button onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors">‹</button>
      <button onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors">›</button>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────
const SERVICE_ID  = "service_69w0qze";   // ← ใส่ของจริง
const TEMPLATE_ID = "template_oet6lho";  // ← ใส่ของจริง
const PUBLIC_KEY  = "sH3IeK4pZ22h7GHtB"; 

function ContactForm() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { from_name: form.name, from_email: form.email, message: form.message }, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input name="name" value={form.name} onChange={onChange} placeholder="Your Name"
            className="flex-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
          <input name="email" value={form.email} onChange={onChange} placeholder="Your Email" type="email"
            className="flex-1 bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors" />
        </div>
        <textarea name="message" value={form.message} onChange={onChange} placeholder="Your Message" rows={4}
          className="bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors resize-none" />
      </div>
      <button onClick={onSubmit} disabled={status === "sending"}
        className="w-full py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm sm:text-base">
        {status === "sending" ? "Sending…" : "Say Hello!"}
      </button>
      {status === "success" && <p className="mt-3 text-green-400 text-sm text-center">Message sent! I'll get back to you soon.</p>}
      {status === "error"   && <p className="mt-3 text-red-400 text-sm text-center">Something went wrong. Try again.</p>}
    </div>
  );
}

// ─── Nav sections ─────────────────────────────────────────────────
const navSections = [
  { id: "about",    label: "About" },
  { id: "projects", label: "Projects" },
  { id: "lab",      label: "My Lab", href: "/lab" },
  { id: "contact",  label: "Contact" },
];

const skills = [
  "JavaScript / TypeScript", "React & Next.js", "Node.js",
  "PostgreSQL / MySQL", "Tailwind CSS", "Docker",
  "REST APIs", "Git & GitHub", "ESP32 & Hardware",
];

// ─── Main Page ────────────────────────────────────────────────────
export default function HomePage() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen]           = useState(false);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);

  // Hero parallax on scroll

  const { scrollY, scrollYProgress } = useScroll();
  const heroY  = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // Scroll spy
  useEffect(() => {
    const handle = () => {
      const y = window.scrollY + 100;
      let cur = "about";
      for (const id of ["about", "projects", "contact"]) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Animated nav underline
  useEffect(() => {
    const idx = navSections.findIndex((s) => s.id === activeSection);
    const el  = navRefs.current[idx];
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const pr = el.parentElement?.getBoundingClientRect();
    if (pr) setUnderline({ left: r.left - pr.left, width: r.width });
  }, [activeSection]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, sec: typeof navSections[0]) => {
    if (sec.href) return;
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#0a0a0a]">
        <motion.div style={{ y: bgY }} className="absolute top-0 left-0 w-full h-[120vh]">
          <Image 
            src="/bg-pattern.jpg" /* 👈 เปลี่ยนชื่อเป็นไฟล์รูปที่คุณเอามาใส่ในโฟลเดอร์ public */
            alt="background" 
            fill 
            className="object-cover opacity-15 grayscale" /* opacity-15 ทำให้จาง, grayscale ทำให้เป็นขาวดำ */
            priority 
          />
        </motion.div>
        {/* Gradient ไล่สีดำทับด้านล่างนิดนึงให้กลืนไปกับเว็บ */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />
      </div>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <motion.a href="#" whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-lg sm:text-xl tracking-widest">
            TOBIAS<span className="text-blue-400">.</span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 relative">
            {navSections.map((sec, i) => (
              <a key={sec.label} href={sec.href || `#${sec.id}`}
                ref={(el: any) => (navRefs.current[i] = el)}
                onClick={(e: any) => scrollTo(e, sec)}
                className={`px-1 py-1 transition-colors duration-200 ${activeSection === sec.id ? "text-white" : "hover:text-white"}`}>
                {sec.label}
              </a>
            ))}
            <AnimatePresence>
              {underline && (
                <motion.span key="ul"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, left: underline.left, width: underline.width }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute bottom-0 h-[2px] bg-gradient-to-r from-gray-500/60 via-white/80 to-transparent rounded-full"
                  style={{ left: underline.left, width: underline.width }}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            <a href="/resume" target="_blank"
              className="hidden sm:inline-flex text-xs px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-white hover:text-black transition-colors">
              Resume
            </a>
            <button className="md:hidden p-2 flex flex-col gap-[5px]" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#0a0a0a]"
            >
              <div className="flex flex-col px-5 py-4 gap-4">
                {navSections.map((sec) => (
                  <a key={sec.label} href={sec.href || `#${sec.id}`}
                    onClick={(e: any) => scrollTo(e, sec)}
                    className="text-gray-300 hover:text-white text-sm py-1 border-b border-white/5 pb-3 last:border-0 transition-colors">
                    {sec.label}
                  </a>
                ))}
                <a href="/resume" target="_blank"
                  className="text-xs px-4 py-2 border border-gray-700 text-white rounded-lg text-center hover:bg-white hover:text-black transition-colors">
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="flex flex-col items-center overflow-hidden">

        {/* ── Hero — parallax fade ─────────────────────────────── */}
        <motion.div style={{ y: heroY, opacity: heroOp }}
          className="text-center max-w-3xl px-5 mt-28 sm:mt-36 mb-16 sm:mb-24">

          {/* Name — blur-in reveal */}
          <div className="overflow-hidden mb-5 mt-5">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white"
            >
              Hi, I'm{" "}
              <motion.span
                initial={{ opacity: 0, filter: "blur(14px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="text-gray-400"
              >
                Tobias.
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
          >
            A Full-Stack Engineering student passionate about clean code,
            robust architecture, and building impactful tech solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="px-7 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm sm:text-base">
              View Projects
            </motion.a>
            <motion.a href="/Tobias_Antonius_Resume.pdf" download
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="px-7 py-3 border border-gray-700 text-white font-semibold rounded-xl hover:border-gray-400 transition-colors text-sm sm:text-base">
              Download Resume
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="mt-14 flex flex-col items-center gap-1.5"
          >
            <span className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* ── About + Tech Stack ──────────────────────────────── */}
        <section id="about" className="w-full max-w-5xl px-4 sm:px-6 pb-24 sm:pb-32">
          <SweepLine />
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            <SlideLeft className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">About Me</h2>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
                I am a 3rd-year Computer Engineering student at Dhurakij Pundit University,
                actively seeking a software engineering internship for June – July 2026.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Beyond full-stack web apps, I have a strong passion for Home Lab setups,
                server management, and hardware optimization — bridging the gap between
                clean software architecture and robust physical systems.
              </p>
            </SlideLeft>

            <SlideRight delay={0.1} className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">Tech Stack</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, i) => (
                  <motion.span key={skill}
                    initial={{ opacity: 0, scale: 0.7, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08 }}
                    className="px-3 py-1.5 bg-[#111] border border-gray-800 rounded-full text-xs sm:text-sm text-gray-300 cursor-default hover:border-gray-600 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SlideRight>
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────── */}
        <section id="projects" className="w-full max-w-5xl px-4 sm:px-6 pb-24 sm:pb-32">
          <SweepLine />
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white">Featured Projects</h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {[
              {
                title: "My Mood (AI Music App)",
                desc: "A full-stack music application integrating Gemini AI via API...",
                img: "/my-mood.png",
                tags: ["React", "Node.js"],
                delay: 0.05,
                colSpan: "",
                github1: "https://github.com/antonius-ras/Mymood_mobile",
                github2: "https://github.com/antonius-ras/Mymood_backend",
                github3: "https://github.com/antonius-ras/Mymood_Web",
              },
              {
                title: "Hotel Reservation System",
                desc: "A responsive full-stack hotel booking platform...",
                img: "/hotel.png",
                tags: ["PostgreSQL"],
                delay: 0.15,
                colSpan: "",
                github4: "https://github.com/antonius-ras/Project-CE306-Hotel-for-rang",
                link: "https://hotel-for-rang.vercel.app/"
              },
            ].map((p) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6 }}
                className={`bg-[#111] border border-gray-800 hover:border-gray-600 rounded-2xl overflow-hidden group flex flex-col transition-colors duration-300 ${p.colSpan}`}
              >
                <div className="h-44 sm:h-48 relative border-b border-gray-800 overflow-hidden bg-[#1a1a1a]">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-5 flex-grow">{p.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded-lg">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    {p.github1 && <a href={p.github1} target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">GitHub (Mobile)</a>}
                    {p.github2 && <a href={p.github2} target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">GitHub (Backend)</a>}
                    {p.github3 && <a href={p.github3} target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">GitHub (Web)</a>}
                    {p.github4 && <a href={p.github4} target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">GitHub</a>}
                    {p.link    && <a href={p.link} target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">Live Demo</a>}

                </div>
                </div>
              </motion.div>
            ))}

            {/* Thatri Vision — full width */}
            <motion.div
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              className="bg-[#111] border border-gray-800 hover:border-gray-600 rounded-2xl overflow-hidden group sm:col-span-2 transition-colors duration-300"
            >
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
                <div className="w-full sm:w-1/3">
                  <ImageCarousel images={["/esp32.png", "/esp32-2.png", "/esp32-3.png", "/esp32-4.png", "/esp32-5.png", "/esp32-6.png", "/esp32-7.png", "/esp32-8.png"]} />
                </div>
                <div className="w-full sm:w-2/3">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">Thatri Vision (Hardware Monitor)</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4">A custom hardware-monitoring mini-monitor project powered by ESP32...</p>
                  <span className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded-lg">ESP32</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────── */}
        <section id="contact" className="w-full max-w-5xl px-4 sm:px-6 pb-16 sm:pb-24 text-center">
          <SweepLine />
          <FadeUp>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white">Let's Build Something Together</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              I'm currently looking for a software engineering internship for June – July 2026.
              Whether you have a role available, or just want to connect — my inbox is always open!
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="max-w-lg mx-auto">
            <ContactForm />
          </FadeUp>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
            className="flex flex-col items-center mt-14 sm:mt-20"
          >
            <div className="flex gap-6 sm:gap-8 text-sm text-gray-500 mb-8">
              {[{ label: "GitHub", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Resume", href: "/Tobias_Antonius_Resume.pdf" }].map((l) => (
                <motion.a key={l.label} href={l.href} target="_blank"
                  whileHover={{ color: "#ffffff", y: -2 }} className="transition-colors">
                  {l.label}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-700 text-xs">
              © {new Date().getFullYear()} Tobias Antonius. Built with Next.js & Tailwind CSS.
            </p>
          </motion.div>
        </section>

      </main>
    </>
  );
}