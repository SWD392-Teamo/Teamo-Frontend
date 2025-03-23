'use client'

import { createMajor, updateMajor } from '@/actions/majorActions';
import FilePicker from '@/components/FilePicker';
import Input from '@/components/Input';
import { useLoading } from '@/providers/LoadingProvider';
import { Major } from '@/types';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  major?: Major,
  onCancel: () => void;
  onSuccess: () => void;
}

export default function MajorForm({major, onCancel, onSuccess}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [hasMajor, setHasMajor] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  async function handleImagePicked(file: File) {
    setSelectedFile(file);
  }

  // Set up form state
  const {control, handleSubmit, reset,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // initialize form fields
  useEffect(() => {
    if (major) {
        setHasMajor(true);
        const {code, name} = major
        reset({code, name});
    }
  }, [major, reset])

  // On submit major logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();

        const formData = new FormData();

        if (!hasMajor) {
          formData.append('code', data.code);
        }
        formData.append('name', data.name);
        if (selectedFile) {
          formData.append('image', selectedFile);
        }

        let res;

        if (hasMajor) {
          res = await updateMajor(major?.id!, formData);
        }
        else {
          res = await createMajor(formData);
        }
      
        if (res.error == undefined) {
          toast.success((hasMajor ? "Update" : "Create") + " major succeeded");
          onSuccess();
          onCancel();
      }
      else if(res.error.message.statusCode == 400) {
          toast.error(res.error.message.message);
      }
    } catch (error: any) {
        toast.error(error.status + ' ' + error.message)
    } finally {
        hideLoading();
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit(handleFormSubmit)}>
      {!hasMajor &&
        <div className="mb-4">
          <Input
            label="Code"
            name="code"
            control={control}
            type="text"
            showlabel="true"
            rules={{
              required: "Code is required",
              minLength: {
                value: 2,
                message: "The code has to be at least 2 characters",
              },
              maxLength: {
                value: 3,
                message: "The code has to be at max 3 characters",
              },
            }}
          />
        </div>
      }

        <div className="mb-4">
          <Input
            label="Name"
            name="name"
            control={control}
            type="text"
            showlabel="true"
            rules={{
              required: "Name is required",
            }}
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Upload Image</label>
          <FilePicker
            onFileSelect={handleImagePicked}
            accept=".jpeg, .jpg, .png"
            placeholder="Upload Image"
            multiple={false}
            showFileName={true}
          />
        </div>

        {major?.imgUrl && 
          <div className='flex flex-row justify-center space-y-2'>
              <Image
                src={major.imgUrl}
                alt="major image"
                width={500}
                height={300}
                className="object-cover border-2 border-gray-300 shadow-sm"
              />
          </div>
        }

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
                {hasMajor ? 'Edit Major' : 'Create Major'}
            </Button>
        </div>
    </form>
  )
}
