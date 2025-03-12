"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";
import { getProfile, getUserId } from "@/actions/userActions";
import { User } from "@/types";
import MedGroupImage from "@/components/groups/MedGroupImage";
import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import SkillBar from "@/components/SkillBar";
import { FaExternalLinkAlt, FaLink } from "react-icons/fa";

export default function Listing() {
  const [userId, setUserId] = useState<number | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  console.log("profile", profile);
  return (
    <div className="">
      <BackButton />
      <h1 className="page-title">Profile</h1>
      <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start hover:shadow-lg transition flex-1 mb-10">
        <div className="flex items-center flex-col gap-3">
            {profile?.imgUrl ? (
              <div className="w-full h-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Medium Group Image"
                    width={120}
                    height={120}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
                  />
                ) : (
                  <p>Loading image...</p>
                )}
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
          <p className="text-gray-600 text-base">
            {profile?.description}
          </p>
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
    </div>
  );
}
