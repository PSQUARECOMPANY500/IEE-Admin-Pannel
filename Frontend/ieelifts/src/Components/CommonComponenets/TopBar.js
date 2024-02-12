import React, { useState} from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import NotificationSection from "../AdminPannel/Component/DashboardSubComponent/NotificationSection";

const TopBar = (props) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationBox = () => {
    setShowNotification(!showNotification);
  };



  return (
    <div className="top-bar">
      <div
        className="left-side-heading"
        style={{
          marginLeft: props.isOpen ? "15%" : "9%",
          transition: "margin-left 0.3s ease",
        }}
      >
        <p>{props.heading}</p>
      </div>

      <div className="right-side-icons">
        <span className="top-icon">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search anything"
              className="search-input"
            />
            <a href="/" className="search-btn">
              <i>
                <RiSearchLine />
              </i>
            </a>
          </div>
        </span>
        <div style={{ display: "flex" }}>
          <span className="top-icon-bell" onClick={handleNotificationBox}>
            <HiOutlineBell />{" "}
          </span>
          <div className="dot"></div>
  
          {showNotification && (
            <NotificationSection/>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
