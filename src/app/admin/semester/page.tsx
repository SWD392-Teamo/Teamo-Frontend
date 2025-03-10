"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavbarUni from "@/app/admin/navbaruni/page";
import BackButton from "@/components/BackButton";
import { createSemester } from "@/actions/semesterActions";
import { FieldValues, useForm } from "react-hook-form";
import Input from "@/components/Input";

export default function CreateSemester() {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        startDate: "",
        endDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    // Set up form state
    const { control, handleSubmit,
        formState: { isSubmitting, isValid } } = useForm({
            mode: 'onTouched'
        });

    async function onSubmit(data: FieldValues) {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await createSemester(data);

            if (!response.ok) {
                throw new Error("Failed to create semester");
            }

            setSuccess("Semester created successfully!");
            console.log("Success:", data);
            setFormData({ code: "", name: "", startDate: "", endDate: "" }); // Reset form
        } catch (error: any) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white p-4">
            <NavbarUni />

            <div className="w-full max-w-md mt-5">
                <BackButton />
                <h2 className="text-2xl font-bold mb-6">Create Semester</h2>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    <Input label='Semester Code' name='code' control={control}
                        type='text'
                        showlabel='true'
                        rules={{ required: 'Code is required' }} />

                    <Input label='Semester Name' name='name' control={control}
                        type='text'
                        showlabel='true'
                        rules={{ required: 'Name is required' }} />
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
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}
