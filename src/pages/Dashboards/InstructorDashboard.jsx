import React from 'react';
import { Outlet } from 'react-router-dom';

const InstructorDashboard = () => {
    return (
        <div>
            Instructor Dashboard
            <Outlet />
        </div>
    );
};

export default InstructorDashboard;