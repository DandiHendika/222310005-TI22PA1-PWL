import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user-account"); // atau cek context/auth state
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
