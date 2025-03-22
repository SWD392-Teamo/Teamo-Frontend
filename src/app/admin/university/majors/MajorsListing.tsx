'use client'

import { deleteMajor, getData, getMajorById } from '@/actions/majorActions';
import AppModal from '@/components/AppModal';
import AppPagination from '@/components/AppPagination';
import BackButton from '@/components/BackButton';
import EmptyFilter from '@/components/EmptyFilter';
import GenericTable from '@/components/GenericTable';
import { useMajorStore } from '@/hooks/useMajorStore';
import { useParamsStore } from '@/hooks/useParamsStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Major } from '@/types';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';
import MajorFilter from './MajorFilter';
import MajorForm from './MajorForm';
import { Button } from 'flowbite-react';
import { AiFillEdit, AiOutlineEdit } from 'react-icons/ai';

export default function MajorsListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedMajor, setSelectedMajor] = useState<Major>();

  // Set page index
  function setPageIndex(pageIndex: number) {
    setParams({ pageIndex });
  }

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Rerender only on these params
  const majorParams = useParamsStore(
    useShallow((state) => ({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      status: state.status,
      sort: state.sort,
    }))
  );

  // Use application store
  const data = useMajorStore(
    useShallow((state) => ({
      majors: state.majors,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useMajorStore((state) => state.setData);
  const setParams = useParamsStore((state) => state.setParams);

  const url = queryString.stringifyUrl({
    url: "",
    query: majorParams,
  });

  //=====================================
  //      GET MAJORS LIST
  //=====================================

  // Get majors
  function getMajors() {
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
    getMajors();
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET MAJOR BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getMajor(id);
  }

  async function getMajor(id: number) {
    getMajorById(id)
      .then((data) => {
        setSelectedMajor(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      APPLICATION TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Major }[] = [
    { header: "Code", key: "code" },
    { header: "Name", key: "name" },
    { header: "Date", key: "createdDate" },
    { header: "Status", key: "status" },
  ];

  if (!(majorParams.status === "inactive")) {
    columns.push({ header: "Action", key: "id" });
  }

  // DELETE ACTION
  const handleDelete = async (id: number) => {
    try {
      showLoading();
      // Approve application
      await deleteMajor(Number(id));
      getMajors();
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
      {/* Create Major Button */}
      <Button 
          className='btn btn--secondary btn--icon'
          
          onClick={() => {
            setSelectedMajor(undefined);
            setShowModal(true);
          }}
          type='button'>
          <AiOutlineEdit size={20} className='me-2'/> Create Major
      </Button>

      {/* Major Filters */}
      <MajorFilter />

      {data.totalCount > 0 ? (
        <>
          {/* Major Table */}
          {data.majors && (
            <GenericTable<Major>
              data={data.majors}
              columns={columns}
              actions={actions}
              onRowClick={handleRowClick}
            />
          )}

          {/* Major Pagination */}
          <div className="flex justify-end mt-5">
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={majorParams.pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Major Form Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={selectedMajor == null ? "Create Major" : "Edit Major"}
            size="3xl"
          >
            <MajorForm 
              major={selectedMajor} 
              onCancel={() => setShowModal(false)}
              onSuccess={getMajors} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title="No major found"
            subtitle="Try changing the filters or reset it completely"
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
