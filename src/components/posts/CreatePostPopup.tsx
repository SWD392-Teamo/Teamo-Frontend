"use client";

import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/postAction";


interface CreatePostPopupProps {
   groupId: number;
   groupName: string;
   onPostCreated?: () => void;
 }
 
 export function CreatePostPopup({
   groupId,
   groupName,
   onPostCreated,
 }: CreatePostPopupProps) {
   const [isOpen, setIsOpen] = useState(false);
   const [content, setContent] = useState("");
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [dragActive, setDragActive] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
 
   const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     e.stopPropagation();
     if (e.type === "dragenter" || e.type === "dragover") {
       setDragActive(true);
     } else if (e.type === "dragleave") {
       setDragActive(false);
     }
   };
 
   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     e.stopPropagation();
     setDragActive(false);
     
     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       setSelectedFile(e.dataTransfer.files[0]);
     }
   };
 
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       setSelectedFile(file);
     }
   };
 
   const removeFile = () => {
     setSelectedFile(null);
     if (inputRef.current) {
       inputRef.current.value = '';
     }
   };
 
   const onButtonClick = () => {
     inputRef.current?.click();
   };
 
   async function onSubmit(e: React.FormEvent) {
     e.preventDefault();
     
     try {
       const formData = new FormData();
       formData.append("content", content);
 
       if (selectedFile) {
         formData.append("document", selectedFile);
       }
 
       const result = await createPost(groupId, formData);
 
       if (result) {
         toast.success("Post created successfully!");
 
         setContent("");
         setSelectedFile(null);
         setIsOpen(false);
 
         if (onPostCreated) {
           onPostCreated();
         }
       } else {
         toast.error("Failed to create post");
       }
     } catch (error) {
       console.error("Post creation error:", error);
       toast.error("An error occurred while creating the post");
     }
   }
 
   return (
     <>
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
           <Button variant="default">Create Post in {groupName}</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogTitle>Create New Post</DialogTitle>
             <DialogDescription>
               Announce something to other member in {groupName} group?
             </DialogDescription>
           </DialogHeader>
           <form onSubmit={onSubmit} className="space-y-4">
             <div className="space-y-4">
               <div>
                 <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                   Post Content
                 </label>
                 <Textarea
                   id="content"
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                   placeholder="Write your post here..."
                   className="mt-1 resize-none"
                 />
               </div>
 
               <div>
                 <input
                   ref={inputRef}
                   type="file"
                   className="hidden"
                   onChange={handleFileChange}
                 />
                 <div
                   className={`
                     p-6 border-2 border-dashed rounded-lg text-center 
                     ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                   `}
                   onDragEnter={handleDrag}
                   onDragLeave={handleDrag}
                   onDragOver={handleDrag}
                   onDrop={handleDrop}
                 >
                   {!selectedFile ? (
                     <div>
                       <p className="text-gray-600">
                         Drag and drop a file or an image here or{' '}
                         <button 
                           type="button"
                           onClick={onButtonClick}
                           className="text-blue-600 hover:underline"
                         >
                           browse
                         </button>
                       </p>
                       <p className="text-xs text-gray-500 mt-1">
                         PDF, DOC, DOCX, TXT, PNG, JPG,... (max 5MB)
                       </p>
                     </div>
                   ) : (
                     <div className="flex justify-between items-center">
                       <div className="flex items-center space-x-2">
                         <span className="text-sm">{selectedFile.name}</span>
                         <span className="text-xs text-gray-500">
                           ({Math.round(selectedFile.size / 1024)} KB)
                         </span>
                       </div>
                       <button
                         type="button"
                         onClick={removeFile}
                         className="text-red-600 hover:underline text-sm"
                       >
                         Remove
                       </button>
                     </div>
                   )}
                 </div>
               </div>
 
               <Button 
                 type="submit" 
                 className="w-full"
                 disabled={!content}
               >
                 Create Post
               </Button>
             </div>
           </form>
         </DialogContent>
       </Dialog>
       <Toaster />
     </>
   );
 }