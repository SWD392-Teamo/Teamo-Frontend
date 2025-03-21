"use client";
import React, { useEffect, useState } from "react";
import { useLoading } from "@/providers/LoadingProvider";
import { banUser, getAllUsers } from "@/actions/userActions";
import toast from "react-hot-toast";
import { User } from "@/types";
import { HiBan, HiOutlineTrash, HiOutlineUserGroup } from "react-icons/hi";
import GenericTable from "@/components/GenericTable";
import AppPagination from "@/components/AppPagination";
import queryString from "query-string";
import { useUserstore } from "@/hooks/useUserStore";
import SearchBar from "@/components/SearchBar";
import AppModal from "@/components/AppModal";

type UserTable = Pick<
  User,
  "id" | "code" | "firstName" | "lastName" | "email" | "imgUrl" | "status"
>;

export default function Listings() {
  const { showLoading, hideLoading } = useLoading();
  const {
    users,
    totalCount,
    pageSize,
    selectedUser,
    setData,
    setSelectedUser,
  } = useUserstore();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(1);
  const [modelOpen, setModelOpen] = useState(false);
  const url = queryString.stringifyUrl({
    url: "",
    query: {
      pageIndex,
      pageSize,
      ...(search.trim() ? { search } : {}),
    },
  });

  const columns = [
    { header: "ID", key: "id" },
    { header: "", key: "imgUrl" },
    { header: "Student Code", key: "code" },
    { header: "Full Name", key: "fullName" },
    { header: "Email", key: "email" },
    { header: "Status", key: "status" },
    { header: "Action", key: "action" },
  ];

  useEffect(() => {
    showLoading();
    getAllUsers(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }, [url]);

  const mappedData = users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));

  const handlePopup = (id: number) => {
    setSelectedUser(id);
    setModelOpen(true);
  };
  const handleDelete = (id: number) => {
    banUser(id)
      .then(() => {
        toast.success("Successfully banned this user");
      })
      .catch(() => {
        toast.error("Failed to ban this user");
      })
      .finally(() => {
        setModelOpen(false);
      });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center space-x-3 py-4 px-2">
        <HiOutlineUserGroup className="w-7 h-7" />
        <h1 className="text-2xl font-extrabold">User Accounts List</h1>
      </div>

      <SearchBar className="mb-8" setSearch={setSearch} />
      <GenericTable
        data={mappedData}
        columns={columns}
        actions={[
          {
            label: <HiBan />,
            className: "btn btn--danger--outline",
            onClick: (id) => handlePopup(id as number),
          },
        ]}
      />

      {totalCount > pageSize && (
        <div className="pt-6">
          <AppPagination
            currentPage={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            pageChanged={setPageIndex}
          />
        </div>
      )}

      <AppModal
        show={modelOpen}
        onClose={() => setModelOpen(false)}
        title="Confirmation"
      >
        <div className="flex flex-col items-center p-4 space-y-4">
          <span className="text-lg font-medium text-gray-700 text-center">
            Are you sure you want to ban this user?
          </span>
          <div className="flex justify-end space-x-3 w-full pt-2">
            <button
              onClick={() => handleDelete(selectedUser)}
              className="btn btn--primary"
            >
              OK
            </button>
          </div>
        </div>
      </AppModal>
    </div>
  );
}
