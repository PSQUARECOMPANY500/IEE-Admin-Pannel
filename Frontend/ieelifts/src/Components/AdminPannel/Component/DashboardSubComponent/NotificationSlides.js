import React, { useState, useEffect } from "react";

const NotificationSlides = ({ notifications }) => {
  const [key, setKey] = useState(0);
  console.log("popo", key);

  useEffect(() => {
    // Increment the key to force re-render and trigger the animation
    setKey((prevKey) => prevKey + 1);
  }, [notifications]);

  return (
    <div
      key={key}
      className="notification-all">
      {" "}
      {notifications.map((notification, index) => (
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
            <p>
              <img
                src="https://ieelifts.com/wp-content/uploads/2023/08/03-972x1024.jpg"
                alt="img"
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "100%",
                }}
              />
            </p>
          </div>

          <div className="user-notification-message">
            <div className="noti-dec-time">
              <p>deccription fwbeifc wfc w co wu ciow ds</p>
              <p>{notification.time}</p>
            </div>
            <div className="notification-buttons-operations">
              <p>Accept</p>
              <p>Decline</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSlides;
