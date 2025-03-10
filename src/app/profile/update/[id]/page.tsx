"use client";

import { useEffect } from "react";
import ProfileCard from "./ProfileCard";
import BackButton from "@/components/BackButton";
import { fetchUserProfile } from "@/actions/userActions";
import { useUserStore } from "@/hooks/useUserStore";
import { useParams } from "next/navigation";


export default function Update() {
  const data = useUserStore((state) => state.user);
  const setData = useUserStore((state) => state.setData);
  const params = useParams();
  const id =  Number(params.id);
  const link = `/profile/details/${id}`;

  useEffect(() => {
    fetchUserProfile(id).then(setData);
  }, [setData]);

  console.log("param", params);

  console.log("user", data);

  return (
    <div>
      <div><BackButton url={link} /></div>
      <div>
      {data ? <ProfileCard user={data} /> : <div>User not found</div>}
      </div>
    </div>
  );
}