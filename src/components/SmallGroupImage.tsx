import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import { imgProps } from "@/types/interface";
import { useEffect, useState } from "react";

const SmallGroupImage: React.FC<imgProps> = ({ imgUrl }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchImage = async () => {
       const url = await getFirebaseImageUrl(imgUrl);
       setImageUrl(url);
     };  
 
     fetchImage();
   }, [imgUrl]);
 
   return (
     <div className="w-1/6">
       {imageUrl ? (
         <img
           src={imageUrl}
           alt="User Avatar"
           aspect-square

           className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-sm"
           />
       ) : (
         <p>Loading image...</p>
       )}
     </div>
   );
 };
 
 export default SmallGroupImage;