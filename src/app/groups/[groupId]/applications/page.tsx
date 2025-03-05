'use client'

import { getGroupApplications, reviewApplication } from "@/actions/applicationActions";
import BackButton from "@/components/BackButton";
import GenericTable from "@/components/GenericTable";
import Title from "@/components/Title";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import { Application } from "@/types";
import { useParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

export default function ApplicationsListing() {
  const { showLoading, hideLoading } = useLoading();
  const params = useParams();
  const groupId = Number(params.groupId);

  // Use application params
  const applicationParams = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
    }))
  );

  // Use application store
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

  // Get applications data
  useEffect(() => {
    showLoading();
    getGroupApplications(groupId,  url).then((data) => {
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
    { header: "", key: "imgUrl" },
    { header: "Applicant", key: "studentName" },
    { header: "Position", key: "groupPositionName" },
    { header: "Date", key: "requestTime" },
    { header: "Action", key: "id" },
  ];
  
  const handleApprove = async (id: number) => {
    try {
      showLoading();
      // Approve application
      await reviewApplication(groupId, Number(id), {status: "Approved"})
      toast.success('Application approved successfully');
    } catch (error) {
      toast.error('Failed to approve application');
    } finally {
      hideLoading();
    }
  };

  const handleDecline = async (id: number) => {
    try {
      showLoading();
      // Reject application
      await reviewApplication(groupId, Number(id), {status: "Rejected"})
      toast.success('Application rejected successfully');
    } catch (error) {
      toast.error('Failed to reject application');
    } finally {
      hideLoading();
    }
  };

  // Define action buttons
  const actions = [
    {
      label: 'Approve',
      onClick: handleApprove,
      className: 'btn btn--primary--outline'
    },
    {
      label: 'Decline',
      onClick: handleDecline,
      className: 'btn btn--danger--outline'
    }
  ];

  return (
    <div className=" mb-10">
      <BackButton url="/" />
      <Title title="Group's Applications" />
      <div>
        {data.applications && (
          <GenericTable<Application>
            data={data.applications}
            columns={columns}
            actions={actions}
          />
        )}
      </div>
    </div>
  );
}
