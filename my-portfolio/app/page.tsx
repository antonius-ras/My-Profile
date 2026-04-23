"use client"; // จำเป็นต้องใส่บรรทัดนี้เมื่อใช้ Framer Motion ใน Next.js App Router

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Navbar Animation State ---
const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "My Lab", href: "/lab" },
  { id: "contact", label: "Contact" },
];
export default function HomePage() {
const [activeSection, setActiveSection] = useState<string>("");
const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
const [underlineProps, setUnderlineProps] = useState<{ left: number; width: number } | null>(null);

// Scroll spy logic
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY + 80; // offset for navbar height
    let current = "";
    for (const sec of ["about", "projects", "contact"]) {
      const el = document.getElementById(sec);
      if (el && el.offsetTop <= scrollY) {
        current = sec;
      }
    }
    setActiveSection(current || "about");
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Underline animation logic
useEffect(() => {
  const idx = sections.findIndex(
    (s) => (s.id && s.id === activeSection) || (s.href && activeSection === "lab")
  );
  if (idx !== -1 && navRefs.current[idx]) {
    const el = navRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const navRect = el.parentElement?.getBoundingClientRect();
      if (navRect) {
        setUnderlineProps({
          left: rect.left - navRect.left,
          width: rect.width,
        });
      }
    }
  }
}, [activeSection]);

// Scroll to section on click (smooth)
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sec: any) => {
  if (sec.href) return; // external link
  e.preventDefault();
  const el = document.getElementById(sec.id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  }
};

return (
  <>
    {/* --- Navbar --- */}
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative">
        <a href="#" className="text-white font-bold text-xl tracking-wider">
          TOBIAS<span className="text-gray-500">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 relative">
          {sections.map((sec, i) => (
            <motion.a
              key={sec.label}
              href={sec.href || `#${sec.id}`}
              ref={(el: any) => (navRefs.current[i] = el)}
              className={
                `relative px-1 py-1 transition-colors duration-200 ` +
                (activeSection === sec.id || (sec.href && activeSection === "lab")
                  ? "text-white"
                  : "hover:text-white")
              }
              onClick={(e:any) => handleNavClick(e, sec)}
            >
              <span className="relative z-10">{sec.label}</span>
            </motion.a>
          ))}
          {/* Animated underline */}
          <AnimatePresence>
            {underlineProps && (
              <motion.div
                key={"underline"}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  left: underlineProps.left,
                  width: underlineProps.width,
                }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, duration: 0.3 }}
                className="absolute bottom-0 h-[2.5px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                style={{ left: underlineProps.left, width: underlineProps.width }}
              />
            )}
          </AnimatePresence>
        </div>
        <a href="/resume" target="_blank" className="text-xs px-4 py-2 border border-gray-600 text-white rounded hover:bg-white hover:text-black transition-colors">
          Resume
        </a>
      </div>
    </motion.nav>

    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      {/* --- ส่วนที่ 1: Hero Section (ทยอยเฟดทีละบรรทัด) --- */}
      <div className="text-center max-w-3xl mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
        >
          Hi, I'm <span className="text-gray-400">Tobias.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
        >
          A Full-Stack Engineering student passionate about clean code,
          robust architecture, and building impactful tech solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="flex gap-4 justify-center"
        >
          <a href="#projects" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            View Projects
          </a>
          <a href="/resume.pdf" target="_blank" className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-white transition-colors">
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* --- ส่วนที่ 2: About Me & Tech Stack --- */}
      <section id="about" className="w-full max-w-5xl mt-40 px-6 pb-24">
        <div className="flex flex-col md:flex-row gap-16">

          {/* ฝั่งซ้าย: About Me */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold mb-6 text-white border-b border-gray-800 pb-4">About Me</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              I am a 3rd-year Computer Engineering student at Dhurakij Pundit University, actively seeking a software engineering internship for June - July 2026.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Beyond building full-stack web applications, I have a strong passion for Home Lab setups, server management, and hardware optimization. I enjoy bridging the gap between clean software architecture and robust physical systems.
            </p>
          </motion.div>

          {/* ฝั่งขวา: Tech Stack (เด้งทีละอัน) */}
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-3xl font-bold mb-6 text-white border-b border-gray-800 pb-4"
            >
              Tech Stack
            </motion.h2>
            <div className="flex flex-wrap gap-3">
              {[
                "JavaScript / TypeScript", "React & Next.js", "Node.js",
                "PostgreSQL / MySQL", "Tailwind CSS", "Docker",
                "REST APIs", "Git & GitHub", "ESP32 & Hardware"
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }} // <-- ตรงนี้แหละที่ทำให้เด้งทีละอัน
                  viewport={{ once: true }}
                  className="px-4 py-2 bg-[#111] border border-gray-800 rounded-full text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- ส่วนที่ 3: Featured Projects --- */}
      <section id="projects" className="w-full max-w-5xl mt-32 px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10 text-white border-b border-gray-800 pb-4"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* การ์ดที่ 1 (ขึ้นมาก่อน) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-500 transition-colors group flex flex-col"
          >
            <div className="h-48 relative border-b border-gray-800 overflow-hidden bg-[#1a1a1a]">
              <Image src="/my-mood.png" alt="My Mood App" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">My Mood (AI Music App)</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">A full-stack music application integrating Gemini AI via API...</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded">React</span>
                <span className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded">Node.js</span>
              </div>
            </div>
          </motion.div>

          {/* การ์ดที่ 2 (ขึ้นตามมาติดๆ) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-500 transition-colors group flex flex-col"
          >
            <div className="h-48 relative border-b border-gray-800 overflow-hidden bg-[#1a1a1a]">
              <Image src="/hotel.png" alt="Hotel Reservation System" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">Hotel Reservation System</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">A responsive full-stack hotel booking platform...</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded">PostgreSQL</span>
              </div>
            </div>
          </motion.div>

          {/* การ์ดที่ 3 (ขึ้นอันสุดท้าย) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-500 transition-colors group md:col-span-2"
          >
            <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 h-40 relative bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                <Image src="/esp32.png" alt="Thatri Vision ESP32" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">Thatri Vision (Hardware Monitor)</h3>
                <p className="text-gray-400 text-sm mb-4">A custom hardware-monitoring mini-monitor project powered by ESP32...</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#0a0a0a] border border-gray-800 text-gray-300 text-xs rounded">ESP32</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- ส่วนที่ 4: Contact & Footer --- */}
      <section id="contact" className="w-full max-w-5xl mt-12 px-6 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center border-t border-gray-800 pt-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Let's Build Something Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            I'm currently looking for a software engineering internship opportunity for June - July 2026.
            Whether you have a role available, or just want to connect, my inbox is always open!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex gap-6 mb-16"
          >
            <a href="mailto:antonius.19115@gmail.com" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-transform hover:-translate-y-1">
              Say Hello
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-8 text-sm text-gray-500 mb-12">
              <a href="#" target="_blank" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="/resume.pdf" target="_blank" className="hover:text-white transition-colors">Resume</a>
            </div>
            <p className="text-gray-700 text-xs">
              © {new Date().getFullYear()} Tobias Antonius. Built with Next.js & Tailwind CSS.
            </p>
          </motion.div>

        </motion.div>
      </section>

    </main>
  </>
);
}
