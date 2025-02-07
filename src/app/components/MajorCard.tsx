interface MajorCardProps {
   title: string;
 }
 
 const MajorCard: React.FC<MajorCardProps> = ({ title }) => {
   return (
     <div className="border border-gray-200 rounded-lg shadow-sm p-14 flex flex-col items-start justify-between text-center hover:shadow-lg transition">
       <h2 className="text-xl font-semibold text-black">{title}</h2>
       <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
         Details
       </button>
     </div>
   );
 };
 
 export default MajorCard;
 