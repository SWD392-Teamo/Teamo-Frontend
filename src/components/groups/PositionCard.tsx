import { GroupPosition } from "@/types";

const PositionCard: React.FC<{ position: GroupPosition }> = ({ position }) => {
   return (
     <div className="badge">
      <div className="badge-icon">{position.count}</div>
       {position.name}
     </div>
   );
 };
 
 export default PositionCard;