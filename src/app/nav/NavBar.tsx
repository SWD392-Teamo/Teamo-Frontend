import LoginButton from './LoginButton';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default async function Navbar() {
    return (
        <header className='sticky top-0 z-50 bg-white shadow-md items-center font-semibold text-gray-500 w-full'>
            <div className='flex justify-between shadow-sm py-3 px-5'>
                <Logo />
                <LoginButton />
            </div>
            <div className='flex justify-center items-center py-3 px-3'>
                <NavLinks />
            </div>
        </header>
    );
}