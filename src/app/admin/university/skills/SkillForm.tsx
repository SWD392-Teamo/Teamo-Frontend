'use client'

import { createSkill, updateSkill } from '@/actions/skillActions';
import Input from '@/components/Input';
import InputArea from '@/components/InputArea';
import { useLoading } from '@/providers/LoadingProvider';
import { Skill } from '@/types';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  skill?: Skill,
  onCancel: () => void;
  onSuccess: () => void;
}

export default function SkillForm({skill, onCancel, onSuccess}: Props) {
  const { showLoading, hideLoading } = useLoading();
  const [hasField, setHasField] = useState<boolean>(false);

  // Set up form state
  const {control, handleSubmit, reset,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // initialize form fields
  useEffect(() => {
    if (skill) {
        setHasField(true);
        const {name, type} = skill
        reset({name, type});
    }
  }, [skill, reset])

  // On submit field logic
  async function handleFormSubmit(data: FieldValues) {
    try {
        showLoading();

        let res;

        if (hasField) {
          res = await updateSkill(skill?.id!, data);
        }
        else {
          res = await createSkill(data);
        }

        if (res.error == undefined) {
            toast.success((hasField ? "Update" : "Create") + " skill succeeded");
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
                label='Type' 
                name='type' 
                control={control}
                rows={5}
                showlabel='true'
                rules={{
                    required: 'Please provide type for this skill'
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
                {hasField ? 'Edit Skill' : 'Create Skill'}
            </Button>
        </div>
    </form>
  )
}
