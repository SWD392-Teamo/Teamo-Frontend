"use client";

import BackButton from "@/components/BackButton";
import MemberAvatar from "@/components/MemberAvatar";
import LeaderAvatar from "@/components/UserAvatar";
import { useGroupStore } from "@/hooks/useGroupStore";
import { Group } from "@/types";
import Image from "next/image";
import React from "react";
import { useShallow } from "zustand/shallow";
import defaultGroup from "@/assets/defaultGroup.png";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import MedGroupImage from "@/components/MedGroupImage";
import DateConverter from "@/components/DateConvert";
import GroupStatusBadge from "@/components/GroupStatus";
import PositionCard from "../../PositionCard";
import { FaStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

const GroupDetail: React.FC = () => {
  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

  const leader = selectedgroup?.groupMembers.find(
    (member) => member.role === "Leader"
  );
  const groupMember = selectedgroup?.groupMembers.filter(
    (member) => member.role === "Member"
  );
  const groupPosition = selectedgroup?.groupPositions;

  // const { selectedSubject } = useSubjectStore(
  //   useShallow((state) => ({
  //     selectedSubject: state.selectedSubject,
  //   }))
  // );

  // const link = `/${selectedMajor?.code}/${selectedSubject?.code}/groups/details/${group.id}`;
  // const { setSelectedGroup } = useGroupStore();

  // const handleDetailsClick = () => {
  //   setSelectedGroup(group);
  // };

  // const leader = group.groupMembers.find((member) => member.role === "Leader");
  // const groupMember = group.groupMembers.filter(
  //   (member) => member.role === "Member"
  // );
  // const groupPosition = group.groupPositions;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-12 flex flex-col items-start hover:shadow-lg transition flex-1 mb-16">
      <div className="flex flex-col">
        <BackButton />

        <div className="flex flex-row items-center mt-2 w-15 h-15 gap-4 my-3">
          {selectedgroup?.imgUrl ? (
            <MedGroupImage imgUrl={selectedgroup?.imgUrl} />
          ) : (
            <Image
              src={defaultGroup}
              alt={selectedgroup?.name || "none"}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
          )}
          <div className="text-left w-full font-bold text-[#54B8F0] text-xl my-2">
            {selectedgroup?.name}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl font-bold text-black">
            {selectedgroup?.title}
          </h2>
          {selectedgroup?.status && (
            <GroupStatusBadge status={selectedgroup?.status} />
          )}
        </div>

        <div className="font-semibold text-lg text-[#8C8F8E] ">
          {selectedgroup?.createdAt && (
            <DateConverter isoDate={selectedgroup?.createdAt} />
          )}
        </div>
      </div>

      <div className="text-left w-full font-normal text-lg mt-1">
        {selectedgroup?.semesterName}
      </div>

      {/*Field name */}
      <div className="mt-4 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Field:</h2>
        <p className="font-normal text-lg">{selectedgroup?.fieldName}</p>
      </div>

      {/*Max member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Max member:</h2>
        <p className="font-normal text-lg">{selectedgroup?.maxMember}</p>
      </div>

      {/*Total member */}
      <div className="mt-2 flex justify-start gap-2 items-center">
        <h2 className="font-semibold text-xl">Total member:</h2>
        <p className="font-normal text-lg">{selectedgroup?.totalMembers}</p>
      </div>

      {/*description */}
      <div className="container mt-5">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Description
        </div>

        <div className="text-left w-full font-normal text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
          sagittis nunc. Praesent vitae malesuada ante. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Aliquam vel gravida nibh, eget vulputate
          mauris. Proin fermentum vitae diam in faucibus. Sed et risus sit amet
          erat scelerisque auctor sed quis est. In quis iaculis sapien. Fusce
          auctor hendrerit dui, vitae posuere elit sodales quis. Duis a lacus
          venenatis, euismod turpis at, faucibus metus. Suspendisse potenti. Nam
          sed risus luctus, sollicitudin lectus eu, consectetur lacus. Vivamus
          imperdiet turpis vitae est bibendum posuere. Nulla at semper enim. Nam
          nisl magna, pretium a odio malesuada, auctor luctus risus.
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8"></div>

      {/*requirement */}
      <div className="container">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Requirement
        </div>

        <div className="text-left w-full font-normal text-lg">
          <div className="flex flex-wrap gap-2 mt-4">
            {groupPosition?.map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8"></div>
      <div className="container">
        <div className="text-left w-full font-semibold text-2xl text-[#8C8F8E] my-5">
          Member
        </div>

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
  );
};

export default GroupDetail;
