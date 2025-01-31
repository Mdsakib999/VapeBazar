import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import LoadingComponent from "../components/LoadingComponent";

const PrivetRoutes = ({ children }) => {
    const { loading, user } = useContext(AuthContext)
    const { token } = JSON.parse(localStorage.getItem('auth')) || ''
    if (loading) {
        return <LoadingComponent />
    }
    if (token || user) {
        return children
    }
    return <Navigate to="/login" />;
};

export default PrivetRoutes;
