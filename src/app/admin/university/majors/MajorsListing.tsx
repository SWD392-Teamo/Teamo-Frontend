"use client";

import { deleteMajor, getData, getMajorById } from "@/actions/majorActions";
import AppModal from "@/components/AppModal";
import AppPagination from "@/components/AppPagination";
import EmptyFilter from "@/components/EmptyFilter";
import GenericTable from "@/components/GenericTable";
import { useMajorStore } from "@/hooks/useMajorStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useLoading } from "@/providers/LoadingProvider";
import { Major } from "@/types";
import { Button } from "flowbite-react";
import queryString from "query-string";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { useShallow } from "zustand/shallow";
import Filter from "../Filter";
import MajorForm from "./MajorForm";
import ConfirmationPopup from "@/components/users/ConfirmationPopup";

export default function MajorsListing() {
  //=====================================
  //      LOCAL STATE MANAGEMENT
  //=====================================

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [selectedMajor, setSelectedMajor] = useState<Major>();
  const [selectedMajorId, setSelectedMajorId] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  //=====================================
  //      GLOBAL STATE MANAGEMENT
  //=====================================

  // Use major store
  const data = useMajorStore(
    useShallow((state) => ({
      majors: state.majors,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useMajorStore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      status,
      ...(search.trim() ? { search } : {}),
    },
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
  //      MAJOR TABLE CONFIGURATIONS
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
      // delete major
      await deleteMajor(Number(id));
      getMajors();
      toast.success("Major deleted successfully");
    } catch (error) {
      toast.error("Failed to delete major");
    } finally {
      setShowConfirmModal(false);
    }
  };
  // Handle popup
  const handlePopup = (id: number) => {
    setSelectedMajorId(id);
    setShowConfirmModal(true);
  };
  // ACTION BUTTONS
  const actions = [
    {
      label: "Delete",
      onClick: handlePopup,
      className: "btn btn--primary--outline",
    },
  ];

  return (
    <div className="mb-10 mt-5">
      {/* Create Major Button */}
      <Button
        className="btn btn--secondary btn--icon"
        onClick={() => {
          setSelectedMajor(undefined);
          setShowModal(true);
        }}
        type="button"
      >
        <AiOutlineEdit size={20} className="me-2" /> Create Major
      </Button>

      {/* Major Filters */}
      <Filter
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
        setPageIndex={setPageIndex}
      />

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
              currentPage={pageIndex}
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
              onSuccess={getMajors}
            />
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

      {/* Popup Modal */}
      <AppModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmation"
      >
        <ConfirmationPopup
          message="Are you sure you want to delete this major?"
          onConfirm={() => handleDelete(selectedMajorId)}
        />
      </AppModal>
    </div>
  );
}
