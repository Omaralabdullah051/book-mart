import { signOut } from 'firebase/auth';
import React, { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import PageTitle from '../Shared/PageTitle/PageTitle';
import image from '../../images/coverImage13.png';

const AddInventoryItem = () => {
    const [user] = useAuthState(auth);
    const nameRef = useRef('');
    const navigate = useNavigate();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://hidden-eyrie-82910.herokuapp.com/getbooks?email=${user?.email}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                if (data.message === 'Forbidden access') {
                    signOut(auth);
                    navigate('/login');
                }
            }
            catch (err) {
                // console.error(err.message);
                if (err.response.status === 401 || err.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        })()
    }, [user, navigate]);


    const handleOnsubmit = e => {
        e.preventDefault();
        const bookName = e.target.bookName.value;
        const imgUrl = e.target.imgUrl.value;
        const discription = e.target.discription.value;
        const bookPrice = e.target.bookPrice.value;
        const quantity = e.target.quantity.value;
        const supplierName = e.target.supplierName.value;
        const email = user?.email;
        const bookInfo = { bookName, imgUrl, discription, bookPrice, quantity, supplierName, email };

        (async () => {
            try {
                const res = await fetch('https://hidden-eyrie-82910.herokuapp.com/books', {
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
                // console.error(err.message);
            }
        })();
    };

    return (
        <div className='w-[320px] md:w-[500px] mx-auto mb-32'>
            <PageTitle title="Add Item" />
            <form onSubmit={handleOnsubmit} className='flex flex-col md:border-2 border-gray-700 mx-auto mt-2 md:mt-16 rounded-lg'>
                <div className='logo-container mt-8'>
                    <img className='w-10' src={image} alt="" />
                    <p className='font-style'><i>bookMart</i></p>
                </div>
                <h5 className='md:text-4xl text-center mt-3 font-bold text-green-600'>Add Inventory Item</h5>
                <input ref={nameRef} className='w-[300px] md:w-[400px] mx-auto mb-3 bg-gray-700 text-green-400 font-bold rounded mt-8 required:border-red-500' type="text" name="bookName" id="bookName" placeholder='Book Name' autoComplete='off' required />
                <input className='w-[300px] md:w-[400px] input-style mb-3 mt-0 required' type="text" name="imgUrl" id="imgUrl" placeholder='Image URL' autoComplete='off' required />
                <input className='w-[300px] md:w-[400px]  input-style mb-3 mt-0 required' type="text" name="bookPrice" id="bookPrice" placeholder='Book Price' autoComplete='off' required />
                <input className='w-[300px] md:w-[400px]  input-style mb-3 mt-0 required' type="text" name="quantity" id="quantity" placeholder='Quantity' autoComplete='off' required />
                <input className='w-[300px] md:w-[400px]  input-style mb-3 mt-0 required' type="text" name="supplierName" id="supplierName" placeholder='Supplier Name' autoComplete='off' required />
                <label htmlFor="discription" className='text-green-600 pl-4 md:pl-12 font-bold'>Discription</label>
                <textarea className='w-[300px] md:w-[400px] h-[150px] input-style mb-3 mt-0 required text-justify' type="text" name="discription" id="discription" placeholder='Add a short discription' autoComplete='off' required />
                <input className='w-[300px] md:w-[400px] mx-auto mb-8 px-8 py-2 bg-green-600 text-gray-300 rounded font-bold hover:btn-hover mt-3 focus:btn-focus' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddInventoryItem;