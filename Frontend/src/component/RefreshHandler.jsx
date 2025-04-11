import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setisAutheticate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    
    if (token) {
      setisAutheticate(true); 

      const publicPaths = ["/homepage","/", "/login", "/signup", "/login/", "/signup/"];

      if (publicPaths.includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
     
      else if (!publicPaths.includes(location.pathname)) {
        setisAutheticate(true);
      }
    } else {
  
      setisAutheticate(false);
    }
  }, [location, navigate, setisAutheticate]);

  return null;
};

export default RefreshHandler;



