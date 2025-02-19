'use client'

import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import queryString from "query-string";
import { getData } from "@/actions/subjectAction";
import SubjectCard from "./SubjectCard";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { FaChevronDown } from "react-icons/fa";
import SubjectHeader from "./SubjectHeader";
import Loading from "@/components/Loading";

export default function Listings() {
  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  console.log("selectedMajor", selectedMajor)

  const [loading, setLoading] = useState(true);
  const [visibleSubject, setVisibleSubject] = useState<number>(8);
  const [search, setSearch] = useState<string>("");
  
  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      majorId: selectedMajor?.id,
      search: state.search,
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
    setVisibleSubject((prev) => prev + 8);
  };

  if (loading) return <Loading/>;

  return (
    <div className="mb-10">
      {selectedMajor && <SubjectHeader major={selectedMajor} setSearch={setSearch}/>}
      <div>
        <div className="grid grid-cols-4 gap-6 ">
          {data.subjects && data.subjects.slice(0, visibleSubject).map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {data.subjects && visibleSubject < data.subjects.length && (
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
