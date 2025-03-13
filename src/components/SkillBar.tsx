import { StudentSkill } from "@/types";
import React from "react";

const getSkillLevelWidth = (level: string) => {
   switch (level.toLowerCase()) {
     case "beginner":
       return "25%";
     case "preintermediate":
       return "50%";
     case "intermediate":
       return "75%";
     case "advanced":
       return "100%";
     default:
       return "0%";
   }
 };
 
 const SkillBar: React.FC<StudentSkill> = ({id, skillName, skillType, skillLevel }) => {
   return (
      <div key={id} className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {skillName}
        </span>
        <span className="italic text-gray-600 text-sm">({skillType})</span>
      </div>

      <div className="relative w-full border border-gray-400 h-4 rounded-full mt-1 flex overflow-hidden bg-[#ebf3f8]">
        <div className="absolute left-1/4 top-0 h-full border-r border-[#173b4f]"></div>
        <div className="absolute left-2/4 top-0 h-full border-r border-[#173b4f]"></div>
        <div className="absolute left-3/4 top-0 h-full border-r border-[#173b4f]"></div>

        <div
          className="h-full transition-all duration-500"
          style={{
            width: getSkillLevelWidth(skillLevel),
            backgroundColor: "#46afe9",
          }}
        ></div>
      </div>

      <div className="grid grid-cols-4 text-sm text-gray-600 mt-1 text-center">
        <span>Beginner</span>
        <span>Pre-Intermediate</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
   );
 };
export default SkillBar;
