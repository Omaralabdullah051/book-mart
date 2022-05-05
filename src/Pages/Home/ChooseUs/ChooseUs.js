import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ChooseUs = () => {
    const [advantages, setAdvantages] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:5000/advantages');
                const data = await res.json();
                setAdvantages(data);
            }
            catch (err) {
                console.error(err.message);
                toast("There was a server side error");
            }
        })()
    }, []);

    return (
        <div className='text-green-600 font-bold mt-24'>
            <h3 className='text-center'>Why Choose Us</h3>
            <div className='grid grid-cols-3 gap-6 mt-12 p-8 px-16'>
                {
                    advantages.map(advantage => (<div className='hover:bg-green-600 first:bg-green-600 first:text-black bg-gray-800 p-8 space-y-2 hover:text-black cursor-pointer' key={advantage._id}>
                        <h5>{advantage.name}</h5>
                        <p>{advantage.discription}</p>
                    </div>))
                }
            </div>
        </div>
    );
};

export default ChooseUs;