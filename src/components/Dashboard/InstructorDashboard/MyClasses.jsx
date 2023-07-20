import React, { useEffect, useState } from 'react';
import { AppContext } from '../../../Layouts/AuthContextProvider';
import serverdomain from '../../../utils/serverdomain';
import axios from 'axios';

const MyClasses = () => {
    const { userInfo, setUserInfo } = React.useContext(AppContext);

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Placeholder for logged-in instructor's email
        const loggedInInstructorEmail = userInfo?.email ? userInfo?.email : userInfo[0]?.email;

        const fetchClasses = async () => {
            try {
                const response = await axios.get(`${serverdomain}/instructor/${loggedInInstructorEmail}`);
                const data = response.data;
                setClasses(data);
            } catch (error) {
                console.error('Error fetching instructor classes:', error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <h1>My Classes</h1>
            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">My Classes</h2>
                {Array.isArray(classes) && classes.map((cls) => (
                    <div key={cls._id} className="border rounded-md p-4 mb-4">
                        <h3 className="text-lg font-medium mb-2">{cls.className}</h3>
                        <p className="mb-2">Status: {cls.status}</p>
                        <p className="mb-2">Total Enrolled Students: {cls?.totalStudents ? cls.totalStudents : 0}</p>
                        {cls?.status === 'denied' && (
                            <div>
                                <p className="mb-2">Feedback: {cls?.feedback}</p>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                                    Update
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClasses;