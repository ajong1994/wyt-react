import { useState, createContext, useEffect } from 'react';

//We first create a context--similar to State, but mutable and can be accessed by any consumer/child by using useContext 
export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {

    //These are the states we're initializing to store component data related to user Login/Authentication status and their authentication credentials

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'false' ? false : !!localStorage.getItem('isLoggedIn'));
    const setLoggedIn = (bool) => {
        setIsLoggedIn(bool)
    }
    const [userData, setUserData] = useState({})
    // Initialize Token States and pull from local storage
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const setAuthTokenCb = (token) => {
        setAuthToken(token)
    }


    useEffect(() => {
        localStorage.setItem('authToken', authToken);
    }, [authToken])

    useEffect(() => {
        console.log('setLoggedIn useEffect works')
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn])

    const props = {
        isLoggedIn,
        setLoggedIn,
        authToken,
        setAuthTokenCb,
        userData,
        setUserData
    }

    return (
        //We add the Provider property from the created SessionContext object which will provide all children with necessary values/states without
        //passing them directly as props. In this case, we pass our user login states and updaters to the value prop of Provider,
        //so we can access these in children components using useContext
        <SessionContext.Provider value={props}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
