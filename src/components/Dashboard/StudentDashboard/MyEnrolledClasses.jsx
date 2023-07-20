import React, { useState } from 'react';

const MyEnrolledClasses = () => {

    const [enrolledClasses, setEnrolledClasses] = useState([
        {
            id: 1,
            className: 'Yoga Class',
            classImage: 'yoga.jpg',
            instructorName: 'John Doe',
            instructorEmail: 'johndoe@example.com',
            availableSeats: 10,
            price: 19.99,
        },
        {
            id: 2,
            className: 'Zumba Class',
            classImage: 'zumba.jpg',
            instructorName: 'Jane Smith',
            instructorEmail: 'janesmith@example.com',
            availableSeats: 15,
            price: 14.99,
        },
        // Add more enrolled classes here...
    ]);

    return (
        <div>
            My Enrolled Classes


            <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">My Enrolled Classes</h2>
                {enrolledClasses.map((cls) => (
                    <div key={cls.id} className="border rounded-md p-4 mb-4">
                        <img src={cls.classImage} alt={cls.className} className="mb-4" />
                        <h3 className="text-lg font-medium mb-2">{cls.className}</h3>
                        <p className="mb-2">
                            Instructor: {cls.instructorName} ({cls.instructorEmail})
                        </p>
                        <p className="mb-2">Available Seats: {cls.availableSeats}</p>
                        <p className="mb-2">Price: {cls.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrolledClasses;