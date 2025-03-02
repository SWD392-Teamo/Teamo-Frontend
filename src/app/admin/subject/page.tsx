"use client";

import { useState, ChangeEvent, FormEvent } from "react";

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
        <div className="min-h-screen flex flex-col items-center bg-white">
            {/* Navbar */}
            <nav className="w-full flex justify-between items-center px-8 py-4 border-b shadow-sm">
                <div className="flex space-x-6 text-gray-600">
                    <a href="#" className="hover:text-black">Fields</a>
                    <a href="#" className="hover:text-black">Semesters</a>
                    <a href="#" className="hover:text-black">Majors</a>
                    <a href="#" className="text-black font-semibold border-b-2 border-blue-500">Subjects</a>
                </div>
            </nav>

            {/* Content */}
            <div className="w-full max-w-md mt-16">
                <button className="flex items-center text-gray-500 hover:text-black mb-4">
                    ← Back
                </button>
                <h2 className="text-2xl font-bold mb-6">Create Subjects</h2>

                {/* Form */}

                <form className="space-y-4">
                    Name
                    <input
                        type="text"
                        placeholder="Write Your Name"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    Field
                    <input
                        type="text"
                        placeholder="Write Your Field"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    Semester
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Select Your Semester</option>
                    </select>
                    Major
                    <input
                        type="text"
                        placeholder="Write Your Major"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
