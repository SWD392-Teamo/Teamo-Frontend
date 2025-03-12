'use client'

import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import FilePicker from '@/components/FilePicker';
import toast from 'react-hot-toast';
import { useLoading } from '@/providers/LoadingProvider';
import { sendApplication, uploadApplicationDocument } from '@/actions/applicationActions';
import InputArea from '@/components/InputArea';

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

  async function handleDocumentUpload(document: File) {
    showLoading();
    const formData = new FormData();
    formData.append('document', document);
    const res = await uploadApplicationDocument(formData);
    hideLoading();
  
    if (res.statusCode == 200) {
      const url = res.details;
      setDocumentUrl(url);
      toast.success("Document uploaded successfully!");
    } else {
      toast.error("Document upload failed!");
    }
  }

  // Set up form state
  const {control, handleSubmit,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // On submit application logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();
        const res = await sendApplication(groupId, {
            ...data,
          documentUrl
        })
        if (res.statusCode == 200) {
            toast.success(res.message);
            onCancel();
        }
        else {
            toast.error(res.message);
        }
    } catch (error: any) {
        toast.error(error.status + ' ' + error.message)
    } finally {
        hideLoading();
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleFormSubmit)}>
        <InputArea 
            label='Tell us about yourself' 
            name='requestContent' 
            control={control}
            rows={5}
            showlabel='true'
            rules={{
                required: 'Please provide your request content',
                minLength: {
                    value: 10,
                    message: 'Content must be at least 10 characters'
                }
            }}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Add Your CV (.PDF only)</label>
          <FilePicker
            onFileSelect={handleDocumentUpload}
            accept=".pdf"
            placeholder="Upload CV"
            multiple={false}
            showFileName={true}
          />
        </div>

        <input 
            type="hidden" 
            {...control.register('groupPositionId')} 
            value={groupPositionId}
        />

        <div className='flex gap-6 justify-end'>
            <Button 
                className='btn btn--secondary'
                onClick={onCancel}
                type='button'>
                Cancel
            </Button>
            <Button 
                className='btn btn--primary'
                isProcessing={isSubmitting} 
                disabled={!isValid}
                type='submit'>
                Send Application
            </Button>
        </div>
    </form>
  )
}