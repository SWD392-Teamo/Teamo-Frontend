"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";
import { getProfile, getUserId, uploadImage } from "@/actions/userActions";
import { User } from "@/types";
import MedGroupImage from "@/components/groups/MedGroupImage";
import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import SkillBar from "@/components/SkillBar";
import { FaCamera, FaExternalLinkAlt, FaLink } from "react-icons/fa";

export default function Listing() {
  const [userId, setUserId] = useState<number | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  

  useEffect(() => {
    getUserId().then((id) => {
      if (id) {
        setUserId(id);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getProfile(userId).then((data) => {
        setProfile(data);
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
      if(userId){
        const response = await uploadImage(userId, formData);
        if (response && response.imageUrl) {
          setNewImageUrl(response.imageUrl);
        }
        setIsPopupOpen(false);
      }
      
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };
  

  console.log("profile", profile);
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
                onClick={() => setIsPopupOpen(true)}
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
          <h3 className="text-lg font-semibold">About</h3>
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

        <div className="mt-6 border-t pt-4 w-full">
          <h3 className="text-lg font-semibold">Links</h3>
          <div className="flex flex-col gap-3 mt-2 w-2/3">
            {profile?.links.map((link, index) => (
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

        <div className="mt-6 border-t pt-4 w-full">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-col gap-3 mt-2 w-2/3">
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
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Change Profile Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {newImageUrl && (
              <Image
                src={newImageUrl}
                alt="New Profile Image"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                disabled={isUploading}
                className="px-4 py-2 bg-[#46afe9] text-white rounded-md hover:bg-[#d3eef9] hover:text-black"
              >
                {isUploading ? "Uploading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
