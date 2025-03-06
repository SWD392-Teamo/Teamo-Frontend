import Link from "next/link";
import React from "react";

export default function NavLinksAdmin() {
    return (
        <div className="flex justify-between content-around gap-32">
            <Link href="/admin/subject" className="link">University Information</Link>
            <Link href="/admin/profile" className="link">Profile</Link>
            <Link href="/admin/group" className="link">Groups</Link>
            <Link href="/admin/dashboard" className="link">Dashboard</Link>
            <Link href="/admin/register" className="link">Register</Link>
        </div>
    );
}
