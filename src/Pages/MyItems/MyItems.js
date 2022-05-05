import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyItems = () => {
    const [itemsInfo, setItemsInfo] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`http://localhost:5000/booksbyemail?email=${user?.email}`);
                const data = await res.json();
                setItemsInfo(data);
            }
            catch (err) {
                console.error(err.message);
                toast.error("There was a server side problem");
            }
        })()
    }, [user]);

    const handleDeleteItem = id => {
        const proceed = window.confirm("Are you sure want to delete this item?");
        if (proceed) {
            (async () => {
                try {
                    const res = await fetch(`http://localhost:5000/books?id=${id}`, {
                        method: "DELETE"
                    });
                    const data = await res.json();
                    if (data.deletedCount >= 1) {
                        const restItems = itemsInfo.filter(itemInfo => itemInfo._id !== id);
                        setItemsInfo(restItems);
                    }
                }
                catch (err) {
                    console.error(err.message);
                    toast.error("There was a server side problem");
                }
            })();
        }
    }

    return (
        <div className='p-12 mb-80'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
    );
};

export default MyItems;