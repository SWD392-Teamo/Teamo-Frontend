"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import AdminNavbar from "@/app/admin/navbar/page";

export default function CreateSubjects() {
    const [formData, setFormData] = useState({
        name: "",
        field: "",
        semester: "",
        major: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Subject Created:", formData);
        // Thêm logic lưu dữ liệu vào database
    };

    return (
        <div className="min-h-screen bg-white">
            <AdminNavbar />
            <div className="max-w-3xl mx-auto p-8">
                <button className="text-gray-600 mb-4">&larr; Back</button>
                <h2 className="text-2xl font-semibold">Create Subjects</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Write Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="field"
                        placeholder="Write Your Field"
                        value={formData.field}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Your Semester</option>
                        <option value="Spring">Spring</option>
                        <option value="Fall">Fall</option>
                    </select>
                    <input
                        type="text"
                        name="major"
                        placeholder="Write Your Major"
                        value={formData.major}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
