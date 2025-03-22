'use client'

import AppModal from '@/components/AppModal';
import AppPagination from '@/components/AppPagination';
import EmptyFilter from '@/components/EmptyFilter';
import GenericTable from '@/components/GenericTable';
import { useSubjectStore } from '@/hooks/useSubjectStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Major, Subject } from '@/types';
import { Button } from 'flowbite-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { useShallow } from 'zustand/shallow';
import Filter from '../Filter';
import SubjectForm from './SubjectForm';
import { deleteSubject, getData, getSubjectById } from '@/actions/subjectAction';

export default function MajorsListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedSubject, setSelectedSubject] = useState<Subject>();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Use subject store
  const data = useSubjectStore(
    useShallow((state) => ({
      subjects: state.subjects,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useSubjectStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      status,
      ...(search.trim() ? { search } : {}),
    }
  });

  //=====================================
  //      GET SUBJECTS LIST
  //=====================================

  // Get majors
  function getSubjects() {
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
  }

  // Get majors data
  useEffect(() => {
    getSubjects();
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET SUBJECT BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getSubject(id);
  }

  async function getSubject(id: number) {
    getSubjectById(id)
      .then((data) => {
        setSelectedSubject(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      SUBJECT TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Major }[] = [
    { header: "Code", key: "code" },
    { header: "Name", key: "name" },
    { header: "Date", key: "createdDate" },
    { header: "Status", key: "status" },
  ];

  if (!(status === "inactive")) {
    columns.push({ header: "Action", key: "id" });
  }

  // DELETE ACTION
  const handleDelete = async (id: number) => {
    try {
      showLoading();
      // Delete subject
      await deleteSubject(Number(id));
      getSubjects();
      toast.success("Major deleted successfully");
    } catch (error) {
      toast.error("Failed to delete major");
    } finally {
      hideLoading();
    }
  };

  // ACTION BUTTONS
  const actions = [
    {
      label: "Delete",
      onClick: handleDelete,
      className: "btn btn--primary--outline",
    },
  ];

  return (
    <div className="mb-10 mt-5">
      {/* Create Subject Button */}
      <Button 
          className='btn btn--secondary btn--icon'
          
          onClick={() => {
            setSelectedSubject(undefined);
            setShowModal(true);
          }}
          type='button'>
          <AiOutlineEdit size={20} className='me-2'/> Create Subject
      </Button>

      {/* Subject Filters */}
      <Filter 
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
        setPageIndex={setPageIndex} />

      {data.totalCount > 0 ? (
        <>
          {/* Subject Table */}
          {data.subjects && (
            <GenericTable<Subject>
              data={data.subjects}
              columns={columns}
              actions={actions}
              onRowClick={handleRowClick}
            />
          )}

          {/* Major Pagination */}
          <div className="flex justify-end mt-5">
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Major Form Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={selectedSubject == null ? "Create Subject" : "Edit Subject"}
            size="3xl"
          >
            <SubjectForm 
              subject={selectedSubject} 
              onCancel={() => setShowModal(false)}
              onSuccess={getSubjects} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title="No subject found"
            subtitle="Try changing the filters or reset it completely"
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
