"use client";

import MajorCard from "@/app/components/MajorCard";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MajorList } from "../models/Major";

const Home: React.FC<MajorList> = ({ majors }) => {
  const [visibleMajors, setVisibleMajors] = useState<number>(6);

  const handleSeeMore = () => {
    setVisibleMajors((prev) => prev + 6);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 ">
        {majors.slice(0, visibleMajors).map((major) => (
          <MajorCard key={major.id} {...major} />
        ))}
      </div>

      {visibleMajors < majors.length && (
      <div className="mt-8 flex justify-center">
        <button className="text-logo text-lg hover:underline flex flex-row items-center gap-2" onClick={handleSeeMore}>
          <div>See More</div>
          <FaChevronDown color="gray" />
        </button>
      </div>
      )}
    </div>
  );
};

export default Home;
