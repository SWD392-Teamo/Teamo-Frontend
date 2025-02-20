import { useMajorStore } from "@/hooks/useMajorStore";
import { useSubjectStore } from "@/hooks/useSubjectStore";
import { Subject } from "@/types";
import Link from "next/link";
import { useShallow } from "zustand/shallow";

const SubjectCard: React.FC<{ subject: Subject }> = ({ subject }) => {
    const { selectedMajor } = useMajorStore(
      useShallow((state) => ({
        selectedMajor: state.selectedMajor,
      }))
    );

  const link = `/${selectedMajor?.code}/${subject.code}/groups`;
  const { setSelectedSubject } = useSubjectStore();


  const handleDetailsClick = () => {
    setSelectedSubject(subject);
  }

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start justify-between hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-black">{subject.code}</h2>
      <Link href={link}>
      <i className="text-left w-full font-thin text-base">{subject.name}</i>
      <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold" onClick={handleDetailsClick}>
        Details
      </button>
      </Link>
    </div>
  );
};

export default SubjectCard;
