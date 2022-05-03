import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const AddInventoryItem = () => {

    const nameRef = useRef('');
    useEffect(() => {
        nameRef.current.focus();
    }, [])

    const handleOnsubmit = e => {
        e.preventDefault();
        const bookName = e.target.bookName.value;
        const imgUrl = e.target.imgUrl.value;
        const discription = e.target.discription.value;
        const bookPrice = e.target.bookPrice.value;
        const quantity = e.target.quantity.value;
        const suplierName = e.target.suplierName.value;
        const bookInfo = { bookName, imgUrl, discription, bookPrice, quantity, suplierName };

        (async () => {
            try {
                const res = await fetch('http://localhost:5000/books', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(bookInfo)
                });
                const data = await res.json();
                if (data.success) {
                    toast.success(data.message);
                    e.target.reset();
                }
                else {
                    toast.error(data.message);
                }

            }
            catch (err) {
                console.error(err.message);
                toast.error('There was a server side error');
            }
        })();
    };

    return (
        <div className='w-[500px] mx-auto'>
            <form onSubmit={handleOnsubmit} className='flex flex-col border-2 border-gray-700 mx-auto mt-16 rounded-lg'>
                <h3 className='text-center mt-12 font-bold text-green-600'>Add Inventory Item</h3>
                <input ref={nameRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-14' type="text" name="bookName" id="bookName" placeholder='Book Name' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="imgUrl" id="imgUrl" placeholder='Image URL' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="discription" id="discription" placeholder='Short Discription' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="bookPrice" id="bookPrice" placeholder='Book Price' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="quantity" id="quantity" placeholder='quantity' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="suplierName" id="suplierName" placeholder='Suplier Name' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-12 bg-green-600 text-gray-300 py-2 rounded font-bold' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddInventoryItem;