"use client";

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setSearch(query); 
  };

  return (
    <div className="mt-6 relative w-1/2">
      <input
        type="text"
        className="w-full pl-10 pr-24 py-3 rounded-full  border border-gray-300 focus:ring-2 focus:ring-logo focus:outline-none text-lg text-gray-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
      />
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#E2EFFF] p-3 rounded-full"
      onClick={handleSearch} >
        <BiSearch
          className="text-gray-700"
          size={24}
        />
      </div>
    </div>
  );
}
