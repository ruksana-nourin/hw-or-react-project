import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Home } from './Home.tsx';
import Login from './login.tsx';
import User from './User.tsx'

const links = createBrowserRouter([
  // {path: "/", element: <App/>},
  // {path: "/user", element: <User/>},
  // {path: "/test", element: <h1><b>Test </b><i>Page</i></h1>},

  {path: "/", element:<App/>,
    children: [ 
      {path: "/", element: <Home/>},
      {path: "/user", element: <User/>},
      {path: "/test", element: <h1><b>Test </b><i>Page</i></h1>},
      
    ]
  },
  {path: "/Login", element: <Login/>},
  {path: "*", element: <h1 className='text-danger text-center'><i>404 Page not found.</i></h1>},
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={links}/>
  </StrictMode>,
)
