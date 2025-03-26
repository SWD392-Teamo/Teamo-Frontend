'use client'

import React, { useCallback, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import FilePicker from '@/components/FilePicker';
import toast from 'react-hot-toast';
import { useLoading } from '@/providers/LoadingProvider';
import { sendApplication, uploadApplicationDocument } from '@/actions/applicationActions';
import InputArea from '@/components/InputArea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { FileIcon, UploadIcon, XIcon } from 'lucide-react';

interface ApplicationFormProps {
  groupPositionId: number;
  groupId: number;
  onCancel: () => void;
}

export default function ApplicationForm({ 
  groupPositionId,
  groupId, 
  onCancel
}: ApplicationFormProps) {
  const { showLoading, hideLoading } = useLoading();
  const [documentUrl, setDocumentUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Set up form with react-hook-form
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, isValid, errors }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      requestContent: '',
      groupPositionId: groupPositionId.toString()
    }
  });

  async function processFile(file: File) {
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error("Updating PDF file only!");

      return;
    }
    
    setFileName(file.name);
    showLoading();
    
    try {
      const formData = new FormData();
      formData.append('document', file);
      const res = await uploadApplicationDocument(formData);
    
      if (res.statusCode === 200) {
        const url = res.details;
        setDocumentUrl(url);
        toast.success("Document uploaded successfully!");

      } else {
        toast.error("Document uploaded failed!");

      }
    } catch (error) {
      toast.error("Document uploaded failed!");

    } finally {
      hideLoading();
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  // On submit application logic
  async function handleFormSubmit(data: any) {
    try {
      showLoading();
      const res = await sendApplication(groupId, {
        ...data,
        documentUrl,
        groupPositionId 
      });
      
      if (res && res.statusCode !== 400) {
        toast.success("Application sent successfully!");

        onCancel();
      } else {
        toast.success("Application sent failed! Please try again later");

      }
    } catch (error: any) {
      toast.error("Document uploaded failed!");

    } finally {
      hideLoading();
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="requestContent">Tell us about yourself</Label>
        <Controller
          name="requestContent"
          control={control}
          rules={{
            required: 'Please provide your request content',
            minLength: {
              value: 10,
              message: 'Content must be at least 10 characters'
            }
          }}
          render={({ field }) => (
            <div>
              <Textarea 
                id="requestContent"
                placeholder="Tell us why you're interested in this position..."
                className="min-h-[120px]"
                {...field}
              />
              {errors.requestContent && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.requestContent.message?.toString()}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="document">Add Your CV (.PDF only)</Label>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : fileName 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
          } flex flex-col items-center justify-center cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {fileName ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-gray-200">
                <FileIcon className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">{fileName}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName('');
                    setDocumentUrl('');
                  }}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <XIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-green-600 font-medium">File uploaded successfully</p>
            </div>
          ) : (
            <>
              <UploadIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-1">Drag and drop your CV here</p>
              <p className="text-xs text-gray-500 mb-2">or click to browse files</p>
              <p className="text-xs text-gray-500">PDF only, max 10MB</p>
            </>
          )}
        </div>
      </div>

      <input 
        type="hidden" 
        {...register('groupPositionId')}
        value={groupPositionId} 
      />

      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
        >
          {isSubmitting ? "Sending..." : "Send Application"}
        </Button>
      </div>
    </form>
  );
}