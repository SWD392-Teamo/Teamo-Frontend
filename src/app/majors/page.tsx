"use client";

import React, { useEffect, useState } from "react";
import MajorHeader from "./MajorHeader";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import { useMajorStore } from "@/hooks/useMajorStore";
import queryString from "query-string";
import { getData } from "../../actions/majorActions";
import { FaChevronDown } from "react-icons/fa";
import MajorCard from "./MajorCard";
import { useLoading } from "@/providers/LoadingProvider";
import toast from "react-hot-toast";

export default function Listings() {
  const { showLoading, hideLoading } = useLoading();
  const [visibleMajors, setVisibleMajors] = useState<number>(6);
  const [search, setSearch] = useState<string>("");


  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      // search: state.search,
    }))
  );

  const data = useMajorStore(
    useShallow((state) => ({
      majors: state.majors,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useMajorStore((state) => state.setData);
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
    setVisibleMajors((prev) => prev + 6);
  };

  return (
    <div className=" mb-10">
      <MajorHeader setSearch={setSearch} />
      <div>
        <div className="grid grid-cols-3 gap-6 ">
          {data.majors && data.majors.slice(0, visibleMajors).map((major) => (
            <MajorCard key={major.id} major={major} />
          ))}
        </div>

        {data.majors && visibleMajors < data.majors.length && (
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
