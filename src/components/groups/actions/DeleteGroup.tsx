import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Group } from "@/types";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
export const DeleteGroupDialog: React.FC<{ groupId: number; groupName: string }> = ({ groupId, groupName }) => {
   const handleDeleteGroup = async (): Promise<void> => {
     // API call to delete group would go here
     console.log("Deleting group:", groupId);
     // After successful deletion, you might want to redirect
   };
 
   return (
     <Dialog>
       <DialogTrigger asChild>
         <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
           <Trash className="mr-2 h-4 w-4" /> Delete Group
         </DropdownMenuItem>
       </DialogTrigger>
       <DialogContent>
         <DialogHeader>
           <DialogTitle>Delete Group</DialogTitle>
           <DialogDescription>
             Are you sure you want to delete "{groupName}"? This action cannot be undone.
           </DialogDescription>
         </DialogHeader>
         <DialogFooter>
           <Button variant="outline">Cancel</Button>
           <Button variant="destructive" onClick={handleDeleteGroup}>Delete</Button>
         </DialogFooter>
       </DialogContent>
     </Dialog>
   );
 };
 