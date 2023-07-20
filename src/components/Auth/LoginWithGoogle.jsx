import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import app from '../../configs/firebase.init';
import { AppContext } from '../../Layouts/AuthContextProvider';



const LoginWithGoogle = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const { setUserInfo } = React.useContext(AppContext);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // The signed-in user info.
                const user = result.user;
                if (user) {
                    setUserInfo(user);
                    navigate(from, { replace: true });
                    toast.success("Your Registation Successfully", {
                        position: "bottom-left",
                    });
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;

                if (error) {
                    toast.error(`${errorMessage}!!!`, {
                        position: "bottom-left",
                    });
                }
            });
    }

    return (
        <button onClick={signInGoogle}  className='w-full bg-gray-500 py-2 rounded-full text-light font-semibold'>Google</button>
    );
};

export default LoginWithGoogle;