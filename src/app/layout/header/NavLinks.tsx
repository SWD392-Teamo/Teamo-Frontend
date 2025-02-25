import Link from "next/link";
import React from "react";

// Định nghĩa props
type NavLinksStudentProps = {
  userId: string; // Bắt buộc truyền userId
};

// Khai báo component dưới dạng function component chuẩn
const NavLinksStudent = ({ userId }: NavLinksStudentProps) => {
  return (
    <div className="flex justify-between content-around gap-32">
      <Link href="/majors" className="link">Major</Link>
      <Link href="/groups" className="link">Groups</Link>
      <Link href={`/groups/details/${userId}`} className="link">Profile</Link>
      <Link href="/applications" className="link">Applications</Link>
    </div>
  );
};

export default NavLinksStudent;
