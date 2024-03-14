import React from "react";

import logo from "../../../Assets/Images/ieelogo.png";
import "../../../Assets/LoginPage.css";

const LoginPage = ({ children }) => {
  return (
    <div className="LoginPageContainer">
      <div className="LoginPageBoxedContainer">
        <div className="loginHeading">
          <img
            src={logo}
            style={{ height: "100px", width: "200px" }}
            alt="logo-login"
          />
          <p>Service Administrator</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LoginPage;
