import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { DeleteConfirmationPopup } from "./DeleteLinkConfirm";
import { useEffect, useState } from "react";
import { Skill, StudentSkill } from "@/types";
import { getAllSkills } from "@/actions/skillActions";
import { addSkillProfile } from "@/types/interface";
import { addSkill, removeSkill, updateSkill } from "@/actions/userActions";
import PopupModal from "./PopupModal";

interface SkillManagementPopupProps {
   isOpen: boolean;
   onClose: () => void;
   skills: StudentSkill[];
   onSkillsUpdated: (skills: StudentSkill[]) => void;
 }
 
 type SkillType = {
   type: string;
   skills: Skill[];
 };
 
 export const SkillManagementPopup: React.FC<SkillManagementPopupProps> = ({
   isOpen,
   onClose,
   skills,
   onSkillsUpdated,
 }) => {
   const [skillsList, setSkillsList] = useState<StudentSkill[]>([]);
   const [editingSkill, setEditingSkill] = useState<StudentSkill | null>(null);
   const [allSkills, setAllSkills] = useState<Skill[]>([]);
   const [skillsByType, setSkillsByType] = useState<SkillType[]>([]);
   const [newSkills, setNewSkills] = useState<{ skillId: number; level: string; type: string }[]>([
     { skillId: 0, level: "beginner", type: "" },
   ]);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");
   const [hasChanges, setHasChanges] = useState(false);
   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
   const [skillToDelete, setSkillToDelete] = useState<{
     id: number;
     name: string;
   } | null>(null);
   
   const skillLevels = ["Beginner", "Preintermediate", "Intermediate", "Advanced"];
 
   useEffect(() => {
     if (isOpen) {
       setSkillsList([...skills]);
       setNewSkills([{ skillId: 0, level: "beginner", type: "" }]);
       setHasChanges(false);
       fetchAllSkills();
     }
   }, [isOpen, skills]);
 
   const fetchAllSkills = async () => {
     try {
       const skills = await getAllSkills();
       setAllSkills(skills);
       
       // Group skills by type
       const types = [...new Set(skills.map(skill => skill.type))];
       const grouped = types.map(type => ({
         type,
         skills: skills.filter(skill => skill.type === type)
       }));
       
       setSkillsByType(grouped);
     } catch (error) {
       console.error("Error fetching skills:", error);
       setError("Failed to load available skills.");
     }
   };
 
   const resetForm = () => {
     setNewSkills([{ skillId: 0, level: "Beginner", type: "" }]);
     setEditingSkill(null);
     setError("");
   };
 
   const handleAddNewSkillField = () => {
     setNewSkills([...newSkills, { skillId: 0, level: "Beginner", type: "" }]);
   };
 
   const handleRemoveSkillField = (index: number) => {
     const updatedSkills = [...newSkills];
     updatedSkills.splice(index, 1);
     setNewSkills(updatedSkills);
   };
 
   const handleNewSkillChange = (
      index: number,
      field: "skillId" | "level" | "type",
      value: string | number
    ) => {
      const updatedSkills: {
        skillId: number;
        level: string;
        type: string;
      }[] = [...newSkills];
      
      if (field === "skillId") {
        updatedSkills[index].skillId = value as number;
      } else if (field === "level") {
        updatedSkills[index].level = value as string;
      } else if (field === "type") {
        updatedSkills[index].type = value as string;
      }
      
      setNewSkills(updatedSkills);
    };
 
    
 
   const handleAddSkills = async () => {
     const skillsToAdd = newSkills.filter(
       (skill) => skill.skillId > 0 && skill.level
     );
 
     if (skillsToAdd.length === 0) {
       setError("Please add at least one valid skill.");
       return;
     }
 
     setIsSubmitting(true);
     setError("");
 
     try {
       const formattedSkills: addSkillProfile[] = skillsToAdd.map((skill) => ({
         skillId: skill.skillId,
         level: skill.level,
       }));
 
       const updatedUser = await addSkill(formattedSkills);
 
       setSkillsList(updatedUser.studentSkills);
       setHasChanges(true);
       resetForm();
     } catch (err) {
       console.error("Error saving skills:", err);
       setError("Failed to save skills. Please try again.");
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const handleEditSkill = async () => {
     if (!editingSkill) {
       return;
     }
 
     setIsSubmitting(true);
     setError("");
 
     try {
       const updatedSkill = await updateSkill(editingSkill.id, editingSkill.skillLevel);
 
       setSkillsList((prevSkills) =>
         prevSkills.map((skill) =>
           skill.id === editingSkill.id ? updatedSkill : skill
         )
       );
 
       setHasChanges(true);
       setEditingSkill(null);
     } catch (err) {
       console.error("Error updating skill:", err);
       setError("Failed to update skill. Please try again.");
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const handleStartEditSkill = (skill: StudentSkill) => {
     setEditingSkill({ ...skill });
   };
 
   const handleEditSkillChange = (level: string) => {
     if (editingSkill) {
       setEditingSkill({ ...editingSkill, skillLevel: level });
     }
   };
 
   const handleDeletePrompt = (skillId: number, skillName: string) => {
     setSkillToDelete({ id: skillId, name: skillName });
     setDeleteConfirmOpen(true);
   };
 
   const handleDeleteSkill = async () => {
     if (!skillToDelete) return;
 
     setIsSubmitting(true);
 
     try {
       await removeSkill(skillToDelete.id);
       setSkillsList((prevSkills) =>
         prevSkills.filter((skill) => skill.id !== skillToDelete.id)
       );
       setHasChanges(true);
       setDeleteConfirmOpen(false);
     } catch (err) {
       console.error("Error deleting skill:", err);
       setError("Failed to delete skill. Please try again.");
     } finally {
       setIsSubmitting(false);
     }
   };
 
   const handleSave = () => {
     onSkillsUpdated(skillsList);
     onClose();
   };
 
   const getSkillLevelClass = (level: string) => {
     switch (level) {
       case "Beginner":
         return "bg-blue-100 text-blue-800";
       case "Preintermediate":
         return "bg-green-100 text-green-800";
       case "Intermediate":
         return "bg-yellow-100 text-yellow-800";
       case "Advanced":
         return "bg-red-100 text-red-800";
       default:
         return "bg-gray-100 text-gray-800";
     }
   };
 
   return (
     <>
       <PopupModal
         isOpen={isOpen}
         title="Manage Skills"
         onClose={onClose}
         onSave={handleSave}
         disableSave={isSubmitting}
         isSaving={false}
       >
         <div className="space-y-4 max-h-[60vh] overflow-y-auto">
           {/* Edit Skill Form */}
           {editingSkill && (
             <div className="border rounded-md p-4 bg-gray-50">
               <h3 className="font-medium text-lg mb-2">Edit Skill Level</h3>
               <div className="space-y-3">
                 <div>
                   <p className="block text-sm font-medium text-gray-700">
                     Skill: <span className="font-bold">{editingSkill.skillName}</span>
                   </p>
                   <p className="block text-sm text-gray-500">
                     Type: {editingSkill.skillType}
                   </p>
                 </div>
 
                 <div>
                   <label
                     htmlFor="editSkillLevel"
                     className="block text-sm font-medium text-gray-700"
                   >
                     Skill Level
                   </label>
                   <select
                     id="editSkillLevel"
                     value={editingSkill.skillLevel}
                     onChange={(e) => handleEditSkillChange(e.target.value)}
                     className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                   >
                     {skillLevels.map((level) => (
                       <option key={level} value={level}>
                         {level.charAt(0).toUpperCase() + level.slice(1)}
                       </option>
                     ))}
                   </select>
                 </div>
 
                 <div className="flex space-x-2">
                   <button
                     onClick={handleEditSkill}
                     disabled={isSubmitting}
                     className="bg-[#46afe9] hover:bg-[#41a4db] text-white py-2 px-4 rounded-md"
                   >
                     {isSubmitting ? "Processing..." : "Update Skill"}
                   </button>
 
                   <button
                     onClick={() => setEditingSkill(null)}
                     className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </div>
           )}
 
           {/* Form for adding multiple skills */}
           {!editingSkill && (
             <div className="border rounded-md p-4">
               <h3 className="font-medium text-lg mb-2">Add New Skills</h3>
 
               <div className="space-y-4">
                 {newSkills.map((skill, index) => (
                   <div key={index} className="p-3 border rounded-md bg-gray-50">
                     <div className="flex justify-between items-center mb-2">
                       <span className="font-medium">Skill #{index + 1}</span>
                       {newSkills.length > 1 && (
                         <button
                           onClick={() => handleRemoveSkillField(index)}
                           className="text-red-500 hover:text-red-700"
                         >
                           <FaTrash size={14} />
                         </button>
                       )}
                     </div>
 
                     <div className="space-y-3">
                       <div>
                         <label
                           htmlFor={`skillType-${index}`}
                           className="block text-sm font-medium text-gray-700"
                         >
                           Skill Type
                         </label>
                         <select
                           id={`skillType-${index}`}
                           value={skill.type}
                           onChange={(e) =>
                             handleNewSkillChange(index, "type", e.target.value)
                           }
                           className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                         >
                           <option value="">Select a skill type</option>
                           {skillsByType.map((type) => (
                             <option key={type.type} value={type.type}>
                               {type.type}
                             </option>
                           ))}
                         </select>
                       </div>
 
                       <div>
                         <label
                           htmlFor={`skillId-${index}`}
                           className="block text-sm font-medium text-gray-700"
                         >
                           Skill
                         </label>
                         <select
                           id={`skillId-${index}`}
                           value={skill.skillId}
                           onChange={(e) =>
                             handleNewSkillChange(index, "skillId", parseInt(e.target.value))
                           }
                           disabled={!skill.type}
                           className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                         >
                           <option value={0}>Select a skill</option>
                           {skill.type && skillsByType
                             .find(type => type.type === skill.type)
                             ?.skills.map((skillOption) => (
                               <option key={skillOption.id} value={skillOption.id}>
                                 {skillOption.name}
                               </option>
                             ))}
                         </select>
                       </div>
 
                       <div>
                         <label
                           htmlFor={`skillLevel-${index}`}
                           className="block text-sm font-medium text-gray-700"
                         >
                           Skill Level
                         </label>
                         <select
                           id={`skillLevel-${index}`}
                           value={skill.level}
                           onChange={(e) =>
                             handleNewSkillChange(index, "level", e.target.value)
                           }
                           className="mt-1 block w-full border rounded-md py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                         >
                           {skillLevels.map((level) => (
                             <option key={level} value={level}>
                               {level.charAt(0).toUpperCase() + level.slice(1)}
                             </option>
                           ))}
                         </select>
                       </div>
                     </div>
                   </div>
                 ))}
 
                 <div className="flex flex-col space-y-3">
                   <button
                     onClick={handleAddNewSkillField}
                     className="border border-dashed border-gray-400 text-gray-600 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-50"
                   >
                     <FaPlus className="mr-2" /> Add Another Skill
                   </button>
 
                   {error && <p className="text-red-500 text-sm">{error}</p>}
 
                   <button
                     onClick={handleAddSkills}
                     disabled={isSubmitting}
                     className="bg-[#46afe9] hover:bg-[#41a4db] text-white py-2 px-4 rounded-md flex items-center justify-center"
                   >
                     {isSubmitting ? (
                       <span>Processing...</span>
                     ) : (
                       <span>Submit All Skills</span>
                     )}
                   </button>
                 </div>
               </div>
             </div>
           )}
 
           {/* List of existing skills */}
           <div>
             <h3 className="font-medium text-lg mb-2">Your Skills</h3>
             {skillsList.length === 0 ? (
               <p className="text-gray-500 italic">No skills added yet.</p>
             ) : (
               <ul className="space-y-2">
                 {skillsList.map((skill) => (
                   <li
                     key={skill.id}
                     className="flex items-center justify-between border rounded-md p-3"
                   >
                     <div className="flex-1 overflow-hidden">
                       <p className="font-medium">
                         {skill.skillName}
                       </p>
                       <div className="flex items-center space-x-2">
                         <span className="text-sm text-gray-500">{skill.skillType}</span>
                         <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelClass(skill.skillLevel)}`}>
                           {skill.skillLevel.charAt(0).toUpperCase() + skill.skillLevel.slice(1)}
                         </span>
                       </div>
                     </div>
                     <div className="flex space-x-2 shrink-0">
                       <button
                         onClick={() => handleStartEditSkill(skill)}
                         className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
                       >
                         <FaEdit />
                       </button>
                       <button
                         onClick={() => handleDeletePrompt(skill.id, skill.skillName)}
                         className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                       >
                         <FaTrash />
                       </button>
                     </div>
                   </li>
                 ))}
               </ul>
             )}
           </div>
         </div>
       </PopupModal>
 
       <DeleteConfirmationPopup
         isOpen={deleteConfirmOpen}
         name={skillToDelete?.name || ""}
         onClose={() => setDeleteConfirmOpen(false)}
         onConfirmDelete={handleDeleteSkill}
         isDeleting={isSubmitting}
       />
     </>
   );
 };