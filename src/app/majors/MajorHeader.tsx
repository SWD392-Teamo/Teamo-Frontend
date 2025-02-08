"use client";

import React from "react";
import BackButton from "../components/BackButton";
import SearchBar from "../components/SearchBar";

export default function MajorHeader() {
  return (
    <div>
      <BackButton url="/" />
      <div className="">
        <h1 className="page-title">Choose Major</h1>
      </div>
      <div className="my-10">
        <SearchBar />
      </div>
    </div>
  );
}
