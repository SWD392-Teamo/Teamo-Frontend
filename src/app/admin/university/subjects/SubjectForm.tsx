'use client'

import { createSubject, updateSubject } from '@/actions/subjectAction';
import FilePicker from '@/components/FilePicker';
import Input from '@/components/Input';
import InputArea from '@/components/InputArea';
import { useLoading } from '@/providers/LoadingProvider';
import { Subject } from '@/types';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  subject?: Subject,
  onCancel: () => void;
  onSuccess: () => void;
}

export default function SubjectForm({subject, onCancel, onSuccess}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [hasSubject, setHasSubject] = useState<boolean>(false);
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
    if (subject) {
        setHasSubject(true);
        const {code, name, description} = subject
        reset({code, name, description});
    }
  }, [subject, reset])

  // On submit major logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();

        const formData = new FormData();

        if (!hasSubject) {
          formData.append('code', data.code);
        }
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (selectedFile) {
          formData.append('image', selectedFile);
        }

        let res;

        if (hasSubject && subject?.id) {
          res = await updateSubject(subject?.id, formData);
        }
        else {
          res = await createSubject(formData);
        }
      
        if (res.error == undefined) {
          toast.success((hasSubject ? "Update" : "Create") + " subject succeeded");
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
      {!hasSubject &&
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
                value: 6,
                message: "The code has to be at least 6 characters",
              },
              maxLength: {
                value: 6,
                message: "The code has to be at max 6 characters",
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

        <div className="mb-4">
            <InputArea 
                label='Description' 
                name='description' 
                control={control}
                rows={5}
                showlabel='true'
                rules={{
                    required: 'Please provide description for this subject',
                    minLength: {
                        value: 10,
                        message: 'Content must be at least 10 characters'
                    }
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

        {subject?.imgUrl && 
          <div className='flex flex-row justify-center space-y-2'>
              <Image
                src={subject.imgUrl}
                alt="subject image"
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
                {hasSubject ? 'Edit Subject' : 'Create Subject'}
            </Button>
        </div>
    </form>
  )
}
