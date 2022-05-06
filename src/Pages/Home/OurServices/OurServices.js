import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OurServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:5000/services');
                const data = await res.json();
                setServices(data);
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side problem");
            }
        })()
    }, []);

    return (
        <div>
            <h2 className='text-green-600 text-center font-bold mt-40'>Our Services</h2>
            <div className='grid grid-cols-3 gap-4 text-green-600 font-bold py-8 px-16 items-center'>
                {
                    services.map(service => (<div key={service._id} className="p-4 border rounded-xl bg-gray-800 hover:bg-green-600 hover:text-black">
                        <img className='h-80 mx-auto' src={service.img} alt="" />
                        <h4>{service.name}</h4>
                        <p className='text-justify mt-2 hover:text-black'>{service.discription}</p>
                    </div>))
                }
            </div>
        </div>
    );
};

export default OurServices;