import { Navigate } from "react-router-dom";
import { JSX } from "react";
import { useAuth } from "../hooks/useAuth";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-12 h-12 border-4 border-[#1DB954] border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
