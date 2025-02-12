"use client";

import SubjectCard from "@/app/components/SubjectCard";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Home: React.FC = () => {
  const subjects = [
    { title: "EXE101", link: "EXE101/groups" },
    { title: "SWP391", link: "SWP391/groups" },
    { title: "SWD392", link: "SWD392/groups" },
    { title: "SSG104", link: "SSG104/groups" },
    { title: "EXE201", link: "EXE201/groups" },
    { title: "PRM392", link: "PRM392/groups" },
    { title: "IOT102", link: "IOT102/groups" },
    { title: "SEP490", link: "SEP490/groups" },
    { title: "EXE101", link: "EXE101/groups" },
    { title: "SWP391", link: "SWP391/groups" },
    { title: "SWD392", link: "SWD392/groups" },
    { title: "SSG104", link: "SSG104/groups" },
    { title: "EXE201", link: "EXE201/groups" },
    { title: "PRM392", link: "PRM392/groups" },
    { title: "IOT102", link: "IOT102/groups" },
    { title: "SEP490", link: "SEP490/groups" },
    { title: "EXE101", link: "EXE101/groups" },
    { title: "SWP391", link: "SWP391/groups" },
    { title: "SWD392", link: "SWD392/groups" },
    { title: "SSG104", link: "SSG104/groups" },
    { title: "EXE201", link: "EXE201/groups" },
    { title: "PRM392", link: "PRM392/groups" },
    { title: "IOT102", link: "IOT102/groups" },
    { title: "SEP490", link: "SEP490/groups" },
  ];

  const [visibleMajors, setVisibleMajors] = useState<number>(8);

  const handleSeeMore = () => {
    setVisibleMajors((prev) => prev + 6);
  };

  return (
    <div>
      <div className="flex flex-row-reverse">
        <select className=" border border-gray-300 rounded-lg px-4 py-2 text-black mb-4">
          <option>All Subjects</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6 ">
        {subjects.slice(0, visibleMajors).map((subject) => (
          <SubjectCard key={subject.title} title={subject.title} link={subject.link} />
        ))}
      </div>

      {visibleMajors < subjects.length && (
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
