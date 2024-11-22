import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivetRoutes = ({ children }) => {
    const { token } = useContext(AuthContext)
    if (token) {
        return children
    }
    return <Navigate to="/login" />;
};

export default PrivetRoutes;
