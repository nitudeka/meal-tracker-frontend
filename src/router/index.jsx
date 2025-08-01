import { Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/Login";
import PrivateRoute from "../features/auth/PrivateRoute";
import MoodPage from "../features/mood";
import AddMood from "../features/mood/AddMood";
import DietPage from "@/features/diet";
import DietHistory from "@/features/diet/history";
import ProfilePage from "@/features/profile";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" index element={<MoodPage />} />
        <Route path="/mood/add" element={<AddMood />} />
        <Route path="/diet/add" element={<DietPage />} />
        <Route path="/diet" element={<DietHistory />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
