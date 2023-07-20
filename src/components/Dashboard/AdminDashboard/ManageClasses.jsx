import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import serverdomain from '../../../utils/serverdomain';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [classfeedback, setFeedback] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`${serverdomain}/instructor/all`);
                const data = response.data;
                setClasses(data);
            } catch (error) {
                console.error('Error fetching instructor classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleStatusUpdate = async (classId, status) => {
        try {
            const updatedClasses = classes.map((cls) => {
                if (cls._id === classId) {
                    return {
                        ...cls,
                        status,
                    };
                }
                return cls;
            });

            setClasses(updatedClasses);

            // Send updated data to the server
            await axios.patch(`${serverdomain}/instructor/${classId}`, { status });

            toast.success('Class status updated successfully', {
                position: 'bottom-left',
            });
        } catch (error) {
            console.error('Error updating class status:', error);
        }
    };

    const handleApprove = (classId) => {
        handleStatusUpdate(classId, 'approved');
    };

    const handleDeny = (classId) => {
        handleStatusUpdate(classId, 'denied');
    };

    const handleFeedbackModalOpen = (classId) => {
        const updatedClasses = classes.map((cls) => {
            if (cls._id === classId) {
                return {
                    ...cls,
                    isFeedbackModalOpen: true,
                };
            }
            return cls;
        });

        setClasses(updatedClasses);
    };

    const handleFeedbackModalClose = (classId) => {
        const updatedClasses = classes.map((cls) => {
            if (cls._id === classId) {
                return {
                    ...cls,
                    isFeedbackModalOpen: false,
                };
            }
            return cls;
        });

        setClasses(updatedClasses);
    };

    const handleFeedbackSubmit = async (classId) => {
        try {
            const updatedClasses = classes.map((cls) => {
                if (cls._id === classId) {
                    return {
                        ...cls,
                        isFeedbackModalOpen: false,
                        feedback: classfeedback,
                    };
                }
                return cls;
            });

            setClasses(updatedClasses);

            // Send feedback to the server
            await axios.post(`${serverdomain}/instructor/feedback/${classId}`, { feedback: classfeedback });

            toast.success('Feedback submitted successfully', {
                position: 'bottom-left',
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Classes</h2>
            {classes.map((cls) => (
                <div key={cls._id} className="border rounded-md p-4 mb-4 flex gap-5">
                    <div className="w-60">
                        <img src={cls.classImage} alt={cls.className} className="mb-4" />
                    </div>
                    <div className="">
                        <h3 className="text-lg font-medium mb-2">{cls.className}</h3>
                        <p className="mb-2">
                            Instructor: {cls.instructor} ({cls.email})
                        </p>
                        <p className="mb-2">Available Seats: {cls?.seats}</p>
                        <p className="mb-2">Price: {cls.price}</p>
                        <p className="mb-2">Status: {cls.status}</p>
                        <button
                            onClick={() => handleApprove(cls._id)}
                            disabled={cls.status === 'approved' || cls.status === 'denied'}
                            className={`bg-green-500 text-white py-2 px-4 rounded mr-2 ${cls.status === 'approved' || cls.status === 'denied' ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleDeny(cls._id)}
                            disabled={cls.status === 'approved' || cls.status === 'denied'}
                            className={`bg-red-500 text-white py-2 px-4 rounded mr-2 ${cls.status === 'approved' || cls.status === 'denied' ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Deny
                        </button>
                        <button
                            onClick={() => handleFeedbackModalOpen(cls._id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Send Feedback
                        </button>
                        {cls.isFeedbackModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded-md">
                                    <h3 className="text-lg font-medium mb-2">Send Feedback</h3>
                                    <textarea
                                        rows={4}
                                        className="border p-2 mb-2 w-full"
                                        placeholder="Write your feedback..."
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleFeedbackSubmit(cls._id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => handleFeedbackModalClose(cls._id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageClasses;
