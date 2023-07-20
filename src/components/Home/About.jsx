import React from 'react';
import img from "../../assets/images/home/about/about_01.jpg"
import img2 from "../../assets/images/home/about/about_02.jpg";
import { MdDone } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const About = () => {
    return (
        <div className='py-20 '>
            <div className="container mx-auto md:px-10 px-2 overflow-hidden">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="relative mb-14">
                        <div className="relative">
                            <img className='rounded-xl ' src={img} alt="" />
                            <img className='rounded-xl absolute top-14 right-10' src={img2} alt="" />
                        </div>
                        <div className="p-5 text-center absolute -bottom-10 right-52 bg-primary w-48 rounded-xl">
                            <h2 className="font-bold font-inter text-8xl text-secondary">16</h2>
                            <h3 className="text-2xl text-light font-bold">Years of <br />Experience</h3>
                        </div>
                    </div>
                    <div className="">
                        <p className="font-rosarivo italic tracking-wider text-primary text-2xl">About our School</p>
                        <h2 className="text-5xl font-bold font-inter leading-relaxed text-dark">Online Graduate School for Adults & Children</h2>
                        <p className="font-medium py-5">Sed risus augue, commodo ornare felis non, eleifend molestie metus. Donec nec purus porttitor, ultrices diam id, laoreet mi. Aenean sit amet enim quis massa pharetra eleifend.</p>
                    
                        <div className="">
                            <div className="flex gap-5 items-center mb-3">
                                <MdDone className="text-primary text-3xl" />
                                <p className="font-semibold text-lg">Flexible training programs</p>
                            </div>
                            <div className="flex gap-5 items-center mb-3">
                                <MdDone className="text-primary text-3xl" />
                                <p className="font-semibold text-lg">Experienced teachers</p>
                            </div>
                            <div className="flex gap-5 items-center mb-3">
                                <MdDone className="text-primary text-3xl" />
                                <p className="font-semibold text-lg">Free incoming lessons</p>
                            </div>

                            <div className="pt-10 flex items-center gap-5">
                                <button className="bg-primary text-light font-bold py-5 px-20 rounded-full">Read More</button>
                                <div className="flex gap-5 items-center">
                                    <BsFillTelephoneFill className="bg-tertiary rounded-full p-3 text-primary text-6xl" />
                                    <p className="font-semibold text-xl font-inter text-gray-500 ">+1 234 567 8901</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;