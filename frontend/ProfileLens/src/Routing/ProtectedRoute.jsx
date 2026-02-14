import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  if (loading) return;

  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
