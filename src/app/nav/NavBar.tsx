import LoginButton from './LoginButton';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default async function Navbar() {
    return (
        <header className='sticky top-0 z-50 bg-tertiary shadow-md items-center w-full'>
            <div className='flex justify-between shadow-sm py-3 px-10'>
                <Logo />
                <LoginButton />
            </div>
            <div className='flex justify-center items-center py-4'>
                <NavLinks />
            </div>
        </header>
    );
}