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
        phoneNumber: "",
        gender: "",
        major: "",
        image: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                        { label: "Phone Number", name: "phoneNumber" }
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

                    {/* Dropdown Gender */}
                    <div>
                        <label className="block text-gray-700 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Major */}
                    <div>
                        <label className="block text-gray-700 font-medium">Major</label>
                        <input
                            type="text"
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Student Major"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-gray-700 font-medium">Image</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Image URL"
                        />
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
