import Link from "next/link";
import React from "react";

export default function NavLinksAdmin() {
    return (
        <div className="flex justify-between  gap-32">
            <Link href="/admin/subject" className="link">Subject</Link>
            <Link href="/admin/field" className="link">Field</Link>
            <Link href="/admin/major" className="link">Majors</Link>
            <Link href="/admin/semester" className="link">Semester</Link>
        </div>
    );
}
