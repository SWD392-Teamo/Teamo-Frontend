import { auth } from "@/auth";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import NavDeco from "@/assets/NavDecor.png";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-tertiary shadow-md items-center w-full">
      <div className=" border-b-2 py-3 flex justify-around">
        <Logo />
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
      <div className="flex items-center justify-evenly">
        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>
        <div>
          <NavLinks />
        </div>
        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>
      </div>
    </header>
  );
}
