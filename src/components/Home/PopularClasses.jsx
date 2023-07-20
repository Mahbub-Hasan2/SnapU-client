import React, { useEffect, useState } from 'react';
import bg from "../../Assets/Images/home/PopularClasses/pattern_edu_white_03.png";
import { BsArrowRight } from "react-icons/bs";
import { AppContext } from '../../Layouts/AuthContextProvider';
import serverdomain from '../../utils/serverdomain';
import CardForUserClass from '../Classes/CardForUserClass';


const PopularClasses = () => {
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
        <div style={{ backgroundImage: `url(${bg})` }} className="bg-tertiary py-20 h-full  flex items-center ">
            <div className="container mx-auto md:px-10 px-2">
                <div className="text-center">
                    <h5 className="tracking-wider font-medium text-2xl font-rosarivo italic text-primary">Start now</h5>
                    <h2 className="font-bold text-5xl font-inter text-dark py-4">Popular Classes</h2>
                    <div className="mx-auto mb-10">
                        <div className="pb-0.5 w-28 mx-auto bg-primary"></div>
                        <hr className="w-96 mx-auto bg-primary" />
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            classes.slice(0, 6).map((classData) => (
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
        </div>
    );
};

export default PopularClasses;