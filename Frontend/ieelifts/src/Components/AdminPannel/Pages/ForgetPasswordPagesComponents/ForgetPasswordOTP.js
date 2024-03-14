import React from 'react'
import { Link } from 'react-router-dom'

const ForgetPasswordOTP = () => {
  return (
    <>
    <div className='sendOtpHeading'>

        <div className='passwordAssistanceHeading'>
          <p>Verification required</p>
          <p>To continue, complete this verification step. We've sent an OTP to the email. <span style={{fontWeight:"600"}}>xyz@gmail.com</span>. Please enter it below to complete verification.</p>
        </div>

        <div className='loginInpuitField'><input type="text" placeholder="Enter OTP"></input></div>
      
        <div className="loginButton"><Link to="/setnewpassword">Continue</Link></div>

        <div className='SignInLink'>
          <Link to="/"><p>Back to Sign in</p></Link>
        </div>

      </div>

    </>
  )
}

export default ForgetPasswordOTP