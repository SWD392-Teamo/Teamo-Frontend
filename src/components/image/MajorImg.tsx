import { getFirebaseImageUrl } from "@/lib/firebaseImage";
import { imgProps } from "@/types/interface";
import { useEffect, useState } from "react";

const MajorImg: React.FC<imgProps> = ({ imgUrl }) => {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchImage = async () => {
       const url = await getFirebaseImageUrl(imgUrl);
       setImageUrl(url);
     };  
 
     fetchImage();
   }, [imgUrl]);
 
   return (
    <div className="w-full">
       {imageUrl ? (
         <img
           src={imageUrl}
           alt="Major Image"
           className="w-full h-48 object-cover rounded-lg mb-4"
         />
       ) : (
         <p>Loading image...</p>
       )}
     </div>
   );
 };
 
 export default MajorImg;