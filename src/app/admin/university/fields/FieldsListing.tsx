'use client'

import { deleteField, getData, getFieldById } from '@/actions/fieldActions';
import AppModal from '@/components/AppModal';
import AppPagination from '@/components/AppPagination';
import EmptyFilter from '@/components/EmptyFilter';
import GenericTable from '@/components/GenericTable';
import { useFieldStore } from '@/hooks/useFieldStore';
import { useLoading } from '@/providers/LoadingProvider';
import { Field } from '@/types';
import { Button } from 'flowbite-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { useShallow } from 'zustand/shallow';
import Filter from '../Filter';
import FieldForm from './FieldForm';

export default function FieldsListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedField, setSelectedField] = useState<Field>();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);

  //=====================================
  //      GLOBAL FIELD MANAGEMENT
  //=====================================

  // Use field store
  const data = useFieldStore(
    useShallow((state) => ({
      fields: state.fields,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useFieldStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      ...(search.trim() ? { search } : {}),
    }
  });

  //=====================================
  //      GET FIELDS LIST
  //=====================================

  // Get fields
  function getFields() {
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
    getFields();
  }, [url, setData, showLoading, hideLoading]);

  //=====================================
  //      GET FIELD BY ID
  //=====================================

  function handleRowClick(id: number) {
    setShowModal(true);
    showLoading();
    getField(id);
  }

  async function getField(id: number) {
    getFieldById(id)
      .then((data) => {
        setSelectedField(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  //==============================================
  //      FIELD TABLE CONFIGURATIONS
  //==============================================

  // COLUMNS
  const columns: { header: string; key: keyof Field }[] = [
    { header: "Name", key: "name" },
    { header: "Description", key: "description" },
    { header: "Action", key: "id" }
  ];

  // DELETE ACTION
  const handleDelete = async (id: number) => {
    try {
      showLoading();
      // Delete subject
      await deleteField(Number(id));
      getFields();
      toast.success("Field deleted successfully");
    } catch (error) {
      toast.error("Failed to delete field");
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
      {/* Create Field Button */}
      <Button 
          className='btn btn--secondary btn--icon'
          
          onClick={() => {
            setSelectedField(undefined);
            setShowModal(true);
          }}
          type='button'>
          <AiOutlineEdit size={20} className='me-2'/> Create Field
      </Button>

      {/* Field Filters */}
      <Filter 
        setSearch={setSearch}
        setPageIndex={setPageIndex} />

      {data.totalCount > 0 ? (
        <>
          {/* Field Table */}
          {data.fields && (
            <GenericTable<Field>
              data={data.fields}
              columns={columns}
              actions={actions}
              onRowClick={handleRowClick}
            />
          )}

          {/* Field Pagination */}
          <div className="flex justify-end mt-5">
            <AppPagination
              pageChanged={setPageIndex}
              currentPage={pageIndex}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
            />
          </div>

          {/* Field Form Modal */}
          <AppModal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={selectedField == null ? "Create Field" : "Edit Subject"}
            size="3xl"
          >
            <FieldForm 
              field={selectedField} 
              onCancel={() => setShowModal(false)}
              onSuccess={getFields} />
          </AppModal>
        </>
      ) : (
        <>
          {/*Empty Filter */}
          <EmptyFilter
            title="No field found"
            subtitle="Try changing the filters or reset it completely"
            showReset={true}
          />
        </>
      )}
    </div>
  );
}
