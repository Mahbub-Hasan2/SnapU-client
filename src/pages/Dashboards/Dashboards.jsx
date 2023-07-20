import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/shared/Sidebar';
import PathTreker from '../../components/Dashboard/shared/PathTreker';

const Dashboards = () => {

    return (
        <div className="relative">
            <Sidebar />
            <PathTreker />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default Dashboards;