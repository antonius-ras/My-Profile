"use client";

import { motion } from "framer-motion";
import Link from "next/link"; // เครื่องมือของ Next.js สำหรับเปลี่ยนหน้าแบบไม่โหลดใหม่

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 p-8 md:p-24 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* ปุ่มกลับหน้าหลัก */}
        <Link href="/" className="text-gray-500 hover:text-white mb-12 inline-block transition-colors">
          ← Back to Portfolio
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
          <span className="text-green-500 animate-pulse">●</span> Home Lab Dashboard
        </h1>
        <p className="text-gray-500 mb-12 text-sm md:text-base">
          My personal server infrastructure and self-hosted environment. Bridging the gap between code and bare-metal hardware.
        </p>

        {/* ส่วนโชว์สเปกเครื่องเซิร์ฟเวอร์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* กล่อง Hardware */}
          <div className="bg-[#111] border border-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4 border-b border-gray-800 pb-2">Hardware Node</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Motherboard:</span> 
                <span className="text-white bg-gray-900 px-2 py-1 rounded">MSI PRO B760M-A WIFI</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Processor:</span> 
                <span className="text-white bg-gray-900 px-2 py-1 rounded">Intel Core i5-12400F</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Status:</span> 
                <span className="text-green-400 font-bold">Online</span>
              </li>
            </ul>
          </div>

          {/* กล่อง Services */}
          <div className="bg-[#111] border border-gray-800 p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4 border-b border-gray-800 pb-2">Active Services</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Containers:</span> 
                <span className="text-white">12 Running</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Database:</span> 
                <span className="text-white">PostgreSQL (Primary)</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">System Uptime:</span> 
                <span className="text-white">45 Days, 12 Hrs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* หน้าต่าง Terminal Mockup เท่ๆ */}
        <div className="bg-black border border-gray-800 rounded-lg p-4 overflow-x-auto shadow-2xl">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="text-xs md:text-sm text-green-400 leading-relaxed">
            <code>
              tobias@server:~$ ssh admin@192.168.1.100<br/>
              Welcome to Tobias Server Infrastructure.<br/>
              Last login: Thu Apr 23 01:10:00 2026 from 192.168.1.50<br/>
              <br/>
              System load:  0.15 0.05 0.01<br/>
              Usage of /:   45.2% of 1TB<br/>
              Memory usage: 32%<br/>
              <br/>
              tobias@server:~$ ping -c 3 google.com<br/>
              64 bytes from 142.250.191.46: icmp_seq=1 ttl=115 time=12.4 ms<br/>
              <br/>
              tobias@server:~$ _
            </code>
          </pre>
        </div>

      </motion.div>
    </main>
  );
}