import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
});

export default function AuthContextProvider({ children })
{
    const [authToken, setAuthToken] = useState();

    // useEffect(() => {
    //     async function fetchToken(){
    //         const storedToken = await AsyncStorage.getItem('token');

    //         if(storedToken){
    //             setAuthToken(storedToken);
    //         }
    //     }

    //     fetchToken();
    // }, []); //this is to store the auth token in the device. but implemented in app.js to avoid flickering.

    function authenticate(token)
    {
        setAuthToken(token);
        AsyncStorage.setItem('token', token); //used to store the auth token in the native device
    }

    function logout()
    {
        setAuthToken(null);
        AsyncStorage.removeItem('token'); //removing the token after logged out
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}