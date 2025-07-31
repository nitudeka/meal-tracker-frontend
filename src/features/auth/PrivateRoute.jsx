import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { checkingAuth, isAuthenticated } = useAuth();

  if (checkingAuth) {
    return (
      <div>Checking Auth...</div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}

export default PrivateRoute;
