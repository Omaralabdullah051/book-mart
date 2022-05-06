import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InventoryItem from '../InventoryItem/InventoryItem';

const InventoryItems = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:5000/books');
                const data = await res.json();
                setBooks(data);
            }
            catch (err) {
                console.error(err.message);
                toast.error('There was a server side problem');
            }
        })()
    }, [])

    return (
        <div>
            <h2 className='text-green-700 text-center mt-32 mb-6 font-bold'>Inventory Items</h2>
            <div className='grid grid-cols-3 gap-8 py-8 px-16'>
                {
                    books.slice(0, 6).map(book => <InventoryItem key={book._id} book={book} />)
                }
            </div>
        </div>
    );
};

export default InventoryItems;