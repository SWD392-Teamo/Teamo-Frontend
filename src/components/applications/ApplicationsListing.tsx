'use client';

import {
  getApplicationById,
  getGroupApplications,
  getUserApplications,
  reviewApplication,
} from '@/actions/applicationActions';
import ApplicationFilter from '@/components/applications/ApplicationFilter';
import AppPagination from '@/components/AppPagination';
import BackButton from '@/components/BackButton';
import GenericTable from '@/components/GenericTable';
import { useApplicationStore } from '@/hooks/useApplicationStore';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Application } from '@/types';
import { useParams } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';
import AppModal from '../AppModal';
import ApplicationDetails from './ApplicationDetails';
import EmptyFilter from '../EmptyFilter';
import { addMember } from '@/actions/groupActions';
import { addGroupMembers } from '@/types/interface';

interface Props {
  isForUser: boolean;
}

export default function ApplicationsListing({ isForUser }: Props) {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [status, setStatus] = useState<string>('requested');
  const [sort, setSort] = useState<string>('');

  const params = useParams();
  const groupId = Number(params.groupId);

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Use application store
  const data = useApplicationStore(
    useShallow((state) => ({
      applications: state.applications,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useApplicationStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: '',
    query: {
      pageIndex,
      status,
      sort,
    },
  });

  //=====================================
  //      GET APPLICATIONS LIST
  //=====================================

  // Get applications for group
  function getApplicationsForGroup() {
    getGroupApplications(groupId, url)
      .then((data) => {
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
    getUserApplications(url)
      .then((data) => {
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
    } else {
      getApplicationsForUser();
    }
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET APPLICATION BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getApplication(id);
  }

  function getApplication(id: number) {
    getApplicationById(id)
      .then((data) => {
        setSelectedApplication(data);
      })
      .catch((error) => {
        toast.error(error.status + ' ' + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      APPLICATION TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Application }[] = [
    { header: 'Position', key: 'groupPositionName' },
    { header: 'Date', key: 'requestTime' },
    { header: 'Status', key: 'status' },
  ];

  if (!isForUser) {
    columns.unshift({ header: 'Applicant', key: 'studentName' });
    columns.unshift({ header: '', key: 'imgUrl' });
  }
  if (isForUser) {
    columns.unshift({ header: 'Group', key: 'groupName' });
  }
  if (!isForUser && !(status === 'rejected' || status === 'approved')) {
    columns.push({ header: 'Action', key: 'id' });
  }

  // APPROVE ACTION
  const handleApprove = async (id: number) => {
    try {
      showLoading();

      // Approve application
      const application = await getApplicationById(id);
      await reviewApplication(groupId, Number(id), { status: 'Approved' });

      // Add member to the group
      const res = await addMember(groupId, {
        studentId: application?.studentId,
        groupPositionIds: [application.groupPositionId]
      });
      
      if (res.error == undefined) {
        toast.success('Application approved successfully');
      }
      else if(res.error.message.statusCode == 400) {
        toast.error(res.error.message.message);
      }

      if (isForUser) {
        getApplicationsForUser();
      } else {
        getApplicationsForGroup();
      }
    } catch (error) {
      toast.error('Failed to approve application');
    } finally {
      hideLoading();
    }
  };

  // DECLINE ACTION
  const handleDecline = async (id: number) => {
    try {
      showLoading();
      // Reject application
      await reviewApplication(groupId, Number(id), { status: 'Rejected' });
      toast.success('Application rejected successfully');
    } catch (error) {
      toast.error('Failed to reject application');
    } finally {
      hideLoading();
    }
  };

  // ACTION BUTTONS
  const actions = [
    {
      label: 'Approve',
      onClick: handleApprove,
      className: 'btn btn--primary--outline',
    },
    {
      label: 'Decline',
      onClick: handleDecline,
      className: 'btn btn--danger--outline',
    },
  ];

  return (
    <div className=' mb-10'>
      <BackButton />
      <h1 className='page-title mb-5'>
        {isForUser ? 'My Applications' : 'Group Applications'}
      </h1>
      {/* Application Filters */}
      <ApplicationFilter
        status={status}
        sort={sort}
        setSort={setSort}
        setStatus={setStatus}
        setPageIndex={setPageIndex}
      />

      {data.totalCount > 0 ? (
        <>
          {/* Application Table */}
          {data.applications && (
            <GenericTable<Application>
              data={data.applications}
              columns={columns}
              actions={actions}
              onRowClick={handleRowClick}
            />
          )}

          {/* Application Pagination */}
          <div className='flex justify-end mt-5'>
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Application Details Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title='Application Details'
            size='3xl'
          >
            <ApplicationDetails application={selectedApplication!} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title='No applications found'
            subtitle='Try changing the filters or reset it completely'
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
