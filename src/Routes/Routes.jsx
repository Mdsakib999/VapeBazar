import { createBrowserRouter } from "react-router-dom";
import MainLayoutes from "../components/layout/MainLayoutes";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";


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
            }
        ]
    }
])

export default router