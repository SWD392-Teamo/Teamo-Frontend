"use client";

import MemberAvatar from "@/components/groups/MemberAvatar";
import PositionStatusBadge from "@/components/PositionStatus";
import { Group, GroupMember, GroupPosition, Skill } from "@/types";
import Image from "next/image";
import { List } from "postcss/lib/list";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import { IoIosStar } from "react-icons/io";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useShallow } from "zustand/shallow";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { use, useEffect, useState } from "react";
import AppModal from "@/components/AppModal";
import ApplicationForm from "@/components/applications/ApplicationForm";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getProfile } from "@/actions/userActions";
import { getSession } from "next-auth/react";
import { getAllSkills } from "@/actions/skillActions";

const GroupPositionCard: React.FC<{
  positions: GroupPosition[];
  members: GroupMember[];
  isMemberOrLeader: boolean;
}> = ({ positions, members, isMemberOrLeader }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

  useEffect(() => {
    const checkIfAdmin = async () => {
      try {
        const session = await getSession();
        if (session?.user.role == "Admin") {
          setIsAdmin(true);
        } else setIsAdmin(false);
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkIfAdmin();
  }, [selectedgroup]);

  console.log("positions", positions);

  const isGroupRecruiting = selectedgroup?.status === "Recruiting";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {positions?.map((position) => {
        const positionMembers = members.filter((member) =>
          member.positions.includes(position.name)
        );

        const skill = position.skills;

        const emptySlots = position.count - positionMembers.length;

        return (
          <Card
            key={position.id}
            className="overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-gray-200"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">
                    {position.name}
                    <span className="font-normal text-gray-500 ml-1">
                      ({position.count})
                    </span>
                  </h3>
                  {position && (
                    <PositionStatusBadge status={position?.status} />
                  )}
                </div>
                {skill.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skill.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="outline"
                        className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-4">
                  {/* Filled positions */}
                  {positionMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <Avatar className="h-10 w-10 border-2 border-gray-200">
                        <AvatarImage
                          src={member?.imgUrl}
                          alt={member?.studentName || "Member"}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {member?.studentName?.substring(0, 2) || "M"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                          {member.studentName}
                        </span>
                        {member?.role === "Leader" && (
                          <IoIosStar className="text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}

                  {Array.from({ length: emptySlots }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="flex flex-col items-center gap-2"
                    >
                      <Avatar className="h-10 w-10 border-2 border-gray-200">
                        <AvatarFallback className="bg-gray-100 text-gray-400">
                          ?
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-500">
                          Available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {!isMemberOrLeader &&
                  !isAdmin &&
                  isGroupRecruiting &&
                  position?.status === "Open" && (
                    <Button
                      variant="default"
                      className="bg-gradient-to-r from-[#46afe9] to-blue-400 hover:from-blue-400 hover:to-sky-400"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedPositionId(position.id);
                      }}
                    >
                      <HiOutlineLightningBolt className="h-4 w-4 mr-2" />
                      <span className="font-semibold">Easy Apply</span>
                    </Button>
                  )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <AppModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Send Application"
        size="2xl"
      >
        <ApplicationForm
          groupPositionId={selectedPositionId}
          groupId={selectedgroup?.id !== undefined ? selectedgroup?.id : 0}
          onCancel={() => setShowModal(false)}
        />
      </AppModal>
    </div>
  );
};

export default GroupPositionCard;
