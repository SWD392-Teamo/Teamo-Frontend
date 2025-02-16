import BackButton from "@/app/components/BackButton";
import SearchBar from "@/app/components/SearchBar";
import { Major } from "@/types";
import React from "react";


export default function SubjectHeader({ major, setSearch }: { major: Major; setSearch: React.Dispatch<React.SetStateAction<string>> }) {

  return (
    <div>
      <div className="flex items-center">
        <BackButton url="/majors" />
        <h1 className="subject-back-text ml-4">{major.name}</h1>
      </div>
      <div className="">
        <h1 className="page-title">Choose Subjects</h1>
      </div>
      <div className="my-10">
        <SearchBar setSearch={setSearch}/>
      </div>
    </div>
  );
};

