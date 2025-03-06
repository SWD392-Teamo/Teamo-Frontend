"use client";
import { useState } from "react";
import NavbarUni from "@/app/admin/navbaruni/page"; // Đảm bảo đúng đường dẫn
import BackButton from "@/components/BackButton"; // Import component BackButton

export default function CreateMajor() {
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
        <div className="min-h-screen flex flex-col items-center bg-white">
            <NavbarUni />

            <div className="w-full max-w-md mt-[10px]">
                {/* Thay thế nút back bằng BackButton */}
                <BackButton />

                <h2 className="text-2xl font-bold mb-6">Create Majors</h2>

                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="block">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Write Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block mt-2">Field</label>
                    <input
                        type="text"
                        name="field"
                        placeholder="Write Your Field"
                        value={formData.field}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block mt-2">Semester</label>
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option disabled value="">Select Your Semester</option>
                        {[...Array(9)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-2"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
