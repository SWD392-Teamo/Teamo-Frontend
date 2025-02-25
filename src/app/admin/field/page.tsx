"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFields() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        major: "",
        semester: "",
    });

    const semesters = ["Spring 2025", "Fall 2025", "Summer 2025"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting: ", formData);
    };

    return (
        <div className="min-h-screen bg-white p-10">
            <button onClick={() => router.back()} className="text-blue-500 mb-4">&larr; Back</button>
            <h2 className="text-2xl font-semibold mb-6">Create Fields</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Write Your Name"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium">Major</label>
                    <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        placeholder="Write Your Major"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium">Semester</label>
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select Your Semester
                        </option>
                        {semesters.map((sem) => (
                            <option key={sem} value={sem}>
                                {sem}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
}