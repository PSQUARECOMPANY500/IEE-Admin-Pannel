import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import { FaAngleDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RiGitPullRequestFill } from "react-icons/ri";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { MdEngineering } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { useMediaQuery } from '@react-hook/media-query';
import { MdOutlineSos } from "react-icons/md";
import { LuChevronsUpDown } from "react-icons/lu";
import TopBar from "../TopBar";
import Todo from "../../AdminPannel/Component/SubMenu/Todo/Todo";
import config from "../../../config";

const { jwtDecode } = require("jwt-decode");


const Sidebar = ({ children }) => {



  const token = localStorage.getItem("adminData");
  const decoded = token && jwtDecode(token);

  // const smallLaptopSizes = useMediaQuery('(min-width: 769px) and (max-width: 1280px)');
  const location = useLocation();
  const pathname = location.pathname;
  // const initialIsOpen = smallLaptopSizes ? false : true
  const [isOpen, setIsOpen] = useState(true);
  const [toogleOpen, settoogleClose] = useState(true);
  const [visible, setVisible] = useState(true);
  const [menuIcon, setMenueIcon] = useState(true);
  const [menuIcon2, setMenueIcon2] = useState(true);

  useEffect(() => {
    if (toogleOpen) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setVisible(true);
    }
  }, [toogleOpen]);


  // top bar headin changes
  const [topBarHeading, setTopBarHeading] = useState("Default Heading");

  // handle menue dropdowb
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const [officeMenuOpen, setOfficeMenuOpen] = useState(false);

  const handleToggleClick = () => {
    // setIsButtonOpen((prevState) => !prevState);
    setIsOpen(!isOpen);
  };

  const toogleMenue = () => {
    settoogleClose(!toogleOpen);
    setIsOpen(isOpen);
  };

  const toogefinal = () => {
    setIsOpen(!isOpen);
    settoogleClose(!toogleOpen);
    // setIsButtonOpen((prevState) => !prevState);
  };

  const mainToogle = () => {
    settoogleClose(!toogleOpen);
  };

  const menuUpDown = () => {
    setMenueIcon(!menuIcon);
    setMainMenuOpen(!mainMenuOpen);
    setOfficeMenuOpen(false);
  };

  const menuUpDown2 = () => {
    setMenueIcon2(!menuIcon2);

    setOfficeMenuOpen(!officeMenuOpen);
    setMainMenuOpen(false);
  };

  // menu dropdown Items
  let menueItems;
  const role = localStorage.getItem("Role");
  if (role === "CRM") {
    menueItems = [
      {
        Path: "/Clients",
        name: "Clients",
        icon: <MdOutlineAirlineSeatReclineNormal />,
      },

    ];
  } else if (role === "ServiceAdmin") {
    menueItems = [
      {
        Path: "/Dashboard",
        name: "Dashboard",
        icon: <MdDashboard />,
      },
      {
        Path: "/Requests",
        name: "Requests",
        icon: <RiGitPullRequestFill />,
      },
      {
        Path: "/Clients",
        name: "Clients",
        icon: <MdOutlineAirlineSeatReclineNormal />,
      },
      {
        Path: "/Memberships",
        name: "Memberships",
        icon: <MdOutlineCardMembership />,
      },
      {
        Path: "/Engeeniers",
        name: "Engineers",
        icon: <MdEngineering />,
      },
      {
        Path: "/SOS",
        name: "sos",
        icon: <MdOutlineSos />,
        // icon: <img src="phone.png" alt="SosIcon" className="sosIcon"/>,
      },

    ];
  } else if (role === "ErectionAdmin") {
    menueItems = [
      {
        Path: "/ErectionDashboard",
        name: "Dashboard",
        icon: < MdDashboard />,
      },
      {
        Path: "/ErectionEngeeniers",
        name: "Engineers",
        icon: <MdEngineering />,
      },
    ];
  }

  useEffect(() => {
    // Update top bar heading when location changes
    switch (pathname) {
      case "/Dashboard":
        setTopBarHeading("Dashboard");
        break;
      case "/Requests":
        setTopBarHeading("Service Requests");
        break;
      case "/Memberships":
        setTopBarHeading("Memberships");
        break;
      case "/Engeeniers":
        setTopBarHeading("Engineers");
        break;
      case "/Clients":
        setTopBarHeading("Clients");
        break;
      case "/SOS":
        setTopBarHeading("SOS");
        break;
      case "/ErectionDashboard":
        setTopBarHeading("Dashboard");
        break;
      case "/ErectionEngeeniers":
        setTopBarHeading("Engineers");
        break;
      case "/todo":
        setTopBarHeading("Todo");
        break;
        break;
      // Add more cases for other pages
      default:
        setTopBarHeading("Default Heading");
    }
  }, [location.pathname]);

  // office dropdown items
  const officeItems = [
    {
      Path: "/a",
      name: "Tasks",
      icon: <FaTasks />,
    },
    {
      Path: "/b",
      name: "Messeges",
      icon: <BiMessageDetail />,
    },
    {
      Path: "/c",
      name: "Help & Support",
      icon: <AiOutlineExclamationCircle />,
    },
    {
      Path: "/d",
      name: "Settings",
      icon: <TbSettings2 />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    Navigate("/");
  };

  const handleToggleClose = () => {
    settoogleClose(!toogleOpen);
  }
  return (
    <div className="container">
      <TopBar isOpen={isOpen} heading={topBarHeading} />

      <div
        className={isOpen ? "sidebar sidebarOpenWidth" : "sidebar sidebarCloseWidth"}
      >
        <div style={{ position: "fixed" }} className="fixed-content-navbar">
          {!toogleOpen && <div className="overlay" onClick={toogleMenue}></div>}

          <div className="top_section" >
            <h1
              // className="logo"
              // style={{ marginLeft: isOpen ? "-41px" : "-20px" }}
              className={isOpen ? 'logo logo-open' : 'logo logo-close'}
            >
              <img
                // className="logo-image"
                className={`logo-image ${isOpen ? 'logo-image-open' : 'logo-image-close'}`}

                src={logo}
                alt="logo"
              />
              <p


                className={isOpen ? 'logo-heading logo-open-heading' : 'logo-heading logo-close-heading'}
              >
                Service
              </p>
            </h1>

            <div
              // style={{ marginLeft: isOpen ? "3.1rem" : "-0.6rem" }}
              // className="bars"
              className={isOpen ? 'bars bars-open' : 'bars bars-close'}

            >
              {/* hamburger animationa and functionality */}
              <div
                // className={`toggle-button ${isButtonOpen ? "button-open" : ""}`}
                style={{
                  height: isOpen ? ".8rem" : ".6rem",
                  top: isOpen ? "40px" : "35px",
                }}
                className="toggle-button-menu"
                onClick={handleToggleClick}
              >
                <div className="wrapper">
                  <div
                    className="menu-bar menu-bar-top"
                    style={{ transform: isOpen ? "none" : "rotate(40deg)" }}
                  ></div>

                  <div
                    className="menu-bar menu-bar-bottom"
                    style={{ transform: isOpen ? "none" : "rotate(-40deg)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            // className="user-info"
            // style={{
            //   width: isOpen ? "230px" : "75px",
            //   pointerEvents: isOpen ? "auto" : "none",
            // }}

            className={isOpen ? 'user-info user-info-open' : 'user-info user-info-close'}
          >
            <div className="ineer-menue" onClick={mainToogle}>
              <img
                src={decoded.user.ProfilePhoto ? `${config.documentUrl}/EnggAttachments/${decoded.user.ProfilePhoto}` : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"}
                style={{

                  pointerEvents: isOpen ? "none" : "auto",
                }}
                onClick={toogefinal}
                alt="logo1"
              />
              <div
                className={`main-profile-item ${isOpen && "user-profile"}`}
                style={{ display: isOpen ? "block" : "none" }}
              >
                <h2>{decoded.user.AdminName}</h2>
                <p>{decoded.user.AdminId}</p>
                {<p className={`user-leaves ${visible ? "user-leaves-show" : "user-leave-hide"
                  }`}>Leaves taken: 6</p>}
              </div>
              <LuChevronsUpDown
                className={`${isOpen && "user-profile"}`}
                style={{
                  display: isOpen ? "block" : "none",
                  marginTop: "16px",
                }}
              />
            </div>

            <div
              className={
                toogleOpen ? "sub-menu-wrap" : "sub-menu-wrap open-menu"
              }
              style={{ animationName: isOpen ? "sliders" : "" }}
            >
              <div className="sub-menu">
                <hr></hr>
                <Link to="/" className="sub-menue-link" onClick={handleToggleClose}>
                  <p>Todo</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Payroll</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Leaves</p>
                </Link>
                <Link className="sub-menue-link" onClick={handleLogout}>
                  <p>Logout</p>
                </Link>
              </div>
            </div>
          </div>

          <nav
            // style={{
            //   width: isOpen ? "230px" : "100px",
            //   display: isOpen ? "block" : "flex",
            //   flexDirection: isOpen ? "column" : "column",
            //   alignItems: isOpen ? "start" : "center",
            // }}

            className={isOpen ? 'nav-open' : 'nav-close'}
          >
            {/* MAIN MENUE items goes here starts */}
            <div className="main-menue" onClick={menuUpDown}>
              <label htmlFor="touch" className="main-menu-style">
                <span
                  className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
                >
                  MAIN MENU
                </span>
                <span
                  style={{ fontSize: isOpen ? "16px" : "20px" }}
                  className={`menu-icon ${mainMenuOpen ? "rotate" : ""}`}
                >
                  <FiChevronDown style={{ fontSize: "20px" }} />
                </span>
              </label>
            </div>

            <input type="checkbox" id="touch" autoComplete="off" />
            <ul
              className="slide"
              style={{ height: mainMenuOpen ? "26rem" : "" }}
            >
              <li
                style={{
                  paddingLeft: isOpen ? "" : "20px",
                  paddingRight: isOpen ? "" : "20px",
                }}
              >
                {menueItems.map((item, index) => (
                  <NavLink
                    to={item.Path}
                    id={item.name}
                    key={index}
                    className="link"
                    style={{ justifyContent: isOpen ? "" : "center" }}
                  // ClassName={
                  //   location.pathname === item.Path ? "active-link" : ""
                  // }
                  // not know the reason of commenting todo - uncomment if there is some problem exist
                  >
                    <div className="icon">{item.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </li>
            </ul>

            {/* MAIN MENUE items goes here ends */}

            {/* OFFICE MENUE items goes here start */}

            {
              // pathname === "/ErectionEngeeniers" || pathname === "/ErectionDashboard" ? (<></>) :
              //   (<> <div className="main-menue" onClick={menuUpDown2}>
              //     <div className="seprate-line"></div>
              //     <label htmlFor="touch2" className="main-menu-style">
              //       <span
              //         className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
              //       >
              //         OFFICE
              //       </span>
              //       {/* <span
              //     style={{ fontSize: isOpen ? "16px" : "0px" }}
              //     className={`menu-icon ${officeMenuOpen ? "rotate" : ""}`}
              //   >
              //     {menuIcon2 ? (
              //       <FiChevronUp style={{ fontSize: "20px" }} />
              //     ) : (
              //       <FaAngleDown />
              //     )}
              //   </span> */}

              //       <span
              //         style={{ fontSize: isOpen ? "16px" : "0px" }}
              //         className={`menu-icon ${officeMenuOpen ? "rotate" : ""}`}
              //       >
              //         <FiChevronUp style={{ fontSize: "20px" }} />
              //       </span>
              //     </label>
              //   </div>

              //     {/* <input type="checkbox" id="touch2" /> */}

              //     <ul
              //       className="slide"
              //       style={{ height: officeMenuOpen ? "190px" : "" }}
              //     >
              //       <li>
              //         {officeItems.map((item, index) => (
              //           <NavLink
              //             to={item.Path}
              //             key={index}
              //             className="link"
              //             style={{ justifyContent: isOpen ? "" : "center" }}
              //             activeclassname="active"
              //           >
              //             <div className="icon">{item.icon}</div>
              //             <div
              //               style={{ display: isOpen ? "block" : "none" }}
              //               className="link_text"
              //             >
              //               {item.name}
              //             </div>
              //           </NavLink>
              //         ))}
              //       </li>
              //     </ul>
              //   </>
              //   )
            }

            {/* OFFICE MENUE items goes here ends */}
          </nav>
        </div>
        {
          pathname === "/ErectionEngeeniers" || pathname === "/ErectionDashboard" ? (<></>) : (<> <div className="circle">SOS</div></>)
        }

      </div >

      <main>{children}</main>
    </div >
  );
};

export default Sidebar;
