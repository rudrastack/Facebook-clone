import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {

  const token = document.cookie.includes("token") // ✅ cookie check

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;