export default function GroupStatusBadge({ status }: { status: string }) {
   const statusClasses: Record<string, string> = {
     Recruiting: "bg-[#DEFCE6] text-[#198254]",
     Full: "bg-[#FEF8BE] text-[#854900]",
     Archived: "bg-[#F3F4F6] text-[#4B5566]",
     Deleted: "bg-[#FDE2E1] text-[#BE0000]",
   };
 
   return (
     <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || "bg-gray-100 text-gray-700"}`}>
       {status}
     </span>
   );
 }
 
