import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import serverdomain from '../../utils/serverdomain';
import { AppContext } from '../../Layouts/AuthContextProvider';

const CardForUserClass = ({ classData }) => {

    const { userInfo, myClassData, setMyClassData } = React.useContext(AppContext);

    const isButtonDisabled =
        userInfo ? (classData?.seats === 0 || userInfo[0]?.role === 'admin' || userInfo[0]?.role === 'instructor'): true;

    const handleSelect = () => {
        if (!userInfo) {
            alert('Please log in before selecting the course.');
        } else if (isButtonDisabled) {
            alert('This course is not available for selection.');
        } else {
            // Prepare the data to be sent to the server
            const selectedData = {
                classId: classData._id,
                userId: userInfo[0]?._id ? userInfo[0]?._id : userInfo?._id,
                email: userInfo[0]?.email ? userInfo[0]?.email : userInfo?.email,
            };

            // Make an API call or submit the form to send the data to the server
            fetch(`${serverdomain}/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedData),
            })
                .then((response) => {
                    if (response.ok) {
                        // Handle successful response
                        setMyClassData({ ...myClassData, selectedData})
                        toast.success('Selected data sent to the server successfully.'), {
                            position: 'bottom-left',
                        }
                    } else {
                        toast.error('Failed to send selected data to the server.'), {
                            position: 'bottom-left',
                        }
                        throw new Error('Failed to send selected data to the server.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Handle error
                    toast.error('Failed to send selected data to the server.'), {
                        position: 'bottom-left',
                    }
                });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-3">
            <div className="h-60 relative">
                <img className="w-full h-full object-cover rounded-xl" src={classData.classImage} alt="" />
                <div className="absolute top-3 right-5 bg-primary px-3 py-3 rounded-full">
                    <span className='text-light font-semibold'>${classData.price}</span>
                </div>
                <div className="absolute top-6 left-5 bg-secondary px-4 py-1 rounded-full">
                    <span className='text-dark font-semibold'>Available seats: {classData.price}</span>
                </div>
            </div>
            <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 mt-2">
                        <FaUserAlt className='text-primary text-md' />
                        <p className='text-gray-500 font-inter text-sm'>{classData.instructor}</p>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <h2 className='text-xl font-inter font-bold'>{classData.className}</h2>
                {/* <p className='text-gray-500 font-medium'>Nunc laoreet, lectus et dapibus maximus, sapien ante tincidunt neque, a finibu euarcu.</p> */}
            </div>
            <div className="">
                <button
                    className={`bg-primary text-light px-5 py-2 rounded-xl flex items-center gap-2 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleSelect}
                    // disabled={isButtonDisabled}
                >
                    <span className='font-inter font-semibold'>Select</span>
                </button>
            </div>
        </div>
    );
};

export default CardForUserClass;