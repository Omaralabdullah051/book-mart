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
        <div className='font-style'>
            <h4 className='about-title-sm about-title-md'>About US</h4>
            <p className='about-discription-sm about-discription-md about-discription-xl'>We stock books in an easy and profitable way for small and medium bussiness. You can also find detailed and accurate information about the financial condition and performance in the last few years. It also allows you to know how much executives get paid and their lasts statements on conference calls. It also enables you to view financial statements that go back to five time periods. It is a guided environment and you will be able to handle more stocks markets in a near future.</p>
            <h4 className='team-title'>The Team</h4>
            <div className='team-container-sm team-container-md'>
                {
                    members.map(member => (<div key={member._id} className="member-container ">
                        <h6 className='member-name-sm member-name-xl'>{member.name}</h6>
                        <img className='w-52' src={member.img} alt="" />
                    </div>))
                }
            </div>
            <h6 className='md:text-2xl mt-20 text-center'>Thanks for visiting</h6>
            <p className='md:text-xl wish-message'>Wish you all the best</p>
            <p className='md:text-xl wish-message'>Stay with us</p>
            <div className='logo-container'>
                <img className='w-10' src={image} alt="" />
                <p className='font-style'><i>bookMart</i></p>
            </div>
        </div>
    );
};

export default About;