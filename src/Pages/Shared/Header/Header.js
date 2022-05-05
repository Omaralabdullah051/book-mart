import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <div className='bg-gray-800 h-12'>
            <nav className='flex justify-center items-center p-2 space-x-7'>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/blogs">Blogs</CustomLink>
                {
                    user ? <CustomLink to="/manageinventories">Manage Inventories</CustomLink> : ''
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
                {
                    user ? <button onClick={() => signOut(auth)} className="text-[grey] font-bold">Sign Out</button> : <CustomLink to="/login">Login</CustomLink>
                }
            </nav>
        </div>
    );
};

export default Header;