'use client'

import { Button } from 'flowbite-react';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Input from '@/app/components/Input';
import { login } from '@/app/actions/authActions';
import toast from 'react-hot-toast';
import { AiFillGoogleCircle } from 'react-icons/ai';

export default function LoginForm() {
    // next navigation
    const router = useRouter();

    // set up form state
    const {control, handleSubmit, setFocus, reset, 
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // on submit logic
  async function onSubmit(data: FieldValues) {
        try {
            const res = await login(data)

            if(res?.error) {
                throw res.error;
            }

            router.push(`/`)
        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }
    }

  return (
    <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Email' name='email' control={control} 
            rules={{
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                }
            }}/>

        <Input label='Password' name='password' control={control} 
            type='password'
            rules={{required: 'Password is required'}}/>

        <div className='flex justify-between'>
            <Button 
                className='btn btn--primary--outline'
                isProcessing={isSubmitting} 
                disabled={!isValid}
                type='submit'>Submit</Button>
            <Button 
                className='btn btn--primary'
                isProcessing={isSubmitting}
                type='submit'>
                    <div className='btn--icon'>
                        <div>Login with</div>
                        <AiFillGoogleCircle size={15}/>
                    </div>
            </Button>
        </div>
    </form>
  )
}