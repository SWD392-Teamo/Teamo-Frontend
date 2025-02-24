"use client";

import BackButton from "@/components/BackButton";
import ProfileCard from "./ProfileCard";


export default function Details() {

  return (
    <div>
      <div><BackButton url="/" /></div>
      
        <ProfileCard/>
      
    </div>
  )
}
