import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faCopyright } from '@fortawesome/free-solid-svg-icons';
import image from '../../../images/coverImage14.png';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-gray-800 mt-80">
            <div className='md:flex justify-around items-center text-center md:text-justify'>
                <div>
                    <img className='mx-auto md:mx-0 md:w-full mt-20' src={image} alt="" />
                </div>
                <div className='text-green-600 space-y-3 font-bold mt-20'>
                    <h6>Contact Info</h6>
                    <p><FontAwesomeIcon className='mr-3' icon={faPhone} />+1 (396)-292-2391</p>
                    <p><FontAwesomeIcon className='mr-3' icon={faEnvelope} />Omaralabdullah051@gmail.com</p>
                    <p><FontAwesomeIcon className='mr-3' icon={faLocationDot} />455 7th Ave, NY 99937, BD</p>
                    <div className='flex justify-center items-center'>
                        <a href='https://www.instagram.com/ab_omar.7/   ' target="blank" className='flex justify-center items-center bg-green-600 text-black mb-3 mr-2 px-1 rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                            <img className='w-12' src="https://i.postimg.cc/q7NnDHYn/instagram.png" alt="" />
                            <h6>Instagram</h6>
                        </a>
                        <a href='https://www.facebook.com/profile.php?id=100048860175423' target="blank" className='flex justify-center items-center bg-green-600 text-black mb-3 mr-2 px-1 py-[2px] rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                            <img className='w-11' src="https://i.postimg.cc/DwcyrDQ2/facebook.png" alt="" />
                            <h6>Facebook</h6>
                        </a>
                        <a href='https://github.com/Omaralabdullah051' target="blank" className='flex justify-center items-center bg-green-600 text-black mb-3 p-1 px-3 rounded cursor-pointer hover:bg-green-900 hover:text-gray-400'>
                            <img className='w-10 mr-1' src="https://i.postimg.cc/XJBbzD5B/github-2.png" alt="" />
                            <h6>Github</h6>
                        </a>
                    </div>
                </div>
            </div>
            <p className='text-green-600 font-bold text-center p-10'><small><FontAwesomeIcon className='mr-1' icon={faCopyright} />{year}. All Right Reserved</small></p>
        </footer>
    );
};

export default Footer;