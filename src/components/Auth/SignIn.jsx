import React from 'react';
import { useForm } from "react-hook-form";
import { FaUserAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../../configs/firebase.init';
import { AppContext } from '../../Layouts/AuthContextProvider';
import { toast } from 'react-toastify';
import LoginWithGoogle from './LoginWithGoogle';
import serverdomain from '../../utils/serverdomain';

const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const password = React.useRef({});
    password.current = watch("password", "");

    const auth = getAuth(app);

    let location = useLocation();
    let navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const { userInfo, setUserInfo } = React.useContext(AppContext);

    const onSubmit = data => {
        const { email, password } = data;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    toast.success("Your Registration Successful", {
                        position: "bottom-left",
                    });
                    updateUserInfo(data);
                    setUserInfo(user);
                    navigate(from, { replace: true });
                    // Send registration data to the server
                    sendRegistrationDataToServer(data);
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(`${errorMessage}`, {
                    position: "bottom-left",
                });
            });
    };

    const updateUserInfo = (formData) => {
        updateProfile(auth.currentUser, {
            displayName: formData.name,
            photoURL: formData.photo
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            toast.error("There was a problem adding your name. You can add a name later.", {
                position: "bottom-left",
            });
        });
    };

    const sendRegistrationDataToServer = (data) => {
        fetch(`${serverdomain}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    // The request was successful
                    setUserInfo([{...userInfo, ...data}])
                    return response.json();
                } else {
                    // The server returned an error status
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then(data => {
                // Display a success message to the user
                toast.success('Your data is saved on the server', {
                    position: 'bottom-left',
                });
            })
            .catch(error => {
                // Display an error message to the user
                toast.error('There is a problem sending data to the server. You can ‍add them later.', {
                    position: 'bottom-left',
                });
            });
    };


    return (
        <div className='py-20'>
            <div className="container mx-auto md:px-10 px-2">
                <div className="max-w-3xl mx-auto">
                    <div className="">
                        <div className="shadow-xl p-5 rounded-xl border-2 border-primary">
                            <div className="flex justify-center py-5">
                                <FaUserAlt className='text-primary text-6xl border-2 border-primary p-2 rounded-full' />
                            </div>

                            <h2 className="text-center pb-0 font-semibold font-inter">Create your Daraz Account</h2>
                            <div className="text-center py-5">
                                <p className="">Already member? <Link to="/auth/login"><span className="text-purple-600">Login</span></Link> here.</p>
                            </div>
                            <LoginWithGoogle />
                            <div className="py-5 text-center text-sm font-medium text-gray-500">
                                Or, Register with
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input {...register("email", { required: true })} type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                    {errors.email && <span className='px-2 text-red-500 font-inter'>This field is required</span>}
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <div className="relative">
                                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*\W).*$/i })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-11" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                        {errors.password && <span className='px-2 text-red-500 font-inter'>Password must be at least 6 characters long. And this field is required.</span>}
                                    </div>
                                    <div className="">
                                        {showPassword ? <BiHide className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <BiShow className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />}
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <div className="relative">
                                        <input type={showRepeatPassword ? 'text' : 'password'} {...register("repeatPassword", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*\W).*$/i, validate: value => value === password.current })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                                        {errors.repeatPassword?.type === "validate" ? <span className='px-2 text-red-500 font-inter'>Passwords must match.</span> : errors.repeatPassword && <span className='px-2 text-red-500 font-inter'>Password must be at least 6 characters long. And this field is required.</span>}
                                    </div>
                                    <div className="">
                                        {showRepeatPassword ? <BiHide className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 cursor-pointer" onClick={() => setShowRepeatPassword(!showRepeatPassword)} /> : <BiShow className="absolute right-0 top-0 mt-3 mr-4 text-gray-400 cursor-pointer" onClick={() => setShowRepeatPassword(!showRepeatPassword)} />}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input {...register("name")} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name (optional)</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input {...register("photo")} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Photo Url (optional)</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        {/* <input {...register("Gender")} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> */}
                                        <select {...register("gender")} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" ">
                                            {/* <option value="">gender</option> */}
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender (optional)</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input {...register("phone")} type="tel" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number  (optional)</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input {...register("address")} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address (optional)</label>
                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;