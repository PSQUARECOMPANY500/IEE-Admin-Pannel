import React, { useState, useRef, useEffect, forwardRef } from "react";
import { LuSettings2 } from "react-icons/lu";
import ReportData from "./ReportData";
import { LiaStarSolid } from "react-icons/lia"; // use in future (don't delete Please)
import FilterDropdown from "./FilterDropdown";
import KanbanSection from "./KanbanSection";
import EnggLocation from "./EnggLocationSection/EnggLocation";

//import { getAllAssignCallbackRequestAction } from "../../../../ReduxSetup/Actions/AdminActions"  //(may be use in future TODO)
import { getCurrentDateAssignServiceRequestAction } from "../../../../ReduxSetup/Actions/AdminActions"  //(may be use in future TODO)
import { getCurrentDateAssignCalbackAction } from "../../../../ReduxSetup/Actions/AdminActions"

import { useDispatch, useSelector } from "react-redux"


const TaskLocationSection = forwardRef((props, ref) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  //console.log("ticketUpdate",props.ticketUpdate)
  const [ticket, setTicket] = useState(true);
  const [services, setSrvice] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const currentDateServiceRequest = useSelector((state) => {
    if (state.AdminRootReducer && state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer && state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer.currentDateServiceRequest) {
      return state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer.currentDateServiceRequest.serviceRequestDetail
    } else {
      return null
    }
  });
  // console.log("*-----*",currentDateServiceRequest);

  //get current date callback
  const currentDateCallback = useSelector((state) => {
    if (state.AdminRootReducer && state.AdminRootReducer.getCurrentDateAssignCalbackAction && state.AdminRootReducer.getCurrentDateAssignCalbackAction.currentDateCallback) {
      return state.AdminRootReducer.getCurrentDateAssignCalbackAction.currentDateCallback.callbackWithDetails
    } else {
      return null
    }
  });
  // console.log("*======*",currentDateCallback)


  const handlekanban = () => {
    props.handleKanbanToggle();
  }

  const toggleTickets = () => {
    console.log("toogletickets");
    setTicket(true);
    setSrvice(false);
  };
  const toogleService = () => {
    console.log("toogleservices");
    setSrvice(true);
    setTicket(false);
  };

  const passData = () => {
    console.log("data");
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };


  useEffect(() => {
    setTimeout(() => {
      dispatch(getCurrentDateAssignCalbackAction());
      dispatch(getCurrentDateAssignServiceRequestAction());
      //console.log("USEeFFECT CALLED")
    }, 1500)
  }, [dispatch, props.ticketUpdate]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  const extractStartTime = (slots) => {
    return slots[0].split('-')[0];
  }
  const extractEndTime = (slots) => {
    return slots[slots.length - 1].split('-')[1];
  }

  return (
    <div className={"parent-full-div"} ref={ref} >
      <div className={"child-div"}>
        <div className={props.kanban ? "tasks-section" : "tasks-section-on-kanban "}>
          <div className="task-top-section">
            <p>Tasks</p>

            <div className="switch-button ">
              <span className="ticket-service-flex">
                <p
                  className={
                    ticket ? "switch-button-hover" : "switch-button-without-hover"
                  }
                  onClick={toggleTickets}
                >
                  Ticket
                </p>
                <p
                  className={
                    services
                      ? "switch-button-hover"
                      : "switch-button-without-hover"
                  }
                  onClick={toogleService}
                >
                  Service
                </p>
              </span>

            </div>

            {props.kanban ? <div className="sub-components">
              <p className="filter-icon" onClick={handleFilter}>
                <LuSettings2 />
                {""}
              </p>
              {showFilter && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <FilterDropdown />
                </div>
              )}
            </div> : null}


          </div>

          {props.kanban ? <div className="task-description-section">
            {/* -----------------------  araised ticker data here starts ------------------------------------- */}
            {ticket && (
              <>
                {currentDateCallback?.map((value => (
                  <div
                    className="more-descriptive"
                    onClick={passData}
                    style={{
                      background: "#ffffff",
                    }}>
                    <div className="detail" style={{
                    }}>
                      <table className="customer-table1">
                        <tbody>
                          <tr>
                            <th>NAME :</th>
                            <td>{value.clientName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th>ENGINEER :</th>
                            <td>{value.enggName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th>START TIME :</th>
                            <td>{extractStartTime(value.Slot)}</td>
                          </tr>
                          <tr>
                            <th>END TIME :</th>
                            <td>{extractEndTime(value.Slot)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )))}
              </>
            )}

            {services && (
              <>
                {currentDateServiceRequest?.map((serviceData) => (
                  <div
                    className="more-descriptive"
                    onClick={passData}
                    style={{
                      background: "#ffffff",
                    }}
                  >
                    <div className="detail">
                      <table className="customer-table1">
                        <tbody>
                          <tr>
                            <th>NAME :</th>
                            <td>{serviceData.clientName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th>ENGINEER :</th>
                            <td>{serviceData.enggName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th>START TIME :</th>
                            <td>{extractStartTime(serviceData.Slot)}</td>
                          </tr>
                          <tr>
                            <th>END TIME :</th>
                            <td>{extractEndTime(serviceData.Slot)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div> : null}
        </div>

        {props.kanban ? <div className="Report-section">
          <div className="task-top-section">
            <p>Report</p>
          </div>

          <div className="report-description-section">
            <div className="more-descriptive-report">
              <div className="child-descriptive">
                <ReportData />
              </div>
            </div>
          </div>
        </div> : null}

        <div className={props.kanban ? "location-section" : "kanban-Click-section"}>
          <div className="task-top-section">
            <p>Location</p>
            <div onClick={handlekanban} className="kanban-button-location">
              <span >KANBAN</span>
            </div>
          </div>
          <div className="report-description-section">
            <div className="more-descriptive">
              <>
                <EnggLocation style={{ width: "100%", height: "320px", border: 'none', borderRadius: '8px' }} />
              </>
            </div>
          </div>
        </div>
        <div onClick={handlekanban} className={props.kanban ? "kanban-Click-section" : "kanban-button"}>
          <p className="kanban-cursor">KANBAN</p>
        </div>
      </div>
      {!props.kanban && <KanbanSection ticket={ticket} services={services} />}
    </div>
  );
});

export default TaskLocationSection;
