"use client";

import React from "react";
import BackButton from "../components/BackButton";
import SearchBar from "../components/SearchBar";

export default function MajorHeader() {
  return (
    <div>
      <BackButton />
      <div className="mt-3">
        <h1 className="text-3xl font-semibold text-black">Choose Major</h1>
      </div>
      <div className="my-10">
        <SearchBar />
      </div>
    </div>
  );
}
