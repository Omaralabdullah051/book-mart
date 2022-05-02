import React from 'react';
import coverImage from '../../../images/coverImage13.png';

const Banner = () => {
    return (
        <div className='bg-gray-800 m-10 rounded-2xl grid grid-cols-2 gap-4'>
            <div className='text-green-600 font-bold pl-32 pt-48'>
                <h3><i>An Easy Way To</i></h3>
                <h2><i>Stock your books</i></h2>
                <p className='mt-8 text-justify'>It is the best place to manage and stock your books.You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. Their proprietary Morningstar premium feature offers top-notch investment monitoring tools, a library of premium-only stock screeners, premium only ratings, and valuations.</p>
                <button className='px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-2'>Info</button>
            </div>
            <div>
                <img src={coverImage} alt="" />
            </div>
        </div>
    );
};

export default Banner;