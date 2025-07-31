import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/Login";
import PrivateRoute from "../features/auth/PrivateRoute";
import MoodPage from "../features/mood";
import AddMood from "../features/mood/AddMood";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" index element={<MoodPage />} />
        <Route path="/mood/add" element={<AddMood />} />
      </Route>
    </Routes>
  );
};

export default Router;
