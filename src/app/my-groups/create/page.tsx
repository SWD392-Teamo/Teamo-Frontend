"use client";
import React, { useState, useEffect } from "react";
import { addMember, createGroup, uploadImage } from "@/actions/groupActions";
import { addGroup, addGroupMembers } from "@/types/interface";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateGroupStep from "@/components/groups/create/CreateGroupStep";
import AddMembersStep from "@/components/groups/create/AddMemberStep";
import AddImageStep from "@/components/groups/create/AddImageStep";
import { GroupPosition } from "@/types";

const STEPS = {
   CREATE_GROUP: 0,
   ADD_MEMBERS: 1,
   ADD_IMAGE: 2
 };
 
 const CreateGroupPage = () => {
   const [step, setStep] = useState(STEPS.CREATE_GROUP);
   const [createdGroupId, setCreatedGroupId] = useState<number | undefined>(undefined);
   const [createdPositions, setCreatedPositions] = useState<GroupPosition[]>([]);
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   const router = useRouter();
 
   // Handle group creation submission
   const handleCreateGroup = async (groupData: addGroup) => {
     setIsSubmitting(true);
     try {
       const createdGroup = await createGroup(groupData);
       setCreatedGroupId(createdGroup.id);
       setCreatedPositions(createdGroup.groupPositions || []);
       toast.success("Group created successfully!");
       setStep(STEPS.ADD_MEMBERS);
       return createdGroup;
     } catch (error) {
       const errorMessage = error instanceof Error 
         ? error.message 
         : "Failed to create group";
       toast.error(errorMessage);
     } finally {
       setIsSubmitting(false);
     }
   };
 
   // Handle member addition
   const handleAddMember = async (memberData: addGroupMembers) => {
     if (!createdGroupId) return false;
     
     setIsSubmitting(true);
     try {
       await addMember(createdGroupId, memberData);
       toast.success("Member added successfully!");
       return true;
     } catch (error) {
       toast.error("Failed to add member");
       return false;
     } finally {
       setIsSubmitting(false);
     }
   };
 
   // Handle image upload
   const handleUploadImage = async (file: File): Promise<boolean> => {
      if (!file || !createdGroupId) return false;
      
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        
        formData.append('image', file);
        
        await uploadImage(createdGroupId, formData);
        toast.success("Image uploaded successfully!");
        return true;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    };
 
   // Finish the whole process
   const finishProcess = () => {
     toast.success("Group setup completed!");
     router.push("/my-groups");
   };
 
   // Next step handler
   const nextStep = () => {
     if (step < STEPS.ADD_IMAGE) {
       setStep(step + 1);
     } else {
       finishProcess();
     }
   };
 
   // Previous step handler
   const prevStep = () => {
     if (step > STEPS.CREATE_GROUP) {
       setStep(step - 1);
     }
   };
 
   // Get current tab value based on step
   const getCurrentTabValue = () => {
     switch(step) {
       case STEPS.CREATE_GROUP: return "create";
       case STEPS.ADD_MEMBERS: return "members";
       case STEPS.ADD_IMAGE: return "image";
       default: return "create";
     }
   };
 
   return (
     <div className="container mx-auto py-8">
       <Tabs value={getCurrentTabValue()} className="w-full">
         <TabsList className="grid w-full grid-cols-3">
           <TabsTrigger value="create" disabled={step !== STEPS.CREATE_GROUP}>
             Create Group
           </TabsTrigger>
           <TabsTrigger 
             value="members" 
             disabled={!createdGroupId || step !== STEPS.ADD_MEMBERS}
           >
             Add Members (Optional)
           </TabsTrigger>
           <TabsTrigger 
             value="image" 
             disabled={!createdGroupId || step !== STEPS.ADD_IMAGE}
           >
             Add Image (Optional)
           </TabsTrigger>
         </TabsList>
 
         {/* Step 1: Create Group */}
         <TabsContent value="create">
           <CreateGroupStep 
             onSubmit={handleCreateGroup}
             isSubmitting={isSubmitting}
           />
         </TabsContent>
 
         {/* Step 2: Add Members */}
         <TabsContent value="members">
           <AddMembersStep 
             onSubmit={handleAddMember}
             onSkip={nextStep}
             onBack={prevStep}
             groupPositions={createdPositions}
             isSubmitting={isSubmitting}
           />
         </TabsContent>
 
         {/* Step 3: Add Image */}
         <TabsContent value="image">
           <AddImageStep 
             onSubmit={handleUploadImage}
             onSkip={finishProcess}
             onBack={prevStep}
             onFinish={finishProcess}
             isSubmitting={isSubmitting}
           />
         </TabsContent>
       </Tabs>
 
       {/* Steps indicator */}
       <div className="flex items-center justify-between mt-6">
         <div className="flex items-center space-x-2">
           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
             step >= STEPS.CREATE_GROUP ? 'bg-[#58b6ea] text-white' : 'bg-gray-200'
           }`}>
             1
           </div>
           <div className={`h-1 w-8 ${step > STEPS.CREATE_GROUP ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
             step >= STEPS.ADD_MEMBERS ? 'bg-[#448eb6] text-white' : 'bg-gray-200'
           }`}>
             2
           </div>
           <div className={`h-1 w-8 ${step > STEPS.ADD_MEMBERS ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
             step >= STEPS.ADD_IMAGE ? 'bg-[#306683] text-white' : 'bg-gray-200'
           }`}>
             3
           </div>
         </div>
       </div>
       
       {/* Step status description */}
       <div className="mt-4 text-center text-gray-500">
         {step === STEPS.CREATE_GROUP && "Step 1: Create your group with required information"}
         {step === STEPS.ADD_MEMBERS && "Step 2: Add members to your group (optional)"}
         {step === STEPS.ADD_IMAGE && "Step 3: Upload a group image (optional)"}
       </div>
     </div>
   );
 };
 
 export default CreateGroupPage;