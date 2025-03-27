"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';
import { uploadImage } from '@/actions/groupActions';

interface ImageUploadProps {
  groupId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}



const ImageUpload: React.FC<ImageUploadProps> = ({ 
  groupId, 
  onSuccess, 
  onCancel 
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Create and clean up preview URL when image file changes
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  const validateImage = (file: File): boolean => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return false;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return false;
    }
    
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (validateImage(file)) {
        setImageFile(file);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (validateImage(file)) {
        setImageFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      await uploadImage(groupId, formData);
      
      toast.success("Image uploaded successfully!");
      setImageFile(null);
      
      if (onSuccess) onSuccess();
    } catch (error:any) {
      console.error("Error uploading image:", error);
      toast.error(error.message)
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>
          Drag and drop an image or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!imageFile ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-16 h-16 mb-4">
              <ImageIcon className="w-full h-full text-gray-400" />
            </div>
            <h3 className="font-medium text-lg mb-2">Upload Image</h3>
            <p className="text-gray-500 mb-4">
              {isDragging 
                ? "Drop your image here" 
                : "Drag and drop your image here or click to browse"}
            </p>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Select Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-blue-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {previewUrl && (
                    <div className="mr-3 h-16 w-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">Selected Image</h3>
                    <p className="text-sm text-gray-500">
                      {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  Change
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-md w-full h-64 overflow-hidden rounded-md border">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!imageFile || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageUpload;