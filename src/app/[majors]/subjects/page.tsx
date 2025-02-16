'use client'

import BackButton from "@/app/components/BackButton";
import SearchBar from "@/app/components/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { getData } from "@/app/actions/subjectAction";
import SubjectCard from "./SubjectCard";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Listings() {
  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  

  console.log("selectedMajor", selectedMajor)

  const [loading, setLoading] = useState(true);
  const [visibleMajors, setVisibleMajors] = useState<number>(8);
  const [search, setSearch] = useState<string>("");

  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      majorId: selectedMajor?.id,
      // search: state.search,
    }))
  );

  const data = useSubjectStore(
    useShallow((state) => ({
      subjects: state.subjects,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useSubjectStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    setLoading(true);
    getData(url).then((data) => {
      console.log("Fetched data:", data);
      setData(data);
      setLoading(false);
    });
  }, [url, setData]); 
  

  console.log(data);

  const handleSeeMore = () => {
    setVisibleMajors((prev) => prev + 8);
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="mb-10">
      <div className="flex items-center">
        <BackButton url="/majors" />
        <h1 className="subject-back-text ml-4">
          {selectedMajor && selectedMajor.name}
        </h1>
      </div>
      <div className="">
        <h1 className="page-title">Choose Subjects</h1>
      </div>
      <div className="my-10">
        <SearchBar setSearch={setSearch} />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-6 ">
          {data.subjects && data.subjects.slice(0, visibleMajors).map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {data.subjects && visibleMajors < data.subjects.length && (
          <div className="mt-8 flex justify-center">
            <button
              className="text-logo text-lg hover:underline flex flex-row items-center gap-2"
              onClick={handleSeeMore}
            >
              <div>See More</div>
              <FaChevronDown color="gray" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
