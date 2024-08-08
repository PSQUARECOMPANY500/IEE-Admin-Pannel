import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
} from "react";
import { LuSettings2 } from "react-icons/lu";
import ReportData from "./ReportData";
import FilterDropdown from "./FilterDropdown";
import KanbanSection from "./KanbanSection";
import EnggLocation from "./EnggLocationSection/EnggLocation";
import {
  getCurrentDateAssignServiceRequestAction,
  getadminReportData,
} from "../../../../ReduxSetup/Actions/AdminActions"; //(may be use in future TODO)
import { getCurrentDateAssignCalbackAction } from "../../../../ReduxSetup/Actions/AdminActions";
import {
  getFilterLocation,
  getEngineerNames,
} from "../../../../ReduxSetup/Actions/AdminActions";

import { useDispatch, useSelector } from "react-redux";
import { GoStarFill } from "react-icons/go";

import RepotImage from "./RepotImage";

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
  const [filterConditions, setfilterConditions] = useState();
  const [filterData, setFilterData] = useState();
  const [RedportData, setReportData] = useState();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getEngineerNames());
    };
    fetchData();
  }, [dispatch]);
  // const locations = useSelector(
  //   (state) =>
  //     state?.AdminRootReducer?.filteringLocationsReducer?.locations?.locations
  // );
  const engineers = useSelector(
    (state) =>
      state?.AdminRootReducer?.engineersReducer?.engineers?.engineerNames
  );

  const filterDropdowns = [
    { name: "status", options: ["Incompleted", "Ongoing", "Completed"] },
    {
      name: "engineers",
      options: engineers,
    },
    // { name: "location", options: locations },
    { name: "clear", options: [] },
    // { name: "location", options: [] },
  ];

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
    if (filterData) {
      Array(filterData.length).fill(false);
    }
  }, [currentDateServiceRequest, filterData]);

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
    if (filterData) {
      setHandleCallbackSelection(Array(filterData.length).fill(false));
    }
  }, [currentDateCallback, filterData]);

  console.log(handleCallbackSelection);
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

  useEffect(() => {
    if (!filterConditions?.length) {
      setFilterData(null);
      return;
    }

    let data;
    if (services) {
      if (!currentDateServiceRequest?.length) {
        setFilterData(null);
        return;
      }
      data = currentDateServiceRequest;
    } else if (ticket) {
      if (!currentDateCallback?.length) {
        setFilterData(null);
        return;
      }
      data = currentDateCallback;
    }

    if (!data?.length) {
      setFilterData(null);
      return;
    }

    const statusFilter = filterConditions.filter(
      (type) => type.type === "status"
    );
    const engineerFilter = filterConditions.filter(
      (type) => type.type === "engineers"
    );

    const statusData = statusFilter.flatMap((status) => {
      const { condition } = status;
      return data.filter(
        (d) => d.ServiceProcess.toLowerCase() === condition.toLowerCase()
      );
    });

    const engineerData = engineerFilter.flatMap((engineer) => {
      const { condition } = engineer;
      return data.filter((d) => d.enggName === condition);
    });

    let filteredData;
    if (statusFilter.length && engineerFilter.length) {
      filteredData = statusData.filter((status) =>
        engineerData.some((engineer) => status._id === engineer._id)
      );
    } else {
      filteredData = statusData.length ? statusData : engineerData;
    }

    setFilterData(filteredData);
  }, [filterConditions, ticket]);

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
    setShowFilter((prevState) => !prevState);
  };
  const handleOutsideClick = useCallback(() => {
    setShowFilter(false);
  }, []);

  useClickOutside(dropdownClickRef, handleOutsideClick);

  // -------------------------filter dropdown end--------------------------

  const extractStartTime = (slots) => {
    return slots[0]?.split("-")[0];
  };
  const extractEndTime = (slots) => {
    return slots[slots.length - 1]?.split("-")[1];
  };
  /*.......................................................... apX13 code by emit ................................................................ */
  function handleReportSectionData(reportData, index,type) {
    //setHandleReportData
    if (reportData.ServiceProcess === "completed") {
      setHandleReportData(false);
      setReportData(reportData?.callbackId || reportData?.RequestId);
    } else {
      setHandleReportData(true);
      setReportData(reportData);
    }
    if(type==="ticket"){
      setHandleCallbackSelection((prevState) => {
        const newState = prevState.map((item, i) => i === index);
        return newState;
      });
    }
    else{
      setHandleServiceSelection((prevState) => {
        const newState = prevState.map((item, i) => i === index);
        return newState;
      });
    }

    //may be change logic in future make by aayush
    dispatch(
      getadminReportData(reportData?.callbackId || reportData?.RequestId)
    );
  }

  return (
    <div className={"parent-full-div"} ref={ref}>
      <div className={"task-child-div"}>
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
                <p className="filter-icon" onClick={handleFilter}>
                  <LuSettings2 />
                  {""}
                </p>
                {showFilter && (
                  <div className="dropdown-content" ref={dropdownRef}>
                    <FilterDropdown
                      setfilterConditions={setfilterConditions}
                      filterDropdowns={filterDropdowns}
                    />
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
                  {!filterData
                    ? currentDateCallback?.map((value, index) => {
                        let reportData = value;
                        // console.log(
                        //   "==========reportData",
                        //   reportData.engRating
                        // );
                        return (
                          <div
                            style={{
                              backgroundColor: `${
                                reportData?.ServiceProcess === "completed"
                                  ? "#FFF9EF"
                                  : "#ffffff"
                              }`,
                            }}
                            className={`ticket-card ${
                              handleCallbackSelection[index] &&
                              "service-card-selected"
                            }`}
                            onClick={() =>
                              handleReportSectionData(reportData, index,"ticket")
                            }
                          >
                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5>Name:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{value?.clientName}</h5>
                              </div>
                            </div>

                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5> ENGINEER:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{value?.enggName}</h5>
                              </div>
                            </div>

                            <div className="ticket-card-bottom">
                              <h5 className="ticket-card-bottom-starting-slot">
                                {extractStartTime(value?.Slot)}
                              </h5>

                              <h5 className="ticket-card-bottom-end-slot">
                                {extractEndTime(value?.Slot)}
                              </h5>
                              {reportData.engRating &&
                                reportData?.ServiceProcess === "completed" && (
                                  <h5 className="ratingByClient">
                                    <p className="ratingByClient1st">
                                      <GoStarFill />
                                    </p>
                                    <p className="ratingByClient2nd">
                                      {reportData?.engRating}
                                    </p>
                                  </h5>
                                )}
                            </div>
                          </div>
                        );
                      })
                    : filterData?.map((value, index) => {
                        let reportData = value;
                        return (
                          <div
                            className={`ticket-card ${
                              handleCallbackSelection[index] &&
                              "service-card-selected"
                            }`}
                            style={{
                              backgroundColor: `${
                                reportData?.ServiceProcess === "completed"
                                  ? "#FFF9EF"
                                  : "#ffffff"
                              }`,
                            }}
                            onClick={() =>
                              handleReportSectionData(reportData, index,"ticket")
                            }
                          >
                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5>Name:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{value?.clientName.toUpperCase()}</h5>
                              </div>
                            </div>

                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5> ENGINEER:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{value?.enggName.toUpperCase()}</h5>
                              </div>
                            </div>
                            <div className="ticket-card-bottom">
                              <h5 className="ticket-card-bottom-starting-slot">
                                {extractStartTime(value?.Slot)}
                              </h5>

                              <h5 className="ticket-card-bottom-end-slot">
                                {extractEndTime(value?.Slot)}
                              </h5>
                              {reportData.engRating &&
                                reportData?.ServiceProcess === "completed" && (
                                  <h5 className="ratingByClient">
                                    <p className="ratingByClient1st">
                                      <GoStarFill />
                                    </p>
                                    <p className="ratingByClient2nd">
                                      {reportData?.engRating}
                                    </p>
                                  </h5>
                                )}
                            </div>
                          </div>
                        );
                      })}
                </>
              )}

              {services && (
                <>
                  {filterData
                    ? filterData?.map((serviceData, index) => {
                        let reportData = serviceData;
                        return (
                          <div
                            className={`service-card ${
                              handleServiceSelection[index] &&
                              "service-card-selected"
                            }`}
                            onClick={() => handleReportSectionData(reportData,index,"service")}
                            style={{
                              backgroundColor: `${
                                reportData?.ServiceProcess === "completed"
                                  ? "#FFF9EF"
                                  : "#ffffff"
                              }`,
                            }}
                          >
                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5>Name:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{serviceData?.clientName.toUpperCase()}</h5>
                              </div>
                            </div>

                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5> ENGINEER:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{serviceData?.enggName.toUpperCase()}</h5>
                              </div>
                            </div>

                            <div className="service-card-bottom">
                              <h5>{extractStartTime(serviceData.Slot)}</h5>
                              <h5>{extractEndTime(serviceData.Slot)}</h5>
                              {reportData.rating &&
                                reportData?.ServiceProcess === "completed" && (
                                  <h5 className="ratingByClient">
                                    <p className="ratingByClient1st">
                                      <GoStarFill />
                                    </p>
                                    <p className="ratingByClient2nd">
                                      {reportData?.rating}
                                    </p>
                                  </h5>
                                )}
                            </div>
                          </div>
                        );
                      })
                    : currentDateServiceRequest?.map((serviceData, index) => {
                        const reportServiceData = serviceData;

                        return (
                          <div
                            style={{
                              backgroundColor: `${
                                reportServiceData?.ServiceProcess ===
                                "completed"
                                  ? "#FFF9EF"
                                  : "#ffffff"
                              }`,
                            }}
                            className={`service-card ${
                              handleServiceSelection[index] &&
                              "service-card-selected"
                            }`}
                            onClick={() =>
                              handleReportSectionData(reportServiceData,index,"service")
                            }
                          >
                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5>Name:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{serviceData?.clientName.toUpperCase()}</h5>
                              </div>
                            </div>

                            <div className="ticket-sub-card-row">
                              <div className="ticket-sub-card-row-right">
                                <h5> ENGINEER:</h5>
                              </div>
                              <div className="ticket-sub-card-row-left">
                                <h5>{serviceData?.enggName.toUpperCase()}</h5>
                              </div>
                            </div>
                            <div className="service-card-bottom">
                              <h5>{extractStartTime(serviceData?.Slot)}</h5>
                              <h5>{extractEndTime(serviceData?.Slot)}</h5>
                              {reportServiceData.rating &&
                                reportServiceData?.ServiceProcess ===
                                  "completed" && (
                                  <h5 className="ratingByClient">
                                    <p className="ratingByClient1st">
                                      <GoStarFill />
                                    </p>
                                    <p className="ratingByClient2nd">
                                      {reportServiceData?.rating}
                                    </p>
                                  </h5>
                                )}
                            </div>
                          </div>
                        );
                      })}
                </>
              )}
            </div>
          ) : null}
        </div>

        {props.kanban ? (
          <div className="Report-section">
            <div className="task-top-section" style={{ cursor: "pointer" }}>
              <p>Report</p>
            </div>

            <div className="report-description-section">
              <div className="more-descriptive-report">
                <div className="child-descriptive">
                  <ReportData
                    handleRedportData={handleRedportData}
                    RedportData={RedportData}
                  />
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
