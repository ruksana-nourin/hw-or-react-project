import { createBrowserRouter } from "react-router";

import ManageUser from "./pages/user/ManageUser";
// import Contact from "./pages/Contact";
import Home from "./pages/Home";
import About from "./pages/About";
import App from "./App";
import CreateUser from "./pages/user/CreateUser";
import ShowUser from "./pages/user/ShowUser";
import EditUser from "./pages/user/EditUser";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { needAuth, notAuth } from "./utils/Auth";
import AccessDenied from "./pages/error/AccessDenied";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            // {
            //     path: "/contact",
            //     element: <Contact />,
            // },
            
            {
                path: "/users",
                element: <ManageUser />,
            },
            {
                path: "/users/create",
                element: <CreateUser />,
            },
            {
                path: "/users/:id",
                element: <ShowUser />,
            },
            {
                path: "/users/:id/edit",
                element: <EditUser />,
            },

        ],
        loader: needAuth,
    },
    {
        path: "/login",
        element: <Login />,
        loader: notAuth,
    },
    {
        path: "/register",
        element: <Register />,
        loader: notAuth,
    },
    {
        path: "/access-denied",
        element: <AccessDenied/>,
    },
    {
        path: "*",
        element: <h1>404.</h1>,
    },
    
]);