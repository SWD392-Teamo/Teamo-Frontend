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
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

export default function SubjectListings() {
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
      pageSize: 8,
      majorId: selectedMajor?.id,
      search: state.search,
    }))
  );

  const { subjects, totalCount } = useSubjectStore(
    useShallow((state) => ({
      subjects: state.subjects,
      totalCount: state.totalCount,
    }))
  );

  const setData = useSubjectStore((state) => state.setData);
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
    showLoading();
    getData(url).then((data) => {
      setData(data);
    })
    .catch((error) => {
      toast.error(error.status + ' ' + error.message);
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
      {selectedMajor && <SubjectHeader major={selectedMajor} setSearch={setSearch} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {subjects && subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, params.pageIndex - 1))}
                className={params.pageIndex === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, params.pageIndex + 1))}
                className={params.pageIndex === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}