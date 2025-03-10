"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavbarUni from "@/app/admin/navbaruni/page"; // Đảm bảo đúng đường dẫn
import BackButton from "@/components/BackButton";

export default function CreateSemester() {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Semester Created:", formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <NavbarUni />
            <div className="w-full max-w-md mt-[10px]">
                <BackButton />
                <h2 className="text-2xl font-bold mb-6">Create S</h2>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="block">Code</label>
                    <input
                        type="text"
                        name="code"
                        placeholder="Enter Semester Code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Semester Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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