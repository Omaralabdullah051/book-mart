import React from 'react';
import { useNavigate } from 'react-router-dom';
import coverImage from '../../../images/coverImage13.png';

const Banner = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/info');
    }

    return (
        <div className='bg-gray-800 m-5 md:m-10 rounded-2xl md:grid md:grid-cols-2 md:gap-2 xl:gap-4'>
            <div className='text-green-600 font-bold pl-4 pt-5 md:pt-20 md:pl-6 lg:pl-12 lg:pt-32 xl:pl-32 xl:pt-48'>
                <h5 className='md:text-3xl xl:text-4xl'><i>An Easy Way To</i></h5>
                <h4 className='xl:text-5xl'><i>Stock your books</i></h4>
                <p className='text-xs pr-4 md:text-sm xl:text-base mt-4 xl:mt-8 text-justify text-gray-400'>It is the best place to manage and stock your books.You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. Their Morningstar premium feature offers top-notch investment monitoring tools, a library of premium-only stock screeners, ratings and valuations.</p>
                <button onClick={handleNavigate} className='px-4  py-1 md:px-8 text-sm md:text-base md:py-2 bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black focus:ring-4 focus:ring-offset-slate-800 md:mb-8 xl:mb-0'>Info</button>
            </div>
            <div>
                <img className='w-52 mx-auto md:mx-0 md:w-full md:mt-12 xl:mt-0' src={coverImage} alt="" />
            </div>
        </div>
    );
};

export default Banner;