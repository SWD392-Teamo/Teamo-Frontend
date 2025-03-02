import Link from "next/link";
import React from "react";

export default function NavLinksUniversity() {
    return (
        <nav className="w-full flex justify-between items-center px-8 py-4 border-b shadow-sm">
            <div className="flex space-x-6 text-gray-600">
                <a href="/field" className="hover:text-black">Fields</a>
                <a href="/semester" className="hover:text-black">Semesters</a>
                <a href="/major" className="hover:text-black">Majors</a>
                <a href="/subject" className="text-black font-semibold border-b-2 border-blue-500">Subjects</a>
            </div>
        </nav>
    );
}
