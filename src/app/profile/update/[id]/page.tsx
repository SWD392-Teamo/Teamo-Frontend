"use client";

import BackButton from '@/components/BackButton'
import { useParams } from 'next/navigation';
import React from 'react'

export default function Update() {
  const params = useParams();
  const id =  Number(params.id);
  const url = `/profile/details/${id}`;
  return (
    <div>
      <div><BackButton url={url} /></div>
      My profile update page/popup
    </div>
  )
}
