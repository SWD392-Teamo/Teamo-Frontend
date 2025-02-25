"use client";
import { useState } from "react";

export default function CreateMajors() {
    const [formData, setFormData] = useState({
        name: "",
        field: "",
        semester: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Majors</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Write Your Name"
                            className="mt-1 p-2 w-full border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Field</label>
                        <input
                            type="text"
                            name="field"
                            value={formData.field}
                            onChange={handleChange}
                            placeholder="Write Your Field"
                            className="mt-1 p-2 w-full border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Semester</label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg"
                            required
                        >
                            <option value="">Select Your Semester</option>
                            <option value="Fall 2025">Fall 2025</option>
                            <option value="Spring 2026">Spring 2026</option>
                            <option value="Summer 2026">Summer 2026</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
