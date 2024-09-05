import React, { useEffect, useState, useRef } from "react";
import SoSCallsShow from "../../../AdminPannel/Component/SOSSubComponent/SoSCallsShow";
import SosModal from "../SOSSubComponent/SoSModalAction";
import { useSelector } from "react-redux";
import AddTicketOnCallRequests from "../DashboardSubComponent/AddTicketOnCallRequests";
import SoSSentEngineerModal from "../SOSSubComponent/SoSSentEngineerModal";

const Sosrequest = () => {
  const [dropdown, setDropdown] = useState(false);
  const [jobOrderNumber, setjobOrderNumber] = useState({
    jon: null,
    _id: null,
    status: null,
    date: null,
    time: null,
    description: null,
    name: null,
    address: null,
    sosCallCount: null
  });
  const [callbackModal, showCallbackModal] = useState(false)
  const [sentEngineerForm, setSentEngineerForm] = useState(false)

  const SOSStatusUpdate = useSelector((state) =>
    state.AdminRootReducer?.updateSoSStatus?.status
  );

  const closeModal = () => {
    showCallbackModal(false)
    setSentEngineerForm(false)
  };

  const handleModalOpen = () => {
    showCallbackModal(true)
  }

  const handleSentEngineerModal = () => {
    setDropdown(false)
    setSentEngineerForm(true)
  }

  function handleDropDownClick(jon, status) {
    if (!status) {
      setDropdown((prev) => !prev)
      if (jon) {
        setjobOrderNumber(jon)
      }
    }
    else {
      setjobOrderNumber((prev) => ({
        ...prev,
        status: status
      }));
    }
  }
  useEffect(() => {
    if (!SOSStatusUpdate) {
      return;
    }
    if (SOSStatusUpdate.status === "falseAlarm" || SOSStatusUpdate.status === "ResolvedCall") {
      setDropdown(false);
    }
  }, [SOSStatusUpdate])

  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setDropdown(false)
      setSentEngineerForm(false)
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
          <div className="SOS-Action-modal-container"
            ref={formRef}>
            <SosModal handleDropDownClick={handleDropDownClick} setjobOrderNumber={setjobOrderNumber} jobOrderNumber={jobOrderNumber} SOSStatusUpdate={SOSStatusUpdate} showCallbackModal={() => handleModalOpen()}
              handleSentEngineerModal={handleSentEngineerModal}
            />
          </div>
        </div>
      }
      {sentEngineerForm &&
        <div className="engineer-modal-wrapper">
          <div className="SOS-SentEngineer-Modal" ref={formRef}>
            <SoSSentEngineerModal jobOrderNumber={jobOrderNumber} closeModal={() => { closeModal() }} />
          </div>
        </div>
      }
      {callbackModal &&
        <div>
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
