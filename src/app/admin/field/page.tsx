"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import NavbarUni from "@/app/admin/navbaruni/page";
import BackButton from "@/components/BackButton";
import { createField } from "@/actions/fieldActions";
import { FieldValues, useForm } from "react-hook-form";
import Input from "@/components/Input";

export default function CreateFields() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
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
            const response = await createField(data);

            if (!response.ok) {
                throw new Error("Failed to create field");
            }

            setSuccess("Field created successfully!");
            console.log("Success:", data);
            setFormData({ name: "", description: "" }); // Reset form
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
                <h2 className="text-2xl font-bold mb-6">Create Fields</h2>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input label='Field Name' name='name' control={control}
                        type='text'
                        showlabel='true'
                        rules={{ required: 'Name is required' }} />

                    <Input label='Field Description' name='description' control={control}
                        type='text'
                        showlabel='true'
                        rules={{ required: 'Description is required' }} />

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
