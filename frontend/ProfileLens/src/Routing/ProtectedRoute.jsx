import { Navigate, Outlet } from "react-router-dom";
import { useMemo } from "react";

const ProtectedRoute = () => {
  const isAuth = useMemo(() => {
    const token = localStorage.getItem("accessToken");
    return Boolean(token);
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
