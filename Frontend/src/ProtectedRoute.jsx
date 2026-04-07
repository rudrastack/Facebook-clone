// import { Navigate } from "react-router-dom";
// import { useAuth } from "./features/auth/hooks/useAuth";


// const ProtectedRoute = ({ children }) => {

//   const token = document.cookie.includes("token") // cookie check

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };




// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) return <h1>Loading...</h1>

//   if (!user) return <Navigate to="/login" replace />

//   return children
// }

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;