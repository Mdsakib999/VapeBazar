import { createBrowserRouter } from "react-router-dom";
import MainLayoutes from "../components/layout/MainLayoutes";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import DashbordLayout from "../components/layout/DashbordLayout";
import AddProducts from "../Pages/Dashbord/AdminDashbord/AddProducts";
import MenageProduct from "../Pages/Dashbord/AdminDashbord/MenageProduct";
import AddCategories from "../Pages/Dashbord/AdminDashbord/AddCategories";
import ManageCategories from "../Pages/Dashbord/AdminDashbord/MenageCategories";
import EditCategories from "../Pages/Dashbord/AdminDashbord/EditCategories";
import Product from "../Pages/Product/Product";
import ProductDetails from "../Pages/Product/ProductDetails";
import EditProduct from "../Pages/Dashbord/AdminDashbord/EditProduct";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import PrivetRoutes from "./PrivetRoutes";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayoutes />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/product',
                element: <Product />
            },
            {
                path: '/product/:id',
                element: <ProductDetails />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoutes> <DashbordLayout /></PrivetRoutes>,
        children: [
            {
                path: 'admin/add_product',
                element: <AddProducts />
            },
            {
                path: 'admin/manage_product',
                element: <MenageProduct />
            },
            {
                path: 'admin/edit_product/:id',
                element: <EditProduct />
            },
            {
                path: 'admin/add_categories',
                element: <AddCategories />
            },
            {
                path: 'admin/manage_categories',
                element: <ManageCategories />
            }

        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegistrationPage />
    }
])

export default router