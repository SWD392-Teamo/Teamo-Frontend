import { addSkill, deleteSkill, getAllSkill, updateSkillLevel } from "@/actions/userActions";
import { useSkillStore } from "@/hooks/useSkillStore";
import { StudentSkill } from "@/types";
import { on } from "events";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalType: "edit contact" | "add contact" | "delete contact" | "edit skill" | "add skill" | null;
    studentSkill: StudentSkill | null;
}

const SkillModal: React.FC<SkillModalProps> = ({isOpen, onClose, modalType, studentSkill}) => {
    const params = useParams();
    const id =  Number(params.id);
    const [skillLevel, setSkillLevel] = useState("");
    const [skillId, setSkillId] = useState(0);
    const skill = useSkillStore((state) => state.skill);
    const setSkill = useSkillStore((state) => state.setData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setError("");
            return;
        }
    
        console.log("Opening modal with studentSkill:", studentSkill);
        
        if (studentSkill) {
            setSkillId(studentSkill.id);
            setSkillLevel(studentSkill.skillLevel || "Intermediate"); 
            console.log("Set skillLevel:", studentSkill.skillLevel);
            setError("");
        } else {
            getAllSkill().then(setSkill);
        }
    }, [isOpen, studentSkill]);

    console.log("skillId", skillId);
    console.log("skillLevel", skillLevel);
    console.log("studentSkill", studentSkill);

    const handleSave = async () => {
        if (studentSkill) {
            if (!skillLevel) {
                setError("Please select a level!");
                setIsLoading(false);
                return;
            }
            try {
                await updateSkillLevel(id, skillId, {level: skillLevel});
                console.log("Skill updated successfully:", { skillId, skillLevel });
                setError("");
                onClose();
            } catch (error) {
                console.error("Error updating skill:", error);
                setError("Error updating skill!");
            } finally {
                setIsLoading(false);
            }
        } else {
            if (!skillId || !skillLevel) {
                setError("Please select a skill and level!");
                return;
            }
            try {
                await addSkill(id, {skillId, level: skillLevel});
                console.log("Skill added successfully!");
                setError("");
                onClose();
            } catch (error) {
                console.error("Error adding skill:", error);
                setError("Error adding skill!");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDelete = async () => {
        if (studentSkill) {
            console.log("Deleting skill:", { studentSkill });
            await deleteSkill(id, studentSkill.id)
                .then(() => {
                    console.log("Skill deleted successfully!");
                    onClose();
                })
                .catch(() => {
                    setError("Error deleting skill!");
                    console.log("Error deleting skill!");
                });
        }

    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">
                    {modalType === "add skill" ? "Add Skill" : "Edit Skill"}
                </h2>
                {modalType === "add skill" && (
                <><><select
                        className="w-full border p-2 rounded mb-4"
                        value={skillId}
                        onChange={(e) => setSkillId(Number(e.target.value))}
                    >
                        <option value="">Select Skill</option>
                        {skill.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full border p-2 rounded mb-2"
                        value={skillLevel}
                        onChange={(e) => {
                            console.log("Selected level:", e.target.value);
                            setSkillLevel(e.target.value);
                        }}
                    >
                        <option value="">Select Level</option>
                        <option value="PreIntermediate">PreIntermediate</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select></>
                    {error && <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>}
                    <button 
                        className="px-4 py-2 bg-logo text-white rounded mr-2" 
                        onClick={handleSave} 
                        disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                    </button></>
                )}
                {modalType === "edit skill" && (
                    <><><span 
                            className="mb-2 text-darkgrey font-semibold">{studentSkill?.skillName}</span>
                        <select
                            className="w-full border p-2 rounded mb-2"
                            value={skillLevel}
                            onChange={(e) => {
                                console.log("Selected level:", e.target.value);
                                setSkillLevel(e.target.value);
                            }}
                        >
                            <option value="">Select Level</option>
                            <option value="PreIntermediate">PreIntermediate</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        {error && <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>}
                        <button 
                            className="px-4 py-2 bg-logo text-white rounded mr-2" 
                            onClick={handleSave} 
                            disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save"}
                        </button>
                        </><button 
                            className="px-4 py-2 bg-danger text-white rounded mr-2" 
                            onClick={handleDelete} 
                            disabled={isLoading}>
                                Delete
                        </button></>
                )}
                <button 
                    className="px-4 py-2 bg-gray-300 rounded" 
                    onClick={onClose}
                    disabled={isLoading}>
                        Cancel
                </button>
            </div>
        </div>
    );
};

export default SkillModal;
