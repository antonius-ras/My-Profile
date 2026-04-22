"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 p-8 md:p-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#111] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-[#1a1a1a] p-10 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Tobias Tonkhaau Ras</h1>
            <p className="text-green-400 font-mono text-sm">Computer Engineering Student | Full-Stack Developer</p>
          </div>
          <div className="text-right text-sm text-gray-400 space-y-1">
            <p>📍 Chaengwattana, Bangkok</p>
            <p>📧 antonius.19115@gmail.com</p>
            <p>📞 082-0493331</p>
          </div>
        </div>

        <div className="p-10 space-y-12">
          {/* Profile Section */}
          <section>
            <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Profile</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              Driven 3rd-year Computer Engineering student at Dhurakij Pundit University seeking a software engineering internship. Experienced in developing full-stack applications, managing structured databases, and hardware optimization. Passionate about clean code, robust architecture, and bridging the gap between software and physical systems.
            </p>
          </section>

          {/* Experience / Projects */}
          <section>
            <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Academic Projects</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-white font-semibold">AI-Powered Music Streaming App (My Mood)</h3>
                  <span className="text-xs text-gray-500">React, Node.js, Gemini API</span>
                </div>
                <p className="text-sm text-gray-400">
                  Built a full-stack music application integrating Gemini AI to dynamically generate personalized, mood-based playlists. Managed backend architecture connecting to a 3NF-standardized database.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-white font-semibold">Hotel Reservation System</h3>
                  <span className="text-xs text-gray-500">React, Tailwind, PostgreSQL</span>
                </div>
                <p className="text-sm text-gray-400">
                  Developed a full-stack hotel booking platform. Designed a relational database to efficiently manage room availability, user profiles, and transactions via RESTful APIs.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-white font-semibold">Thatri Vision (Hardware Monitor)</h3>
                  <span className="text-xs text-gray-500">ESP32, C/C++</span>
                </div>
                <p className="text-sm text-gray-400">
                  Created a custom hardware-monitoring mini-monitor project powered by ESP32, demonstrating the integration between software data and physical hardware displays.
                </p>
              </div>
            </div>
          </section>

          {/* Education & Skills Split */}
          <div className="grid md:grid-cols-2 gap-10">
            <section>
              <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Education</h2>
              <div>
                <h3 className="text-white font-semibold">Dhurakij Pundit University (DPU)</h3>
                <p className="text-sm text-gray-400 mb-1">B.Eng. Computer Engineering</p>
                <p className="text-xs text-gray-500 font-mono">2023 - Present (3rd Year)</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2 mb-4">Skills</h2>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong className="text-gray-300">Languages:</strong> JS/TS, Python, C++, SQL</p>
                <p><strong className="text-gray-300">Web:</strong> React, Next.js, Node.js, Tailwind</p>
                <p><strong className="text-gray-300">Tools:</strong> Git, Docker, REST APIs</p>
                <p><strong className="text-gray-300">Hardware:</strong> ESP32, Server Management</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto mt-8 flex justify-between">
        <Link href="/" className="text-gray-500 hover:text-white transition-colors">
          ← Back to Portfolio
        </Link>
        <a href="/Tobias_Antonius_Resume.pdf" download className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors">
          Download PDF
        </a>
      </div>
    </main>
  );
}