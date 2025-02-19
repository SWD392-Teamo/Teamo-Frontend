'use client'

import { Button } from 'flowbite-react';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import toast from 'react-hot-toast';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../../../firebase';

export default function LoginForm() {
  // Next navigation
  const router = useRouter();

  // Set up form state
  const {control, handleSubmit,
        formState: {isSubmitting, isValid}} = useForm({
            mode: 'onTouched'
        });

  // Google login
  async function handleGoogleLogin() {
    try {
        // Trigger Google sign-in popup
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth, provider);
        
        // Get ID token
        const idToken = await result.user.getIdToken();

        const res = await signIn('google', { 
            idToken,
            redirect: true,
            callbackUrl: '/'
        });
    
        if(res?.error) {
            throw res.error;
        }
    
        router.push('/')
    } catch(error: any) {
        toast.error(error.status + ' ' + error.message);
    }
  }

  // On submit login logic
  async function onSubmit(data: FieldValues) {
    try {
        const res = await signIn('dotnet-identity', {
            ...data,
            redirect: true,
            callbackUrl: '/'
        });

        if(res?.error) {
            throw res.error;
        }

        router.push(`/`)
    } catch (error: any) {
        toast.error(error.status + ' ' + error.message)
    }
  }

  return (
    <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Email' name='email' control={control}
            type='email'
            showlabel='true'
            rules={{
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                }
            }}/>

        <Input label='Password' name='password' control={control} 
            type='password'
            showlabel='true'
            rules={{required: 'Password is required'}}/>

        <div className='flex gap-6'>
            <Button 
                className='btn btn--primary--outline'
                isProcessing={isSubmitting} 
                disabled={!isValid}
                type='submit'>Submit</Button>
            <Button 
                className='btn btn--primary'
                onClick={handleGoogleLogin}>
                    <div className='btn--icon'>
                        <div>Login with</div>
                        <AiFillGoogleCircle size={20}/>
                    </div>
            </Button>
        </div>
    </form>
  )
}