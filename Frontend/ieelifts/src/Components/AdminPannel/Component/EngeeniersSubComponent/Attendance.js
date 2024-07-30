import React, { useState, useEffect } from "react";
import AttendanceCalendar from "./AttendanceCalendar";
import AttendanceDateConatiner from "./AttendanceDateConatiner";
import LeaveHistory from "./LeaveHistory";
import LeaveHistoryBottom from "./LeaveHistoryBottom";
import { getRequstedLeaves } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";

const Attendance = (props) => {
  const { engID } = props;
  const dispatch = useDispatch();

  const [date, setTodayDate] = useState();
  const leaves = useSelector(
    (state) =>
      state?.AdminRootReducer?.engineerRequestedLeaveReducer?.requestedLeave
        ?.leaves
  );

  const [leaveRequested, setleaveRequested] = useState(null);
  useEffect(() => {
    if (engID) {
      dispatch(getRequstedLeaves(engID));
    }
  }, [engID, dispatch,leaveRequested]);

  console.log("leavess",leaves)


  return (
    <div className="Attendance">
      <div className="CalendarHistory">
        <AttendanceCalendar setTodayDate={setTodayDate} />
        <AttendanceDateConatiner engID={engID} date={date} />
      </div>
      <div className="LeaveHistory">
        <div className="SubLeaveHistory">
          <LeaveHistory
            engID={engID}
            leaveRequested={leaveRequested}
            leaves={leaves}
          />
          {leaves && leaves?.length > 0 && (
            <>
              <div className="VerticalLinelarge "></div>
              <LeaveHistoryBottom
                engID={engID}
                setleaveRequested={setleaveRequested}
                leaves={leaves}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
