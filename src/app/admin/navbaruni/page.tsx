import Link from "next/link";
import React from "react";

export default function NavLinksAdmin() {
    return (
        <div className="flex justify-between  gap-32">
            <Link href="/admin/subject" className="link">subject</Link>
            <Link href="/admin/field" className="link">field</Link>
            <Link href="/admin/group" className="link">group</Link>
            <Link href="/admin/semester" className="link">semester</Link>
        </div>
    );
}
