
import React, { useEffect, useRef, useState } from "react";
import { SlLink } from "react-icons/sl";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceDateConatiner from "./AttendanceDateConatiner";
import LeaveHistory from "./LeaveHistory";
import LeaveHistoryBottom from "./LeaveHistoryBottom";

const Attendance = (props) => {
  const { engID } = props;
  console.log(engID)
  const ACalendarRef = useRef(null);
  const AMonthyearRef = useRef(null);
  const ADayContainerRef = useRef(null);

  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);
  var surroundingDates = [];

  
  return (
    <div className="Attendance">
          <div className="CalendarHistory">
          <AttendanceCalendar/>
          <AttendanceDateConatiner/>

          </div>


      <div className="LeaveHistory">
        <div className="SubLeaveHistory">
        < LeaveHistory/>

          <div className="VerticalLinelarge "></div>
         <LeaveHistoryBottom/>
        </div>
      </div>
    </div>
  );
};

export default Attendance;