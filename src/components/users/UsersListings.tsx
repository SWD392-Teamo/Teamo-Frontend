import { banUser, getAllUsers, getProfile } from "@/actions/userActions";
import { useUserstore } from "@/hooks/useUserStore";
import { useLoading } from "@/providers/LoadingProvider";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiBan, HiOutlineUserGroup } from "react-icons/hi";
import SearchBar from "../SearchBar";
import GenericTable from "../GenericTable";
import AppPagination from "../AppPagination";
import AppModal from "../AppModal";
import { User } from "@/types";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import BackButton from "../BackButton";
import ConfirmationPopup from "./ConfirmationPopup";
import UserFilter from "./UserFilter";
import { useRouter } from "next/navigation";

export default function UsersListings() {
  /**
   * LOCAL STATE MANAGEMENT
   */
  const { showLoading, hideLoading } = useLoading();
  const [showModel, setShowModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();

  /**
   * GLOBAL STATE MANAGEMENT
   */
  const userParams = useParamsStore(
    useShallow((state) => ({
      pageSize: state.pageSize,
      status: state.status,
      sort: state.sort,
    }))
  );

  const data = useUserstore(
    useShallow((state) => ({
      users: state.users,
      totalCount: state.totalCount,
      pageSize: state.pageSize,
    }))
  );

  const setData = useUserstore((state) => state.setData);

  const url = queryString.stringifyUrl({
    url: "",
    query: {
      ...userParams,
      pageIndex,
      ...(search.trim() ? { search } : {}),
    },
  });

  /** GET USERS LIST */

  function getUsers() {
    console.log(url);
    getAllUsers(url)
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    showLoading();
    getUsers();
  }, [url]);

  const mappedData = data.users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));

  /**
   * USER TABLE CONFIGURATIONS
   */

  // Handle popup
  const handlePopup = (id: number) => {
    setSelectedUser(id);
    setShowModal(true);
  };

  // handle ban user
  const handleBanUser = async (id: number) => {
    try {
      await banUser(id);
      setData(await getAllUsers(url));
      toast.success("Successfully banned this user");
    } catch (error) {
      toast.error("Failed to ban this user");
    } finally {
      setShowModal(false);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`users/details/${id}`);
  };

  // Columns
  const columns = [
    { header: "ID", key: "id" },
    { header: "", key: "imgUrl" },
    { header: "Student Code", key: "code" },
    { header: "Full Name", key: "fullName" },
    { header: "Email", key: "email" },
    { header: "Status", key: "status" },
  ];

  if (!(userParams.status === "banned")) {
    columns.push({ header: "Action", key: "action" });
  }

  // Buttons
  const actions = [
    {
      label: "BAN",
      onClick: handlePopup,
      className: "btn btn--danger--outline",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center space-x-3 py-4 px-2">
        {/* <HiOutlineUserGroup className="w-7 h-7" /> */}
        <h1 className="page-title">User Accounts List</h1>
        <span className="text-gray-600 mt-4">({data.totalCount} users)</span>
      </div>
      {/* Search & Filter */}
      <SearchBar className="mb-8" setSearch={setSearch} />
      <UserFilter />

      {/* User Table */}
      {data.users.length > 0 && (
        <div className="mb-5">
          <GenericTable<User>
            data={mappedData}
            columns={columns}
            actions={actions}
            onRowClick={handleRowClick}
          />
        </div>
      )}
      {/* Pagination */}
      {data.totalCount > data.pageSize && (
        <div className="flex justify-end mt-5">
          <AppPagination
            currentPage={pageIndex}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            pageChanged={setPageIndex}
          />
        </div>
      )}

      {/* Popup Modal */}
      <AppModal
        show={showModel}
        onClose={() => setShowModal(false)}
        title="Confirmation"
      >
        <ConfirmationPopup
          message="Are you sure you want to ban this user?"
          onConfirm={() => handleBanUser(selectedUser)}
        />
      </AppModal>
    </div>
  );
}
