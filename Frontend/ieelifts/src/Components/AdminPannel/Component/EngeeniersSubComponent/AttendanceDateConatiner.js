import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEngineerAttendance } from "../../../../ReduxSetup/Actions/AdminActions";
import EngeeniersAttendanceCard from "./EngeeniersAttendanceCard";

const AttendanceDateConatiner = ({ date, engID }) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);

  const [openCard, setOpenCard] = useState(false);

  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const handleCloseCard = () => {
    setOpenCard(false);
    setSelectedDateIndex(null);
  };

  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseCard();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

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

  const attendance = useSelector(
    (state) =>
      state?.AdminRootReducer?.engineerAttendanceReducer?.attendance
        ?.attendanceData
  );

  const getDayOfWeek = (dateStr) => {
    if (dateStr === "Invalid Date") return;

    const [day, month, year] = dateStr?.split("/");
    const dateObj = new Date(year, month - 1, day);

    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options)?.format(dateObj);
  };

  const calculateTotalHours = (checkIn, checkOut, checkintw, checkouttw) => {
    if (!checkIn || !checkOut) return "--";
    let checkInTime = new Date(`2000-01-01T${checkIn}`);
    let [hourss, minutess] = checkIn.split(":").map(Number);
    if (hourss >= 24) {
      checkInTime = new Date(`2000-01-02T${checkintw}`);
    }
    let checkOutTime = new Date(`2000-01-01T${checkOut}`);
    let [hours2, minutes2] = checkOut.split(":").map(Number);
    if (hours2 >= 24) {
      checkOutTime = new Date(`2000-01-02T${checkouttw}`);
    }

    // Adjust checkOut for times greater than or equal to "24:00"

    const milliseconds = checkOutTime - checkInTime;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  function convertTo24HourFormat(time) {
    const [hours, minutes] = time.split(":").map(Number);

    const normalizedHour = hours % 24;
    const formattedHour =
      normalizedHour < 10 ? `0${normalizedHour}` : normalizedHour;

    return `${formattedHour}:${minutes < 10 ? "0" + minutes : minutes}`;
  }

  function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(":").map(Number);

    let period = hours >= 12 ? "p.m" : "a.m";
    const normalizedHour = hours % 12 === 0 ? 12 : hours % 12;
    if (hours / 12 === 1) {
      period = "p.m";
    } else if (hours / 12 === 2) {
      period = "a.m";
    }
    const formattedHour =
      normalizedHour < 10 ? `0${normalizedHour}` : normalizedHour;

    return `${formattedHour}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
  }

  const renderDates = () => {
    const renderedDates = [];
    for (let i = 0; i < 5; i++) {
      let checkinTime = "";

      if (
        attendance &&
        attendance[i]?.Check_In &&
        attendance[i]?.Check_In?.time
      ) {
        checkinTime = convertTo24HourFormat(
          attendance[i].Check_In.time.substring(0, 5)
        );
      }
      let [checkinhours, minutes] = [null, null];
      if (checkinTime) {
        [checkinhours, minutes] = checkinTime.split(":").map(Number);
      }

      let checkoutTime = "";
      if (
        attendance &&
        attendance[i]?.Check_Out &&
        attendance[i]?.Check_Out?.time
      ) {
        checkoutTime = convertTo24HourFormat(
          attendance[i].Check_Out.time.substring(0, 5)
        );
      }
      let [checkouthours, minutes2] = [null, null];
      if (checkoutTime) {
        [checkouthours, minutes2] = checkoutTime.split(":").map(Number);
      }

      renderedDates.push(
        <>
          <div
            className="DatesCard"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenCard(true);
              setSelectedDateIndex(dates[i]);
            }}
            key={i}
          >
            <div className="DateCardData">
              <h5>{dates && dates[i] ? dates[i]?.split("/")[0] : "--"}</h5>
              <h5>{dates && dates[i] ? getDayOfWeek(dates[i]) : "--"}</h5>
            </div>
            <div className="DateCardData">
              {/* By Paras bug fix started*/}
              <h5>
                {attendance &&
                attendance[i]?.Check_In &&
                attendance[i]?.Check_In?.time
                  ? convertTo12HourFormat(
                      attendance[i].Check_In.time.substring(0, 5)
                    )
                  : "--"}
              </h5>
              {/* By Paras bug fix ended*/}
              <h5>Check In</h5>
            </div>
            <span className="HoriZontalLine AHoriZontalLine"></span>
            <div className="DateCardData">
              {/* By Paras bug fix started*/}
              <h5>
                {attendance &&
                attendance[i]?.Check_Out &&
                attendance[i]?.Check_Out?.time
                  ? convertTo12HourFormat(
                      attendance[i].Check_Out.time.substring(0, 5)
                    )
                  : "--"}
              </h5>
              {/* By Paras bug fix ended*/}
              <h5>Check out</h5>
            </div>
            <span className="HoriZontalLine AHoriZontalLine"></span>
            <div className="DateCardData">
              {/* By Paras bug fix started*/}
              <h5>
                {calculateTotalHours(
                  attendance && attendance[i]?.Check_In?.time,
                  attendance && attendance[i]?.Check_Out?.time,
                  attendance &&
                    attendance[i]?.Check_In?.time &&
                    convertTo24HourFormat(attendance[i]?.Check_In?.time),
                  attendance &&
                    attendance[i]?.Check_Out?.time &&
                    convertTo24HourFormat(attendance[i]?.Check_Out?.time)
                )}
              </h5>
              {/* By Paras bug fix ended*/}
              <h5>Total Hours</h5>
            </div>
          </div>

          {openCard && (
            <div className="client-modal-wrapper">
              <div
                ref={formRef}
                className="engeenierattendance-modal-container"
              >
                <EngeeniersAttendanceCard
                  onClose={handleCloseCard}
                  engID={engID}
                  selectedDateIndex={selectedDateIndex}
                />
              </div>
            </div>
          )}
        </>
      );
    }
    return renderedDates;
  };

  return <div className="DatesContainer">{renderDates()}</div>;
};

export default AttendanceDateConatiner;
