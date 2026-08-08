import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./views/pages/Dashboard";
import UserManage from "./views/pages/users/UserManage";
import Usercreate from "./views/pages/users/UserCreate";
import Error from "./views/pages/404";
import Login from "./views/pages/Login";
import View from "./views/pages/users/View";
import Edit from "./views/pages/users/Edit";
import BookList from "./views/pages/books/BookList";
import AuthorList from "./views/pages/authors/AuthorList";
import CategoryList from "./views/pages/categories/CategoryList";
import PublisherList from "./views/pages/publishers/PublisherList";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/user",
                element: <UserManage />
            },
            {
                path: "/add-user",
                element: <Usercreate />
            },
            {
                path: "/view-user",
                element: <View />
            },
            {
                path: "/edit-user",
                element: <Edit />
            },
            {
                path: "/books",
                element: <BookList />
            },
            {
                path: "/authors",
                element: <AuthorList />
            },
            {
                path: "/categories",
                element: <CategoryList />
            },
            {
                path: "/publishers",
                element: <PublisherList />
            },
        ],
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <Error />
    },
]);

export default routes