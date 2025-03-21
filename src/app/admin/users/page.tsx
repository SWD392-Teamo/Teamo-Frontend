"use client";
import React, { useEffect, useState } from "react";
import { useLoading } from "@/providers/LoadingProvider";
import { getAllUsers } from "@/actions/userActions";
import toast from "react-hot-toast";
import { User } from "@/types";
import { HiOutlineTrash, HiOutlineUserGroup } from "react-icons/hi";
import GenericTable from "@/components/GenericTable";
import AppPagination from "@/components/AppPagination";
import queryString from "query-string";
import { useUserstore } from "@/hooks/useUserStore";
import SearchBar from "@/components/SearchBar";

type UserTable = Pick<
  User,
  "id" | "code" | "firstName" | "lastName" | "email" | "imgUrl"
>;

export default function Listings() {
  const { showLoading, hideLoading } = useLoading();
  const { users, totalCount, pageSize, selectedUser, setData } = useUserstore();
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(1);
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

  const handleDelete = (id: string | number) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      // Call API xóa user ở đây
      console.log("Delete user with id:", id);
      toast.success("Đã xóa người dùng " + id);
    }
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
            label: <HiOutlineTrash />,
            className: "btn btn--danger--outline",
            onClick: handleDelete,
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
    </div>
  );
}
