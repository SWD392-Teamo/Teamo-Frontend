import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const DEFAULT_IMAGE_PATH = "teamo/images/placeholders/default-avatar.jpg";

export const getFirebaseImageUrl = async (filePath: string | null) => {
   try {
     const path = (!filePath || filePath === "null") ? DEFAULT_IMAGE_PATH : filePath;   
     const imageRef = ref(storage, path);
     const url = await getDownloadURL(imageRef);
     return url;
   } catch (error) {
     console.error("Error getting Firebase image URL:", error);
     return getDownloadURL(ref(storage, DEFAULT_IMAGE_PATH));
   }
};