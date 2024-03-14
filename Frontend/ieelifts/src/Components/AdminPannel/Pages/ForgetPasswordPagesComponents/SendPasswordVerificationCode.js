import React from 'react'
import "../../../../Assets/LoginPage.css";
import { Link } from 'react-router-dom';

const SendPasswordVerificationCode = () => {
  return (
    <>
      <div className='sendOtpHeading'>

        <div className='passwordAssistanceHeading'>
          <p>Password assistance</p>
          <p>Enter the email address or mobile phone number associated with your account.</p>
        </div>

        <div className='loginInpuitField'><input type="text" placeholder="Email or Phone no"></input></div>
      
       <div className="loginButton"><Link to="/enterOTP">Continue</Link></div>

        <div className='SignInLink'>
          <Link to="/"><p>Back to Sign in</p></Link>
        </div>

      </div>
    
    </>
  )
}

export default SendPasswordVerificationCode