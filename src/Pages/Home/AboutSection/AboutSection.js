import React from 'react';
import image from '../../../images/coverImage15.png'

const AboutSection = () => {
    return (
        <div className='bg-gray-800 m-10 rounded-2xl grid grid-cols-2 gap-2 py-20 px-32'>
            <div>
                <img className='w-8/12' src={image} alt="" />
            </div>
            <div className='text-green-600 font-bold'>
                <h3><i>More Stock market</i></h3>
                <h2><i>Information</i></h2>
                <p className='mt-6 text-justify'>The stock market is where shares are bought and sold by individual and institutional investors. In the modern era, the process is conducted electronically through major stock indices which represent the performance of a basket of constituent stocks. These stocks are tracked by the market index to come up with a value for the index based on weighted market capitalization methodology. This means that a large movement in the price of a single large stock can influence the index on which it is listed.</p>
                <button className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2  hover:bg-green-400 hover:text-black focus:ring-4 focus:ring-offset-slate-800'>About</button>
            </div>
        </div>
    );
};

export default AboutSection;