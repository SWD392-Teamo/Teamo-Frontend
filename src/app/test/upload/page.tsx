'use client'

import { getCurrentUser } from '@/actions/authActions';
import { uploadImage } from '@/actions/userActions';
import FilePicker from '@/components/FilePicker'
import React from 'react'
import toast from 'react-hot-toast';
import { IconType } from 'react-icons';

async function handleImageUpload(image: File) {
  const formData = new FormData();

  formData.append('image', image);

  const user = await getCurrentUser();
  const userId = user.id;

  const res = await uploadImage(userId, formData);

  if (res.statusCode == 200) {
    console.log("Image uploaded successfully!");
  } else {
    toast.error("Image upload failed!");
  }
}

export default function Upload() {
  return (
    <FilePicker 
      onFileSelect={handleImageUpload} 
      multiple={false} 
      accept='image/*' 
      hasIcon={true} 
      showFileName={false} />
  )
}
