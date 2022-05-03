import React from 'react';

const InventoryItem = ({ book }) => {
    const { bookName, imgUrl, discription, bookPrice, quantity, supplierName } = book;
    return (
        <div className='text-black-900 font-semibold mb-10 border-2 p-4 bg-gray-800 rounded'>
            <img className='w-60 h-80 mx-auto' src={imgUrl} alt="" />
            <div className='bg-green-700 p-4 space-y-1'>
                <h6>Name: {bookName}</h6>
                <h6>Price: ${bookPrice}</h6>
                <h6>Quantity: {quantity}</h6>
                <h6>Supplier Name: {supplierName}</h6>
                <p className='text-justify'>Discription: {discription.slice(0, 250)}.....</p>
                <button className='py-2 px-6 bg-gray-800 text-white rounded mx-auto block'>Manage</button>
            </div>
        </div>
    );
};

export default InventoryItem;