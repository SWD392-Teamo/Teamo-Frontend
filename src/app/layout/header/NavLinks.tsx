import Link from 'next/link'
import React from 'react'
import UniversityInformation from './../../admin/university/page';

type Props = {
  role: string
}

export default function NavLinks({role}: Props) {
  // Define navigation links based on user role
  const getNavLinks = () => {
    switch(role) {
      case 'Admin':
        return [
          <Link key="university" href='/admin/university' className='link'>University Information</Link>,
          <Link key="groups" href='/admin/groups' className='link'>Groups</Link>,
          <Link key="dashboard" href='/admin/dashboard' className='link'>Dashboard</Link>
        ];
      case 'Student':
        return [
          <Link key="home" href='/majors' className='link'>Home</Link>,
          <Link key="groups" href='/groups' className='link'>Groups</Link>,
          <Link key="profile" href='/profile' className='link'>Profile</Link>,
          <Link key="applications" href='/applications' className='link'>Applications</Link>
        ];
      default:
        return <></>;
    }
  };

  return (
    <div className='flex justify-between content-around gap-32'>
      {getNavLinks()}
    </div>
  );
}
