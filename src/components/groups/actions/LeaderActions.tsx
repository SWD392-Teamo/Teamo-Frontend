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
  onActionComplete: () => void; 
}
const LeaderActions: React.FC<LeaderActionsProps> = ({ group, onActionComplete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" color="white" className="bg-white">
        <DropdownMenuLabel>Group Management</DropdownMenuLabel>
        
        <ChangeImageDialog 
          groupId={group.id} 
          groupName={group.name} 
          onComplete={onActionComplete} 
        />
        <UpdateGroupDialog 
          group={group} 
          onComplete={onActionComplete} 
        />
        <DeleteGroupDialog 
          groupId={group.id} 
          groupName={group.name} 
          onComplete={onActionComplete} 
        />
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Position Management</DropdownMenuLabel>
        
        <AddPositionDialog 
          groupId={group.id} 
          onComplete={onActionComplete} 
        />
        <UpdatePositionsDialog 
          group={group} 
          onComplete={onActionComplete} 
        />
        <DeletePositionDialog 
          groupId={group.id} 
          positions={group.groupPositions} 
          onComplete={onActionComplete} 
        />
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Member Management</DropdownMenuLabel>
        
        <AddMemberDialog 
          group={group} 
          onComplete={onActionComplete} 
        />
        <UpdateMemberDialog 
          group={group} 
          onComplete={onActionComplete} 
        />
        <RemoveMemberDialog 
          groupId={group.id} 
          members={group.groupMembers} 
          onComplete={onActionComplete} 
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeaderActions;
 
 
 

 
 
 
 
