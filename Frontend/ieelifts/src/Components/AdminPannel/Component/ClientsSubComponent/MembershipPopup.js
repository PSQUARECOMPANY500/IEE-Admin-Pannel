import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import InnerMembershipPopup from "./InnerMembershipPopup";

const MembershipPopup = ({ onClose, selectedOption, JobOrderNumber }) => {
  console.log("selectedOption", selectedOption);

  const [openPop, setOpenPop] = useState(false);

  const handleClose = () => {
    setOpenPop(false);
    onClose();
  };

  return (
    <>
      <div className="membershippopup-main">
        <IoCloseOutline
          onClick={onClose}
          className="closeIconmembershippopup"
        />
        <div className="membershippopup-center">
          <div className="membershippopup-inner">
            <h4>
              Do you want to change <br /> the membership?
            </h4>
          </div>
          <div className="membershippopup-btn">
            <button onClick={onClose}>No</button>
            <button onClick={() => setOpenPop(true)}>Yes</button>
          </div>
        </div>
      </div>

      {openPop && (
        <div className="innermembershippopup-modal-wrapper">
          <div className="innermembershippopup-modal-conntainer">
            <InnerMembershipPopup
              onClose={handleClose}
              selectedOption={selectedOption}
              JobOrderNumber={JobOrderNumber}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MembershipPopup;
