import Link from "next/link";
import BackButton from "../BackButton";
import SearchBar from "../SearchBar";
import React from "react";
import { Semester } from "@/types";
interface CategoryLink {
  name: string;
  href: string;
}
type GroupHeaderProps = {
  semesters: Semester[];
  selectedSemester: Semester | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSemester: (semester: Semester) => void;
};
export default function GroupHeader({
  semesters,
  selectedSemester,
  setSearch,
  setSelectedSemester,
}: GroupHeaderProps) {
  return (
    <div className="mb-10">
      {/* search bar */}
      <div className="my-10">
        <SearchBar setSearch={setSearch} />
      </div>

      {/* Navigation Bar */}
      <div className="w-full border-t border-b border-gray-200">
        <div className="overflow-x-auto">
          <nav className="flex justify-start px-4">
            {semesters.map((semester, index) => {
              const isActive = semester.id === selectedSemester?.id;
              return (
                <React.Fragment key={semester.name}>
                  <Link
                    href="#"
                    onClick={() => setSelectedSemester(semester)}
                    className={`whitespace-nowrap px-4 py-4 text-sm font-normal transition-colors border-b-2 ${
                      isActive
                        ? "text-blue-500 font-medium border-blue-500"
                        : "text-gray-600 hover:text-blue-500 border-transparent"
                    }`}
                  >
                    {semester.name}
                  </Link>
                  {index < semesters.length - 1 && (
                    <span className="sr-only">, </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>
      {/* Title */}
      <h1 className="page-title">Your Group</h1>
    </div>
  );
}
