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
        const supplierName = e.target.supplierName.value;
        const bookInfo = { bookName, imgUrl, discription, bookPrice, quantity, supplierName };

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
        <div className='w-[500px] mx-auto mb-32'>
            <form onSubmit={handleOnsubmit} className='flex flex-col border-2 border-gray-700 mx-auto mt-16 rounded-lg'>
                <h3 className='text-center mt-8 font-bold text-green-600'>Add Inventory Item</h3>
                <input ref={nameRef} className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-8' type="text" name="bookName" id="bookName" placeholder='Book Name' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="imgUrl" id="imgUrl" placeholder='Image URL' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="bookPrice" id="bookPrice" placeholder='Book Price' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="quantity" id="quantity" placeholder='Quantity' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded' type="text" name="supplierName" id="supplierName" placeholder='Supplier Name' autoComplete='off' required />
                <label htmlFor="discription" className='text-green-600 pl-12 font-bold'>Discription</label>
                <textarea className='w-[400px] h-[150px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold text-justify rounded' type="text" name="discription" id="discription" placeholder='Add a short discription' autoComplete='off' required />
                <input className='w-[400px] mx-auto mb-8 px-8 py-2 bg-green-600 text-gray-300 rounded font-bold hover:bg-green-400 hover:text-black mt-3' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddInventoryItem;