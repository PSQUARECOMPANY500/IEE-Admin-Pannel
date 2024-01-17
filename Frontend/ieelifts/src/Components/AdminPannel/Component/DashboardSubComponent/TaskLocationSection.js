import React, { useState, useRef, useEffect } from "react";
import { LuSettings2 } from "react-icons/lu";
import ReportData from "./ReportData";
import { LiaStarSolid } from "react-icons/lia";
import FilterDropdown from "./FilterDropdown";

const TaskLocationSection = () => {
  const dropdownRef = useRef(null);

  const [ticket, setTicket] = useState(true);
  const [services, setSrvice] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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
    <div className="parent-full-div">
      <div className="child-div">
        <div className="tasks-section">
          <div className="task-top-section">
            <p>Tasks</p>

            <div className="switch-button">
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
            </div>

            <div className="sub-components">
              <p className="filter-icon" onClick={handleFilter}>
                <LuSettings2 />
                {""}
              </p>
              {showFilter && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <FilterDropdown />
                </div>
              )}
            </div>
          </div>

          <div className="task-description-section">
            {/* swap conditions start here */}
            {ticket && (
              <>
                <div
                  className="more-descriptive"
                  onClick={passData}
                
                >
                  <div className="detail"   style={{
                    background: "rgb(229 229 229 / 47%)",
                    border: "1px solid #F8AC1D",
                    boxShadow:" 0px 0px 5px #F8AC1D80"
                  }}>
                    <table class="customer-table1">
                      <tbody>
                        <tr>
                          <th>NAME :</th>
                          <td>ARJUN service</td>
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
                </div>

                <div
                  className="more-descriptive"
                  onClick={passData}
                  style={{
                    background: "#ffffff",
                  }}
                >
                  <div className="detail" style={{
                    border: "1px solid #F8AC1D",
                    // boxShadow:" 0px 0px 5px #F8AC1D80"
                  }}>
                    <table class="customer-table1">
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
                    <table class="customer-table1">
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
                    <table class="customer-table1">
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
                    <table class="customer-table1">
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
                    <table class="customer-table1">
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
                    <table class="customer-table1">
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
          </div>
        </div>

        <div className="Report-section">
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
        </div>

        <div className="location-section">
          <div className="task-top-section">
            <p>Location</p>
          </div>
          <div className="report-description-section">
            <div className="more-descriptive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.1483230038793!2d76.6936452761033!3d30.714230386525795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee5703d374e5%3A0xda2704bd4dce4210!2sIEE%20LIFTS!5e0!3m2!1sen!2sin!4v1703161333396!5m2!1sen!2sin"
                style={{ width: "100%", height: "320px" , border:'none', borderRadius: '8px' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskLocationSection;
