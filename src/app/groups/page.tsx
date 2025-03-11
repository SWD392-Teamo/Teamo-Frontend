"use client";
import { getData as getGroupData } from "@/actions/groupActions";
import { getData as getSemesterData } from "@/actions/semesterActions";
import GroupHeader from "@/components/groups/GroupHeader";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import GroupCard from "../[majors]/[subjects]/groups/GroupCard";
import HandlePaging from "@/components/HandlePaging";
import { useSemesterStore } from "@/hooks/useSemesterStore";

export default function Listings() {
  const [search, setSearch] = useState<string>("");
  const { showLoading, hideLoading } = useLoading();
  const [visibleItems, setVisibleItems] = useState<number>(2);
  const [pageSize, setPageSize] = useState(2);
  const pageIndex = 1;
  const incrementSize = 2;

  const { semesters, selectedSemester, setSelectedSemester, setSemesters } =
    useSemesterStore();

  const data = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      pageSize,
      semesterId: selectedSemester?.id,
      ...(search.trim() ? { search } : {}),
    },
  });
  console.log("url ", url);

  //fetch semesters
  useEffect(() => {
    showLoading();
    getSemesterData("")
      .then((data) => {
        setSemesters(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, []);

  // fetch groups
  useEffect(() => {
    showLoading();
    getGroupData(url, true)
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
    // Check if we need to fetch more data
    if (visibleItems >= data.groups.length && visibleItems < data.totalCount) {
      setPageSize((prev) => prev + incrementSize);
    }
    // Increase visible items
    setVisibleItems((prev) => Math.min(prev + incrementSize, data.totalCount));
  };
  const handleSeeLess = () => {
    // Reset visible items to initial value
    setVisibleItems(incrementSize);
  };

  return (
    <div className=" mb-10">
      <GroupHeader
        semesters={semesters}
        selectedSemester={selectedSemester}
        setSearch={setSearch}
        setSelectedSemester={setSelectedSemester}
      />
      <div>
        <div className="grid grid-cols-2 gap-6">
          {data.groups &&
            data.groups
              .slice(0, visibleItems)
              .map((group) => <GroupCard key={group.id} group={group} />)}
        </div>

        {/* paging */}
        <HandlePaging
          visibleItems={visibleItems}
          totalItems={data.totalCount}
          initialItems={incrementSize}
          handleSeeMore={handleSeeMore}
          handleSeeLess={handleSeeLess}
        />
      </div>
    </div>
  );
}
