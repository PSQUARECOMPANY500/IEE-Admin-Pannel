import React, { useEffect, useState } from "react";
import { SlLink } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { approveLeaveByAdmin } from "../../../../ReduxSetup/Actions/AdminActions";
import toast from "react-hot-toast";

const LeaveHistoryBottom = ({ setleaveRequested, leaves, engID }) => {
  const [currentLeaveIndex, setCurrentLeaveIndex] = useState(0);
  const dispatch = useDispatch();

  const [leave, setLeave] = useState(null);

  useEffect(() => {
    if (leaves && leaves.length > 0) {
      setLeave(leaves[currentLeaveIndex]);
    } else {
      setLeave(null);
    }
  }, [leaves, currentLeaveIndex]);

  const handleApprove = async () => {
    if (leave && engID) {
      try {
        dispatch(approveLeaveByAdmin(leave._id, "Approved"));
        setCurrentLeaveIndex((prevIndex) => prevIndex + 1);
        setleaveRequested(leave);
        toast.success("Leave approved successfully")
      } catch (error) {
        toast.error("Internal Server Error")
      }
    }
  };

  const handleReject = async () => {
    if (leave && engID) {
      try {
        dispatch(approveLeaveByAdmin(leave._id, "Rejected"));
        setCurrentLeaveIndex((prevIndex) => prevIndex + 1);
        setleaveRequested(leave);
        toast.success("Leave rejected successfully")
      } catch (error) {
        toast.error("Internal Server Error")
      }
    }
  };

  return (
    <div className="LeaveHistoryBottom">
      {leave && (
        <div className="SubLeaveHistoryBottom">
          <div className="ReqMainContainer">
            <h5>Leave Request</h5>
            <div className="ReqContainer">
              <div className="ReqContainerL">
                <h5>Type of leave</h5>
                <h5>{leave.TypeOfLeave}</h5>
              </div>
              <div className="HoriZontalLine"></div>
              <div className="ReqContainerR">
                <h5>Duration</h5>
                <div className="ReqRDuration">
                  <h6>{leave.Duration.From}</h6>
                  <h6>to</h6>
                  <h6>{leave.Duration.To}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="ResMainContainer">
            <h5>Reason</h5>
            <div className="ResContainer">
              <h6>{leave.Leave_Reason}</h6>
              <SlLink />
            </div>
          </div>

          <div className="Buttons">
            <button onClick={handleReject}>Deny</button>
            <button onClick={handleApprove}>Approve</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveHistoryBottom;
