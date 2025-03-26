"use client";

import { getData } from "@/actions/groupActions";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { useLoading } from "@/providers/LoadingProvider";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";
import GroupHeader from "./GroupHeader";
import GroupCard from "../../../../components/groups/GroupCard";
import { useGroupStore } from "@/hooks/useGroupStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getUserId } from "@/actions/userActions";

export default function Listings() {
  const [userId, setUserId] = useState<number | null>(null);

  const { selectedSubject } = useSubjectStore(
    useShallow((state) => ({
      selectedSubject: state.selectedSubject,
    }))
  );

  const { selectedMajor } = useMajorStore(
    useShallow((state) => ({
      selectedMajor: state.selectedMajor,
    }))
  );

  const { showLoading, hideLoading } = useLoading();
  const [search, setSearch] = useState<string>("");

  const params = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: 4,
      subjectId: selectedSubject?.id,
      search: state.search,
    }))
  );

  const { groups, totalCount } = useGroupStore(
    useShallow((state) => ({
      groups: state.groups,
      totalCount: state.totalCount,
    }))
  );

  const setData = useGroupStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const totalPages = Math.ceil(totalCount / params.pageSize);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
      ...(search.trim() ? { search } : {}),
    },
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    showLoading();
    getData(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, [url, setData, showLoading, hideLoading]);

  const handlePageChange = (page: number) => {
    setParams({ pageIndex: page });
    window.scrollTo(0, 0);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={params.pageIndex === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(2, params.pageIndex - 1);
    let endPage = Math.min(totalPages - 1, params.pageIndex + 1);

    const maxMiddlePages = maxVisiblePages - 2;
    if (endPage - startPage + 1 > maxMiddlePages) {
      if (params.pageIndex - startPage > endPage - params.pageIndex) {
        startPage = Math.max(2, endPage - maxMiddlePages + 1);
      } else {
        endPage = Math.min(totalPages - 1, startPage + maxMiddlePages - 1);
      }
    }

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={params.pageIndex === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={params.pageIndex === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };


  return (
    <div className="mb-10">
      {selectedMajor && selectedSubject && (
        <GroupHeader
          subject={selectedSubject}
          major={selectedMajor}
          setSearch={setSearch}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {groups &&
          groups.map((group) => <GroupCard key={group.id} group={group} />)}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  handlePageChange(Math.max(1, params.pageIndex - 1))
                }
                className={
                  params.pageIndex === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(Math.min(totalPages, params.pageIndex + 1))
                }
                className={
                  params.pageIndex === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
