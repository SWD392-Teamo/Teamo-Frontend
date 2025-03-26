"use client";

import React from "react";
import BackButton from "../../components/BackButton";
import SearchBar from "../../components/SearchBar";

export default function MajorHeader({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div>
      <BackButton  />
      <div className="">
        <h1 className="page-title">Choose Major</h1>
      </div>
      <div className="my-10">
        <SearchBar setSearch={setSearch} />
      </div>
    </div>
  );
}
