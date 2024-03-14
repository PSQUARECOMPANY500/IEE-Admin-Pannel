import React, { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

const EnterNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordShow2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="sendOtpHeading">
      <div className="passwordAssistanceHeading">
        <p>Create new password</p>
        <p>We'll ask for this password whenever you sign in..</p>
      </div>

      <div className="ReEnterPasswordInpuitField">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
        ></input>
        {showPassword ? (
          <FiEye
            className="passwordEyeIcon"
            onClick={handlePasswordShow}
            style={{ color: "#f8ac1d" }}
          />
        ) : (
          <FiEyeOff className="passwordEyeIcon" onClick={handlePasswordShow} />
        )}
      </div>
      <p className="insideP">Passwords must be at least 6 characters.</p>

      <div className="ReEnterPasswordInpuitField">
        <input
          type={showPassword2 ? "text" : "password"}
          placeholder="New password"
        ></input>
        {showPassword2 ? (
          <FiEye
            className="passwordEyeIcon"
            onClick={handlePasswordShow2}
            style={{ color: "#f8ac1d" }}
          />
        ) : (
          <FiEyeOff className="passwordEyeIcon" onClick={handlePasswordShow2} />
        )}
      </div>

      <div className="loginButton">
        <button style={{ width: "30%", fontSize:"1.1rem", fontWeight:"400"}}>Save Changes And Log in</button>
      </div>
    </div>
  );
};

export default EnterNewPassword;
