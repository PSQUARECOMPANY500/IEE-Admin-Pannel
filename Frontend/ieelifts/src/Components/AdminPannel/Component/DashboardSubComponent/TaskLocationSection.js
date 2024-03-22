import React, { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { LuSettings2 } from "react-icons/lu";
import ReportData from "./ReportData";
import FilterDropdown from "./FilterDropdown";
import KanbanSection from "./KanbanSection";
import EnggLocation from "./EnggLocationSection/EnggLocation";
import { getCurrentDateAssignServiceRequestAction } from "../../../../ReduxSetup/Actions/AdminActions"; //(may be use in future TODO)
import { getCurrentDateAssignCalbackAction } from "../../../../ReduxSetup/Actions/AdminActions";

import { useDispatch, useSelector } from "react-redux";

const TaskLocationSection = forwardRef((props, ref) => {
  const dropdownRef = useRef(null);
  const dropdownClickRef = useRef();


  const dispatch = useDispatch();
  const [ticket, setTicket] = useState(true);
  const [services, setSrvice] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [handleServiceSelection, setHandleServiceSelection] = useState([]);
  const [handleCallbackSelection, setHandleCallbackSelection] = useState([]);
  const [handleRedportData, setHandleReportData] = useState(true);

  //get current date service request
  const currentDateServiceRequest = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer &&
      state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer
        .currentDateServiceRequest
    ) {
      return state.AdminRootReducer.getCurrentDateAssignServiceRequestReducer
        .currentDateServiceRequest.serviceRequestDetail;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (currentDateServiceRequest) {
      setHandleServiceSelection(
        Array(currentDateServiceRequest.length).fill(false)
      );
    }
  }, [currentDateServiceRequest]);

  //get current date callback
  const currentDateCallback = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getCurrentDateAssignCalbackAction &&
      state.AdminRootReducer.getCurrentDateAssignCalbackAction
        .currentDateCallback
    ) {
      return state.AdminRootReducer.getCurrentDateAssignCalbackAction
        .currentDateCallback.callbackWithDetails;
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (currentDateCallback) {
      setHandleCallbackSelection(Array(currentDateCallback.length).fill(false));
    }
  }, [currentDateCallback]);

  const handlekanban = () => {
    props.handleKanbanToggle();
  };

  const toggleTickets = () => {
    setTicket(true);
    setSrvice(false);
  };
  const toogleService = () => {
    setSrvice(true);
    setTicket(false);
  };

  const passData = () => { };

// -------------------------filter dropdown code start from here---------------------------
  useEffect(() => {
    setTimeout(() => {
      dispatch(getCurrentDateAssignCalbackAction());
      dispatch(getCurrentDateAssignServiceRequestAction());
    }, 1500);
  }, [dispatch, props.ticketUpdate]);


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
    setShowFilter(prevState => !prevState);
  };
  const handleOutsideClick = useCallback(() => {
    setShowFilter(false);
  }, []);

  useClickOutside(dropdownClickRef, handleOutsideClick);

  // -------------------------filter dropdown end--------------------------


  const extractStartTime = (slots) => {
    return slots[0].split("-")[0];
  };
  const extractEndTime = (slots) => {
    return slots[slots.length - 1].split("-")[1];
  };

  return (
    <div className={"parent-full-div"} ref={ref}>
      <div className={"child-div"}>
        <div
          className={
            props.kanban ? "tasks-section" : "tasks-section-on-kanban "
          }
        >
          <div className="task-top-section">
            <p>Tasks</p>

            <div className="switch-button ">
              <span className="ticket-service-flex">
                <p
                  className={
                    ticket
                      ? "switch-button-hover"
                      : "switch-button-without-hover"
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

            {props.kanban ? (
              <div className="sub-components" ref={dropdownClickRef}>
                <p className="filter-icon"
                  onClick={handleFilter}


                >
                  <LuSettings2 />
                  {""}
                </p>
                {showFilter && (
                  <div className="dropdown-content" ref={dropdownRef}>
                    <FilterDropdown />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {props.kanban ? (
            <div
              className="task-description-section Yello_Scrollbar"
              style={{ paddingTop: "0.5rem" }}
            >
              {/* -----------------------  araised ticker data here starts ------------------------------------- */}
              {ticket && (
                <>
                  {currentDateCallback?.map((value, index) => (
                    <div
                      className={`ticket-card ${handleCallbackSelection[index] &&
                        "service-card-selected"
                        }`}
                    // onClick={() => {
                    //   setHandleCallbackSelection((prevStates) => {
                    //     prevStates.map((stateValue, valueIndex) => {
                    //       if (valueIndex !== index) {
                    //         stateValue = !stateValue;
                    //       }
                    //       stateValue = false;
                    //     });
                    //   });
                    // }}
                    >
                      <table className="ticket-table">
                        <tbody>
                          <tr>
                            <th style={{ textAlign: "start" }}>NAME :</th>
                            <td>{value.clientName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th style={{ textAlign: "start" }}>ENGINEER:</th>
                            <td>{value.enggName.toUpperCase()}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="ticket-card-bottom">
                        <h5>{extractStartTime(value.Slot)}</h5>
                        <h5>{extractEndTime(value.Slot)}</h5>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {services && (
                <>
                  {currentDateServiceRequest?.map((serviceData, index) => (
                    <div
                      className={`service-card ${handleServiceSelection[index] && "service-card-selected"
                        }`}
                    // onClick={() => {
                    //   setHandleServiceSelection((prevStates) => {
                    //     const newCheckboxStates = [...prevStates];
                    //     newCheckboxStates[index] = !prevStates[index];
                    //     return newCheckboxStates;
                    //   });
                    // }}
                    >
                      <table className="service-table">
                        <tbody>
                          <tr>
                            <th style={{ textAlign: "start" }}>NAME:</th>
                            <td>{serviceData.clientName.toUpperCase()}</td>
                          </tr>
                          <tr>
                            <th style={{ textAlign: "start" }}>ENGINEER:</th>
                            <td>{serviceData.enggName.toUpperCase()}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="service-card-bottom">
                        <h5>{extractStartTime(serviceData.Slot)}</h5>
                        <h5>{extractEndTime(serviceData.Slot)}</h5>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : null}
        </div>

        {props.kanban ? (
          <div className="Report-section">
            <div
              className="task-top-section"
              onClick={() => {
                setHandleReportData(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <p>Report</p>
            </div>

            <div className="report-description-section">
              <div className="more-descriptive-report">
                <div className="child-descriptive">
                  <ReportData handleRedportData={handleRedportData} />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={props.kanban ? "location-section" : "kanban-Click-section"}
        >
          <div className="task-top-section">
            <p>Location</p>
            <div onClick={handlekanban} className="kanban-button-location">
              <span>KANBAN</span>
            </div>
          </div>
          <div className="report-description-section">
            <div className="more-descriptive">
              <EnggLocation />
            </div>
          </div>
        </div>
        <div
          onClick={handlekanban}
          className={props.kanban ? "kanban-Click-section" : "kanban-button"}
        >
          <p className="kanban-cursor">KANBAN</p>
        </div>
      </div>
      {!props.kanban && <KanbanSection ticket={ticket} services={services} />}
    </div>
  );
});

export default TaskLocationSection;
