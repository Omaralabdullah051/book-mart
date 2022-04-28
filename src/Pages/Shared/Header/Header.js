import React from 'react';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
    return (
        <div className='bg-slate-700 h-12'>
            <nav className='flex justify-center items-center p-2 space-x-3'>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/manageinventories">Manage Inventories</CustomLink>
            </nav>
        </div>
    );
};

export default Header;