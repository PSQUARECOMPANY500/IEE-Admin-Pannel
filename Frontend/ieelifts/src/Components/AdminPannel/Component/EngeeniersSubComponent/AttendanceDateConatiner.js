import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEngineerAttendance } from '../../../../ReduxSetup/Actions/AdminActions';

const AttendanceDateConatiner = ({ date, engID }) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    let selectedDate;
    const updateDates = () => {
      const len = 5;
      const today = new Date(selectedDate);

      const dates = Array.from(
        {
          length: len,
        },
        (_, i) => {
          const previousDay = new Date(today);
          previousDay.setDate(today.getDate() - 2 + i);
          return previousDay.toLocaleDateString("en-GB");
        }
      );
      setDates(dates);
    };

    console.log("i am here", engID);
    if (date && engID) {
      dispatch(getEngineerAttendance(engID, date));
      selectedDate = date;
    } else if (engID) {
      const today = new Date().toISOString().slice(0, 10);
      dispatch(getEngineerAttendance(engID, today));
      selectedDate = today;
    }
    updateDates();
  }, [dispatch, date, engID]);

  const attendance = useSelector((state) => state?.AdminRootReducer?.engineerAttendanceReducer?.attendance?.attendanceData);

  const getDayOfWeek = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const dateObj = new Date(year, month - 1, day);
    const options = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  };

  const calculateTotalHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "--";
    const checkInTime = new Date(`2000-01-01T${checkIn}`);
    const checkOutTime = new Date(`2000-01-01T${checkOut}`);
    const milliseconds = checkOutTime - checkInTime;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };
  console.log(dates, attendance);
  const renderDates = () => {
    const renderedDates = [];
    for (let i = 0; i < 5; i++) {
      renderedDates.push(
        <div className="DatesCard" style={{ cursor: "pointer" }} key={i}>
          <div className="DateCardData">
            <h5>{dates && dates[i] ? dates[i].split("/")[0] : "--"}</h5>
            <h5>{dates && dates[i] ? getDayOfWeek(dates[i]) : "--"}</h5>
          </div>
          <div className="DateCardData">
            <h5>{attendance && attendance[i]?.Check_In ? attendance[i].Check_In.time.substring(0, 5) : "--"}</h5>
            <h5>Check In</h5>
          </div>
          <span className="HoriZontalLine AHoriZontalLine"></span>
          <div className="DateCardData">
            <h5>{attendance && attendance[i]?.Check_Out ? attendance[i].Check_Out.time.substring(0, 5) : "--"}</h5>
            <h5>Check out</h5>
          </div>
          <span className="HoriZontalLine AHoriZontalLine"></span>
          <div className="DateCardData">
            <h5>{calculateTotalHours(attendance && attendance[i]?.Check_In?.time, attendance && attendance[i]?.Check_Out?.time)}</h5>
            <h5>Total Hours</h5>
          </div>
        </div>
      );
    }
    return renderedDates;
  };

  return (
    <div className="DatesContainer">
      {renderDates()}
    </div>
  );
};

export default AttendanceDateConatiner;