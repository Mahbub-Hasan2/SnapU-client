import React from 'react';
import img from '../Assets/Images/404/download.jpeg';
import img1 from '../Assets/Images/404/download.png';
import { BiChevronRight } from 'react-icons/bi';

const ErrorPage = () => {

    return (
        <div>
            <header style={{ backgroundImage: `url(${img})` }} className="h-[75vh] bg-cover bg-fixed relative">
                <div style={{ backgroundImage: `url(${img1})` }} className="h-full flex items-center justify-center bg-[#22222280] bg-no-repeat bg-bottom">
                    <div className="text-center">
                        <h2 className="md:text-5xl text-2xl font-inter text-light font-bold">404 Not Found</h2>
                        <div className="flex gap-2 items-center justify-center mt-5">
                            <p className="text-secondary font-bold">Home</p>
                            <BiChevronRight className="text-primary text-xl" />
                            <p className="text-light font-bold">404</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#ffff] absolute -bottom-1 w-full p-1"></div>
            </header>
            <div className="">
                <div className="text-center py-24">
                    <div className="">
                        <h2 className="md:text-5xl text-2xl font-bold text-dark">Oops! Page Not Found</h2>
                        <p className="py-10 font-inter font-medium">
                            The page you are looking for was moved, removed,
                            <br />
                            renamed or might never existed.
                        </p>

                        <a href="/">
                            <button className="bg-primary px-20 py-5 rounded-full text-light font-bold font-inter">Home Page</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;