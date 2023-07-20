import React from 'react';
import logo from '../../Assets/Images/icons/logo_1x_black.png';
import { BsFillTelephoneFill, BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { BiChevronRight } from 'react-icons/bi';
import gallery1 from '../../Assets/Images/footer/gallery-01.jpg';
import gallery2 from '../../Assets/Images/footer/gallery-02.jpg';
import gallery3 from '../../Assets/Images/footer/gallery-03.jpg';
import gallery4 from '../../Assets/Images/footer/gallery-04.jpg';
import gallery5 from '../../Assets/Images/footer/portfolio-04.jpg';
import gallery6 from '../../Assets/Images/footer/portfolio-05.jpg';

const Footer = () => {
    return (
        <div className='pt-20 bg-dark text-light'>
            <div className="container mx-auto md:px-10 px-2">
                <div className="grid grid-cols-3 md:gap-10 gap-4">
                    <div className="md:col-span-1 col-span-3 mb-10">
                        <div className="">
                            <img src={logo} alt="" className="" />
                            <p className="py-10 font-poppins  font-semibold text-gray-400">
                                Mauris sed molestie sem. Sed vel vestibulum
                                elit, non accumsan risus. In vitae sapien viverra
                                est.
                            </p>
                            <div className="flex itemscenter gap-3">
                                <BsFillTelephoneFill className="bg-secondary p-1.5 text-3xl rounded-full text-dark" />
                                <div className="">
                                    <p className="text-xl font-semibold font-poppins">0 (550) 680-34-12</p>
                                    <p className="text-secondary font-semibold font-poppins pt-2">Round-the-clock</p>
                                </div>
                            </div>
                            <div className="flex gap-7 pt-8">
                                <a href="/" target="_blank" rel="noopener noreferrer"><FaFacebookF className="text-primary" /></a>
                                <a href="/" target="_blank" rel="noopener noreferrer"><BsTwitter className="text-primary" /></a>
                                <a href="/" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-primary" /></a>
                                <a href="/" target="_blank" rel="noopener noreferrer"><BsInstagram className="text-primary" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3 mb-10">
                        <div className="">
                            <h2 className="text-2xl font-poppins font-semibold">Explore</h2>
                            <div className="grid grid-cols-7 pt-2">
                                <div className="col-span-2 bg-primary pb-0.5"></div>
                                <div className="col-span-5 bg-gray-600 pb-0.5"></div>
                            </div>
                            <div className="pt-10 gap-2 grid grid-cols-2">
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Education</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Products</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Articles</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">FAQ</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Cart</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Gallery</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Feedback</span>
                                </a>
                                <a href="/" className="text-lg font-poppins font-semibold text-light flex items-center gap-1">
                                    <BiChevronRight className="text-primary" />
                                    <span className="">Contacts</span>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3 mb-10">
                        <div className="">
                            <h2 className="text-2xl font-poppins font-semibold">Galleries</h2>
                            <div className="grid grid-cols-7 pt-2">
                                <div className="col-span-2 bg-primary pb-0.5"></div>
                                <div className="col-span-5 bg-gray-600 pb-0.5"></div>
                            </div>
                            <div className="pt-10 grid grid-cols-3 gap-5">
                                <img className="rounded-xl object-cover" src={gallery1} alt="" />
                                <img className="rounded-xl object-cover" src={gallery2} alt="" />
                                <img className="rounded-xl object-cover" src={gallery3} alt="" />
                                <img className="rounded-xl object-cover" src={gallery4} alt="" />
                                <img className="rounded-xl object-cover" src={gallery5} alt="" />
                                <img className="rounded-xl object-cover" src={gallery6} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className=" bg-[#0000006f]">
                <p className="container mx-auto px-10 py-5 mt-10 font-inter font-medium">This website is designed and developed by
                    <a className='text-primary' href="https://mahbubdev1.vercel.app" target="_blank" rel="noopener noreferrer"> Munir Uddin Mahbub</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;