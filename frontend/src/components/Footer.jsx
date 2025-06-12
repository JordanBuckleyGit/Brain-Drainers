import React, { useState,useEffect } from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1117] text-gray-300 py-4 flex flex-col items-center mt-auto font-roboto">
      <div className="text-sm">
        &copy; {new Date().getFullYear()} Study App. All rights reserved.
      </div>
    </footer>
  );
}