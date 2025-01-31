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
import Checkout from "../Pages/Checkout/Checkout";
import AddCoupon from "../Pages/Dashbord/AdminDashbord/AddCoupon";
import ManageCoupon from "../Pages/Dashbord/AdminDashbord/ManageCoupon";
import ConfirmCheckout from "../Pages/ConfirmCheckout/ConfirmCheckout";
import ManageOrders from "../Pages/Dashbord/AdminDashbord/ManageOrders";
import ManageUsers from "../Pages/Dashbord/AdminDashbord/ManageUsers";
import Settings from "../Pages/Dashbord/UserDashbord/Settings";
import Orders from "../Pages/Dashbord/UserDashbord/Orders";
import CategoryProducts from "../Pages/Product/CategoryProducts";
import Categories from "../Pages/Categories/Categories";
import AdminRoutes from "./AdminRoutes";
import Contact from "../Pages/Contact/Contact";
import CreateBlog from "../Pages/Dashbord/AdminDashbord/CreateBlog";
import ManageBlog from "../Pages/Dashbord/AdminDashbord/ManageBlog";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";


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
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blogDetails/:link',
                element: <BlogDetails />
            },
            {
                path: '/product',
                element: <Product />
            },
            {
                path: '/products/:category',
                element: <CategoryProducts />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/product/:id',
                element: <ProductDetails />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/confirm-checkout',
                element: <ConfirmCheckout />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoutes> <DashbordLayout /></PrivetRoutes>,
        children: [
            // user routes
            {
                path: 'user/settings',
                element: <Settings />
            },
            {
                path: 'user/orders',
                element: <Orders />
            },
            // admin routes
            {
                path: 'admin/add_product',
                element: <AdminRoutes><AddProducts /></AdminRoutes>,
                index: true,

            },
            {
                path: 'admin/manage_product',
                element: <AdminRoutes><MenageProduct /></AdminRoutes>
            },
            {
                path: 'admin/edit_product/:id',
                element: <AdminRoutes><EditProduct /></AdminRoutes>
            },
            {
                path: 'admin/add_categories',
                element: <AdminRoutes><AddCategories /></AdminRoutes>
            },
            {
                path: 'admin/manage_categories',
                element: <AdminRoutes><ManageCategories /></AdminRoutes>
            },
            {
                path: 'admin/add_coupon',
                element: <AdminRoutes><AddCoupon /></AdminRoutes>
            },
            {
                path: 'admin/manage_coupon',
                element: <AdminRoutes><ManageCoupon /></AdminRoutes>
            },
            {
                path: 'admin/manage_orders',
                element: <AdminRoutes><ManageOrders /></AdminRoutes>
            },
            {
                path: 'admin/manage_users',
                element: <AdminRoutes> <ManageUsers /></AdminRoutes>
            },
            {
                path: 'admin/add_blog',
                element: <AdminRoutes> <CreateBlog /></AdminRoutes>
            },
            {
                path: 'admin/manage_blog',
                element: <AdminRoutes> <ManageBlog /></AdminRoutes>
            },

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


{/* <GlassMagnifier
                                imageSrc={mainImage}
                                imageAlt={name}
                            // magnifierSize="200px"
                            // magnifierBorderSize={2}
                            // magnifierBorderColor="rgba(255, 255, 255, 0.8)"
                            // square
                            />
                            <Magnifier
                                imageSrc={mainImage}
                                imageAlt="Example"
                            // largeImageSrc="./large-image.jpg" // Optional
                            // mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                            // touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
                            /> */}