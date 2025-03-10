import { ChangeEvent, FormEvent, useState } from "react";
interface FormData {
    [key: string]: string;
}



interface FormComponentProps {
    initialData: FormData;
    fields: { name: string; type: string; placeholder: string }[];
    onSubmit: (data: FormData) => void;
    buttonText: string;
}

export default function FormComponent({
    initialData,
    fields,
    onSubmit,
    buttonText,
}: FormComponentProps) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name}>
                    <label className="block">{field.name}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                {buttonText}
            </button>
        </form>
    );
}
