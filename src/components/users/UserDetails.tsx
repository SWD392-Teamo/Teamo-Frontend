import { getUserById } from "@/actions/userActions";
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

export default function UserDetails() {
  /** LOCAL STATE MANAGEMENT */
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { showLoading, hideLoading } = useLoading();

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

  return (
    <div>
      {/* Header */}
      <BackButton />
      <h1 className="page-title">Profile</h1>

      {/* User Detail */}
      <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start hover:shadow-lg transition flex-1 mb-10">
        {/* Personal Information */}
        <div className="flex items-center flex-col gap-3">
          <div className="relative w-full h-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Medium Group Image"
                width={120}
                height={120}
                className="rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
              />
            ) : (
              <div className="w-full h-full">
                <Image
                  src={defaultAvatar}
                  width={120}
                  height={120}
                  alt={selectedUser?.firstName || "none"}
                  className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">
              {selectedUser?.lastName} {selectedUser?.firstName}
            </h2>
            <p className="text-[#41a4db] text-sm ">{selectedUser?.gender}</p>
            <p className="text-gray-600">{selectedUser?.code}</p>
          </div>
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
    </div>
  );
}
