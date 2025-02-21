import { useMajorStore } from "@/hooks/useMajorStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { GroupGeneral, Subject } from "@/types";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import Image from "next/image";
import LeaderAvatar from "@/components/UserAvatar";
import MemberAvatar from "@/components/MemberAvatar";
import PositionCard from "./PositionCard";

const GroupCard: React.FC<{ group: GroupGeneral }> = ({ group }) => {
  //   const { selectedMajor } = useMajorStore(
  //     useShallow((state) => ({
  //       selectedMajor: state.selectedMajor,
  //     }))
  //   );

  // const link = `/${selectedMajor?.code}/${subject.code}/groups`;
  // const { setSelectedSubject } = useSubjectStore();

  // const handleDetailsClick = () => {
  //   setSelectedSubject(subject);
  // }

  const leader = group.groupMembers.find((member) => member.role === "Leader");
  const groupMember = group.groupMembers.filter(
    (member) => member.role === "Member"
  );
  const groupPosition = group.groupPositions;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start justify-between hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-black">{group.title}</h2>
      {/* <Link href={link}> */}
      <i className="text-left w-full font-thin text-xl">{group.name}</i>
      <div className="flex items-center space-x-2">
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

      <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
        Details
      </button>
      <div className="flex flex-wrap mt-2 pt-2">
        {groupPosition.map((position) => (
          <PositionCard key={position.id} position={position} />
          // <span
          //   key={position.id}
          //   className="text-xs px-3 py-1 border border-gray-300 text-center flex-1"
          // >
          //   {position.name} ({position.count})
          // </span>
        ))}
      </div>
      {/* </Link> */}
    </div>
  );
};

export default GroupCard;
