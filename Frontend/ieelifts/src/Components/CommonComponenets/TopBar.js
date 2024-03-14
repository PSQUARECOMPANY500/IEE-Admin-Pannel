import React, { useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import { CiGrid41 } from "react-icons/ci";
import { TbListTree } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import NotificationSection from "../AdminPannel/Component/DashboardSubComponent/NotificationSection";
import { LuSettings2 } from "react-icons/lu";

const TopBar = (props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [clientIsGrid, setClientIsGrid] = useState(true);

  const location = useLocation();

  const handleNotificationBox = () => {
    setShowNotification(!showNotification);
  };

  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };


  const clienttoggleGrid = () => {
    setClientIsGrid(!clientIsGrid);
  };
  return (
    <div className="top-bar" >
      <div
        className="left-side-heading"
        style={{
          marginLeft: props.isOpen ? "0%" : "-9.5rem",

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

            <i className="search-btn ">
              <RiSearchLine className="iconColor" />
            </i>

          </div>
        </span>


        {location.pathname === '/Memberships' && <div className="top-icon" onClick={toggleGrid}>
          {isGrid ? <TbListTree /> : <CiGrid41 />}
        </div>}

        {/* <FilterDropdown /> */}


      { location.pathname === '/Clients' && <>
          <div className="top-icon">    <LuSettings2 /></div>
          <div className="top-icon" onClick={clienttoggleGrid}>
            {clientIsGrid ? <TbListTree /> : <CiGrid41 />}
          </div>

        </> }





        <div style={{ display: "flex" }}>
          <span className="top-icon-bell" onClick={handleNotificationBox}>
            <HiOutlineBell />{" "}
          </span>
          <div className="dot"></div>

          {showNotification && (
            <NotificationSection />
          )}
        </div>

      </div>
    </div>

  );
};

export default TopBar;
