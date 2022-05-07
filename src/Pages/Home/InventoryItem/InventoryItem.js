import React from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryItem = ({ book }) => {
    const { _id, bookName, imgUrl, discription, bookPrice, quantity, supplierName } = book;
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/itemDetails/${_id}`);
    }
    return (
        <div className='text-black-900 font-semibold mb-10 border-2 p-2 md:p-4 bg-gray-800 rounded'>
            <img className='h-64 w-60 md:h-80 mx-auto' src={imgUrl} alt="" />
            <div className='bg-green-700 p-2 md:p-4 space-y-1'>
                <p className='md:text-xl'>Name: {bookName}</p>
                <p className='md:text-xl'>Price: ${bookPrice}</p>
                <p className='md:text-xl'>Quantity: {quantity}</p>
                <p className='text-sm md:text-xl'>Supplier Name: {supplierName}</p>
                <p className='text-xs md:text-sm text-justify'>Discription: {discription.slice(0, 250)}.....</p>
                <button onClick={handleNavigate} className='py-1 px-3 md:py-2 md:px-6 text-xs md:text-base bg-gray-800 text-white rounded mx-auto block hover:bg-gray-400 hover:text-black hover:font-bold focus:ring-4 focus:ring-offset-slate-800'>Manage</button>
            </div>
        </div>
    );
};

export default InventoryItem;