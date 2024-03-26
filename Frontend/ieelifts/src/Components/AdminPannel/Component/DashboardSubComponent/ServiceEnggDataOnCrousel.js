import React, { useState, useEffect, useRef, useCallback } from "react";
import { LiaStarSolid } from "react-icons/lia";
import { TbMessage2 } from "react-icons/tb";
import TaskChart from "./TaskPieChart";
import MessageBox from "./MessageBox";

const ServiceEnggDataOnCrousel = ({ item, index, len }) => {

  const dropdownClickRef = useRef();
  const MessageBoxRef = useRef(null);
  const [showMessage, setShowMessage] = useState([false]);
  const renderArray = [];
  const renderArrayon = [];



  const handleMessageBoxClose = () => {
    setShowMessage(false);
  };


  const assignArray = (item) => {
    if (item.filteredServiceAssignmentsWithClientName) {
      item.filteredServiceAssignmentsWithClientName.forEach((itemData) => {
        if (itemData.TaskStatus === "InCompleted") {
          renderArray.push(itemData);
        } else {
          renderArrayon.push(itemData);
        }
      });
    }
  };
  assignArray(item);


  
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
 
   
  const handleMesageBox = (index) => {
    setShowMessage((prev) => ({
      ...prev,
      [index]: !prev[index],
     
    }));
  };


  const handleOutsideClick = useCallback(() => {
    setShowMessage(false);
  }, []);

  useClickOutside(dropdownClickRef, handleOutsideClick);

  return (
    <div className="main-crouser" key={index}>
      <div className="second-carusel">
        <div className="basic-info">
          <img
            src={item.ServiceEnggPic}
            alt="img"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />
          <div className="engg-profile">
            <span>{item.ServiceEnggName}</span>
            <span className="star-icon">
              {item.averageRating}
              <LiaStarSolid style={{ color: "#F8AC1D" }} />
            </span>
          </div>
        </div>

  <div className="message-icon"  ref={dropdownClickRef}>
    <span  onClick={() => handleMesageBox(index)} >
      <TbMessage2 className="message-box-crouser"  />
    </span>
    {/* <div className="message-dot"></div> */}
    {showMessage[index] && (
      <div
        ref={MessageBoxRef}
        style={{
          left: len - 1 === index ? "0px" : "0",
          position: "relative",
        }}
        className="engg-message"
      >
        <MessageBox onClose={handleMessageBoxClose} EnggId={item.EnggObjId} />
      </div>
    )}
  </div>
</div>

 

      <div className="main-head-div">
        {renderArray.length == 0 ? (
          <div className="skill-box">
            <div className="dots2"></div>
            <div className="skill-bar-ontask">
              <span className="skill-per-ontask reactjs"></span>
            </div>
          </div>
        ) : (
          <div className="skill-box">
            <div className="dots2">
              <span className="dot-progress"></span>
              <span className="dot-progress2"></span>
            </div>
            <div className="skill-bar">
              <span className="skill-per reactjs">
                {<span className="tooltip">10 MINS</span>}
              </span>
            </div>
            <div className="hover-icon-service">
              <div className="dropdown">
               <span>{renderArray[0].ClientName.split(" ")[0]}</span>
                <span>service E1</span>
                <div className="dropdown-menu">
                  <div className="drop-parent">
                    <div className="upper-sec">
                      <p>{renderArray[0].ClientName}</p>
                      <p>Service E1</p>
                      <div className="horizontal-row-container">
                        <span className="horizontal-row"></span>
                      </div>
                    </div>
                    <div className="lower-sec">
                      <p style={{ display: "flex" }}>
                        <p>JON :</p>
                        <p>{renderArray[0].JobOrderNumber}</p>
                      </p>
                      <p style={{ display: "flex" }}>
                        <p>No :</p>
                        <p>{renderArray[0].ClientNumber}</p>
                      </p>
                      <p style={{ display: "flex" }}>
                        <p style={{ width: "100%" }}>Add :</p>
                        <p style={{ marginLeft: "-2px", textAlign: "left" }}>
                          {renderArray[0].ClientAddress}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {renderArray.length > 1 ? (
                <div className="dropdown2">
                  <span>{renderArray[1].ClientName.split(" ")[0]}</span>
                  <span>service E1</span>

                  <div className="dropdown-menu">
                    <div className="drop-parent">
                      <div className="upper-sec">
                        <p>{renderArray[1].ClientName}</p>
                        <p>Service E1</p>
                        <div className="horizontal-row-container">
                          <span className="horizontal-row"></span>
                        </div>
                      </div>
                      <div className="lower-sec">
                        <p style={{ display: "flex" }}>
                          <p>JON :</p>
                          <p>{renderArray[1].JobOrderNumber}</p>
                        </p>
                        <p style={{ display: "flex" }}>
                          <p>No :</p>
                          <p>{renderArray[1].ClientNumber}</p>
                        </p>
                        <p style={{ display: "flex" }}>
                          <p style={{ width: "100%" }}>Add :</p>
                          <p style={{ marginLeft: "-2px", textAlign: "left" }}>
                            {renderArray[1].ClientAddress}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}

        <div className="dropdown3">
          <TaskChart
            completedTasks={renderArrayon.length}
            totalTasks={item.filteredServiceAssignmentsWithClientName.length}
          />
          <div
            className="dropdown-menu"
            style={{ left: len - 1 === index ? "-165px" : "-400%" ,marginTop:'-40px',boxShadow: '0px 10px 20px #00000049'}}
          >
            <div className="drop-parent">
              <p className="tasks-heading">Tasks</p>
              {item.filteredServiceAssignmentsWithClientName.length != 0 ? (
                item.filteredServiceAssignmentsWithClientName.map(
                  (itemData, dataIndex) => (
                    <React.Fragment key={dataIndex}>
                      <div className="task-main-div">
                        <div className="dot-name">
                          {itemData.TaskStatus === "InCompleted" ? (
                            <div className="task-dot"></div>
                          ) : (
                            <div className="task-dot-on-complete"></div>
                          )}
                          <div className="taskmain-info">
                            <p>{itemData.ClientName.split(" ")[0]}</p>
                            <p>{itemData.JobOrderNumber}</p>
                          </div>
                        </div>
                        <div className="taskmain-info">
                          <p>Service</p>
                          <p>E1</p>
                        </div>
                      </div>
                      <span className="horizontal-row2"></span>
                    </React.Fragment>
                  )
                )
              ) : (
                <div className="tasks-heading-on-no-task">No Task Assigned</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEnggDataOnCrousel;
