"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";
import { UserPlus, Image, Upload } from "lucide-react";
import { Group } from "@/types";
import { createPost } from '@/actions/postAction';


interface CreatePostPopupProps {
  groups: Group[];
  currentUser: {
    id: number;
    name: string;
    imgUrl?: string;
  };
  onPostCreated: () => void;
}

export function CreatePostPopup({
  groups,
  currentUser,
  onPostCreated
}: CreatePostPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setContent("");
      setSelectedFile(null);
      setSelectedGroup(null);
    }
  }, [isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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

  const handleGroupSelect = (value: string) => {
    setSelectedGroup(parseInt(value, 10));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!selectedGroup) {
      toast.error("Please select a group");
      return;
    }
    
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("content", content);

      if (selectedFile) {
        formData.append("document", selectedFile);
      }

      const result = await createPost(selectedGroup, formData);

      if (result) {
        toast.success("Post created successfully!");
        setIsOpen(false);
        setContent("");
        setSelectedFile(null);
        setSelectedGroup(null);
        onPostCreated();
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("Post creation error:", error);
      toast.error("An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card className="w-full mb-6 shadow-sm hover:shadow-md transition-shadow mx-16">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.imgUrl} alt={currentUser.name} />
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <div 
              className="bg-secondary rounded-full px-4 py-2.5 flex-1 text-muted-foreground cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              Do you want to share something with your group, {currentUser.name}?
            </div>
          </div>
          
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Share something with your group
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.imgUrl} alt={currentUser.name} />
                  <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <Select onValueChange={handleGroupSelect} value={selectedGroup?.toString()}>
                    <SelectTrigger className="h-7 text-xs min-w-[150px]">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {groups.filter(g => g.id !== 0).map((group) => (
                        <SelectItem 
                          key={group.id} 
                          value={group.id.toString()}
                        >
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Post Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post here..."
                  className="mt-1 resize-y"
                />
              </div>

              <div>
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {!selectedFile ? (
                  <div
                    className={`
                      p-4 border-2 border-dashed rounded-lg text-center cursor-pointer
                      ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-200'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                  >
                    <div className="flex flex-col items-center py-2">
                      <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Add Photos or Files</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        or drag and drop
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border p-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="bg-secondary/50 p-2 rounded">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button 
                type="submit" 
                className="w-full"
                disabled={!content || !selectedGroup || isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}