import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import image from '../../images/coverImage13.png';

const About = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:5000/members');
                const data = await res.json();
                setMembers(data);
            }
            catch (err) {
                console.error(err);
                toast.error("There was a server side problem");
            }
        })()
    }, []);

    return (
        <div className='text-green-600 font-bold'>
            <h4 className='md:text-4xl text-center mt-10 md:mt-20'>About US</h4>
            <p className='text-xs md:text-sm xl:text-2xl text-justify py-4 px-4 md:py-8 md:px-20 text-gray-500'>We stock books in an easy and profitable way for small and medium bussiness. You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. It is a guided environment and you will be able to handle more stocks markets in a near future.</p>
            <h4 className='mt-10 text-center'>The Team</h4>
            <div className='md:grid grid-cols-5 gap-4 mt-10 px-24 text-gray-500'>
                {
                    members.map(member => (<div key={member._id} className="flex flex-col items-center">
                        <h6 className='text-xs xl:text-xl'>{member.name}</h6>
                        <img className='w-52' src={member.img} alt="" />
                    </div>))
                }
            </div>
            <h6 className='md:text-2xl mt-20 text-center'>Thanks for visiting</h6>
            <p className='md:text-xl mt-3 text-center'>Wish you all the best</p>
            <p className='md:text-xl mt-3 text-center'>Stay with us</p>
            <div className=' mx-auto mt-3 flex justify-center items-center'>
                <img className='w-10' src={image} alt="" />
                <p className='text-green-600 font-bold'><i>bookMart</i></p>
            </div>
        </div>
    );
};

export default About;