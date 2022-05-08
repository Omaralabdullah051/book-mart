import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle/PageTitle';
import withDelete from '../Shared/HOC/withDelete';
import LoadingState from '../Shared/LoadingState/LoadingState';

const MyItems = ({ itemsInfo, setItemsInfo, handleDeleteItem }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://hidden-eyrie-82910.herokuapp.com/booksbyemail?email=${user?.email}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                setLoading(false);
                setItemsInfo(data);
                if (data.message === 'Forbidden access') {
                    signOut(auth);
                    navigate('/login');
                }
            }
            catch (err) {
                // console.error(err.message);
                setLoading(false);
                if (err.response.status === 401 || err.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        })()
    }, [user, navigate, setItemsInfo]);

    return (
        <div>
            <PageTitle title="My Items" />
            {loading ? <LoadingState /> : ''}
            <div className='p-12 mb-80 hidden md:block'>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-black uppercase bg-green-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Item name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Supplier Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemsInfo?.map(itemInfo => (<tr key={itemInfo._id} className="border-b-4 border-green-600 bg-gray-800 text-gray-300 font-bold">
                                    <th scope="row" className="px-6 py-4 font-bold text-gray-300 whitespace-nowrap">
                                        {itemInfo.bookName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {itemInfo.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {itemInfo.supplierName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {itemInfo.bookPrice}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDeleteItem(itemInfo._id)} className="font-medium text-red-500"><FontAwesomeIcon className='h-6' icon={faTrash} /></button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='p-4 md:p-12 mb-80 block md:hidden'>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-black uppercase bg-green-600">
                            <tr>
                                <th scope="col" className="px-3 py-3">
                                    Item name
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemsInfo?.map(itemInfo => (<tr key={itemInfo._id} className="border-b-4 border-green-600 bg-gray-800 text-gray-300 font-bold text-xs">
                                    <th scope="row" className="px-3 py-4 font-bold text-gray-300 whitespace-nowrap">
                                        {itemInfo.bookName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {itemInfo.quantity}
                                    </td>
                                    <td className="px-3 py-4 text-right">
                                        <button onClick={() => handleDeleteItem(itemInfo._id)} className="font-medium text-red-500"><FontAwesomeIcon className='h-6' icon={faTrash} /></button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

//export to higher order component
export default withDelete(MyItems);