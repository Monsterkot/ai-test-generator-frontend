import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedsRoute";
import Admin from "./pages/Admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} /> */
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Admin />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
