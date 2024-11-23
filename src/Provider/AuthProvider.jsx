import React, { createContext, useState, useContext, useEffect } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";
import jwtDecoded from "../utils/jwtDecoded";

// Create the AuthContext
export const AuthContext = createContext(null);
const auth = getAuth(app);

// Create a custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    console.log(token);
    useState(() => {
        const auth = localStorage.getItem('auth')
        if (auth) {
            const { token } = JSON.parse(auth)
            setToken(token)
        }

    }, [localStorage.getItem('auth')])

    // useState(() => {
    //     const unsubscribe = () => {
    //         const auth = localStorage.getItem('auth')
    //         const { token } = JSON.parse(auth)
    //         setToken(token)
    //     }
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [])



    // Define login and logout functions for better reusability

    const register = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false)
            if (currentUser) {
                setUser(currentUser)
                const res2 = await axios.post(`${import.meta.env.VITE_SERVER_URL}/jwt`, { email: currentUser.email })
                // const { token, email, role } = jwtDecoded(res2.data.token)
                const data = jwtDecoded(res2.data.token)
                localStorage.setItem("auth", JSON.stringify(data))
                setToken(data.token)

            }
        })

        return () => {
            return unsubscribe()
        }

    }, [])

    // Extendable auth information
    const authInfo = {
        user,
        login,
        logout,
        loading,
        setLoading,
        googleLogin,
        register,
        token,
        setToken,
        isOpen,
        setIsOpen
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
