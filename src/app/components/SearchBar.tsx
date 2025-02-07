"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";
import { PiSlidersHorizontal } from "react-icons/pi";

export default function SearchBar() {

  return (
    <div className="mt-6 relative w-1/2">
      <input
        type="text"
        className="w-full px-12 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-logo focus:outline-none text-lg text-gray-600"
      />
      <BiSearch
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black"
        size={20}
      />
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black">
        <PiSlidersHorizontal size={20} />
      </button>
    </div>
  );
}
