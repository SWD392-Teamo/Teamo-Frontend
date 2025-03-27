import { GroupPosition } from "@/types";
import { Badge } from "../ui/badge";

export const PositionBadge: React.FC<{ position: GroupPosition }> = ({ position }) => {
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
      <span className="mr-1 bg-blue-700 text-white rounded-full w-4 h-4 inline-flex items-center justify-center text-xs font-bold">
        {position.count}
      </span>
      {position.name}
    </Badge>
  );
};