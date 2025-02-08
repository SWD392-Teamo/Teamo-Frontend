"use client";

import MajorCard from "@/app/components/MajorCard";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Home: React.FC = () => {
  const majors = [
    { title: "Software Engineer", link: "/se/subjects" },
    { title: "Artificial Intelligence", link: "/ai/subjects" },
    { title: "International Business", link: "/ib/subjects" },
    { title: "Digital Marketing", link: "/mkt/subjects" },
    { title: "Graphic Design", link: "/gd/subjects" },
    { title: "Software Engineer", link: "/se/subjects" },
    { title: "Artificial Intelligence", link: "/ai/subjects" },
    { title: "International Business", link: "/ib/subjects" },
    { title: "Digital Marketing", link: "/mkt/subjects" },
    { title: "Graphic Design", link: "/gd/subjects" },
    { title: "Software Engineer", link: "/se/subjects" },
    { title: "Artificial Intelligence", link: "/ai/subjects" },
    { title: "International Business", link: "/ib/subjects" },
    { title: "Digital Marketing", link: "/mkt/subjects" },
    { title: "Graphic Design", link: "/gd/subjects" },
  ];

  const [visibleMajors, setVisibleMajors] = useState<number>(6);

  const handleSeeMore = () => {
    setVisibleMajors((prev) => prev + 6);
  };

  return (
    <div>
      <div className="flex flex-row-reverse">
        <select className=" border border-gray-300 rounded-lg px-4 py-2 text-black mb-4">
          <option>All Majors</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6 ">
        {majors.slice(0, visibleMajors).map((major) => (
          <MajorCard key={major.title} title={major.title} link={major.link} />
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
