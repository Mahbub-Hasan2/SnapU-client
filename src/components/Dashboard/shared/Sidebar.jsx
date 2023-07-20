import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSelectMultiple } from 'react-icons/bi';
import { MdClass } from 'react-icons/md';
import { GrChapterAdd } from 'react-icons/gr';
import { FaUsersCog } from 'react-icons/fa';
import { MdDatasetLinked } from 'react-icons/md';
import { BsFillFileCheckFill } from 'react-icons/bs';
import { AppContext } from '../../../Layouts/AuthContextProvider';


const Sidebar = () => {

    const { userInfo, setUserInfo } = useContext(AppContext);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const routes = [
        {
            instructor: [
                {
                    path: 'instructor/add-class',
                    name: 'Add a Class',
                    icon: (<GrChapterAdd className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                },
                {
                    path: 'instructor/my-classes',
                    name: 'My Classes',
                    icon: (<MdClass className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                }
            ],
            student: [
                {
                    path: 'student/my-selected-classes',
                    name: 'My Selected Classes',
                    icon: (<BiSelectMultiple className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                },
                {
                    path: 'student/my-enrolled-classes',
                    name: 'My Enrolled Classes',
                    icon: (<BsFillFileCheckFill className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                },
            ],
            admin: [
                {
                    path: 'admin/manage-classes',
                    name: 'Manage Classes',
                    icon: (<MdDatasetLinked className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                },
                {
                    path: 'admin/manage-users',
                    name: 'Manage Users',
                    icon: (<FaUsersCog className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />)
                }
            ]
        }
    ]

    useEffect(() => {
        const role = { role: 'student' };
        if (!userInfo?.role) {
            const newUserInfo = { ...userInfo[0], ...role };
            setUserInfo([newUserInfo]);
        }
    }, []);

    // Filter routes based on user role
    const userRoutes = userInfo[0]?.role ? routes[0][userInfo[0].role] : [];
    return (
        <div className="">
            <button
                onClick={handleSidebarToggle}
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={`absolute top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        ----------{userInfo[0]?.role}-------------
                        {
                            userRoutes && userRoutes.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {/* <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg> */}
                                        {route.icon}
                                        <span className="ml-3">{route.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        {/* ----------instructor------------
                        {
                            routes[0].instructor.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {route.icon}
                                        <span className="ml-3">{route.name}</span>
                                    </Link>
                                </li>
                            ))
                        } */}
                        {/* --------admin-------------------
                        {
                            routes[0].admin.map((route, index) => (
                                <li key={index}>
                                    <Link to={route.path} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        {route.icon}
                                        <span className="ml-3">{route.name}</span>
                                    </Link>
                                </li>
                            ))
                        } */}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;