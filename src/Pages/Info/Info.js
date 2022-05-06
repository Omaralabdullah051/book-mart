import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Info = () => {
    const [informations, setInformations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:5000/informations');
                const data = await res.json();
                setInformations(data);
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side problem");
            }
        })()
    }, []);

    return (
        <div className='text-gray-400 mt-4 py-16 px-28 font-bold'>
            {
                informations.map(information => (<div key={information._id} className="mb-12">
                    <p>{information.info}</p>
                </div>))
            }
        </div>
    );
};

export default Info;