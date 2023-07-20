import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

const PathTreker = () => {
  let location = useLocation();
  const data = location.pathname.split('/');
  const filteredData = data.filter(item => item !== "");

  return (
    <div className="flex gap-2 items-center justify-center mt-5">
      <Link to="/"><p className="text-secondary font-bold hover:text-primary cursor-pointer">Home</p></Link>
      {filteredData.map((item, index) => {
        const path = `/${filteredData.slice(0, index + 1).join('/')}`;
        return (
          <div key={index} className='flex items-center'>
            <BiChevronRight className="text-primary text-xl" />
            <Link to={path}>
              <p className="text-gray-500 hover:text-primary cursor-pointer dark:text-light font-bold">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PathTreker;
