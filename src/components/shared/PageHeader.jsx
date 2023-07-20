import React from 'react';
import img from '../../Assets/Images/404/download.jpeg';
import img1 from '../../Assets/Images/404/download.png';
import { BiChevronRight } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';


const PageHeader = ({title}) => {
    let location = useLocation();
    const data = location.pathname.split('/');
    const filteredData = data.filter(item => item !== "");

    return (
        <div>
            <header style={{ backgroundImage: `url(${img})` }} className="h-[45vh] bg-cover bg-fixed relative">
                <div style={{ backgroundImage: `url(${img1})` }} className="h-full flex items-center justify-center bg-[#22222280] bg-no-repeat bg-bottom">
                    <div className="text-center">
                        <h2 className="md:text-5xl text-2xl font-inter text-light font-bold">{title && title}</h2>
                        <div className="flex gap-2 items-center justify-center mt-5">
                            <p className="text-secondary font-bold">Home</p>
                            {
                                filteredData.map((item, index) => (
                                    <div key={index} className='flex items-center'>
                                        <BiChevronRight className="text-primary text-xl" />
                                        <p className="text-light font-bold">{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className="bg-[#ffff] absolute -bottom-1 w-full p-1"></div>
            </header>
        </div>
    );
};

export default PageHeader;