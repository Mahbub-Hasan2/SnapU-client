import React, { useEffect, useState } from 'react';
import serverdomain from '../../../utils/serverdomain';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [userRender, setUserRender] = useState(false);

    useEffect(() => {
        fetch(`${serverdomain}/user`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    }, [userRender]);

    const updateUserRole = (userId, role) => {
        fetch(`${serverdomain}/user/updaterole/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role }),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('User role updated successfully', {
                        position: 'bottom-left',
                    });
                    // You can perform any additional actions after successful update
                    setUserRender(!userRender);
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    };

    return (
        <div>
            <div className="">
                <h2 className="text-2xl font-bold mb-4 font-inter text-primary">Manage Users</h2>

                <div>
                    <h1>User List</h1>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : users.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        users.map((user) => (
                            <div key={user._id} className="border rounded-md p-4 mb-4">
                                <div className="">
                                    <img src={user.photo} alt="" className="" />
                                </div>
                                <div className="">
                                    <h3 className="text-lg font-medium mb-2">{user.name}</h3>
                                    <p className="mb-2">Email: {user.email}</p>
                                    <p className="mb-2">Role: {user.role}</p>
                                    <button
                                        onClick={() => updateUserRole(user._id, 'instructor')}
                                        disabled={user.role === "admin" || user.role === "instructor" ? true : false}
                                        className={`bg-blue-500 text-white py-2 px-4 rounded ${user.role === "admin" || user.role === "instructor"
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                            }`}
                                    >
                                        Make Instructor
                                    </button>
                                    <button
                                        onClick={() => updateUserRole(user._id, 'admin')}
                                        disabled={user.role === "admin" || user.role === "instructor" ? true : false}
                                        className={`bg-blue-500 text-white py-2 px-4 rounded ${user.role === "admin" || user.role === "instructor"
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                            }`}
                                    >
                                        Make Admin
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
