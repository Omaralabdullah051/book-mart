import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ItemDetails = () => {
    const { id } = useParams();
    const [bookInfo, setbookInfo] = useState({});
    const { bookName, bookPrice, discription, imgUrl, quantity, supplierName } = bookInfo;
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5000/books/${id}`);
                const data = await res.json();
                setbookInfo(data);
            }
            catch (err) {
                console.error(err.message);
                toast("There was a server side problem");
            }
        })();

    }, [id]);

    const handleDelivered = () => {
        const updatedQuantity = { quantity: quantity - 1 };
        const url = `http://localhost:5000/books/${id}`;
        (async () => {
            try {
                const res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedQuantity)
                })
                const data = await res.json();
                if (data.modifiedCount >= 1) {
                    setbookInfo({ ...bookInfo, quantity: updatedQuantity.quantity });
                }
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side error");
            }
        })();
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        const updatedQuantity = { quantity: parseInt(e.target.number.value) + parseInt(bookInfo.quantity) };
        const url = `http://localhost:5000/books/${id}`;
        (async () => {
            try {
                if (e.target.number.value > 0 && e.target.number.value < 500) {
                    const res = await fetch(url, {
                        method: "PUT",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedQuantity)
                    })
                    const data = await res.json();
                    if (data.modifiedCount >= 1) {
                        setbookInfo({ ...bookInfo, quantity: updatedQuantity.quantity });
                        toast.success("Successfully restocked");
                    }
                }
                if (e.target.number.value < 0) {
                    toast.error("Please insert a valid amount that you want to restock more");
                }
                if (e.target.number.value > 500) {
                    toast.error("You can stock maximum 500 books");
                }
                e.target.reset();
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side error");
            }
        })();
    }

    const handleNavigate = () => {
        navigate('/manageInventories');
    }

    return (
        <div>
            <div className='text-green-600 mt-20 p-20 grid grid-cols-3 bg-gray-800 mx-10 rounded-2xl font-bold mb-16'>
                <div>
                    <img className='w-10/12' src={imgUrl} alt="" />
                </div>
                <div className='col-span-2 space-y-1'>
                    <h4>{bookName}</h4>
                    <h4>${bookPrice}</h4>
                    <h4>{quantity} piece</h4>
                    <h5>By {supplierName}</h5>
                    <p className='text-justify'>{discription}</p>
                    <button onClick={handleDelivered} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2 hover:bg-green-400 hover:text-black focus:ring-4 focus:ring-offset-slate-800'>Delivered</button>
                </div>
            </div>
            <div className='mb-20 bg-gray-800 py-8 mx-10 rounded-2xl'>
                <h3 className='text-green-600 text-center font-bold'>Restock Item</h3>
                <form onSubmit={handleOnSubmit}>
                    <input className='w-6/12 block mx-auto bg-gray-800 mt-8 text-green-600 font-bold rounded' type="number" name="number" id="number" placeholder={`Please input the amount of piece that you want to restock more(${bookName})`} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')} required />
                    <input className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold hover:bg-green-400 hover:text-black mx-auto block mt-4 focus:ring-4 focus:ring-offset-slate-800' type="submit" value="Add" />
                </form>
            </div>
            <button onClick={handleNavigate} className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2 hover:bg-green-400 hover:text-black mx-auto block m-8'>Manage Inventories</button>
        </div>
    );
};

export default ItemDetails;