"use client";

import defaultAvatar from "@/assets/defaultAvatar.jpg";
import defaultGroup from "@/assets/defaultGroup.png";
import { getGroupById } from '@/actions/groupActions';
import BackButton from '@/components/BackButton'
import MedGroupImage from '@/components/groups/MedGroupImage';
import { useGroupStore } from '@/hooks/useGroupStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DateConverter from "@/components/DateConvert";
import GroupStatusBadge from "@/components/groups/GroupStatus";
import MemberAvatar from "@/components/groups/MemberAvatar";
import Image from "next/image";
import GroupPositionCard from "./GroupPosition";
import { IoIosStar } from "react-icons/io";
import { getCurrentUser } from "@/actions/authActions";
import Link from "next/link";

export default function page() {
  const params = useParams();
  const id =  Number(params.id);
  const link = `/groups/update/${id}`;
  const linkApplication = `/groups/${id}/applications`;
  const group = useGroupStore((state) => state.selectedGroup);
  const setData = useGroupStore((state) => state.setSelectedGroup);
  const [userId, setUserId] = useState<Number>(0);

  const groupMembers = group?.groupMembers;
  const groupPositions = group?.groupPositions;
  const memberRole = groupMembers?.find((member) => member.studentId === userId)?.role;

  useEffect(() => {
    getGroupById(id).then(setData);
  }, [setData]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user && user.id) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  console.log("group", group);
  console.log("userId", userId);
  console.log("memberRole", memberRole);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-12 flex flex-col items-start hover:shadow-lg transition flex-1 mb-16">
      <div className="flex flex-col w-full relative">
        <BackButton />
        { memberRole === "Leader" &&
          <div className="absolute top-4 right-4 flex gap-2">
            <Link href={linkApplication}>
              <button className="px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
                Application
              </button>
            </Link>
          
            <Link href={link}>
              <button className="px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
                Edit
              </button>
            </Link>
          </div>
        }
      </div>

      <div className="flex flex-row items-center mt-2 w-15 h-15 gap-4 my-3">
        {group?.imgUrl ? (
          <MedGroupImage imgUrl={group?.imgUrl} />
        ) : (
          <div className="w-1/12">
            <Image
              src={defaultGroup}
              alt={group?.name || "none"}
              className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
          </div>
        )}
        <div className="text-left w-full font-bold text-[#54B8F0] text-2xl my-2">
          {group?.name}
        </div>
      </div>
      
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl font-bold text-black">
            {group?.title}
          </h2>
          {group?.status && (
            <GroupStatusBadge status={group?.status} />
          )}
        </div>

        <div className="font-semibold text-lg text-[#8C8F8E] ">
          {group?.createdAt && (
            <DateConverter isoDate={group?.createdAt} />
          )}
        </div>
      </div>

      <div className="text-left w-full font-normal text-lg mt-1">
        {group?.semesterName}
      </div>

      {/*Subject code */}
      <div className="mt-4 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Subject:</h2>
        <p className="font-normal text-lg">{group?.subjectCode}</p>
      </div>

      {/*Field name */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Field:</h2>
        <p className="font-normal text-lg">{group?.fieldName}</p>
      </div>

      {/*Max member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Max member:</h2>
        <p className="font-normal text-lg">{group?.maxMember}</p>
      </div>

      {/*Total member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Total member:</h2>
        <p className="font-normal text-lg">{group?.totalMembers}</p>
      </div>

      {/*description */}
      <div className="container mt-5">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Description
        </div>

        <div className="text-left w-full font-normal text-lg">
          {group?.description}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8"></div>

      {/*position */}
      <div className="container">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Position
        </div>
        {groupPositions && groupMembers && (
          <GroupPositionCard
            positions={groupPositions}
            members={groupMembers}
          />
        )}

      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8"></div>
      <div className="container">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Member
        </div>
        {/*Member */}
        <div className="text-left w-full font-normal text-lg">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {group?.groupMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div key={member.studentId}>
                    {member?.imgUrl ? (
                      <MemberAvatar imgUrl={member?.imgUrl} />
                    ) : (
                      <Image
                        src={defaultAvatar}
                        alt={member?.studentName || "none"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{member.studentName}</h4>
                      {member?.role === "Leader" && (
                        <IoIosStar className="text-yellow-500" />
                      )}
                    </div>
                    <p className="text-blue-500 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{member.positions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
