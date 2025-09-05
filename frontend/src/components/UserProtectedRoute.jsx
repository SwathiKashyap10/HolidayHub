import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../configs/axiosConfig";
import Loading from "./Loading";


const UserProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/user/data');

        if (res.data.user) {
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

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
