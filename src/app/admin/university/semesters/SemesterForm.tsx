'use client'

import { createSemester, updateSemester } from '@/actions/semesterActions';
import Input from '@/components/Input';
import { useLoading } from '@/providers/LoadingProvider';
import { Semester } from '@/types';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  semester?: Semester,
  onCancel: () => void;
  onSuccess: () => void;
}

export default function SubjectForm({semester, onCancel, onSuccess}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [hasSemester, setHasSemester] = useState<boolean>(false);

  // Set up form state
  const {control, handleSubmit, reset, watch, formState: {isSubmitting, isValid, errors}} = useForm({
    mode: 'onTouched'
  });

  // Watch the date fields to perform custom validation
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Add validation logic
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        // You can either show a toast message here
        toast.error("Start date cannot be greater than end date");
      }
    }
  }, [startDate, endDate]);

  // initialize form fields
  useEffect(() => {
    if (semester) {
        setHasSemester(true);
        const {code, name, startDate, endDate} = semester
        reset({code, name, startDate, endDate});
    }
  }, [semester, reset])

  // On submit major logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();

        let res;

        if (hasSemester && semester?.id) {
          res = await updateSemester(semester?.id, data);
        }
        else {
          res = await createSemester(data);
        }
      
        if (res.error == undefined) {
          toast.success((hasSemester ? "Update" : "Create") + " semester succeeded");
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
      {!hasSemester &&
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
                value: 4,
                message: "The code has to be at least 4 characters",
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

        <div className="flex flex-row gap-3 mb-4">
          <Input
              label="Start Date"
              name="startDate"
              control={control}
              type="date"
              showlabel="true"
              rules={{
                required: "Start date is required",
              }}
          />

          <Input
              label="End Date"
              name="endDate"
              control={control}
              type="date"
              showlabel="true"
              rules={{
                required: "End date is required",
                validate: (value) => {
                  if (startDate && value) {
                    const start = new Date(startDate);
                    const end = new Date(value);
                    return start <= end || "End date must be after start date";
                  }
                  return true;
                }
              }}
          />
        </div>

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
                {hasSemester ? 'Edit Semester' : 'Create Semester'}
            </Button>
        </div>
    </form>
  )
}
