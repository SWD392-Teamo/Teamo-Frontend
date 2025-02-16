import { Subject } from "@/types";

const SubjectCard: React.FC<{ subject: Subject }> = ({ subject }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-10 flex flex-col items-start justify-between text-center hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-black">{subject.name}</h2>
      {/* <Link href={link}> */}
      <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
        Details
      </button>
      {/* </Link> */}
    </div>
  );
};

export default SubjectCard
