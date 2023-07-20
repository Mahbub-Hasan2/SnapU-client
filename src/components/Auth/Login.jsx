import React from 'react';
import { useForm } from "react-hook-form";
import { FaUserAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import app from '../../configs/firebase.init';
import { AppContext } from '../../Layouts/AuthContextProvider';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import serverdomain from '../../utils/serverdomain';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let location = useLocation();
    let navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const auth = getAuth(app);
    const { userInfo, setUserInfo } = React.useContext(AppContext);

    const getUserData = async (peram) => {
        try {
            const response = await fetch(`${serverdomain}/user/${peram?.email}`);
            if (response.ok) {
                const userData = await response.json();
                // Do something with the user data
                setUserInfo([{...peram, ...userData}])
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
        }
    };
    


    const onSubmit = async data => {
        const { email, password } = data;

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    setUserInfo([{ ...userInfo, ...user }])
                    getUserData(user); // Call the function to get user data
                    navigate(from, { replace: true });
                    toast.success("Your Login Successfully", {
                        position: "bottom-left",
                    });

                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (error) {
                    toast.error(`${errorMessage}`, {
                        position: "bottom-left",
                    });
                }
            });
    };
    return (
        <div className='py-20'>
            <div className="container mx-auto md:px-10 px-2">
                <div className="max-w-md mx-auto">
                    <div className="">
                        <div className="p-5 shadow-xl rounded-xl my-5 border border-primary">
                            <div className="flex justify-center py-5">
                                <FaUserAlt className='text-primary text-6xl border-2 border-primary p-2 rounded-full' />
                            </div>
                            <h2 className="text-center pb-5 font-semibold font-inter">Welcome to Snapu! Please login.</h2>
                            <button className='w-full bg-gray-500 py-2 rounded-full text-light font-semibold'>Google</button>

                            <div className="py-5 text-center text-sm font-medium text-gray-500">
                                Or, login with
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input className='border w-full py-1.5 rounded-full focus:outline-none focus:ring-2 text-xl px-3 mb-2' placeholder='Enter you email' {...register("email", { required: true })} />
                                {errors.email && <span className='px-2 text-red-500 font-inter'>This field is required</span>}
                                <div className='py-2' />
                                <input className='border w-full py-1.5 rounded-full focus:outline-none focus:ring-2 text-xl px-3 mb-2' placeholder='Enter your password' {...register("password", { required: true })} />
                                {errors.password && <span className='px-2 text-red-500 font-inter'>This field is required</span>}
                                <input type="submit" className='w-full my-2 py-2 bg-primary rounded-full text-light font-semibold ' />
                            </form>

                            <div className="text-center py-5">
                                <p className="">New member? <Link to="/auth/signin"><span className="text-purple-600">Register</span></Link> here.</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="md:col-span-3 col-span-5">
                        <img src="https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg" alt="" className="" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;