import React, { useState, useEffect } from "react";
const NotificationSlides = ({ notifications }) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Increment the key to force re-render and trigger the animation
    setKey((prevKey) => prevKey + 1);
  }, [notifications]);

  return (
    <div key={key} className="notification-all">
      {" "}
      {notifications?.map((data, index) => (
        <div
          key={index}
          className="notification-data"
          style={{
            animation: `NotificationRightToLeft 1s ease-out ${
              index * 0.1
            }s backwards`, // Adjust the duration and delay as needed
          }}
        >
          <div className="user-notification-image">
            <p className="icon-styling">
              <img
                src={data?.imageIcon}
                alt="img"
                style={{
                  height: "18px",
                  width: "18px",
                }}
              />
            </p>
          </div>

          <div className="user-notification-message">
            <div className="noti-dec-time">
              <p>{data?.title}</p>
              <p>{data?.message}</p>
            </div>
            <div className="notification-buttons-operations">
              {/* <p>Review</p> */}
              {/* <p>{data?.time}</p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSlides;
