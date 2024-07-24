import React, { useState } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceDateConatiner from "./AttendanceDateConatiner";
import LeaveHistory from "./LeaveHistory";
import LeaveHistoryBottom from "./LeaveHistoryBottom";
import { useSelector } from "react-redux";

const Attendance = (props) => {
  const { engID } = props;

  const [date, setTodayDate] = useState();
  console.log("date&&&&&&&&&&&&", date)

  const leaves = useSelector((state) => state?.AdminRootReducer?.engineerRequestedLeaveReducer?.requestedLeave?.leaves);

  const [leaveRequested, setleaveRequested] = useState(null);
  return (
    <div className="Attendance">
      <div className="CalendarHistory">
        <AttendanceCalendar setTodayDate={setTodayDate} />
        <AttendanceDateConatiner engID={engID} date={date} />
      </div>
      <div className="LeaveHistory">
        <div className="SubLeaveHistory">
          <LeaveHistory engID={engID} leaveRequested={leaveRequested} />
          {leaves && <div className="VerticalLinelarge "></div>}
          {leaves && <LeaveHistoryBottom engID={engID} setleaveRequested={setleaveRequested} leaves={leaves} />}
        </div>
      </div>
    </div>
  );
};

export default Attendance;