import { auth } from "@/auth";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import NavDeco from "@/assets/NavDecor.png";
import NavLinksAdmin from "@/app/admin/navbar/page";
import NavLinksStudent from "@/app/layout/header/NavLinks";

export default async function Header() {
  const session = await auth();
  const role = session?.user?.role || "student"; // Mặc định là student
  const userId = session?.user?.id || "defaultId";

  return (
    <header className="sticky top-0 z-50 bg-tertiary shadow-md items-center w-full">
      <div className="border-b-2 py-3 flex justify-around">
        <Logo />
        {session ? <LogoutButton /> : <LoginButton />}
      </div>

      <div className="flex items-center justify-evenly">
        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>

        {/* Kiểm tra role và truyền userId */}
        <div>
          {role === "admin" ? <NavLinksAdmin /> : <NavLinksStudent userId={userId} />}
        </div>

        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>
      </div>
    </header>
  );
}
