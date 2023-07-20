import React from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from '../../components/shared/PageHeader';

const AuthPage = () => {
    return (
        <div>
            <PageHeader title="Auth" />
            <Outlet />
        </div>
    );
};

export default AuthPage;