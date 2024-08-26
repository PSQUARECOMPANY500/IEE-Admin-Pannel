import React, { useEffect, useState, useRef } from "react";
import SoSCallsShow from "../../../AdminPannel/Component/SOSSubComponent/SoSCallsShow";
import SosModal from "../SOSSubComponent/SoSModalAction";
const Sosrequest = () => {
  const [dropdown, setDropdown] = useState(false);
  const [jobOrderNumber, setjobOrderNumber] = useState(null);

  function handleDropDownClick(jon) {
    setDropdown((prev) => !prev)
    if (jon) {
      setjobOrderNumber(jon)
    } else {
      setjobOrderNumber(null)
    }
  }

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
      <SoSCallsShow handleDropDownClick={handleDropDownClick} />
      {dropdown &&
        <div className="engineer-modal-wrapper">
          <div className="SOS-Action-modal-container" ref={formRef}>
            <SosModal handleDropDownClick={handleDropDownClick} jobOrderNumber={jobOrderNumber} />
          </div>
        </div>
      }
    </div>
  );
};

export default Sosrequest;
