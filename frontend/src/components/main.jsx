import React, { useState } from "react";
import Topbar from "./topbar";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function MainPage() {
  const [mode, setMode] = useState("ask"); // "ask", "timeline", "sessions"

  // Example data for Chart.js
  const chartData = {
    labels: ["Start", "10m", "20m", "30m", "40m", "50m", "End"],
    datasets: [
      {
        label: "Focus Level",
        data: [10, 30, 50, 40, 60, 80, 100],
        fill: false,
        borderColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  // Example previous sessions
  const sessions = [
    { date: "2025-06-10", duration: "45 min" },
    { date: "2025-06-09", duration: "1 hr 10 min" },
    { date: "2025-06-08", duration: "30 min" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-roboto">
      <Topbar />
      <div className="flex-1 flex items-start justify-start p-8">
        <div className="w-[350px] bg-[#161b22] rounded-lg shadow-lg p-6 flex flex-col items-start">
          {mode === "ask" && (
            <>
              <h1 className="text-xl font-bold mb-6 text-white">Are you studying now?</h1>
              <div className="flex gap-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition"
                  onClick={() => setMode("timeline")}
                >
                  Yes
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
                  onClick={() => setMode("sessions")}
                >
                  No
                </button>
              </div>
            </>
          )}

          {mode === "timeline" && (
            <div className="w-full">
              <h2 className="text-lg font-bold text-white mb-4">Study Timeline</h2>
              <Line data={chartData} options={{
                responsive: true,
                plugins: { legend: { labels: { color: "#fff" } } },
                scales: {
                  x: { ticks: { color: "#fff" }, grid: { color: "#333" } },
                  y: { ticks: { color: "#fff" }, grid: { color: "#333" } },
                },
              }} />
              <button
                className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
                onClick={() => setMode("ask")}
              >
                Back
              </button>
            </div>
          )}

          {mode === "sessions" && (
            <div className="w-full">
              <h2 className="text-lg font-bold text-white mb-4">Previous Study Sessions</h2>
              <ul className="text-white space-y-2">
                {sessions.map((s, i) => (
                  <li key={i} className="flex justify-between border-b border-gray-700 pb-1">
                    <span>{s.date}</span>
                    <span>{s.duration}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
                onClick={() => setMode("ask")}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}