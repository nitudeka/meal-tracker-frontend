import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/Login";
import PrivateRoute from "../features/auth/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" index element={<h1>home</h1>} />
      </Route>
    </Routes>
  );
};

export default Router;
