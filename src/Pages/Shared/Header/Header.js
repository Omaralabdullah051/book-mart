import React from 'react';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
    return (
        <div className='bg-gray-800 h-12'>
            <nav className='flex justify-center items-center p-2 space-x-7'>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/manageinventories">Manage Inventories</CustomLink>
                <CustomLink to="/addinventoryitem">Add Inventory Item</CustomLink>
            </nav>
        </div>
    );
};

export default Header;