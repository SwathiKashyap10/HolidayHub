import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../configs/axiosConfig";
import Loading from "./Loading";


const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/owner/data');

        if (res.data.owner) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <Loading/>;

  return isAuth ? children : <Navigate to="/admin-login" replace />;
};

export default AdminProtectedRoute;
