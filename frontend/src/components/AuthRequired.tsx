import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../store";


const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state } = useContext(AppContext);
  const location = useLocation();

  // useEffect(() => {
    
  // }, []);

  // if (state.users.isAuthenticated) {
  //   return children;
  // }
  // return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export { AuthRequired };