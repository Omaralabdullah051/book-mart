import React from 'react';
import { useNavigate } from 'react-router-dom';
import coverImage from '../../../images/coverImage13.png';

const Banner = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/info');
    }

    return (
        <div className='banner-container-sm banner-container-md xl:gap-4'>
            <div className='font-style text-container-sm text-container-md text-container-lg text-container-xl xxl:pt-48'>
                <h5 className='md:text-3xl xl:text-4xl'><i>An Easy Way To</i></h5>
                <h4 className='xl:text-5xl'><i>Stock your books</i></h4>
                <p className='text-xs pr-4 md:text-sm xl:text-base mt-4 xl:mt-8 text-justify text-gray-400'>It is the best place to manage and stock your books.You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. Their Morningstar premium feature offers top-notch investment monitoring tools, a library of premium-only stock screeners, ratings and valuations.</p>
                <button onClick={handleNavigate} className='btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0'>Info</button>
            </div>
            <div>
                <img className='w-52 mx-auto md:mx-0 md:w-full md:mt-12 xl:mt-0' src={coverImage} alt="" />
            </div>
        </div>
    );
};

export default Banner;