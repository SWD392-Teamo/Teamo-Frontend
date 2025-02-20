"use client";

import { useState, useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AdminNavbar from "@/app/admin/navbar/page";  // ✅ Import navbar admin

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Gọi navbar admin vào đây */}
      <AdminNavbar />

      {/* Search Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold">Start Your Team Journey</h2>
        <div className="relative flex justify-center mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <AiOutlineSearch className="absolute right-[26%] top-3 text-blue-500 text-2xl" />
        </div>
      </div>
      {/* Student Cards Section */}
      <div className="container mx-auto mt-10 px-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Spring 2025</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        </div>
      </div>
    </div>
  )
};
