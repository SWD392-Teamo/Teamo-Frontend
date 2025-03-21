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
import PositionCard from "./PositionCard";

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const link = `/groups/details/${group.id}`

  const { setSelectedGroup } = useGroupStore();

  const handleDetailsClick = () => {
    setSelectedGroup(group);
  };

  const leader = group.groupMembers.find((member) => member.role === "Leader");
  const groupMember = group.groupMembers.filter(
    (member) => member.role === "Member"
  );
  const groupPosition = group.groupPositions;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start hover:shadow-lg transition flex-1">
      <div className="flex flex-row items-center w-15 h-15 gap-4 mb-3">
        {group?.imgUrl ? (
          <SmallGroupImage imgUrl={group?.imgUrl} />
        ) : (
          <div className="w-1/6">
            <Image
              src={defaultGroup}
              alt={group?.name || "none"}
              width={400}
              height={400}
              className=" object-cover rounded-full border-2 border-gray-300 shadow-sm"
            />
          </div>
        )}
        <div className="text-left w-full font-bold text-[#54B8F0] text-xl my-2">
          {group?.name}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <h2 className="text-xl font-bold text-black">{group?.title}</h2>
        {group?.status && <GroupStatusBadge status={group?.status} />}
      </div>
      <div className="flex items-center space-x-2">
        <i className="font-thin text-base text-gray-500">Leader:</i>
        <div className="text-lg font-semibold text-black font-beVietnam">
          {leader?.studentName}
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        {leader?.imgUrl ? (
          <LeaderAvatar imgUrl={leader?.imgUrl} />
        ) : (
          <Image
            src={defaultAvatar}
            alt={leader?.studentName || "none"}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-sm"
          />
        )}

        {groupMember.map((member) => (
          <div key={member.studentId}>
            {member?.imgUrl ? (
              <MemberAvatar imgUrl={member?.imgUrl} />
            ) : (
              <Image
                src={defaultAvatar}
                alt={member?.studentName || "none"}
                width={50}
                height={50}
                className=" rounded-full object-cover border-2 border-gray-300 shadow-sm"
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
      </div>
    </div>
  );
};

export default GroupCard;
