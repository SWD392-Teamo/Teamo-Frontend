import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ImageIcon } from "lucide-react";
import ImageUpload from './ImageUpload'; // Make sure to import your ImageUpload component

interface ChangeImageDialogProps {
  groupId: number;
  groupName: string;
}

const ChangeImageDialog: React.FC<ChangeImageDialogProps> = ({ groupId, groupName }) => {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <span>Change Image</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Group Image</DialogTitle>
          <DialogDescription>
            Update the image for {groupName}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ImageUpload 
            groupId={groupId}
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeImageDialog;