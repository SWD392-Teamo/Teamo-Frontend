import React from "react";
import MajorHeader from "./MajorHeader";
import MajorCard from "./MajorCard";
import { SampleMajor } from "../data/SampleMajor";

export default function Listings() {
  return (
    <div className=" mb-10">
      <MajorHeader />
      <MajorCard {...SampleMajor} />
    </div>
  );
}
