import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import SoSCallsShow from "../../../AdminPannel/Component/SOSSubComponent/SoSCallsShow";
import SosModal from "../SOSSubComponent/SoSModalAction";
import { useDispatch, useSelector } from "react-redux";
import AddTicketOnCallRequests from "../DashboardSubComponent/AddTicketOnCallRequests";
import { updateSOSStatus } from "../../../../ReduxSetup/Actions/AdminActions";
const Sosrequest = () => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false);
  const [jobOrderNumber, setjobOrderNumber] = useState({
    jon: null,
    _id: null,
    status: null
  });
  const [callbackModal, showCallbackModal] = useState(false);
  const SOSStatusUpdate = useSelector((state) =>
    state.AdminRootReducer?.updateSoSStatus?.status
  );

  const closeModal = () => {
    showCallbackModal(false)
  };

  function handleDropDownClick(jon) {
    setDropdown((prev) => !prev)
    if (jon) {
      setjobOrderNumber(jon)
    }
  }

  useEffect(() => {
    if (SOSStatusUpdate?.success) {
      if (SOSStatusUpdate?.status === "RaisedCallback") {
        showCallbackModal(true)
        setjobOrderNumber((prev) => ({
          ...prev,
          status: SOSStatusUpdate?.status
        }));
      }
      handleDropDownClick()
    }

    return (() => {
      dispatch(updateSOSStatus())
    })
  }, [SOSStatusUpdate?.success])

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
      <SoSCallsShow handleDropDownClick={handleDropDownClick} jobOrderNumber={jobOrderNumber} />
      {dropdown &&
        <div className="engineer-modal-wrapper">
          <div className="SOS-Action-modal-container" ref={formRef}>
            <SosModal handleDropDownClick={handleDropDownClick} jobOrderNumber={jobOrderNumber} SOSStatusUpdate={SOSStatusUpdate} />
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
