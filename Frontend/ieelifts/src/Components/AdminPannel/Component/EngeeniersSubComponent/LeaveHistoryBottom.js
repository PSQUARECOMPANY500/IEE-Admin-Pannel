import React from 'react'
import { SlLink } from 'react-icons/sl'

const LeaveHistoryBottom = () => {
  return (
    <div className="LeaveHistoryBottom">
    <div className="SubLeaveHistoryBottom">
      <div className="ReqMainContainer">
        <h5>Leave Request</h5>
        <div className="ReqContainer">
          <div className="ReqContainerL">
            <h5>Type of leave</h5>
            <h5>Sick Leave</h5>
          </div>
          <div className="HoriZontalLine"></div>
          <div className="ReqContainerR">
            <h5>Duration</h5>

            <div className="ReqRDuration">
              <h6>12/02/2024</h6>
              <h6>to</h6>
              <h6>12/02/2024</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="ResMainContainer">
        <h5>Reason</h5>
        <div className="ResContainer">
          <SlLink />
        </div>
      </div>

      <div className="Buttons">
        <button>Deny</button>
        <button>Approve</button>
      </div>
    </div>
  </div>
  )
}

export default LeaveHistoryBottom