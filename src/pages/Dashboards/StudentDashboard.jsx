import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div>
            Student Dashboard
            <Outlet />
        </div>
    );
};

export default StudentDashboard;