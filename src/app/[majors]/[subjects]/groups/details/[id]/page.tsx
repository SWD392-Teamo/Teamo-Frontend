"use client";

import BackButton from "@/components/BackButton";
import { useGroupStore } from "@/hooks/useGroupStore";
import { Group } from "@/types";
import React from "react";
import { useShallow } from "zustand/shallow";

const GroupDetail: React.FC = () => {
  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

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
    <div className="border border-gray-200 rounded-lg shadow-sm p-7 flex flex-col items-start hover:shadow-lg transition flex-1">
      <div className="flex flex-col">
        <BackButton />
        <h2 className="text-xl font-semibold text-black mt-3">
          {selectedgroup?.title}
        </h2>
      </div>
      <i className="text-left w-full font-thin text-xl">
        {selectedgroup?.name}
      </i>

      <div className="text-left w-full font-thin text-base">
        Semester
      </div>
      {/* <div className="flex items-center space-x-2">
        <i className="font-thin text-base text-gray-500">Leader:</i>
        <div className="text-lg font-semibold text-black font-beVietnam">
          {leader?.studentName}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex flex-col items-center mt-2 w-15 h-15">
          {leader?.imgUrl ? (
            <LeaderAvatar imgUrl={leader?.imgUrl} />
          ) : (
            <Image
              src={defaultAvatar}
              alt={leader?.studentName || "none"}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
          )}
        </div>

        {groupMember.map((member) => (
          <div
            key={member.studentId}
            className="flex flex-col items-center mt-2"
          >
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
        ))}
      </div>
      <Link href={link}>
        <button
          className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold"
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </Link>

      <div className="flex flex-wrap gap-2 mt-4">
        {groupPosition.map((position) => (
          <PositionCard key={position.id} position={position} />
        ))}
      </div> */}
    </div>
  );
};

export default GroupDetail;
