import MemberAvatar from "@/components/MemberAvatar";
import PositionStatusBadge from "@/components/PositionStatus";
import { Group, GroupMember, GroupPosition } from "@/types";
import Image from "next/image";
import { List } from "postcss/lib/list";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import { IoIosStar } from "react-icons/io";
import { useGroupStore } from "@/hooks/useGroupStore";
import { useShallow } from "zustand/shallow";

const GroupPositionCard: React.FC<{
  positions: GroupPosition[];
  members: GroupMember[];
}> = ({ positions, members }) => {
  const { selectedgroup } = useGroupStore(
    useShallow((state) => ({
      selectedgroup: state.selectedGroup,
    }))
  );

  console.log("selectedgroup", selectedgroup);
  console.log("positions", positions);

  return (
    <div className="grid grid-cols-2 gap-6 ">
      {positions?.map((position) => (
        <div
          key={position.id}
          className="p-5 rounded-lg shadow-md border w-full bg-[linear-gradient(to_right,#F2F9FD_10%,#FFFFFF_90%)]"
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold mt-2">
              {position.name}
              <i className="font-normal"> ({position.count})</i>
            </h3>
          </div>

          {/* position status */}
          {position && (
            <div className="mt-3">
              <PositionStatusBadge status={position?.status} />
            </div>
          )}

          <div className="flex flex-row items-center py-3 gap-5">
            {members
              .filter((member) => member.positions.includes(position.name))
              .map((member, index) => (
                <div key={index} className="flex flex-col items-center gap-5">
                  {/* Member Avatar */}
                  <div key={member.studentId} className="">
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

                  <div className="flex items-center gap-1">
                    <h4 className="font-semibold">{member.studentName}</h4>
                    {member?.role === "Leader" && (
                      <IoIosStar className="text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            {Array.from({
              length:
                position.count -
                members.filter((member) =>
                  member.positions.includes(position.name)
                ).length,
            }).map((_, index) => (
              <div
                key={`default-${index}`}
                className="flex flex-col items-center gap-5"
              >
                <div>
                  <Image
                    src={defaultAvatar}
                    alt="none"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">Teamo</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupPositionCard;
