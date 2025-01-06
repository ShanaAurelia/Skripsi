import { useEffect } from "react";
import { IAuthProviderProps, useAuth } from "./Context";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

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
    if(!isAuthenticated) navigate("/beescholar")
  }, [isAuthenticated, navigate])

  return children;
}

function NavigateTo(to: string){
  const nav = useNavigate();
  return nav(to)
} 

export function GetUserData(){
    return JSON.parse(window.localStorage.getItem('user-beescholar') || "");
}



// export function UpdateUserData(){
//   const auth = useAuth();
//   auth.updateUserData();
// }

export default RouteProtection;