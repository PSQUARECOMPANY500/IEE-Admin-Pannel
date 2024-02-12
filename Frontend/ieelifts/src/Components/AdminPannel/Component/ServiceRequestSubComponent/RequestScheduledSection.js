import React, { useState, useEffect, useRef } from "react";

import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import FilterDropdown from "../DashboardSubComponent/FilterDropdown";
import { GoPlus } from "react-icons/go";
import AddTicketModal from "../DashboardSubComponent/AddTicketModal";
import ServiceRequestTable from "./ServiceRequestTable";
import ServiceScheduledTable from "./ServiceScheduledTable";

const RequestScheduledSection = () => {
  const dropdownRef = useRef(null);

  // modal manage states

  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);

  const [handleRequestScheduledTable, setHandleRequestScheduledTable] =
    useState(true);

  const handleTicketFilter = () => {
    console.log("this is handle filter function");
    setShowTicketFilter(!showTicketFilter);
  };

  const closeModal = () => setShowTicketModal(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-icon")
      ) {
        setShowTicketFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
              <span className="filter-top-icon">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search anything"
                    className="search-input"
                  />
                  <a href="/" className="search-btn">
                    <i>
                      <CiSearch />
                    </i>
                  </a>
                </div>
              </span>
            </div>

            <div className="sub-components-ticket-filter">
              <p className="filter-icon" onClick={handleTicketFilter}>
                <LuSettings2 />
                {""}
              </p>
              {showTicketFilter && (
                <div className="dropdown-content-filter" ref={dropdownRef}>
                  <FilterDropdown className="search-ticket-filter-icon" />
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
            {showTicketModal && (
              <AddTicketModal
                closeModal={closeModal}
                showTicketModal={showTicketModal}
                modalNumber={0}
              />
            )}
          </div>
        </div>

        <div>
          {/* table start here */}

          {handleRequestScheduledTable ? (
            <ServiceRequestTable />
          ) : (
            <ServiceScheduledTable />
          )}

          {/* table end here */}
        </div>
      </div>
    </div>
  );
};

export default RequestScheduledSection;
