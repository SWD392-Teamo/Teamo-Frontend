import { deleteGroup } from "@/actions/groupActions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Group } from "@/types";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export const DeleteGroupDialog: React.FC<{ 
  groupId: number; 
  groupName: string;
  onDeleteSuccess?: () => void;
}> = ({ groupId, groupName, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleDeleteGroup = async (): Promise<void> => {
    try {
      setIsDeleting(true);
      await deleteGroup(groupId);
      setIsOpen(false);
      toast.success("Group deleted successfully!");

    } catch (error: any) {
      console.error("Error deleting group:", error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" /> Delete Group
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{groupName}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteGroup}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};