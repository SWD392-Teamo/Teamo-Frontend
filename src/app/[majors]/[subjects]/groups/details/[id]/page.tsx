"use client";

import defaultAvatar from "@/assets/defaultAvatar.jpg";
import defaultGroup from "@/assets/defaultGroup.png";
import BackButton from "@/components/BackButton";
import DateConverter from "@/components/DateConvert";
import GroupStatusBadge from "@/components/groups/GroupStatus";
import MedGroupImage from "@/components/groups/MedGroupImage";
import MemberAvatar from "@/components/groups/MemberAvatar";
import { useGroupStore } from "@/hooks/useGroupStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useShallow } from "zustand/shallow";
import GroupPositionCard from "./GroupPosition";
import { getUserId } from "@/actions/userActions";
import { useRouter } from "next/router";
import Link from "next/link";

const GroupDetail: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const groupMembers = selectedgroup?.groupMembers;
  const groupPositions = selectedgroup?.groupPositions;
  const isLeader = groupMembers?.some(
    (member) => member.studentId === userId && member.role === "Leader"
  );

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-12 flex flex-col items-start hover:shadow-lg transition flex-1 mb-16">
      <div className="flex flex-col">
        <BackButton />

        <div className="flex flex-row items-center mt-2 w-15 h-15 gap-4 my-3">
          {selectedgroup?.imgUrl ? (
            <MedGroupImage imgUrl={selectedgroup?.imgUrl} />
          ) : (
            <div className="w-1/12">
              <Image
                src={defaultGroup}
                alt={selectedgroup?.name || "none"}
                className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm  aspect-square"
              />
            </div>
          )}
          <div className="text-left w-full font-bold text-[#54B8F0] text-2xl my-2">
            {selectedgroup?.name}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-xl font-bold text-black">
            {selectedgroup?.title}
          </h2>
          {selectedgroup?.status && (
            <GroupStatusBadge status={selectedgroup?.status} />
          )}
        </div>

        <div className="font-semibold text-base text-[#8C8F8E] ">
          {selectedgroup?.createdAt && (
            <DateConverter isoDate={selectedgroup?.createdAt} />
          )}
        </div>
      </div>

      <div className="text-left w-full font-normal text-base mt-1">
        {selectedgroup?.semesterName}
      </div>

      {/*Field name */}
      <div className="mt-4 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-lg">Field:</h2>
        <p className="font-normal text-base">{selectedgroup?.fieldName}</p>
      </div>

      {/*Max member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-lg">Max member:</h2>
        <p className="font-normal text-base">{selectedgroup?.maxMember}</p>
      </div>

      {/*Total member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-lg">Total member:</h2>
        <p className="font-normal text-base">{selectedgroup?.totalMembers}</p>
      </div>

      {/*description */}
      <div className="container mt-5">
        <div className="text-left w-full font-semibold text-xl text-[#8C8F8E] my-5">
          Description
        </div>

        <div className="text-left w-full font-normal text-base">
          {selectedgroup?.description}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8"></div>

      {/*position */}
      <div className="container">
        <div className="text-left w-full font-semibold text-xl text-[#8C8F8E] my-5">
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
        <div className="text-left w-full font-semibold text-xl text-[#8C8F8E] my-5">
          Member
        </div>
        {/*Member */}
        <div className="text-left w-full font-normal text-lg">
          <div className="grid grid-cols-2 gap-4 mt-4">
            {selectedgroup?.groupMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div key={member.studentId}>
                    {member?.imgUrl ? (
                      <MemberAvatar imgUrl={member?.imgUrl} />
                    ) : (
                      <Image
                        src={defaultAvatar}
                        alt={member?.studentName || "none"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm aspect-square"
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
          {isLeader && (
            <div className="mt-5 flex ">
              <Link href={`/groups/${selectedgroup?.id}/applications`} className="w-full flex justify-center items-center h-full" passHref>
                <button className="w-1/2 rounded-full  bg-gradient-to-r from-[#46afe9] to-[#c5e9f9] text-white py-4 text-xl font-bold flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  View Application
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
