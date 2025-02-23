"use client";

import React, { useEffect, useState } from "react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import { useMajorStore } from "@/hooks/useMajorStore";
import queryString from "query-string";
import { FaChevronDown } from "react-icons/fa";
import { useLoading } from "@/providers/LoadingProvider";
import toast from "react-hot-toast";
import { getGroupApplications } from "@/actions/applicationActions";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import GenericTable from "./GenericTable";
import { Application } from "@/types";

export default function Listings({params}: {params: {id: string}}) {
  const { showLoading, hideLoading } = useLoading();

  const applicationParams = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    }))
  );

  const data = useApplicationStore(
    useShallow((state) => ({
      applications: state.applications,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );

  const setData = useApplicationStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...params,
    },
  });

  useEffect(() => {
    showLoading();
    getGroupApplications(Number(params.id),  url).then((data) => {
      setData(data);
    })
    .catch((error) => {
      toast.error(error.status + ' ' + error.message);
    })
    .finally(() => {
      hideLoading();
    });
  }, [url, setData, showLoading, hideLoading]);


  // Define the columns for the table
  const columns: { header: string; key: keyof Application }[] = [
    { header: "Applicant", key: "studentName" },
    { header: "Position", key: "groupPositionName" },
    { header: "Date", key: "requestTime" },
    { header: "Action", key: "id"},
  ];
  
  console.log(data);

  return (
    <div className=" mb-10">
      
      <div>
        {data.applications &&
            <GenericTable<Application> data={data.applications} columns={columns} />
        }
      </div>
    </div>
  );
}
