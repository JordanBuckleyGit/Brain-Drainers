import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 z-50">
      <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md">
        {/* Animated books */}
        <div className="flex gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-8 h-10 rounded-md"
              style={{
                background: `linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)`,
                boxShadow: "0 4px 16px 0 rgba(80,80,180,0.15)",
              }}
              initial={{ y: 0 }}
              animate={{ y: [0, -24, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {/* Animated brain */}
        <motion.span
          className="text-5xl mb-2"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          role="img"
          aria-label="brain"
        >
          🧠
        </motion.span>
        <div className="mt-2 text-xl font-bold text-white drop-shadow-lg text-center font-roboto">
          Loading your study session...
        </div>
      </div>
    </div>
  );
}