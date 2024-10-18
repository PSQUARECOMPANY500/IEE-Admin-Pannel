import React, { useState } from "react";
import uploadicon from "../../../../Assets/Images/uploadicon.svg";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { upgradeClientMembershipByAdminPannelAction } from "../../../../ReduxSetup/Actions/AdminActions";
import toast from "react-hot-toast";

const InnerMembershipPopup = ({ onClose, selectedOption, JobOrderNumber }) => {
  const dispatch = useDispatch();
  const handleFileUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [membershipInvoice, setMembershipInvoice] = useState("");
  
  const handleFormData = () => {
    if (!amount || !duration || !date || !membershipInvoice) {
      toast.error("Please fill all the required fields");
      return;
    } else {
      const formData = new FormData();
      
      console.log(`InnerMembershipPopup`,JobOrderNumber)
      
      formData.append("JobOrderNumber", JobOrderNumber);
      formData.append("PricePaid", amount);
      formData.append("Duration", duration);
      formData.append("StartDate", date);
      formData.append("MembershipType", selectedOption);
      formData.append("MembershipInvoice", membershipInvoice);

      dispatch(upgradeClientMembershipByAdminPannelAction(formData));

      setAmount("")
      setDuration("")
      setDate("")
      setMembershipInvoice(null)
    }
  };

  return (
    <div className="innerMembershipPopup-main">
      <IoCloseOutline onClick={onClose} className="closeIconmembershippopup" />

      <div className="innerMembershipPopup-center">
        <div className="innerMembershipPopup-inner">
          <input
            type="Number"
            placeholder="Amount"
            value={amount}
            autoComplete="off"
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="Number"
            autoComplete="off"
            value={duration}
            placeholder="Duration in Months"
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            type="text"
            autoComplete="off"
            placeholder="mm/dd/yyyy"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div
            className="file-upload"
            onClick={handleFileUploadClick}
            style={{ opacity: membershipInvoice?.name ? "1.4" : "0.4" }}
          >
            <input
              type="file"
              autoComplete="off"
              id="fileInput"
              className="fileInput"
              onChange={(e) => setMembershipInvoice(e.target.files[0])}
            />
            <label>
              <span className="invoise">
                {membershipInvoice?.name
                  ? membershipInvoice?.name
                  : "upload Invoice"}
              </span>
              <img src={uploadicon} alt="" className="file-upload-icon" />
            </label>
          </div>
        </div>
        <div className="innerMembershipPopup-btn">
          <button onClick={onClose}>Cancel</button>
          <button id="submit-innermembership" onClick={handleFormData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InnerMembershipPopup;
