import { auth } from "@/auth";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import NavDeco from "@/assets/NavDecor.png";
import LandingBg from "@/assets/LandingBg.jpg";
import { ProfileSection } from "./ProfileButton";



export default async function Header() {
  const session = await auth();
  
  return (
    <header className="sticky top-0 z-50 shadow-md items-center w-full">
      <Image
        src={LandingBg}
        alt="Background"
        fill
        className="absolute inset-0 z-0 object-cover" // Updated from objectFit
      />
      <div className="absolute inset-0 bg-white opacity-40 z-10" />

      <div className="border-b-2 py-3 flex justify-around z-20 relative">
        <Logo />
        <div className="flex items-center space-x-4">
          {session?.user?.userId && (
            <ProfileSection userId={session.user.userId} />
          )}
          {session ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>

      <div className="flex items-center justify-evenly z-20 relative">
        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>
        <div>
          {session && <NavLinks role={session.user.role} />}
        </div>
        <div className="flex">
          <Image src={NavDeco} alt="NavDeco" />
          <Image src={NavDeco} alt="NavDeco" />
        </div>
      </div>
    </header>
  );
}