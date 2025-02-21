import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import { UserAvatarProps } from "@/types/interface";
import { useEffect, useState } from "react";

const LeaderAvatar: React.FC<UserAvatarProps> = ({ imgUrl }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchImage = async () => {
       const url = await getFirebaseImageUrl(imgUrl);
       setImageUrl(url);
     };  
 
     fetchImage();
   }, [imgUrl]);
 
   return (
     <div className="flex flex-col items-center">
       {imageUrl ? (
         <img
           src={imageUrl}
           alt="User Avatar"
           className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-sm"
         />
       ) : (
         <p>Loading image...</p>
       )}
     </div>
   );
 };
 
 export default LeaderAvatar;