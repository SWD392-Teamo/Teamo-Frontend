"use client";

import { useState } from "react";
import AdminNavbar from "@/app/admin/navbar/page";

export default function ImportStudentProfiles() {
    const [formData, setFormData] = useState<Record<string, string>>({
        username: "",
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        major: "",
        image: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="min-h-screen bg-white">
            <AdminNavbar />
            <div className="max-w-2xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold mb-6">Import Student Profiles</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Username", name: "username" },
                        { label: "ID", name: "id" },
                        { label: "First Name", name: "firstName" },
                        { label: "Last Name", name: "lastName" },
                        { label: "Email", name: "email" },
                        { label: "Gender", name: "gender" },
                        { label: "Phone Number", name: "phoneNumber" },
                        { label: "Major", name: "major" },
                        { label: "Image", name: "image" }
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-medium">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter Student ${field.label}`}
                            />
                        </div>
                    ))}
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
