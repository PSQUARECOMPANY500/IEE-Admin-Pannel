import React, { useState, useRef, useEffect,forwardRef } from "react";
import { LuSettings2 } from "react-icons/lu";
import ReportData from "./ReportData";
import { LiaStarSolid } from "react-icons/lia"; // use in future (don't delete Please)
import FilterDropdown from "./FilterDropdown";
import KanbanSection from "./KanbanSection";

import { getAllAssignCallbackRequestAction } from "../../../../ReduxSetup/Actions/AdminActions"  //(may be use in future TODO)
import { getCurrentDateAssignCalbackAction } from "../../../../ReduxSetup/Actions/AdminActions"

import { useDispatch, useSelector } from "react-redux"


const TaskLocationSection = forwardRef((props, ref) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const [ticket, setTicket] = useState(true);
  const [services, setSrvice] = useState(false);
  const [showFilter, setShowFilter] = useState(false);


//   const clientCallBackTickets = useSelector((state) => { if( state.AdminRootReducer && state.AdminRootReducer.getAllAssignCallbackRequestReducer && state.AdminRootReducer.getAllAssignCallbackRequestReducer.assignCallback){
//     return state.AdminRootReducer.getAllAssignCallbackRequestReducer.assignCallback.allAssignCallbacks
//   }else{
//     return null
//   }}
// );
//   console.log(clientCallBackTickets)

//   const currentDate = new Date().toLocaleDateString("en-GB");
//   console.log(currentDate)

//   const filteredData = clientCallBackTickets?.filter((item) => {
//     const itemDate = item.Date;
//     return itemDate === currentDate;
//   })
//   console.log(filteredData)
  const renderComopnent = useSelector((state) => state.AdminRootReducer.ticketSectionRenderReducer.isComponentRendered);
  console.log("*",renderComopnent)

  const currentDateCallback = useSelector((state) => {
    if (state.AdminRootReducer && state.AdminRootReducer.getCurrentDateAssignCalbackAction && state.AdminRootReducer.getCurrentDateAssignCalbackAction.currentDateCallback){
      return state.AdminRootReducer.getCurrentDateAssignCalbackAction.currentDateCallback.callbackWithDetails
    }else{
      return null
    }
  } );
  console.log(currentDateCallback)


  const handlekanban = ()=>{
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
    // dispatch(getAllAssignCallbackRequestAction())
  
      dispatch(getCurrentDateAssignCalbackAction())
 

  },[dispatch])


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
  return (
    <div className={"parent-full-div"} ref={ref} >
      <div className={"child-div"}>
        <div className={props.kanban?"tasks-section":"tasks-section-on-kanban "}>
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

            {props.kanban?<div className="sub-components">
              <p className="filter-icon" onClick={handleFilter}>
                <LuSettings2 />
                {""}
              </p>
              {showFilter && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <FilterDropdown />
                </div>
              )}
            </div>:null}


          </div>

          {props.kanban?<div className="task-description-section">
            {/* -----------------------  araised ticker data here starts ------------------------------------- */}
            {/* swap conditions start here */}
            {ticket && (
              <>
                {/* <div
                  className="more-descriptive"
                  onClick={passData}
                
                >
                  <div className="detail"   style={{
                    background: "rgb(229 229 229 / 47%)",
                    border: "1px solid #F8AC1D",
                    boxShadow:" 0px 0px 5px #F8AC1D80"
                  }}>
                    <table className="customer-table1">
                      <tbody>
                        <tr>
                          <th>NAME :</th>
                          <td>Preet service</td>
                        </tr>
                        <tr>
                          <th>ENGINEER :</th>
                          <td>RAM KUMAR</td>
                        </tr>
                        <tr>
                          <th>START TIME :</th>
                          <td style={{ color: "red" }}>2:15</td>
                        </tr>
                        <tr>
                          <th>END TIME :</th>
                          <td>
                            <span style={{ color: "green " }}>5:00</span>
                            <span className="star-icon2">
                              {" "}
                              4.3 <LiaStarSolid style={{ color: "#F8AC1D" }} />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}

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
                              <td>{value.clientName}</td>
                            </tr>
                            <tr>
                              <th>ENGINEER :</th>
                              <td>{value.enggName}</td>
                            </tr>
                            <tr>
                              <th>START TIME :</th>
                              <td>{value.Slot.split('-')[0]}</td>
                            </tr>
                            <tr>
                              <th>END TIME :</th>
                              <td>{value.Slot.split('-')[1]}</td>
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
                          <td>Pankaj service</td>
                        </tr>
                        <tr>
                          <th>JON :</th>
                          <td>565454</td>
                        </tr>
                        <tr>
                          <th>ADDRESS :</th>
                          <td>ADDRESS ADDRESS</td>
                        </tr>
                        <tr>
                          <th>TYPE :</th>
                          <td>DOOR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

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
                          <td>ARJUN service</td>
                        </tr>
                        <tr>
                          <th>JON :</th>
                          <td>565454</td>
                        </tr>
                        <tr>
                          <th>ADDRESS :</th>
                          <td>ADDRESS ADDRESS</td>
                        </tr>
                        <tr>
                          <th>TYPE :</th>
                          <td>DOOR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

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
                          <td>ARJUN service</td>
                        </tr>
                        <tr>
                          <th>JON :</th>
                          <td>565454</td>
                        </tr>
                        <tr>
                          <th>ADDRESS :</th>
                          <td>ADDRESS ADDRESS</td>
                        </tr>
                        <tr>
                          <th>TYPE :</th>
                          <td>DOOR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

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
                          <td>ARJUN service</td>
                        </tr>
                        <tr>
                          <th>JON :</th>
                          <td>565454</td>
                        </tr>
                        <tr>
                          <th>ADDRESS :</th>
                          <td>ADDRESS ADDRESS</td>
                        </tr>
                        <tr>
                          <th>TYPE :</th>
                          <td>DOOR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

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
                          <td>ARJUN service</td>
                        </tr>
                        <tr>
                          <th>JON :</th>
                          <td>565454</td>
                        </tr>
                        <tr>
                          <th>ADDRESS :</th>
                          <td>ADDRESS ADDRESS</td>
                        </tr>
                        <tr>
                          <th>TYPE :</th>
                          <td>DOOR</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>:null}
        </div>

        {props.kanban?<div className="Report-section">
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
        </div>:null}

        <div className={props.kanban?"location-section":"kanban-Click-section"}>
          <div className="task-top-section">
            <p>Location</p>
            <div  onClick={handlekanban} className="kanban-button-location">
            <span >KANBAN</span>
          </div>
          </div>
          <div className="report-description-section">
            <div className="more-descriptive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.1483230038793!2d76.6936452761033!3d30.714230386525795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee5703d374e5%3A0xda2704bd4dce4210!2sIEE%20LIFTS!5e0!3m2!1sen!2sin!4v1703161333396!5m2!1sen!2sin"
                style={{ width: "100%", height: "320px" , border:'none', borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
        <div  onClick={handlekanban}  className={props.kanban?"kanban-Click-section":"kanban-button"}>
            <p className="kanban-cursor">KANBAN</p>
          </div>
      </div>
      {!props.kanban&&<KanbanSection ticket={ticket} services={services}/>}
    </div>
  );
});

export default TaskLocationSection;
