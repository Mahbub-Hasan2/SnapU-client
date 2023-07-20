import React, { useEffect, useState } from 'react';
import { BsTable } from 'react-icons/bs';
import { AiFillDatabase } from 'react-icons/ai';
import CardForUserClass from './CardForUserClass';
import serverdomain from '../../utils/serverdomain';
import { AppContext } from '../../Layouts/AuthContextProvider';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo, setUserInfo } = React.useContext(AppContext);

    useEffect(() => {
        fetch(`${serverdomain}/instructor/allapprovedClass`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then((data) => {
                setClasses(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);


    return (
        <div className="py-20">
            <div className="container mx-auto md:px-10 px-2">
                {/* ... */}
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        classes.map((classData) => (
                            <CardForUserClass
                                key={classData._id}
                                classData={classData}
                                userInfo={userInfo}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Classes;
