import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from "react-icons/fa";
import serverdomain from '../../utils/serverdomain';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    // Fetch instructors data from the server
    fetch(`${serverdomain}/user/instructors`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch instructors');
        }
      })
      .then((data) => {
        setInstructors(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(instructors) || instructors.length === 0) {
    return <div>No instructors found.</div>;
  }

    return (
        <div className='py-20'>
            <div className="container mx-auto md:px-10 px-2">
                <div className="text-center">
                    <h5 className="tracking-wider font-medium text-2xl font-rosarivo italic text-primary">Our instructors</h5>
                    <h2 className="font-bold text-5xl font-inter text-dark py-4">All the instructors</h2>

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
                        {instructors.map((item) => (
                            <div key={item._id} className="">
                                <div className="w-full flex justify-center">
                                    <div className="w-64 h-64 relative">
                                        <img className="w-full h-full object-cover rounded-xl" src={item.photo} alt={item.name} />
                                        <div className="absolute bottom-3 right-6 bg-primary px-3 py-2 rounded-full">
                                            <span className='text-light font-semibold flex items-center gap-2'><FaChalkboardTeacher className='text-xl' />{item.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 relative">
                                    <h2 className="text-xl font-semibold font-inter">{item.name}</h2>
                                    <p className="text-xs font-semibold font-inter">{item.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructors;
