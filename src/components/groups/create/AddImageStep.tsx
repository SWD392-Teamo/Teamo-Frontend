import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AddImageStepProps {
   onSubmit: (file: File) => Promise<boolean>;
   onSkip: () => void;
   onBack: () => void;
   onFinish: () => void;
   isSubmitting: boolean;
 }

 
 const AddImageStep: React.FC<AddImageStepProps> = ({ 
   onSubmit, 
   onSkip, 
   onBack, 
   onFinish, 
   isSubmitting 
 }) => {
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [isFormValid, setIsFormValid] = useState<boolean>(false);
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 
   // Validate form on change
   useEffect(() => {
     setIsFormValid(imageFile !== null);
     
     if (imageFile) {
       const url = URL.createObjectURL(imageFile);
       setPreviewUrl(url);
       
       return () => URL.revokeObjectURL(url);
     } else {
       setPreviewUrl(null);
     }
   }, [imageFile]);
 
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files && files.length > 0) {
       const file = files[0];
       
       if (!file.type.startsWith('image/')) {
         toast.error("Please select an image file");
         return;
       }
              if (file.size > 5 * 1024 * 1024) {
         toast.error("Image size should be less than 5MB");
         return;
       }
       
       setImageFile(file);
     }
   };
 
   const handleSubmit = async (): Promise<void> => {
     if (!isFormValid || !imageFile) return;
     
     try {
       const success = await onSubmit(imageFile);
       if (success) {
         setImageFile(null);
         setPreviewUrl(null);
       }
     } catch (error) {
       console.error("Error uploading image:", error);
       toast.error("Failed to upload image");
     }
   };
 
   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     e.stopPropagation();
   };
   
   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault();
     e.stopPropagation();
     
     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
       const file = e.dataTransfer.files[0];
       
       if (!file.type.startsWith('image/')) {
         toast.error("Please select an image file");
         return;
       }
       
       if (file.size > 5 * 1024 * 1024) {
         toast.error("Image size should be less than 5MB");
         return;
       }
       
       setImageFile(file);
     }
   };
 
   return (
     <Card className="w-full mx-auto">
       <CardHeader>
         <CardTitle className="text-2xl">Add Group Image (Optional)</CardTitle>
         <CardDescription className="text-xl">
           Upload an image for your group or skip this step
         </CardDescription>
       </CardHeader>
       <CardContent>
         <div className="space-y-6">
           <div 
             className="border-2 border-dashed rounded-lg p-8 text-center"
             onDragOver={handleDragOver}
             onDrop={handleDrop}
           >
             <div className="mx-auto w-16 h-16 mb-4">
               <ImageIcon className="w-full h-full text-gray-400" />
             </div>
             <h3 className="font-medium text-lg mb-2">Upload Group Image</h3>
             <p className="text-gray-500 mb-4">Drag and drop your image here or click to browse</p>
             <Input
               id="image-upload"
               type="file"
               accept="image/*"
               className="hidden"
               onChange={handleImageChange}
             />
             <Button
               variant="outline"
               onClick={() => document.getElementById('image-upload')?.click()}
             >
               <ImageIcon className="mr-2 h-4 w-4" />
               Select Image
             </Button>
           </div>
 
           {imageFile && (
             <div className="p-4 border rounded-md bg-blue-50">
               <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   {previewUrl && (
                     <div className="mr-3 h-12 w-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                       <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                     </div>
                   )}
                   <div>
                     <h3 className="font-medium">Selected Image</h3>
                     <p>{imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)</p>
                   </div>
                 </div>
                 <Button 
                   variant="ghost" 
                   size="sm"
                   onClick={() => setImageFile(null)}
                 >
                   Change
                 </Button>
               </div>
             </div>
           )}
 
           <div className="flex items-center justify-between pt-4">
             <Button
               type="button"
               variant="outline"
               onClick={onBack}
             >
               Back
             </Button>
             <div className="space-x-2">
               <Button
                 type="button"
                 variant="default"
                 onClick={onSkip}
               >
                 Skip
               </Button>
               <Button
                 type="button"
                 disabled={!isFormValid || isSubmitting}
                 onClick={handleSubmit}
               >
                 {isSubmitting ? "Uploading..." : "Upload Image"}
               </Button>
             </div>
           </div>
         </div>
       </CardContent>
       <CardFooter className="flex justify-end">
         <Button
           onClick={onFinish}
           className="ml-2"
         >
           Finish Setup
         </Button>
       </CardFooter>
     </Card>
   );
 };
 
 export default AddImageStep;