import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { RiSearchLine } from "react-icons/ri";
import { CiGrid41 } from "react-icons/ci";
import { TbListTree } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import NotificationSection from "../AdminPannel/Component/DashboardSubComponent/NotificationSection";
import AddEnggModal from "../AdminPannel/Component/EngeeniersSubComponent/AddEnggModal";

import { openAddEngggModalAction } from "../../ReduxSetup/Actions/AdminActions";
import { LuSettings2 } from "react-icons/lu";
import ClientFilterDropdown from "../AdminPannel/Component/ClientsSubComponent/ClientFilterDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLayout,
  getfilteredData,
  searchClients,
} from "../../ReduxSetup/Actions/AdminActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

const TopBar = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const notificationRef = useRef(null);
  const notificationClickRef = useRef();
  const [showNotification, setShowNotification] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [clientIsGrid, setClientIsGrid] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showTicketFilter, setShowTicketFilter] = useState(false);
  const dropdownRef = useRef(null);
  const [openEnggModal, setOpenEnggModal] = useState(false);


  useLayoutEffect(() => {
    if (searchValue !== "") {
      dispatch(searchClients(searchValue));
    }
  }, [searchValue]);

  const filteredData = useSelector(
    (state) => state?.AdminRootReducer?.getFilterDataReducer?.clients?.data
  );

  useEffect(() => {
    if (filteredData) {
      setSearchValue("");
    }
  }, [filteredData]);

  const toggleGrid = () => {
    setIsGrid(!isGrid);
    dispatch(changeLayout("membership", isGrid));
  };

  const membershipLayout = useSelector(
    (state) =>
      state?.AdminRootReducer?.membershipButtonLayoutReducer?.button?.button
  );

  useEffect(() => {
    if (membershipLayout === true) {
      setIsGrid(!isGrid);
    }
    return () => {
      setIsGrid(false);
    };
  }, [membershipLayout]);

  const clienttoggleGrid = () => {
    setClientIsGrid(!clientIsGrid);
    dispatch(changeLayout("client", clientIsGrid));
  };

  const handleTicketFilter = () => {
    if (filteredData !== null && showTicketFilter == false) {
      dispatch(getfilteredData(null));
      setSearchValue("");
    }
    setShowTicketFilter((prevFilter) => !prevFilter);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOutsideClick = useCallback(() => {
    setShowTicketFilter(false);
  }, []);

  const dropdownClickRef = useRef();
  useClickOutside(dropdownClickRef, handleOutsideClick);
  const openModalHandle = () => {
    dispatch(openAddEngggModalAction());
  };


  // -------notification popup box code--------------------------------------------------------------------
  const useClickOutsidenotification = (ref, handler) => {
    useEffect(() => {
      const handleClickOutsidenotification = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown",handleClickOutsidenotification );
      return () => {
        document.removeEventListener("mousedown", handleClickOutsidenotification);
      };
    }, [ref, handler]);
  };
  const handleNotfication= () => {
    setShowNotification(prevState => !prevState);
  };
  const handleOutsideClicknotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  useClickOutsidenotification(notificationClickRef, handleOutsideClicknotification);


  return (
    <div className="top-bar">
      <div
        className="left-side-heading"
        style={{
          marginLeft: props.isOpen ? "0%" : "-9.5rem",
        }}
      >
        <p>{props.heading}</p>
      </div>

      <div className="right-side-icons">
        <div>
          <button
            style={{ height: "70px", opacity: "0" }}
            onClick={() => {
              // toast("Wow so easy!")
              toast.error("Callback requested by Mr. Michael", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
                style: { fontSize: "0.8rem" },
              });
            }}
          >
            Click Here
          </button>
        </div>
        {location.pathname === "/Clients" ? (
          <span className="top-icon">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search clients"
                className={`search-input ${
                  searchValue.length > 0 && "inputSearchWritten"
                }`}
                value={searchValue}
                onChange={handleSearchChange}
              />

              <i className="search-btn">
                <RiSearchLine className="iconColor" />
              </i>
            </div>
          </span>
        ) : (
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
        )}

        {location.pathname === "/Memberships" && (
          <div className="top-icon" onClick={toggleGrid}>
            {isGrid ? <CiGrid41 /> : <TbListTree />}
          </div>
        )}

        {location.pathname === "/Clients" && (
          <>
            <div className="top-icon" style={{boxShadow:'none'}}>
              {" "}
              <div ref={dropdownClickRef}>
                <p className="filter-icon" onClick={handleTicketFilter}>
                  <LuSettings2 />
                  {""}
                </p>
                {showTicketFilter && (
                  <div
                    ref={dropdownRef}
                    style={{ position: "absolute", backgroundColor: "white" }}
                  >
                    <ClientFilterDropdown />
                  </div>
                )}
              </div>
            </div>
            <div className="top-icon" onClick={clienttoggleGrid}>
              {!clientIsGrid ? <TbListTree /> : <CiGrid41 />}
            </div>
          </>
        )}

        <div style={{ display: "flex" }} ref={notificationClickRef}>
          <span className="top-icon-bell" onClick={handleNotfication} ref={notificationRef}>
            <HiOutlineBell />{" "}
          </span>

          <div className="dot"></div>

          {location.pathname === "/Engeeniers" && (
            <div className="add-Engg-button" onClick={openModalHandle}>
              Add Engeenier
            </div>
          )}

          {showNotification && <NotificationSection />}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
