"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarUni from "@/app/admin/navbaruni/page"; // Đảm bảo đúng đường dẫn

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
        <div className="min-h-screen flex flex-col items-center bg-white">
            <NavbarUni />

            <div className="w-full max-w-md mt-[10px]"> {/* Giảm khoảng cách từ navbar tới form */}
                <button className="flex items-center text-gray-500 hover:text-black mb-4">
                    ← Back
                </button>
                <h2 className="text-2xl font-bold mb-6">Create Fields</h2>

                <form className="space-y-2"> {/* Giảm space-y để thu gọn khoảng cách trong form */}
                    <label className="block">Name</label>
                    <input
                        type="text"
                        placeholder="Write Your Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mt-2">Field</label>
                    <input
                        type="text"
                        placeholder="Write Your Field"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mt-2">Semester</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option disabled selected>Select Your Semester</option>
                        {[...Array(9)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <label className="block mt-2">Major</label>
                    <input
                        type="text"
                        placeholder="Write Your Major"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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