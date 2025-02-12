import BackButton from "@/app/components/BackButton";
import SearchBar from "@/app/components/SearchBar";
import React from "react";
import SubjectCard from "./SubjectCard";

export default async function Listings({ params }: { params: { majors: string } }) {
  console.log ("params:", params);
  const subjectData: Record<string, string> = {
    se: "Software Engineer",
    ai: "Artificial Intelligence",
    ib: "International Business",
    mkt: "Digital Marketing",
    gd: "Graphic Design",
  };

  const { majors } = await params;
  const majorName = subjectData[majors] || "Unknown Major";

  return (
    <div className="mb-10">
      <div className="flex items-center">
        <BackButton url="/majors"/>
        <h1 className="subject-back-text ml-4">{majorName}</h1>
      </div>
      <div className="">
        <h1 className="page-title">Choose Subjects</h1>
      </div>
      <div className="my-10">
        <SearchBar />
      </div>
      <SubjectCard/>
    </div>
  );
}
