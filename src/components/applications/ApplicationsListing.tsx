'use client'

import { getGroupApplications, getUserApplications, reviewApplication } from "@/actions/applicationActions";
import ApplicationFilter from "@/components/applications/ApplicationFilter";
import AppPagination from "@/components/AppPagination";
import BackButton from "@/components/BackButton";
import GenericTable from "@/components/GenericTable";
import Title from "@/components/Home/Title";
import { useApplicationStore } from "@/hooks/useApplicationStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import { Application } from "@/types";
import { useParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

interface Props {
  isForUser: boolean;
}

export default function ApplicationsListing({isForUser}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const params = useParams();
  const groupId = Number(params.groupId);

  // Rerender only on these params
  const applicationParams = useParamsStore(
    useShallow(state => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      status: state.status,
      sort: state.sort
    }))
  );

  // Use application store
  const data = useApplicationStore(
    useShallow(state => ({
      applications: state.applications,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useApplicationStore(state => state.setData);
  const setParams = useParamsStore(state => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: applicationParams
  });

  // Set page index
  function setPageIndex(pageIndex: number) {
    setParams({pageIndex})
  }

  // Get applications for group
  function getApplicationsForGroup() {
    getGroupApplications(groupId, url).then((data) => {
      setData(data);
    })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // Get applications for user
  function getApplicationsForUser() {
    getUserApplications(url).then((data) => {
      setData(data);
    })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // Get applications data
  useEffect(() => {
    showLoading();
    if (!isForUser) {
      getApplicationsForGroup();
    }
    else {
      getApplicationsForUser();
    }
  }, [url, setData, showLoading, hideLoading]);


  // Define the columns for the table
  const columns: { header: string; key: keyof Application }[] = [
    { header: "", key: "imgUrl" },
    { header: "Applicant", key: "studentName" },
    { header: "Position", key: "groupPositionName" },
    { header: "Date", key: "requestTime" },
  ];

  if(!isForUser) {
    columns.push({ header: "Action", key: "id" });
  }
  
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
      <h1 className="page-title">
          Group Application
        </h1>
        <div></div>      
        <ApplicationFilter />
      {data.applications && (
        <GenericTable<Application>
          data={data.applications}
          columns={columns}
          actions={actions}
        />
      )}
      <div className='flex justify-end mt-5'>
        <AppPagination 
          pageChanged={setPageIndex} 
          currentPage={applicationParams.pageIndex}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
        />
      </div>
    </div>
  );
}
