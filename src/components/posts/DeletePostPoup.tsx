import { deletePost } from "@/actions/postAction";
import { Post } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
   DialogClose,
 } from "@/components/ui/dialog";
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu";
 import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface DeletePostPopupProps {
   post: Post;
   onDeleteSuccess: () => void;
 }
 
 const DeletePostPopup: React.FC<DeletePostPopupProps> = ({ post, onDeleteSuccess }) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
 
   const handleDelete = async () => {
     try {
       setIsLoading(true);
       await deletePost(post.groupId, post.id);
       toast.success("Post deleted successfully");
       onDeleteSuccess();
     } catch (error) {
       console.error("Error deleting post:", error);
       toast.error("Failed to delete post");
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <Dialog>
       <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} data-delete-trigger="true">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
       <DialogContent>
         <DialogHeader>
           <DialogTitle>Delete Post</DialogTitle>
           <DialogDescription>
             Are you sure you want to delete this post? This action cannot be undone.
           </DialogDescription>
         </DialogHeader>
         <DialogFooter className="gap-2 sm:gap-0">
           <DialogClose asChild>
             <Button variant="outline">Cancel</Button>
           </DialogClose>
           <Button 
             variant="destructive" 
             onClick={handleDelete} 
             disabled={isLoading}
           >
             {isLoading ? "Deleting..." : "Delete Post"}
           </Button>
         </DialogFooter>
       </DialogContent>
     </Dialog>
   );
 };

 export default DeletePostPopup;