import React, { useEffect, useState } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Info = () => {
    const [informations, setInformations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://hidden-eyrie-82910.herokuapp.com/informations');
                const data = await res.json();
                setInformations(data);
            }
            catch (err) {
                console.error(err);
            }
        })()
    }, []);

    return (
        <div className='text-gray-400 mt-4 py-8 px-5 md:py-16 md:px-28 font-bold'>
            <PageTitle title="Info" />
            {
                informations.map(information => (<div key={information._id} className="mb-12">
                    <p className='text-xs md:text-sm xl:text-base text-justify'>{information.info}</p>
                </div>))
            }
        </div>
    );
};

export default Info;