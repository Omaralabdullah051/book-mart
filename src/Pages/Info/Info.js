import React, { useEffect, useState } from 'react';
import LoadingState from '../Shared/LoadingState/LoadingState';
import PageTitle from '../Shared/PageTitle/PageTitle';

const Info = () => {
    const [informations, setInformations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('https://hidden-eyrie-82910.herokuapp.com/informations');
                const data = await res.json();
                setLoading(false);
                setInformations(data);
            }
            catch (err) {
                // console.error(err);
                setLoading(false);
            }
        })()
    }, []);

    return (
        <div>
            <PageTitle title="Info" />
            {loading ? <LoadingState /> : ''}
            <div className='text-gray-400 mt-4 py-8 px-5 md:py-16 md:px-28 font-bold'>
                {
                    informations.map(information => (<div key={information._id} className="mb-12">
                        <p className='text-xs md:text-sm xl:text-base text-justify'>{information.info}</p>
                    </div>))
                }
            </div>
        </div>
    );
};

export default Info;