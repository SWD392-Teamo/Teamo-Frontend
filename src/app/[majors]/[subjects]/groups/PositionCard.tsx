import { GroupPosition } from "@/types";

const PositionCard: React.FC<{ position: GroupPosition }> = ({ position }) => {
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
 
 
   return (
     <div className="text-xs px-3 py-1 border border-gray-300 text-left flex-1">
       {position.name}
       <div >{position.count} </div>
       {/* <button className="mt-4 px-6 py-2 text-base text-logo border border-logo rounded-full hover:bg-blue-100 font-semibold">
         Details
       </button> */}

       {/* </Link> */}
     </div>
   );
 };
 
 export default PositionCard;