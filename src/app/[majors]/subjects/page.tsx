'use client'

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
import { useLoading } from "@/providers/LoadingProvider";
import toast from "react-hot-toast";

export default function Listings() {
  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  console.log("selectedMajor", selectedMajor)

  const { showLoading, hideLoading } = useLoading();
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
    showLoading();
    getData(url).then((data) => {
      console.log("data", data);
      setData(data);
    })
    .catch((error) => {
      toast.error(error.status + ' ' + error.message);
    })
    .finally(() => {
      hideLoading();
    });
  }, [url, setData, showLoading, hideLoading]);
  

  console.log(data);

  const handleSeeMore = () => {
    setVisibleSubject((prev) => prev + 8);
  };

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
