"use client";
import { getData } from "@/actions/groupActions";
import GroupHeader from "@/components/groups/GroupHeader";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import GroupCard from "../[majors]/[subjects]/groups/GroupCard";
import AppPagination from "@/components/AppPagination";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import HandlePaging from "@/components/HandlePaging";

export default function Listings() {
  const [search, setSearch] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  const [visibleData, setVisibleData] = useState<number>(2);

  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    }))
  );

  const data = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);
  const resetParams = useParamsStore((state) => state.reset);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });
  console.log("url ", url);

  useEffect(() => {
    showLoading();
    //resetParams();
    getData(url, true)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, [url]);

  const handleSeeMore = () => {
    if(visibleData < data.totalCount) {
      setVisibleData(visibleData => visibleData + 2);
    }
    else {
      setParams({pageSize: params.pageSize + 2});
    }
  };
  const handleSeeLess = () => {
    setVisibleData(2);
  };

  return (
    <div className=" mb-10">
      <GroupHeader setSearch={setSearch} />
      <div>
        <div className="grid grid-cols-2 gap-6">
          {data.groups &&
            data.groups.slice(0,visibleData).map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
        </div>

        {/* paging */}
        <HandlePaging visibleData={visibleData} totalItems={data.groups.length} 
        handleSeeMore={handleSeeMore} handleSeeLess={handleSeeLess}/>
      </div>
    </div>
  );
}
