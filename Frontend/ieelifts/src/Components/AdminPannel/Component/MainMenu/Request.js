import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import RequestScheduledSection from "../ServiceRequestSubComponent/RequestScheduledSection";

const data = [
  {
    name: "Arjun Rawat1",
    date: "2024-01-04", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat2",
    date: "2024-01-04", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat3",
    date: "2024-01-02", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat4",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat5",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat6",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat7",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat8",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat9",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat10",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat11",
    date: "2024-01-02", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat12",
    date: "2024-01-04", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat13",
    date: "2024-01-04", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
  {
    name: "Arjun Rawat14",
    date: "2024-01-01", // Date in the format YYYY-MM-DD
    time: "09:00 AM",
    jobNumber: "2022199",
    jobType: "SAFETY AUDIT",
    profilePics: [
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    ],
  },
];

const Request = () => {
  const [date, setDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState(null);

  const onChange = (newDate) => {
    setDate(newDate);
    setAnimationDirection("slideToTop");
  };

  const filterDataByDate = () => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);

      return itemDate.getTime() === selectedDate.getTime();
    });
  };

  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    onChange(newDate);

    if (days < 0) {
      console.log("date is less then zero");
      setAnimationDirection("slideLeftToRight");
    } else if (days > 0) {
      console.log("date is greater then zero");
      setAnimationDirection("slideRightToLeft");
    } else {
      console.log("equal value");
      setAnimationDirection("slideToTop");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="Request-Container">
          <div className="calender-events-section">
            <div className="calender-section">
              <Calendar
                style
                showWeekNumbers
                onChange={onChange}
                value={date}
              />
            </div>

            <div className="event-detail-section">
              <div className="request-detail">
                <div className="date-swap-icon">
                  <div className="swap-icons">
                    <FaAngleLeft onClick={() => handleDateChange(-1)} />
                    <p style={{ width: "30%" }}>{date.toDateString()}</p>
                    <FaAngleRight onClick={() => handleDateChange(1)} />
                  </div>
                </div>

                <div className="parent-div-task-request">
                  {filterDataByDate().map((value) => (
                    <div
                      className="animation-all"
                      style={{ animationName: animationDirection }}
                    >
                      {/* one slot start from here */}

                      <div className="request-task-detail">
                        <div className="service-assign">
                          <div className="date-time">
                            <span>TIME</span>
                            <p>09:00 AM</p>
                          </div>

                          <div className="name-3dots">
                            <div className="name-jon">
                              <p>{value.name}</p>
                              <div className="jon-type">
                                <p>
                                  <span style={{ fontWeight: "500" }}>JON</span>
                                  :2022199
                                </p>
                                <p>SAFET AUDIT</p>
                              </div>
                            </div>

                            <div className="pic-3dots">
                              <div
                                className="pic"
                                style={{
                                  paddingTop: "2px",
                                  display: "flex",
                                }}
                              >
                                <div className="image-border-collapse">
                                  <img
                                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                                    width={40}
                                    className="profile-pic"
                                    alt="img"
                                  />
                                </div>
                                <div className="image-border-collapse2">
                                  <img
                                    src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                                    width={40}
                                    className="profile-pic"
                                    alt="img"
                                  />
                                </div>
                              </div>
                              <div className="dots3">
                                <HiOutlineDotsVertical />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* one slot ends from here */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <RequestScheduledSection />
        </div>
      </div>
    </>
  );
};

export default Request;
