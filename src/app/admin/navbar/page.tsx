import Link from "next/link";
import React from "react";

export default function NavLinksAdmin() {
    return (
        <div className="flex justify-between content-around gap-32">
            <Link href="/admin/subject" className="link">University Information</Link>
            <Link href="/profile" className="link">Profile</Link>
            <Link href="/group" className="link">Groups</Link>
            <Link href="/dashboard" className="link">Dashboard</Link>
            <Link href="/register" className="link">Register</Link>
        </div>
    );
}
