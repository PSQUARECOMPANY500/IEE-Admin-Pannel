// dependincies import start here
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logo from "../../../Assets/Images/logo.png";

// dependincies import end here

// react icons import starts
// import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { RiGitPullRequestFill } from "react-icons/ri";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { MdEngineering } from "react-icons/md";
import { MdOutlineSos } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";
import { FiChevronUp } from "react-icons/fi";
// import { FaAngleRight } from "react-icons/fa6";

import { LuChevronsUpDown } from "react-icons/lu";
import TopBar from "../TopBar";

// react icons import ends

const Sidebar = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [toogleOpen, settoogleClose] = useState(true);
  const [menuIcon, setMenueIcon] = useState(true);
  const [menuIcon2, setMenueIcon2] = useState(true);

  const [isButtonOpen, setIsButtonOpen] = useState(false);

  // top bar headin changes
  const [topBarHeading, setTopBarHeading] = useState("Default Heading");

  // handle menue dropdowb
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const [officeMenuOpen, setOfficeMenuOpen] = useState(false);

  // const toogle = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleToggleClick = () => {
    setIsButtonOpen((prevState) => !prevState);
    setIsOpen(!isOpen);
  };

  const toogleMenue = () => {
    console.log("clicked");
    settoogleClose(!toogleOpen);
    setIsOpen(isOpen);
  };

  const toogefinal = () => {
    console.log("image clicked");
    setIsOpen(!isOpen);
    settoogleClose(!toogleOpen);
    setIsButtonOpen((prevState) => !prevState);
  };

  const mainToogle = () => {
    console.log("all div clicked");
    settoogleClose(!toogleOpen);
  };

  const menuUpDown = () => {
    console.log("menue button clicked");
    setMenueIcon(!menuIcon);
    setMainMenuOpen(!mainMenuOpen);
    setOfficeMenuOpen(false);
  };

  const menuUpDown2 = () => {
    console.log("menue button clicked");
    setMenueIcon2(!menuIcon2);

    setOfficeMenuOpen(!officeMenuOpen);
    setMainMenuOpen(false);
  };

  // menu dropdown Items
  const menueItems = [
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
      Path: "/dsad",
      name: "Immediate Visits",
      icon: <MdOutlineModeOfTravel />,
    },
    {
      Path: "/afsd",
      name: "Clients",
      icon: <MdOutlineAirlineSeatReclineNormal />,
    },
    {
      Path: "/Memberships",
      name: "Memberships",
      icon: <MdOutlineCardMembership />,
    },
    {
      Path: "/fgsd",
      name: "Engeeniers",
      icon: <MdEngineering />,
    },
    {
      Path: "/agsd",
      name: "SOS Requests",
      icon: <MdOutlineSos />,
    },
  ];

  useEffect(() => {
    // Update top bar heading when location changes
    const pathname = location.pathname;
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

  return (
    <div className="container">
      {/* top bar */}
      <TopBar isOpen={isOpen} heading={topBarHeading} />

      <div style={{ width: isOpen ? "309px" : "125px" }} className="sidebar">
        <div style={{ position: "fixed" }} className="fixed-content-navbar">
          {!toogleOpen && <div className="overlay" onClick={toogleMenue}></div>}

          <div className="top_section" style={{ gap: isOpen ? "40px" : "5px" }}>
            <h1
              className="logo"
              style={{ marginLeft: isOpen ? "-41px" : "-20px" }}
            >
              <img
                className="logo-image"
                style={{ width: isOpen ? "100px" : "60px" }}
                src={logo}
                alt="logo"
              />
              <p
                style={{
                  marginTop: isOpen ? "14px" : "30px",
                  fontSize: isOpen ? "18px" : "15px",
                  fontWeight: isOpen ? "500" : "400",
                }}
              >
                Service
              </p>
            </h1>

            <div
              style={{ marginLeft: isOpen ? "50px" : "-10px" }}
              className="bars"
            >
              {/* hamburger animationa and functionality */}
              <div
                className={`toggle-button ${isButtonOpen ? "button-open" : ""}`}
                style={{ width: isOpen ? "8px" : "0px" }}
                onClick={handleToggleClick}
              >
                <div className="wrapper">
                  <div className="menu-bar menu-bar-top"></div>
                  {/* <div className="menu-bar menu-bar-middle"></div> */}
                  <div className="menu-bar menu-bar-bottom"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="user-info"
            style={{
              width: isOpen ? "230px" : "75px",
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            <div className="ineer-menue" onClick={mainToogle}>
              <img
                src="https://ieelifts.com/wp-content/uploads/2023/08/03-972x1024.jpg"
                style={{
                  height: "50px",
                  width: "50px",
                  pointerEvents: isOpen ? "none" : "auto",
                }}
                onClick={toogefinal}
                alt="logo1"
              />
              <div
                className="main-profile-item"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <h2>Prabhsimran</h2>
                <p>Id: 23456</p>
                {!toogleOpen && <p>Leaves taken: 6</p>}
              </div>
              <LuChevronsUpDown
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
                <Link to="/" className="sub-menue-link">
                  <p>Todo</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Payroll</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Leaves</p>
                </Link>
                <Link to="/" className="sub-menue-link">
                  <p>Logout</p>
                </Link>
              </div>
            </div>
          </div>

          <nav
            style={{
              width: isOpen ? "230px" : "100px",
              display: isOpen ? "block" : "flex",
              flexDirection: isOpen ? "column" : "column",
              alignItems: isOpen ? "start" : "center",
            }}
          >
            {/* MAIN MENUE items goes here starts */}
            <div className="main-menue" onClick={menuUpDown}>
              <label for="touch" className="main-menu-style">
                <span
                  className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
                >
                  MAIN MENU
                </span>
                <span
                  style={{ fontSize: isOpen ? "16px" : "0px" }}
                  className={`menu-icon ${mainMenuOpen ? "rotate" : ""}`}
                >
                  {menuIcon ? (
                    <FiChevronUp style={{ fontSize: "20px" }} />
                  ) : (
                    <FaAngleDown />
                  )}
                </span>
              </label>
            </div>

            <input type="checkbox" id="touch" />
            <ul
              className="slide"
              style={{ height: mainMenuOpen ? "337px" : "" }}
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
                    key={index}
                    className="link"
                    style={{ justifyContent: isOpen ? "" : "center" }}
                    ClassName={
                      location.pathname === item.Path ? "active-link" : ""
                    }
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

            <div className="main-menue" onClick={menuUpDown2}>
              <div className="seprate-line"></div>
              <label for="touch2" className="main-menu-style">
                <span
                  className={isOpen ? "main-menu-adjust" : "main-menu-adjust-2"}
                >
                  OFFICE
                </span>
                <span
                  style={{ fontSize: isOpen ? "16px" : "0px" }}
                  className={`menu-icon ${officeMenuOpen ? "rotate" : ""}`}
                >
                  {menuIcon2 ? (
                    <FiChevronUp style={{ fontSize: "20px" }} />
                  ) : (
                    <FaAngleDown />
                  )}
                </span>
              </label>
            </div>

            <input type="checkbox" id="touch2" />
            <ul
              className="slide"
              style={{ height: officeMenuOpen ? "190px" : "" }}
            >
              <li>
                {officeItems.map((item, index) => (
                  <NavLink
                    to={item.Path}
                    key={index}
                    className="link"
                    style={{ justifyContent: isOpen ? "" : "center" }}
                    activeClassName="active"
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

            {/* OFFICE MENUE items goes here ends */}
          </nav>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
