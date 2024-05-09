import "./App.css";
import "../src/Assets/LoginPage.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";
import Membership from "./Components/AdminPannel/Component/MainMenu/Membership";
import Enggeniers from "./Components/AdminPannel/Component/MainMenu/Enggeniers";
import Clients from "./Components/AdminPannel/Component/MainMenu/Clients";
import LoginPage from "./Components/AdminPannel/Pages/LoginPage";
import SendPasswordVerificationCode from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/SendPasswordVerificationCode";
import LoginPageInput from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/LoginPageInput";
import ForgetPasswordOTP from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/ForgetPasswordOTP";
import EnterNewPassword from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/EnterNewPassword";
import NotFoundPage from "./Components/CommonComponenets/NotFoundPage";
import SelectDepartment from "./Components/AdminPannel/Pages/SelectDepartment";

/* const ServiceAdminRoute = ["Dashboard", "forgetpassword", "enterOTP", "setnewpassword", "Requests", "Memberships", "Engeeniers", "Clients"]
const CRMRoutes = ["forgetpassword", "enterOTP", "setnewpassword", "Clients"]
const HRAdminRoutes = []
const InventoryManagementRoutes = []
const DesignModuleRoutes = [] */
function App() {
  const isLoggedIn = useSelector(
    (state) => state?.AdminRootReducer?.loginAdminReducer.isLoggedIn
  );

  const role = localStorage.getItem("Role");

  return (
    <>
      <Routes>
        {/* login routes */}
        <Route
          path="/" element={
            !isLoggedIn ? <LoginPage name='select departments'><SelectDepartment /></LoginPage> :
              (
                <Navigate to={role === "CRM" ? "/Clients" : "/Dashboard"} />
              )
          }
        />
        <Route path="/login" element={!isLoggedIn ? <LoginPage><LoginPageInput/></LoginPage> :   <Navigate to={role === "CRM" ? "/Clients" : "/Dashboard"} /> } />
        <Route
          path="/forgetpassword"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <SendPasswordVerificationCode />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : "/Dashboard"} />
            )
          }
        />
        <Route
          path="/enterOTP"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <ForgetPasswordOTP />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : "/Dashboard"} />
            )
          }
        />
        <Route
          path="/setnewpassword"
          element={
            !isLoggedIn ? (
              <LoginPage>
                <EnterNewPassword />
              </LoginPage>
            ) : (
              <Navigate to={role === "CRM" ? "/Clients" : "/Dashboard"} />
            )
          }
        />



        {/* pages routes */}
        <Route
          path="/Dashboard"
          element={
            (isLoggedIn && role === "ServiceAdmin") ? (
              <Sidebar>
                <Dashboard />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Requests"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Request />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Memberships"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Membership />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Engeeniers"
          element={
            (isLoggedIn && (role === "ServiceAdmin")) ? (
              <Sidebar>
                <Enggeniers />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Clients"
          element={
            (isLoggedIn && (role === "ServiceAdmin" || "CRM")) ? (
              <Sidebar>
                <Clients />
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />




        {/* not found Pages */}
        <Route path="*" element={<NotFoundPage />} />





      </Routes>

    </>
  );
}

export default App;


/* import "./App.css";
import "../src/Assets/LoginPage.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "./Components/CommonComponenets/Sidebar/Sidebar";
import Dashboard from "./Components/AdminPannel/Component/MainMenu/Dashboard";
import Request from "./Components/AdminPannel/Component/MainMenu/Request";
import Membership from "./Components/AdminPannel/Component/MainMenu/Membership";
import Enggeniers from "./Components/AdminPannel/Component/MainMenu/Enggeniers";
import Clients from "./Components/AdminPannel/Component/MainMenu/Clients";
import LoginPage from "./Components/AdminPannel/Pages/LoginPage";
import SendPasswordVerificationCode from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/SendPasswordVerificationCode";
import LoginPageInput from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/LoginPageInput";
import ForgetPasswordOTP from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/ForgetPasswordOTP";
import EnterNewPassword from "./Components/AdminPannel/Pages/ForgetPasswordPagesComponents/EnterNewPassword";
import NotFoundPage from "./Components/CommonComponenets/NotFoundPage";


import SelectDepartment from "./Components/AdminPannel/Pages/SelectDepartment";

function App() {
  const isLoggedIn = useSelector(
    (state) => state?.AdminRootReducer?.loginAdminReducer.isLoggedIn
  );

  return (
    <>
      <Routes>
      
        <Route path="/" element={!isLoggedIn ? <LoginPage name='select departments'><SelectDepartment /></LoginPage> :  <Navigate to="/Dashboard"  /> } />
        <Route path="/login" element={!isLoggedIn ? <LoginPage><LoginPageInput/></LoginPage> :  <Navigate to="/Dashboard"  /> } />
        <Route path="/forgetpassword" element={!isLoggedIn ? <LoginPage><SendPasswordVerificationCode/></LoginPage> :  <Navigate to="/Dashboard"  />}/>
        <Route path="/enterOTP" element={!isLoggedIn ? <LoginPage><ForgetPasswordOTP/></LoginPage> :  <Navigate to="/Dashboard"  />}/>

 
        <Route path="/setnewpassword" element={!isLoggedIn ? <LoginPage><EnterNewPassword/></LoginPage> :  <Navigate to="/Dashboard"  />}/>
        


        <Route path="/Dashboard" element={isLoggedIn ? <Sidebar><Dashboard /></Sidebar> : <Navigate to="/"  />} /> 
        <Route path="/Requests" element={isLoggedIn ? <Sidebar><Request /></Sidebar> : <Navigate to="/"  />} /> 
        <Route path="/Memberships" element={isLoggedIn ? <Sidebar><Membership /></Sidebar> : <Navigate to="/"  />} /> 
        <Route path="/Engeeniers" element={isLoggedIn ? <Sidebar><Enggeniers/></Sidebar> : <Navigate to="/"  />} /> 
        <Route path="/Clients" element={isLoggedIn ? <Sidebar><Clients /></Sidebar> : <Navigate to="/"  />} /> 




       
        <Route path="*" element={<NotFoundPage/>} /> 





      </Routes>     

  </>
);
}

export default App; */
