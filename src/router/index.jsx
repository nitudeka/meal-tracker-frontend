import { Route, Routes } from "react-router"
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/Login";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
	<Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default Router;
