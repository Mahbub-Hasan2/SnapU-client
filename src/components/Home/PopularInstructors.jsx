import React from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";


const data = [
    {
        "id": 1,
        "name": "John Smith",
        "bio": "John Smith is an experienced photographer with a passion for teaching. He specializes in landscape and wildlife photography.",
        "image": "https://i.ibb.co/bvNC5Xr/teacher-06-290x290.jpg"
    },
    {
        "id": 2,
        "name": "Emily Johnson",
        "bio": "Emily Johnson is a professional portrait photographer who loves capturing the unique essence of individuals through her work.",
        "image": "https://i.ibb.co/KbLjjTj/teacher-07-290x290.jpg"
    },
    {
        "id": 3,
        "name": "Michael Davis",
        "bio": "Michael Davis is a renowned commercial photographer with expertise in product and food photography.",
        "image": "https://i.ibb.co/x8QqWZq/team-01-290x290.jpg"
    },
    {
        "id": 4,
        "name": "Sarah Adams",
        "bio": "Sarah Adams is a wedding photographer who combines a photojournalistic approach with a keen eye for artistic details.",
        "image": "https://i.ibb.co/ZzwmvbS/team-02-290x290.jpg"
    },
    {
        "id": 5,
        "name": "Sarah Adams",
        "bio": "Sarah Adams is a wedding photographer who combines a photojournalistic approach with a keen eye for artistic details.",
        "image": "https://i.ibb.co/LCvCHm1/team-03-290x290.jpg"
    },
    {
        "id": 6,
        "name": "Sarah Adams",
        "bio": "Sarah Adams is a wedding photographer who combines a photojournalistic approach with a keen eye for artistic details.",
        "image": "https://i.ibb.co/6Fh7RWQ/team-04-290x290.jpg"
    }
];


const PopularInstructors = () => {
    return (
        <div className='py-20'>
            <div className="container mx-auto md:px-10 px-2">
                <div className="text-center">
                    <h5 className="tracking-wider font-medium text-2xl font-rosarivo italic text-primary">Our team</h5>
                    <h2 className="font-bold text-5xl font-inter text-dark py-4">Meet Our Teachers</h2>

                    <div className="mx-auto mb-10">
                        <div className="pb-0.5 w-28 mx-auto bg-primary"></div>
                        <hr className="w-96 mx-auto bg-primary" />
                    </div>

                    <div className="flex justify-center">
                        <p className="md:max-w-lg">
                            Meet Our Teachers
                            Duis dictum massa nunc, at tristique elit consequat et. Mauris sed magna at urna tempor ultrices. Pellentesque sit amet odio a leo facilisis ultricies. Pellentesque mollis efficitur quam eu laoreet.
                        </p>
                    </div>
                    <div className="grid  md:grid-cols-4 col-span-1 gap-5 pt-20">
                        {data.slice(0, 6).map((item, index) => (
                            <div key={index} className="">
                                <div className="w-full flex justify-center">
                                    <div className="w-64 h-64 relative">
                                        <img className="w-full h-full object-cover rounded-full" src={item.image} alt={item.title} />
                                        <div className="absolute top-3 right-6 bg-primary px-3 py-3 rounded-full">
                                            <span className='text-light font-semibold'><FaChalkboardTeacher className='text-xl' /></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 relative">
                                    <h2 className="text-xl font-semibold font-inter">{item.name}</h2>
                                    <p className="text-sm font-medium text-gray-500 font-inter py-3">{item.bio.substring(0, 50)}</p>
                                    <div className="flex justify-center pb-5">
                                        <button className="flex items-center gap-2 text-gray-500 font-rosarivo italic ">Read More <BsArrowRight className="" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center items-center">
                            <div className="">
                                <button className="border-b-2 border-primary  flex items-center gap-2 text-gray-500 font-rosarivo italic ">View all courses <BsArrowRight className="" /></button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PopularInstructors;