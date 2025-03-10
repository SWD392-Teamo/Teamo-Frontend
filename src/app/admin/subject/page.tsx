"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavbarUni from "@/app/admin/navbaruni/page";
import BackButton from "@/components/BackButton";

export default function CreateSubjects() {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Subject Created:", formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white p-4">
            <NavbarUni />

            <div className="w-full max-w-md mt-5">
                <BackButton />
                <h2 className="text-2xl font-bold mb-6">Create Subjects</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block">Code</label>
                    <input
                        type="text"
                        name="code"
                        placeholder="Enter Subject Code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Subject Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter Subject Description"
                        value={formData.description}
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