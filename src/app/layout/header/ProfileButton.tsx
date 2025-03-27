"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types"; // Adjust as needed
import { getUserById } from "@/actions/userActions";

interface ProfileSectionProps {
  userId: number | string;
}

export function ProfileSection({ userId }: ProfileSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(Number(userId));
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
   <div className="flex items-center flex-col gap-1 space-x-2">
   <Avatar className="h-8 w-8 border-2 border-blue-500">
     <AvatarImage
       src={user.imgUrl}
       alt={`${user.firstName || ''} ${user.lastName || ''}`}
     />
     <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">
       {user.firstName && user.lastName
         ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
         : user.email.substring(0, 2).toUpperCase()}
     </AvatarFallback>
   </Avatar>
   <span className="text-sm">Welcome, {user.email}</span>
 </div>
  );
}
