import { banUser, getUserById, unbanUser } from "@/actions/userActions";
import { useLoading } from "@/providers/LoadingProvider";
import { User } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BackButton from "../BackButton";
import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import Image from "next/image";
import { FaCamera, FaLink } from "react-icons/fa";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import SkillBar from "../SkillBar";
import AppModal from "../AppModal";
import ConfirmationPopup from "./ConfirmationPopup";
import { Button } from "flowbite-react";

export default function UserDetails() {
  /** LOCAL STATE MANAGEMENT */
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();
  const [showModel, setShowModal] = useState(false);

  /** GET USER DETAILS */
  useEffect(() => {
    if (id) {
      showLoading();
      getUserDetail(Number(id));
    }
  }, [id]);

  // fetch user detail
  const getUserDetail = async (id: number) => {
    try {
      const data = await getUserById(id);
      console.log(data);
      setSelectedUser(data);

      if (data.imgUrl) {
        const url = await getFirebaseImageUrl(data.imgUrl);
        setImageUrl(url);
      }
    } catch (error) {
      const err = error as { status: number; message: string };
      toast.error(`${err.status} ${err.message}`);
    } finally {
      hideLoading();
    }
  };

  /** HANDLE ACTIONS */
  // BAN USER
  const handleBanUser = async (id: number) => {
    try {
      showLoading();
      let updatedUser;
      if (selectedUser?.status === "Banned") {
        updatedUser = await unbanUser(id);
        toast.success("Successfully unban this user.");
      } else {
        updatedUser = await banUser(id);
        toast.success("Successfully ban this user.");
      }
      setSelectedUser(updatedUser);
    } catch (error) {
      toast.error("Fail to ban this user!");
    } finally {
      setShowModal(false);
      hideLoading();
    }
  };

  return (
    <div>
      {/* Header */}
      <BackButton />
      <h1 className="page-title mb-5">Profile</h1>

      {/* User Detail */}
      <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start hover:shadow-lg transition flex-1 mb-10">
        {/* Personal Information */}
        <div className="flex items-center justify-between w-full relative gap-4">
          {/* Avatar + Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="User Image"
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
                />
              ) : (
                <Image
                  src={defaultAvatar}
                  width={100}
                  height={100}
                  alt={selectedUser?.firstName || "none"}
                  className="rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedUser?.lastName} {selectedUser?.firstName}
              </h2>
              <p className="text-[#41a4db] text-sm ">{selectedUser?.gender}</p>
              <p className="text-gray-600">{selectedUser?.code}</p>
            </div>
          </div>

          {/* Ban/Unban Button */}
          {selectedUser && (
            <div className="flex flex-col items-center gap-2">
              {/* Status */}
              <p
                className={`font-medium ${
                  selectedUser.status === "Banned"
                    ? "text-danger"
                    : "text-primary"
                }`}
              >
                {selectedUser.status.toUpperCase()}
              </p>

              {/* Button */}
              <Button
                onClick={() => setShowModal(true)}
                className={`btn ${
                  selectedUser.status === "Banned"
                    ? "btn--primary"
                    : "btn--danger--outline"
                }`}
              >
                {selectedUser.status === "Banned" ? "Unban User" : "Ban User"}
              </Button>
            </div>
          )}
        </div>

        {/* Detail information */}
        <div className="mt-6 border-t pt-4 w-full">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600 text-base">{selectedUser?.description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Major</p>
            <p className="font-medium">{selectedUser?.majorCode}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{selectedUser?.email}</p>
          </div>
        </div>

        {/* Link */}
        <div className="mt-6 border-t pt-4 w-full">
          <h3 className="text-lg font-semibold">Links</h3>
          <div className="flex flex-col gap-3 mt-2 w-2/3">
            {selectedUser?.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#46afe9] hover:underline"
              >
                <FaLink className="text-gray-500" />
                {link.name || link.url}
              </a>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 border-t pt-4 w-full">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-col gap-3 mt-2 w-2/3">
            {selectedUser?.studentSkills.map((skill, index) => (
              <SkillBar
                key={index}
                id={skill.id}
                skillName={skill.skillName}
                skillType={skill.skillType}
                skillLevel={skill.skillLevel}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <AppModal
        show={showModel}
        onClose={() => setShowModal(false)}
        title="Confirmation"
      >
        <ConfirmationPopup
          message={
            selectedUser?.status === "Banned"
              ? "Are you sure to unban this user?"
              : "Are you sure to ban this user?"
          }
          onConfirm={() => handleBanUser(selectedUser?.id as number)}
        />
      </AppModal>
    </div>
  );
}
