import React, { useState, useEffect, useRef, useCallback } from "react";

import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import FilterDropdown from "../DashboardSubComponent/FilterDropdown";
import { GoPlus } from "react-icons/go";
import AddTicketOnCallRequest from "../DashboardSubComponent/AddTicketOnCallRequest";
import ServiceRequestTable from "./ServiceRequestTable";
import ServiceScheduledTable from "./ServiceScheduledTable";
import AddTicketOnCallRequests from "../DashboardSubComponent/AddTicketOnCallRequests";
import { RiSearchLine } from "react-icons/ri";
import {
  getFilterLocation,
  getEngineerNames,
} from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";

const RequestScheduledSection = ({ setRenderTicket }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const dropdownClickRef = useRef();
  // modal manage states

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);

  const [handleRequestScheduledTable, setHandleRequestScheduledTable] =
    useState(true);

  const [filterConditions, setfilterConditions] = useState();
 
  useEffect(() => {
    const fetchData = () => {
      dispatch(getFilterLocation());
      dispatch(getEngineerNames());
    };
    fetchData();
  }, [dispatch]);
  const locations = useSelector(
    (state) =>
      state?.AdminRootReducer?.filteringLocationsReducer?.locations?.locations
  );
  const engineers = useSelector(
    (state) =>
      state?.AdminRootReducer?.engineersReducer?.engineers?.engineerNames
  );
  const filterDropdowns = [
    { name: "status", options: ["Unassigned", "Assigned", "Resolved"] },
    {
      name: "engineers",
      options: engineers,
    },
    { name: "location", options: locations },
    {
      name: "type",
      options: ["Door", "Light", "Fan", "Buttons", "Lift", "Others"],
    },
    { name: "clear", options: [] }
  ];
  const handleTicketFilter = () => {
    setShowTicketFilter(!showTicketFilter);
  };

  const closeModal = () => setShowTicketModal(false);



  const openModal = (modalNumber) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 0) setShowTicketModal(true);
  };

  const showRequestTable = () => {
    setHandleRequestScheduledTable(true);
  };
  const showScheduledTable = () => {
    setHandleRequestScheduledTable(false);
  };

  //.................................................................ax13-search-func-starts----------------------------------------------------------
  const [searchText, setSearchText] = useState("");

  //.................................................................ax13-search-func-starts----------------------------------------------------------
  //aayush code start here for filter

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
  const handleFilter = () => {
    setShowTicketFilter(prevState => !prevState);
  };
  const handleOutsideClick = useCallback(() => {
    setShowTicketFilter(false);
  }, []);

  useClickOutside(dropdownClickRef, handleOutsideClick);

  //aayush code end for filter

  return (
    <div className="parent-full-div">
      <div className="child-ticket-div">
        <div className="heading-icon-align">
          <div className="ticket-section-heading">
            <button
              className="service-request-section-button"
              onClick={showRequestTable}
              style={{
                background: handleRequestScheduledTable ? "#FEF3DE" : "#ffffff",
                color: handleRequestScheduledTable ? "#F8AC1D" : "#1D1D1D",
              }}
            >
              Requests
            </button>
            <button
              className="service-request-section-button"
              onClick={showScheduledTable}
              style={{
                background: handleRequestScheduledTable ? "#ffffff" : "#FEF3DE",
                color: handleRequestScheduledTable ? "#1D1D1D" : "#F8AC1D",
              }}
            >
              Scheduled
            </button>
          </div>

          <div className="icon-align-div">
            <div className="right-side-icons">

              <span className="top-icon">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search anything"
                    className={`search-input ${
                      searchText.length > 0 && "inputSearchWritten"
                    }`}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    value={searchText}
                  />

                  <i className="search-btn " 
                  // onClick={() => {
                  //   const data = filtersearch(searchText, allCD);
                  //   setFilteredCD(data);
                  // }}
                  
                  >

                    <RiSearchLine className="iconColor" />
                  </i>
                </div>
              </span>

            </div>

            <div className="sub-components-ticket-filter" ref={dropdownClickRef}>
              <p className="filter-icon" 
              onClick={handleFilter}
              >
                <LuSettings2 />
                {""}
              </p>
              {showTicketFilter && (
                <div className="dropdown-content-filter" ref={dropdownRef}>
                  <FilterDropdown className="search-ticket-filter-icon"
                    filterDropdowns={filterDropdowns}
                    setfilterConditions={setfilterConditions}
                  />
                </div>
              )}
            </div>

            {/* add  ticket +icon */}

            <div
              className="sub-components-ticket-filter"
              onClick={() => openModal(0)}
            >
              <p className="plus-icon">
                <GoPlus />
                {""}
              </p>
            </div>
            {showTicketModal &&
              (
                <AddTicketOnCallRequests

                  closeModal={closeModal}
                  showTicketModal={showTicketModal}
                  setRenderTicket={setRenderTicket}
                  requestSection={true}
                />

              )

            }
          </div>
        </div>

        <>
          {/* table start here */}

          {handleRequestScheduledTable ? (
            <ServiceRequestTable
              setRenderTicket2={setRenderTicket}
              searchText={searchText}
              filterConditions={filterConditions}
            />
          ) : (
            <ServiceScheduledTable searchText={searchText} />
          )}

          {/* table end here */}
        </>
      </div>
    </div>
  );
};

export default RequestScheduledSection;
