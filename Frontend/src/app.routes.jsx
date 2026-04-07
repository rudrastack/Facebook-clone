import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/Createpost"
import Requests from "./features/follow/pages/Requests"
import ProtectedRoute from "./ProtectedRoute"
import { Navigate } from "react-router-dom"

export const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },

  
    {
       path: "/",
       element: <Navigate to="/feed" />
  
    },

    {
        path: '/feed',
        element: (
            <ProtectedRoute>
                <Feed />
            </ProtectedRoute>
        )
    },
    {
        path: "/create-post",
        element: (
            <ProtectedRoute>
                <CreatePost />
            </ProtectedRoute>
        )
    },
    {
        path: "/requests",
        element: (
            <ProtectedRoute>
                <Requests />
            </ProtectedRoute>
        )
    }

])

