import { Group, GroupPosition } from "@/types";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../../ui/button";
import { Briefcase, Edit, MoreVertical, Settings, Trash, UserPlus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { DeleteGroupDialog } from "./DeleteGroup";
import { UpdatePositionsDialog } from "./UpdatePosition";
import { AddPositionDialog } from "./AddPosition";
import { DeletePositionDialog } from "./DeletePosition";
import { UpdateMemberDialog } from "./UpdateMember";
import { AddMemberDialog } from "./AddMember";
import { RemoveMemberDialog } from "./RemoveMember";
import UpdateGroupDialog from "./UpdateGroup";
import ChangeImageDialog from "./ChangeImage";

interface LeaderActionsProps {
   group: Group;
 }
 
 const LeaderActions: React.FC<LeaderActionsProps> = ({ group }) => {
   return (
     <DropdownMenu >
       <DropdownMenuTrigger asChild >
         <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
           <MoreVertical className="h-4 w-4" />
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end" color="white" className="bg-white">
         <DropdownMenuLabel>Group Management</DropdownMenuLabel>
         
         {/* Group Actions */}
         <ChangeImageDialog groupId={group.id} groupName={group.name} />
         <UpdateGroupDialog group={group} />
         <DeleteGroupDialog groupId={group.id} groupName={group.name} />
         
         <DropdownMenuSeparator />
         <DropdownMenuLabel>Position Management</DropdownMenuLabel>
         
         {/* Position Actions */}
         <UpdatePositionsDialog group={group} />
         <AddPositionDialog groupId={group.id} />
         <DeletePositionDialog groupId={group.id} positions={group.groupPositions} />
         
         <DropdownMenuSeparator />
         <DropdownMenuLabel>Member Management</DropdownMenuLabel>
         
         {/* Member Actions */}
         <AddMemberDialog groupId={group.id} />
         <UpdateMemberDialog members={group.groupMembers} />
         <RemoveMemberDialog groupId={group.id} members={group.groupMembers} />
       </DropdownMenuContent>
     </DropdownMenu>
   );
 };
 
 export default LeaderActions;
 
 
 
 

 
 
 
 
