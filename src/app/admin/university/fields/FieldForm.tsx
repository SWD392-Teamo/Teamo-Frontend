'use client'

import { createField, updateField } from '@/actions/fieldActions';
import Input from '@/components/Input';
import InputArea from '@/components/InputArea';
import { useLoading } from '@/providers/LoadingProvider';
import { Field } from '@/types';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  field?: Field,
  onCancel: () => void;
  onSuccess: () => void;
}

export default function FieldForm({field, onCancel, onSuccess}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [hasField, setHasField] = useState<boolean>(false);

  // Set up form state
  const {control, handleSubmit, reset,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // initialize form fields
  useEffect(() => {
    if (field) {
        setHasField(true);
        const {name, description} = field
        reset({name, description});
    }
  }, [field, reset])

  // On submit field logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();

        let res;

        if (hasField) {
          res = await updateField(field?.id!, data);
        }
        else {
          res = await createField(data);
        }

        if (res.error == undefined) {
            toast.success((hasField ? "Update" : "Create") + " field succeeded");
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
                    required: 'Please provide description for this Field',
                    minLength: {
                        value: 10,
                        message: 'Content must be at least 10 characters'
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
                {hasField ? 'Edit Field' : 'Create Field'}
            </Button>
        </div>
    </form>
  )
}
