import { updatePost } from "@/actions/postAction";
import { FileText, Pencil, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Post } from "@/types";
import { getFileTypeFromFirebaseUrl } from "./PostCard";
import Update from "@/app/profile/update/[id]/page";

interface UpdatePostPopupProps {
  post: Post;
  onUpdateSuccess: () => void;
}

interface UpdateFormValues {
  content: string;
}

const UpdatePostPopup: React.FC<UpdatePostPopupProps> = ({
  post,
  onUpdateSuccess,
}) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [previewUrl, setPreviewUrl] = useState<string | null>(post.documentUrl || null);
   const [isDragging, setIsDragging] = useState<boolean>(false);
   const fileInputRef = useRef<HTMLInputElement>(null);
   
   const form = useForm<UpdateFormValues>({
     defaultValues: {
       content: post.content,
     },
   });
 
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0] || null;
     if (file) {
       processFile(file);
     }
   };
   
   const processFile = (file: File) => {
     setSelectedFile(file);
     const fileReader = new FileReader();
     fileReader.onload = () => {
       setPreviewUrl(fileReader.result as string);
     };
     fileReader.readAsDataURL(file);
   };
   
   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     setIsDragging(true);
   };
   
   const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     setIsDragging(false);
   };
   
   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     setIsDragging(false);
     
     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
       const file = e.dataTransfer.files[0];
       processFile(file);
     }
   };
   
   const handleButtonClick = () => {
     fileInputRef.current?.click();
   };
 
   const onSubmit = async (values: UpdateFormValues) => {
     try {
       setIsLoading(true);
       
       const formData = new FormData();
       formData.append("content", values.content);
       
       if (selectedFile) {
         formData.append("document", selectedFile);
       } else if (!previewUrl && post.documentUrl) {
         formData.append("removeDocument", "true");
       }
       
       await updatePost(post.groupId, post.id, formData);
       toast.success("Post updated successfully");
       onUpdateSuccess();
     } catch (error) {
       console.error("Error updating post:", error);
       toast.error("Failed to update post");
     } finally {
       setIsLoading(false);
     }
   };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
          <DialogDescription>
            Make changes to your post. Click save when you&#39;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="document">Document or Image</Label>

              <Input
                ref={fileInputRef}
                id="document"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
              />

              <div
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleButtonClick}
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      Drag and drop to replace, or click to select new file
                    </div>
                    {getFileTypeFromFirebaseUrl(previewUrl) === "image" ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 max-w-full object-contain mx-auto rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center p-2">
                        <FileText className="h-8 w-8 mr-2 text-muted-foreground" />
                        <span className="text-sm">Document attached</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Drag and drop file here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Or click to select
                    </p>
                  </div>
                )}
              </div>

              {previewUrl && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove file
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Post"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostPopup;
