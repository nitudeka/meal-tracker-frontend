import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import MobileLayout from "../../layouts/MobileLayout";

const PrivateRoute = () => {
  const { checkingAuth, isAuthenticated } = useAuth();

  if (checkingAuth) {
    return (
      <div>Checking Auth...</div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <MobileLayout>
      <Outlet />
    </MobileLayout>
  )
}

export default PrivateRoute;
