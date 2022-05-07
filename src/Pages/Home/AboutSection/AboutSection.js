import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../../images/coverImage15.png'

const AboutSection = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/about');
    }
    return (
        <div className='bg-gray-800 m-5 md:m-10 rounded-2xl md:grid grid-cols-2 gap-2 py-8 md:py-12 xl:py-20 px-4 md:px-8 xl:px-32'>
            <div>
                <img className='w-80 md:mt-12 mx-auto md:mx-0 xl:w-8/12' src={image} alt="" />
            </div>
            <div className='text-green-600 font-bold'>
                <h6 className='md:text-2xl xl:text-4xl'><i>More Stock market</i></h6>
                <h5 className='md:text-3xl xl:text-5xl'><i>Information</i></h5>
                <p className='text-xs md:text-sm xl:text-base mt-4 md:mt-6 text-justify text-gray-400'>The stock market is where shares are bought and sold by individual and institutional investors. In the modern era, the process is conducted electronically through major stock indices which represent the performance of a basket of constituent stocks. These stocks are tracked by the market index to come up with a value for the index based on weighted market capitalization methodology. This means that a large movement in the price of a single large stock can influence the index on which it is listed.</p>
                <button onClick={handleNavigate} className='px-2 py-1 md:px-8 md:py-2 text-xs md:text-base bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black focus:ring-4 focus:ring-offset-slate-800'>About</button>
            </div>
        </div>
    );
};

export default AboutSection;