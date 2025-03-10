"use client";
import { useState } from "react";
import NavbarUni from "@/app/admin/navbaruni/page";
import BackButton from "@/components/BackButton";

export default function CreateMajor() {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <BackButton />

                <h2 className="text-2xl font-bold mb-6">Create Major</h2>

                <form className="space-y-2" onSubmit={handleSubmit}>
                    <label className="block">Code</label>
                    <input
                        type="text"
                        name="code"
                        placeholder="Enter Major Code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="block mt-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Major Name"
                        value={formData.name}
                        onChange={handleChange}
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
