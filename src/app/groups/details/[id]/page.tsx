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
import Link from "next/link";
import { getGroupById } from "@/actions/groupActions";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LeaderActions from "@/components/groups/actions/LeaderActions";
import { Skill } from "@/types";
import { getAllSkills } from "@/actions/skillActions";

const GroupDetail: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const param = useParams();
  const router = useRouter();
  const { id } = param;

  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };

    const fetchGroup = async (id: number) => {
      const group = await getGroupById(id);
      setSelectedGroup(group);
    };

    fetchUserId();

    if (selectedgroup == null) {
      fetchGroup(Number(id));
    }
  }, []);

  const groupMembers = selectedgroup?.groupMembers;
  const groupPositions = selectedgroup?.groupPositions;
  const isLeader =
    groupMembers?.some(
      (member) => member.studentId === userId && member.role === "Leader"
    ) ?? false;

  const isMember =
    groupMembers?.some(
      (member) => member.studentId === userId && member.role === "Member"
    ) ?? false;

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 mb-8">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-start justify-between">
              <BackButton />
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Avatar className="h-16 w-16 border-2 border-gray-200">
                <AvatarImage
                  src={selectedgroup?.imgUrl}
                  alt={selectedgroup?.name || "Group"}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {selectedgroup?.name?.substring(0, 2) || "GP"}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-2xl text-blue-500">
                  {selectedgroup?.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-xl font-semibold">
                    {selectedgroup?.title}
                  </h2>
                  {selectedgroup?.status && (
                    <GroupStatusBadge status={selectedgroup?.status} />
                  )}
                </div>
                <CardDescription className="mt-1">
                  {selectedgroup?.semesterName}
                </CardDescription>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {selectedgroup?.createdAt && (
                <DateConverter isoDate={selectedgroup?.createdAt} />
              )}
            </div>
          </div>
          {isLeader && selectedgroup && <LeaderActions group={selectedgroup} />}

        </div>

      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Field</h3>
            <p className="mt-1">{selectedgroup?.fieldName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Max Members
            </h3>
            <p className="mt-1">{selectedgroup?.maxMember}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Members
            </h3>
            <p className="mt-1">{selectedgroup?.totalMembers}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Description
          </h3>
          <p className="text-sm">{selectedgroup?.description}</p>
        </div>

        <Separator />

        {/*position */}
        <div className="container">
          <div className="text-left w-full font-semibold text-xl text-[#8C8F8E] my-5">
            Position
          </div>
          {groupPositions && groupMembers && (
            <GroupPositionCard
              positions={groupPositions}
              members={groupMembers}
              isMemberOrLeader={isLeader || isMember}
            />
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium text-muted-foreground mb-4">
            Members
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedgroup?.groupMembers.map((member, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      onClick={() =>
                        router.push(`/profile/details/${member.studentId}`)
                      }
                    >
                      <AvatarImage
                        src={member?.imgUrl}
                        alt={member?.studentName || "User"}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {member?.studentName?.substring(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{member.studentName}</h4>
                        {member?.role === "Leader" && (
                          <IoIosStar className="text-yellow-500" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-blue-500 mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {member.positions}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        {isLeader && (
          <Link
            href={`/groups/${selectedgroup?.id}/applications`}
            className="w-full"
          >
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400"
              size="lg"
            >
              View Applications
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroupDetail;
