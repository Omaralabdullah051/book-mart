import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ItemDetails = () => {
    const { id } = useParams();
    const [bookInfo, setbookInfo] = useState({});
    const { bookName, bookPrice, discription, imgUrl, quantity, supplierName } = bookInfo;

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5000/books/${id}`);
                const data = await res.json();
                console.log(data);
                setbookInfo(data);
            }
            catch (err) {
                console.error(err.message);
                toast("There was a server side problem");
            }
        })();

    }, [id]);

    const handleDelivered = () => {
        const updatedQuatity = { quantity: quantity - 1 };
        const url = `http://localhost:5000/books/${id}`;
        (async () => {
            try {
                const res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedQuatity)
                })
                const data = await res.json();
                console.log(data);
                if (data.modifiedCount >= 1) {
                    setbookInfo({ ...bookInfo, quantity: updatedQuatity.quantity });
                }
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side error");
            }
        })();
    }

    return (
        <div>
            <div className='text-green-600 mt-20 p-20 grid grid-cols-3 bg-gray-800 m-10 rounded-2xl font-bold'>
                <div>
                    <img className='w-10/12' src={imgUrl} alt="" />
                </div>
                <div className='col-span-2 space-y-1'>
                    <h4>{bookName}</h4>
                    <h4>${bookPrice}</h4>
                    <h4>{quantity} piece</h4>
                    <h5>By {supplierName}</h5>
                    <p className='text-justify'>{discription}</p>
                    <button onClick={handleDelivered} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2 hover:bg-green-400 hover:text-black'>Delivered</button>
                </div>
            </div>
            <h2>hello</h2>
        </div>
    );
};

export default ItemDetails;