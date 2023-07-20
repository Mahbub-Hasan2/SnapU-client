import React, { useContext, useEffect } from 'react';
import logo from "../../Assets/Images/icons/logo_1x.png";
// import { BiChevronRight } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Layouts/AuthContextProvider';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const { myClassData, logOut, userInfo, setUserInfo } = React.useContext(AppContext);
console.log(userInfo)
    let dashroute = "/dashboard";

    useEffect(() => {
        if (userInfo) {
            if (userInfo[0]?.role === 'student') {
                dashroute = '/dashboard/student/my-selected-classes'
            }
            else if (userInfo[0]?.role === 'instructor') {
                dashroute = '/dashboard/instructor/add-class'
            }
            else if (userInfo[0]?.role === 'admin') {
                dashroute = '/dashboard/admin/manage-classes'
            }
        }
    }, [userInfo]);


    return (
        <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 left-0 border-b py-2 border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
                </a>
                <div className="flex md:order-2 gap-5">
                    <div className="flex gap-5 items-center">
                        <div className="">
                            <AiOutlineSearch className="cursor-pointer text-2xl hover:text-primary" />
                        </div>
                        {
                            userInfo ?
                                <div className="w-8 h-8 relative group cursor-pointer">
                                    <img className="object-cover rounded-full h-full w-full" src={userInfo && (userInfo[0]?.photo ? userInfo[0]?.photo : userInfo?.photoURL)} alt={userInfo?.name} />
                                    <div className="">
                                        <ul className="hidden group-hover:block absolute -top-8 -right-2 z-10 w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 mt-16">
                                            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <Link to="/dashboard/student" className="flex items-center">
                                                    <CiUser className="text-primary" />
                                                    <span className="ml-2">Profile</span>
                                                </Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <Link to="/classes" className="flex items-center">
                                                    <MdOutlineShoppingBag className="text-primary" />
                                                    <span className="ml-2">My Class</span>
                                                </Link>
                                            </li>
                                            <li onClick={logOut} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <span className="flex items-center">
                                                    <MdOutlineShoppingBag className="text-primary" />
                                                    <span className="ml-2">Log Out</span>
                                                </span>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <span className="flex items-center">
                                                    <MdOutlineShoppingBag className="text-primary" />
                                                    <span className="ml-2">{userInfo && userInfo[0]?.role}</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <Link to="/auth/login" className="flex items-center hover:text-primary gap-1 border px-3 py-1.5 rounded-full bg-tertiary">
                                    <CiUser className="cursor-pointer text-2xl " />
                                    <span className='font-inter font-semibold '>Log In</span>
                                </Link>
                        }

                        <div className="flex gap-1 items-center">
                            <MdOutlineShoppingBag className="cursor-pointer text-2xl hover:text-primary" />
                            <span className="bg-primary px-1.5 text-light font-semibold rounded-full font-poppins">{myClassData > 0 ? myClassData.length : 0}</span>
                        </div>
                    </div>
                    {/* <button type="button" className="text-white border focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
                    <button onClick={() => setNavbarOpen(!navbarOpen)} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${navbarOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        <li>
                            <Link to="/classes" className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Classes</Link>
                        </li>
                        <li>
                            <Link to="/instructors" className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Instructors</Link>
                        </li>
                        {
                            userInfo ?
                                <li>
                                    <Link to={dashroute} className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
                                </li>
                                :
                                ""
                        }

                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-dark font-poppins font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contacts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;