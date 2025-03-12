import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import { imgProps } from "@/types/interface";
import { useEffect, useState } from "react";

const MedGroupImage: React.FC<imgProps> = ({ imgUrl }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchImage = async () => {
       const url = await getFirebaseImageUrl(imgUrl);
       setImageUrl(url);
     };  
 
     fetchImage();
   }, [imgUrl]);
 
   return (
    <div className="w-1/12">
       {imageUrl ? (
         <img
           src={imageUrl}
           alt="User Avatar"
           className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-sm"
         />
       ) : (
         <p>Loading image...</p>
       )}
     </div>
   );
 };
 
 export default MedGroupImage;