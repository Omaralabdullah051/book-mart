import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
            <h3 className='text-center mt-20'>About US</h3>
            <h5 className='text-justify py-8 px-20 text-gray-500'>We stock books in an easy and profitable way for small and medium bussiness. You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. It is a guided environment and you will be able to handle more stocks markets in a near future.</h5>
            <h4 className='mt-10 text-center'>The Team</h4>
            <div className='grid grid-cols-5 gap-4 mt-10 px-24 text-gray-500'>
                {
                    members.map(member => (<div key={member._id} className="flex flex-col items-center">
                        <h6>{member.name}</h6>
                        <img className='w-52' src={member.img} alt="" />
                    </div>))
                }
            </div>
            <h4 className='mt-20 text-center'>Thanks for visiting</h4>
            <h5 className='mt-3 text-center'>Wish you all the best</h5>
            <h6 className='mt-3 text-center'>Stay with us</h6>
        </div>
    );
};

export default About;