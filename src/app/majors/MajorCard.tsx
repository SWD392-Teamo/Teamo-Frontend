import { useMajorStore } from "@/hooks/useMajorStore";
import { Major } from "@/types";
import Link from "next/link";
 
const MajorCard: React.FC<{major: Major}> = ({ major }) => {
  const link = `/${major.code}/subjects`;
  const { setSelectedMajor } = useMajorStore();

  const handleDetailsClick = () => {
    setSelectedMajor(major);
  }
   return (
     <div className="border border-gray-200 rounded-lg shadow-sm p-14 flex flex-col items-start justify-between text-center hover:shadow-lg transition">
       <h2 className="text-xl font-semibold text-black">{major.name}</h2>
       <Link href={link}>
        <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold" onClick={handleDetailsClick}>
          Details
        </button>
      </Link>
     </div>
   );
 };
 
 export default MajorCard;
 