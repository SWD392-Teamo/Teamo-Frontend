// import Link from "next/link";
// import { Group } from "../interfaces/Group";

// const GroupCard: React.FC<Group> = ({ name, members, position, link }) => {
//    return (
//      <div className="border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col items-start justify-between hover:shadow-lg transition">
//        <h2 className="text-xl font-semibold text-black">{name}</h2>

//        <p className="text-sm text-gray-600 mt-2">{members}</p>
 
//        <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-700">
//          {position.map((pos, index) => (
//            <span
//              key={index}
//              className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg"
//            >
//              {pos}
//            </span>
//          ))}
//        </div>
 
//        <Link href={link}>
//          <button className="mt-6 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
//            Details
//          </button>
//        </Link>
//      </div>
//    );
//  };
 
//  export default GroupCard;