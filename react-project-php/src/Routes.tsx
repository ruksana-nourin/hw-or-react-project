import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./views/pages/Dashboard";
import UserManage from "./views/pages/users/UserManage";
import UserCreate from "./views/pages/users/UserCreate";

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
        element: <UserManage />,
      },
      {
        path: "/add-user",
        element: <UserCreate />,
      },
    ]
  },
]);
export default routes