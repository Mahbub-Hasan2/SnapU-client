import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../Layouts/AuthContextProvider';
import Spinner from '../utils/Spinner';

const PrivateRoute = ({children}) => {
    let location = useLocation();

    const {userInfo, loading} = useContext(AppContext);

    if(loading){
        return <Spinner/>
    }

    if(userInfo){
        return children;
    }
    return <Navigate state={{from:location}} to="/auth/login" replace={true} />
};

export default PrivateRoute;