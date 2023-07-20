import React from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../Layouts/AuthContextProvider';
import serverdomain from '../../../utils/serverdomain';
import { toast } from 'react-toastify';

const AddClass = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // Placeholder for loggedInInstructor object

    const { userInfo, setUserInfo } = React.useContext(AppContext);

    const loggedInInstructor = {
        displayName: userInfo?.displayName ? userInfo?.displayName : userInfo[0]?.role,
        email: userInfo?.email ? userInfo?.email : userInfo[0]?.email,
    };

    const onSubmit = async (data) => {
        // Add instructor name and email to data object
        data.instructor = loggedInInstructor.displayName;
        data.email = loggedInInstructor.email;

        try {
            const response = await fetch(`${serverdomain}/instructor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Data successfully submitted
                toast.success('Class added successfully', {
                    position: 'bottom-left',
                });
            } else {
                // Error occurred while submitting data
                toast.error('Failed to add class', {
                    position: 'bottom-left',
                })
            }
        } catch (error) {
            console.error('Failed to submit data:', error);
        }
    };

    return (
        <div>
            <h1 className='text-primary font-bold'>Add Class</h1>
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="className" className="block mb-2 text-lg font-medium text-gray-700">
                            Class name
                        </label>
                        <input
                            id="className"
                            {...register('className', { required: true })}
                            type="text"
                            className={`form-input w-full ${errors.className ? 'border-red-500' : ''}`}
                        />
                        {errors.className && <p className="text-red-500">Class name is required</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="classImage" className="block mb-2 text-lg font-medium text-gray-700">
                            Class Image
                        </label>
                        <input
                            id="classImage"
                            {...register('classImage', { required: true })}
                            type="text"
                            className={`form-input w-full ${errors.classImage ? 'border-red-500' : ''}`}
                        />
                        {errors.classImage && <p className="text-red-500">Class image is required</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="instructorName" className="block mb-2 text-lg font-medium text-gray-700">
                            Instructor name
                        </label>
                        <input
                            id="instructorName"
                            value={loggedInInstructor.displayName}
                            readOnly
                            type="text"
                            className="form-input w-full bg-gray-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="instructorEmail" className="block mb-2 text-lg font-medium text-gray-700">
                            Instructor email
                        </label>
                        <input
                            id="instructorEmail"
                            value={loggedInInstructor.email}
                            readOnly
                            type="text"
                            className="form-input w-full bg-gray-200"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="availableSeats" className="block mb-2 text-lg font-medium text-gray-700">
                            Available seats
                        </label>
                        <input
                            id="availableSeats"
                            {...register('seats', { required: true, pattern: /^\d+$/ })}
                            type="text"
                            className={`form-input w-full ${errors.availableSeats ? 'border-red-500' : ''}`}
                        />
                        {errors.availableSeats && (
                            <p className="text-red-500">Available seats is required and must be a number</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block mb-2 text-lg font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            id="price"
                            {...register('price', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })}
                            type="text"
                            className={`form-input w-full ${errors.price ? 'border-red-500' : ''}`}
                        />
                        {errors.price && (
                            <p className="text-red-500">Price is required and must be a valid number (e.g., 10.99)</p>
                        )}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddClass;