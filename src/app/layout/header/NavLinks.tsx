import Link from "next/link";
import React from "react";


type NavLinksStudentProps = {
  userId: string;
};

const NavLinksStudent = ({ userId }: NavLinksStudentProps) => {
  return (
    <div className="flex justify-between content-around gap-32">
      <Link href="/majors" className="link">Major</Link>
      <Link href="/groups" className="link">Groups</Link>
      <Link href={`/groups/details/${userId}`} className="link">Profile</Link>
      <Link href="/applications" className="link">Applications</Link>
      <Link href="/admin" className="link">Admin</Link>



    </div>
  );
};

export default NavLinksStudent;
