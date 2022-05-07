import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import CustomLink from '../CustomLink/CustomLink';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import image from '../../../images/coverImage13.png';

const Header = () => {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    let navbar;
    if (open) {
        navbar = 'top-0';
    }
    else {
        if (user) {
            navbar = 'top-[-223px]';
        }
        else {
            navbar = 'top-[-127px]';
        }
    }
    return (
        <div className='h-12'>
            <nav className={`fixed top-0 p-2 space-x-7 xl:flex justify-center xl:fixed xl:top-0 bg-gray-800 md:bg-gray-800 text-black w-full duration-500 ease-in ${navbar} text-center`}>
                <div className='xl:flex justify-center items-center hidden'>
                    <img className='w-6' src={image} alt="" />
                    <p className='text-xs text-green-600 font-bold ml-1'><i>bookmart</i></p>
                </div>
                <CustomLink to="/">Home</CustomLink>
                {
                    user ? <CustomLink to="/manageinventories">Manage Items</CustomLink> : ''
                }
                {
                    user ? <CustomLink to="/addinventoryitem">Add Item</CustomLink> : ''
                }
                {
                    user ? <CustomLink to="myitems">My Items</CustomLink> : ''
                }
                {
                    user ? <CustomLink to="viewprofile">View Profile</CustomLink> : ''
                }
                <CustomLink to="/blogs">Blogs</CustomLink>
                <CustomLink to="/info">Info</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                {
                    user ? <button onClick={() => signOut(auth)} className="text-[grey] font-bold">Sign Out</button> : <CustomLink to="/login">Login</CustomLink>
                }
                <div className='flex justify-between items-center'>
                    <div className='flex justify-center items-center xl:hidden'>
                        <img className='w-6' src={image} alt="" />
                        <p className='text-xs text-green-600 font-bold ml-1'><i>bookmart</i></p>
                    </div>
                    <div onClick={() => setOpen(!open)} className='w-6 h-6 xl:hidden'>
                        {open ? <XIcon className='text-gray-300'></XIcon> : <MenuIcon className='text-gray-300'></MenuIcon>}
                    </div>
                </div>
            </nav>
        </div >
    );
};

export default Header;