import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelEnggServiceRequestFormShiftingAction } from "../../../../ReduxSetup/Actions/AdminActions"

const NotificationSlides = ({ notifications, buttons, setTicketUpdate }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

 



  const openModal = (isCallback,callbackId,EnggId) => {
    dispatch(cancelEnggServiceRequestFormShiftingAction(isCallback,callbackId,EnggId))
  };

  const cancelRequestByClient = useSelector(
    (state) =>
      state?.AdminRootReducer?.getClientCancelServiceCallbackDataReducer
        ?.cancelRequestsData?.cancelledRequests
  );


  useEffect(() => {
    // Increment the key to force re-render and trigger the animation
    setKey((prevKey) => prevKey + 1);
  }, [notifications]);

  return (
    <div key={key} className="notification-all">
      {" "}
      {notifications?.map(
        (data, index) => (
          (
            <>
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
                    {buttons && <p onClick={() => openModal(data.iscallback,data.callbackId,data.EnggId)}>Re Assign</p>}
                    {/* <p>{data?.time}</p> */}
                  </div>
                </div>
              </div>
            </>
          )
        )
      )}
    </div>
  );
};

export default NotificationSlides;
