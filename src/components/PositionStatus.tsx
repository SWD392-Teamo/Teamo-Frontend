export default function PositionStatusBadge({ status }: { status: string }) {
   const statusClasses: Record<string, string> = {
     Open: "bg-[#DEFCE6] text-[#198254]",
     Closed: "bg-[#FEF8BE] text-[#854900]",
     Deleted: "bg-[#FDE2E1] text-[#BE0000]",
   };
 
   return (
     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || "bg-gray-100 text-gray-700"}`}>
       {status}
     </span>
   );
 }
 