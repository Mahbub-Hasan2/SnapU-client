import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../configs/firebase.init';
import { toast } from 'react-toastify';
import serverdomain from '../utils/serverdomain';

export const AppContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const auth = getAuth(app);

  const [userInfo, setUserInfo] = React.useState(null);
  const [myClassData, setMyClassData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserInfo(null);
      toast.success("Sign-out successful.", {
        position: "bottom-left",
      });
    }).catch((error) => {
      // An error happened.
      toast.error("An error happened.", {
        position: "bottom-left",
      });
    });

  }


  const getUserData = async () => {
    try {
      const response = await fetch(`${serverdomain}/user/${userInfo?.email ? userInfo?.email : userInfo[0]?.email}`);

      if (response.ok) {
        const responseData = await response.text();


        // Check if the response data is not empty
        if (responseData && responseData.trim() !== "") {
          const userData = JSON.parse(responseData);
          setUserInfo([{ ...userInfo, ...userData }]);
        } else {
          throw new Error('Empty response data');
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      getUserData(); // Call the function to get user data
    }
  }, []);


  console.log(userInfo);

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo, loading, setLoading, myClassData, setMyClassData, logOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default AuthContextProvider;