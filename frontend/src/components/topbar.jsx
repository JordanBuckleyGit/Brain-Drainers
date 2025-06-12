import React, { useState, useEffect } from "react";
import userImg from "../assets/user.png";
import { motion, AnimatePresence } from "framer-motion";

function Topbar() {
  const [username, setUsername] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/user", { credentials: "include" })
      .then((res) => res.ok ? res.json() : { username: "Guest" })
      .then((data) => setUsername(data.username || "Guest"))
      .catch(() => setUsername("Guest"));
  }, []);

  return (
    <>
      <header className="w-full bg-[#0d1117] text-white shadow flex items-center px-4 py-2 justify-between font-roboto">
        {/* Left: Logo and Username */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded hover:bg-[#161b22]"
            onClick={() => setShowDashboard((prev) => !prev)}
            aria-label="Open dashboard"
          >
            {/* Hamburger menu icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl font-bold tracking-tight font-roboto">🐙</span>
          <span className="text-2xl font-semibold tracking-wide font-roboto">{username}</span>
        </div>
        {/* Center: Navigation */}
        <nav className="flex gap-6 font-roboto">
          <a href="#" className="border-b-2 border-orange-500 pb-1 text-white font-medium font-roboto">Overview</a>
          <a href="#" className="hover:text-blue-400 transition font-roboto">Study Contributions</a>
          <a href="#" className="hover:text-blue-400 transition font-roboto">Study Hours</a>
          <a href="#" className="hover:text-blue-400 transition font-roboto">My Notes</a>
          <a href="#" className="hover:text-blue-400 transition font-roboto">Group Study</a>
        </nav>
        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-[#161b22]" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-[#161b22]" aria-label="Notifications">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-1 rounded-full hover:ring-2 hover:ring-blue-400">
            <img
              src={userImg}
              alt="User avatar"
              className="inline-block w-8 h-8 bg-gray-600 rounded-full object-cover"
            />
          </button>
        </div>
      </header>
      {/* Dashboard/sidebar */}
      <AnimatePresence>
        {showDashboard && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "18rem", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed top-0 left-0 h-full bg-[#161b22] text-white shadow-2xl z-50 flex flex-col overflow-hidden font-roboto"
            style={{ willChange: "width, opacity" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="font-bold text-xl font-roboto">Dashboard</span>
              <button
                onClick={() => setShowDashboard(false)}
                className="p-2 rounded hover:bg-[#21262d] transition"
                aria-label="Close dashboard"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto font-roboto">
              <ul className="p-4 space-y-2 font-roboto">
                {/* ...your nav items... */}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Topbar;