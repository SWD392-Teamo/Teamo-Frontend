"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";
import {
  addLink,
  getProfile,
  getUserId,
  updateDescriptions,
  updateLink,
  uploadImage,
} from "@/actions/userActions";
import { Link, StudentSkill, User } from "@/types";
import MedGroupImage from "@/components/groups/MedGroupImage";
import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import SkillBar from "@/components/SkillBar";
import { FaCamera, FaEdit, FaExternalLinkAlt, FaLink } from "react-icons/fa";
import PopupModal from "@/components/PopupModal";
import { AiOutlineEdit } from "react-icons/ai";
import { updateProfile } from "firebase/auth";
import { LinkManagementPopup } from "@/components/profile/LinkPopupModal";
import { SkillManagementPopup } from "@/components/profile/SkillPopupModal";

export default function Listing() {
  const [userId, setUserId] = useState<number | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [isDescPopupOpen, setIsDescPopupOpen] = useState(false);
  const [isLinksPopupOpen, setIsLinksPopupOpen] = useState(false);
  const [isSkillsPopupOpen, setIsSkillsPopupOpen] = useState(false);

  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [description, setDescription] = useState(profile?.description || "");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    getUserId().then((id) => {
      if (id) {
        setUserId(id);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getProfile().then((data) => {
        setProfile(data);
        setLinks(data.links);
      });
    }
  }, [userId]);

  useEffect(() => {
    const fetchImage = async () => {
      if (profile?.imgUrl) {
        const url = await getFirebaseImageUrl(profile.imgUrl);
        setImageUrl(url);
      }
    };

    fetchImage();
  }, [profile?.imgUrl]);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (profile?.description !== undefined) {
      setDescription(profile.description);
    }
  }, [profile?.description]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSaveImage = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      if (userId) {
        const response = await uploadImage(formData);
        if (response && response.imageUrl) {
          setNewImageUrl(response.imageUrl);
        }
        setIsImgPopupOpen(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLinksUpdated = (updatedLinks: Link[]) => {
    setLinks(updatedLinks);

    if (profile) {
      setProfile({
        ...profile,
        links: updatedLinks,
      });
    }
  };

  const handleSkillsUpdated = (updatedSkills: StudentSkill[]) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        studentSkills: updatedSkills,
      };
    });
  };

  const handleDescriptionUpdate = async () => {
    setIsUpdating(true);
    try {
      if (userId) {
        const updatedProfile = await updateDescriptions(description);
        // onUpdate(updatedProfile);
        if (updatedProfile) {
          setDescription(updatedProfile.description);
        }
        setIsDescPopupOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="">
      <BackButton />
      <h1 className="page-title">Profile</h1>
      <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start hover:shadow-lg transition flex-1 mb-10">
        <div className="flex items-center flex-col gap-3">
          {profile?.imgUrl ? (
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
                <p>Loading image...</p>
              )}
              <button
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                onClick={() => setIsImgPopupOpen(true)}
              >
                <FaCamera className="text-gray-600" size={15} />
              </button>
            </div>
          ) : (
            <div className="w-full h-full">
              <Image
                src={defaultAvatar}
                width={120}
                height={120}
                alt={profile?.firstName || "none"}
                className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
              />
            </div>
          )}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">
              {profile?.lastName} {profile?.firstName}
            </h2>
            <p className="text-[#41a4db] text-sm ">{profile?.gender}</p>
            <p className="text-gray-600">{profile?.code}</p>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 w-full">
          <div className="flex items-center gap-3 align-middle">
            <h3 className="text-lg font-semibold">About</h3>
            <button onClick={() => setIsDescPopupOpen(true)}>
              <div className="inline-block bg-[#46afe9] rounded-full p-1 cursor-pointer hover:bg-[#41a4db]">
                <AiOutlineEdit size={15} color="white" />
              </div>
            </button>
          </div>

          <p className="text-gray-600 text-base">{profile?.description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Major</p>
            <p className="font-medium">{profile?.majorCode}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="mt-6 border-t pt-4 w-full">
          <div className="flex items-center gap-3 align-middle">
            <h3 className="text-lg font-semibold">Links</h3>
            <button onClick={() => setIsLinksPopupOpen(true)}>
              <div className="inline-block bg-[#46afe9] rounded-full p-1 cursor-pointer hover:bg-[#41a4db]">
                <AiOutlineEdit size={15} color="white" />
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-2 w-2/3">
            {links.length > 0 ? (
              links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#131516] hover:underline"
                >
                  <FaLink className="text-gray-500" />
                  {link.name || link.url}
                </a>
              ))
            ) : (
              <p className="text-gray-500 italic">No links added yet</p>
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-4 w-full">
        <div className="flex items-center gap-3 align-middle">
            <h3 className="text-lg font-semibold">Skills</h3>
            <button onClick={() => setIsSkillsPopupOpen(true)}>
              <div className="inline-block bg-[#46afe9] rounded-full p-1 cursor-pointer hover:bg-[#41a4db]">
                <AiOutlineEdit size={15} color="white" />
              </div>
            </button>
          </div>          <div className="flex flex-col gap-3 mt-2 w-2/3">
            {profile?.studentSkills.map((skill, index) => (
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
      <PopupModal
        isOpen={isImgPopupOpen}
        title="Change Profile Image"
        onClose={() => setIsImgPopupOpen(false)}
        onSave={handleSaveImage}
        isSaving={isUploading}
        disableSave={!newImageUrl}
        saveLabel="Upload"
      >
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {newImageUrl && (
          <img
            src={newImageUrl}
            alt="Preview"
            className="rounded-full w-28 h-28 object-cover mt-4"
          />
        )}
      </PopupModal>

      <PopupModal
        isOpen={isDescPopupOpen}
        title="Update Description"
        onClose={() => setIsDescPopupOpen(false)}
        onSave={handleDescriptionUpdate}
        isSaving={isUpdating}
        disableSave={!description}
      >
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2"
          rows={4}
          placeholder="Enter your new description..."
        />
      </PopupModal>

      <LinkManagementPopup
        isOpen={isLinksPopupOpen}
        onClose={() => setIsLinksPopupOpen(false)}
        links={links}
        onLinksUpdated={handleLinksUpdated}
      />
      <SkillManagementPopup
        isOpen={isSkillsPopupOpen}
        onClose={() => setIsSkillsPopupOpen(false)}
        skills={profile?.studentSkills || []}
        onSkillsUpdated={handleSkillsUpdated}
      />
    </div>
  );
}
