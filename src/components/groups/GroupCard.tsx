import defaultAvatar from "@/assets/defaultAvatar.jpg";
import defaultGroup from "@/assets/defaultGroup.png";
import LeaderAvatar from "@/components/UserAvatar";
import GroupStatusBadge from "@/components/groups/GroupStatus";
import MemberAvatar from "@/components/groups/MemberAvatar";
import SmallGroupImage from "@/components/groups/SmallGroupImage";
import { useGroupStore } from "@/hooks/useGroupStore";
import { Group } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { PositionBadge } from "./PositionCard";
import { AvatarGroup } from "../ui/avatar-group";

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const link = `/groups/details/${group.id}`;

  const { setSelectedGroup } = useGroupStore();

  const handleDetailsClick = () => {
    setSelectedGroup(group);
  };

  const leader = group.groupMembers.find((member) => member.role === "Leader");
  const members = group.groupMembers.filter(
    (member) => member.role === "Member"
  );

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?"
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-gray-200">
            <AvatarImage src={group?.imgUrl || undefined} alt={group?.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {getInitials(group?.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-500 truncate">{group?.name}</h3>
            <div className="flex flex-wrap items-center mt-1">
              <h2 className="font-semibold text-lg text-gray-900">{group?.title}</h2>
              {group?.status && <GroupStatusBadge status={group?.status} />}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2 flex-grow">
        <div className="space-y-4">
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500 mr-2">Leader:</span>
            <div className="flex items-center">
              <span className="font-medium">{leader?.studentName}</span>
            </div>
          </div>
          
          {group.groupMembers.length > 0 && (
            <div className="flex items-center mt-3">
              <AvatarGroup limit={3} showCount={members.length > 3}>
                {/* Leader avatar first (larger) */}
                <Avatar className="h-12 w-12 border-2 border-white ring-2 ring-blue-100">
                  <AvatarImage src={leader?.imgUrl || undefined} alt={leader?.studentName} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {getInitials(leader?.studentName || '')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Member avatars */}
                {members.map((member) => (
                  <Avatar key={member.studentId} className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={member?.imgUrl || undefined} alt={member?.studentName} />
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                      {getInitials(member?.studentName || '')}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          )}
          
          {group.groupPositions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {group.groupPositions.map((position) => (
                <PositionBadge key={position.id} position={position} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Link href={link} className="w-full">
          <button
            className="w-full px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold transition"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
