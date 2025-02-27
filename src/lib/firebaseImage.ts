import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
;

export const getFirebaseImageUrl = async (filePath: string) => {
   try {
     const imageRef = ref(storage, filePath);
     const url = await getDownloadURL(imageRef);
     return url;
   } catch (error) {
     console.error("Error getting Firebase image URL:", error);
     return null;
   }
 };