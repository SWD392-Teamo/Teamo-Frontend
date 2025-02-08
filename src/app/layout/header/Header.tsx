import LoginButton from "./LoginButton";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default async function Header() {
  
  return (
      <header className="sticky top-0 z-50 bg-tertiary shadow-md items-center w-full">
        <div className=" border-b-2 py-3 flex justify-around">
          <Logo />
          <LoginButton />
        </div>
        <div className="flex justify-center items-center py-4">
          <NavLinks />
        </div>
      </header>
  );
}
