import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import jwtDecoded from '../utils/jwtDecoded';
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

const AdminRoutes = ({ children }) => {
    const { loading, logout } = useContext(AuthContext)
    const { token } = JSON.parse(localStorage.getItem('auth'))
    const decoded = jwtDecoded(token)
    if (loading) {
        return <LoadingComponent />
    }
    if (token && decoded.role == 'admin') {
        return children
    }
    logout()
    return <Navigate to={'/login'} />
};

export default AdminRoutes;