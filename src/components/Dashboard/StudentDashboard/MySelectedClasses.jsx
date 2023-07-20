import React, { useState, useEffect } from 'react';
import serverdomain from '../../../utils/serverdomain';
import { AppContext } from '../../../Layouts/AuthContextProvider';
import { toast } from 'react-toastify';
import Modal from '../../Classes/Modal';
import Payment from '../../Payments/Payment';

const MySelectedClasses = () => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dataRended, setDataRended] = useState(false);

  const { userInfo } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Fetch selected class data from the server
    fetch(`${serverdomain}/student/${userInfo?.email ? userInfo?.email : userInfo[0]?.email}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch selected classes');
        }
      })
      .then((data) => {
        setSelectedClasses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch selected classes');
        setIsLoading(false);
      });
  }, [userInfo[0]?.email, dataRended]);



  const handleDelete = (classId) => {
    console.log(classId)
    // Perform deletion logic here
    fetch(`${serverdomain}/student/${classId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          setDataRended(!dataRended)
          toast.success("Class deleted successfully.", {
            position: "bottom-left",
          })
          // Remove the deleted class from the selectedClasses state
          // const updatedClasses = selectedClasses.filter((cls) => cls._id !== classId);
          // setSelectedClasses(updatedClasses);
        } else {
          throw new Error('Failed to delete class');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const handlePay = (classId) => {
    // Perform payment logic here
    console.log(`Payment for class with ID ${classId} initiated.`);
  };

  return (
    <div>
      My Selected Classes

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Selected Classes {userInfo[0]?.email}</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (

          selectedClasses.length > 0 ? (
            selectedClasses.map((cls) => (

              <div key={cls.classInfo._id} className="border rounded-md p-2 mb-4">
                <img src={cls.classInfo.classImage} alt={cls.classInfo.className} className="mb-4" />
                <h3 className="text-lg font-medium mb-2">{cls.classInfo.className}</h3>
                <p className="mb-2">
                  Instructor: {cls.classInfo.instructor} ({cls.classInfo.email})
                </p>
                <p className="mb-2">Available Seats: {cls.classInfo.seats}</p>
                <p className="mb-2">Price: {cls.classInfo.price}</p>
                <button
                  onClick={() => handleDelete(cls.classId.classId)}
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                >
                  Delete
                </button>
                {/* <button
                  onClick={() => handlePay(cls.classId.classId)}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Pay
                </button> */}
                <Modal>
                  <Payment price={cls.classInfo.price} />
                </Modal>
              </div>

            ))
          ) : (
            <p>No selected classes found.</p>
          ))}
      </div>
    </div>
  );
};

export default MySelectedClasses;
