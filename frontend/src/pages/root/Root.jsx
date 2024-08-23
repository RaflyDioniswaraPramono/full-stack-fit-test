import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  const [isSignin, setIsSignin] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token === undefined || token === null) {
      navigate("/signin");
      setIsSignin(false);
    } else if (token) {
      navigate("/dashboard");
      setIsSignin(true);
    }
  }, [navigate]);

  return <React.Fragment>{isSignin && <Outlet />}</React.Fragment>;
};

Root.propTypes = {
  isSignin: PropTypes.bool,
};

export default Root;
