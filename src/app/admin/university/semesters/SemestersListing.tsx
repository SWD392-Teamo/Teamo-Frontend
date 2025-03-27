'use client'

import { getData, getSemesterById } from '@/actions/semesterActions';
import AppModal from '@/components/AppModal';
import AppPagination from '@/components/AppPagination';
import EmptyFilter from '@/components/EmptyFilter';
import GenericTable from '@/components/GenericTable';
import { useSemesterStore } from '@/hooks/useSemesterStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Semester } from '@/types';
import { Button } from 'flowbite-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { useShallow } from 'zustand/shallow';
import SemesterFilter from './SemesterFilter';
import SemesterForm from './SemesterForm';

export default function SemestersListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedSemester, setSelectedSemester] = useState<Semester>();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Use subject store
  const data = useSemesterStore(
    useShallow((state) => ({
      semesters: state.semesters,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useSemesterStore((state) => state.setSemesters);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      status,
      ...(search.trim() ? { search } : {}),
    }
  });

  //=====================================
  //      GET SEMESTERS LIST
  //=====================================

  // Get semesters
  function getSemesters() {
    getData(url)
      .then((data) => {
        console.log(data)
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // Get subjects data
  useEffect(() => {
    getSemesters();
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET SEMESTER BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getSemester(id);
  }

  async function getSemester(id: number) {
    getSemesterById(id)
      .then((data) => {
        setSelectedSemester(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      SEMESTER TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Semester }[] = [
    { header: "Code", key: "code" },
    { header: "Name", key: "name" },
    { header: "Start Date", key: "startDate" },
    { header: "End Date", key: "endDate" },
    { header: "Status", key: "status" },
  ];

  return (
    <div className="mb-10 mt-5">
      {/* Create Semester Button */}
      <Button 
          className='btn btn--primary btn--icon'
          
          onClick={() => {
            setSelectedSemester(undefined);
            setShowModal(true);
          }}
          type='button'>
          <AiOutlineEdit size={20} className='me-2'/> Create Semester
      </Button>

      {/* Semester Filters */}
      <SemesterFilter 
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
        setPageIndex={setPageIndex} />

      {data.totalCount > 0 ? (
        <>
          {/* Semester Table */}
          {data.semesters && (
            <GenericTable<Semester>
              data={data.semesters}
              columns={columns}
              onRowClick={handleRowClick}
            />
          )}

          {/* Semester Pagination */}
          <div className="flex justify-end mt-5">
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Semester Form Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={selectedSemester == null ? "Create Semester" : "Edit Semester"}
            size="3xl"
          >
            <SemesterForm 
              semester={selectedSemester} 
              onCancel={() => setShowModal(false)}
              onSuccess={getSemesters} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title="No semesters found"
            subtitle="Try changing the filters or reset it completely"
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
