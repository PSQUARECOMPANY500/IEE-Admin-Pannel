import React, { useEffect, useState, useRef } from "react";
import SoSCallsShow from "../../../AdminPannel/Component/SOSSubComponent/SoSCallsShow";
import SosModal from "../SOSSubComponent/SoSModalAction";
import { useSelector } from "react-redux";
import AddTicketOnCallRequests from "../DashboardSubComponent/AddTicketOnCallRequests";

const Sosrequest = () => {
  const [dropdown, setDropdown] = useState(false);
  const [jobOrderNumber, setjobOrderNumber] = useState({
    jon: null,
    _id: null,
  });
  const [callbackModal, showCallbackModal] = useState(false)
  const SOSStatusUpdate = useSelector((state) =>
    state.AdminRootReducer?.updateSoSStatus?.status
  );


  const closeModal = () => {
    showCallbackModal(false)
  };

  const handleModalOpen = () => {
    showCallbackModal(true)
  }

  function handleDropDownClick(jon) {
    setDropdown((prev) => !prev)
    if (jon) {
      setjobOrderNumber(jon)
    }
  }

  useEffect(() => {
    if (!SOSStatusUpdate) {
      return;
    }
    if (SOSStatusUpdate.status === "falseAlarm" || SOSStatusUpdate.status === "ResolvedCall") {
      setDropdown(false);
    }

    // if (SOSStatusUpdate.status === "RaisedCallback" && jobOrderNumber.jon) {
    //   showCallbackModal(true);
    // }
  }, [SOSStatusUpdate])

  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleDropDownClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="main-container_sos">
      <SoSCallsShow handleDropDownClick={handleDropDownClick} SOSStatusUpdate={SOSStatusUpdate} />
      {dropdown &&
        <div className="engineer-modal-wrapper">
          <div className="SOS-Action-modal-container" ref={formRef}>
            {console.log()}
            <SosModal handleDropDownClick={handleDropDownClick} jobOrderNumber={jobOrderNumber} SOSStatusUpdate={SOSStatusUpdate} showCallbackModal={() => handleModalOpen()} />
          </div>
        </div>
      }
      {callbackModal &&
        <div style={{ width: "100%" }}>
          <AddTicketOnCallRequests
            closeModal={closeModal}
            showTicketModal={showCallbackModal}
            requestSection={false}
            jobOrderNumber={jobOrderNumber}
            SOSStatusUpdate={SOSStatusUpdate}
          />
        </div>
      }
    </div>
  );
};

export default Sosrequest;
