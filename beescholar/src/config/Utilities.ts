import { useEffect } from "react";
import { IAuthProviderProps, useAuth } from "./Context";
import { redirect, useNavigate } from "react-router-dom";

export const randomAlphaNumeric = (length: number) => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
};

function RouteProtection({children}: IAuthProviderProps){
  const { isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(function(){
    if(!isAuthenticated) navigate("/")
  }, [isAuthenticated, navigate])

  return children;
}

export default RouteProtection