"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavbarUni from "@/app/admin/navbaruni/page"; // Đảm bảo đúng đường dẫn

export default function CreateSemester() {
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        status: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Semester Created:", formData);
        // Thêm logic lưu dữ liệu vào database
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <NavbarUni />
            <div className="max-w-3xl mx-auto p-8">
                <button className="text-gray-600 mb-4">&larr; Back</button>
                <h2 className="text-2xl font-semibold">Create Semester</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-2">
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Write Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block">Semester</label>
                    <input
                        type="text"
                        name="duration"
                        placeholder="How Long is Your Semester"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block">Staus</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">What's Your Semester Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
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
