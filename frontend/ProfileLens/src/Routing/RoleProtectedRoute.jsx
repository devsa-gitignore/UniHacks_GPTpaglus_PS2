import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setAuthorized(false);
          return;
        }

        const data = await res.json();

        if (allowedRoles.includes(data.user.accountType)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [allowedRoles]);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
