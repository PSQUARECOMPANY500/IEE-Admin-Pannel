import React, { useState, useEffect } from "react";
import AddTicketModals from "./AddTicketModals";
import { getClientCancelServiceCallbackDataAction } from "../../../../ReduxSetup/Actions/AdminActions"
import { useDispatch, useSelector } from "react-redux";

const NotificationSlides = ({ notifications,buttons,setTicketUpdate }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const [showTicketModal1, setShowTicketModal1] = useState(false);
  const [renderTicket, setRenderTicket] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getClientCancelServiceCallbackDataAction());
  //   }, 1000);
  // }, [renderTicket, dispatch]);


const openModal = () => {
  setShowTicketModal1(true);
  console.log("pretttttttt")
  }


  const cancelRequestByClient = useSelector((state) => state?.AdminRootReducer?.getClientCancelServiceCallbackDataReducer?.cancelRequestsData?.cancelledRequests);

  console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",cancelRequestByClient);

  useEffect(() => {
    // Increment the key to force re-render and trigger the animation
    setKey((prevKey) => prevKey + 1);
  }, [notifications]);

  return (
    <div key={key} className="notification-all">
      {" "}
      {notifications?.map((data, index) => (
        console.log(")))))))))))))))))))))))))))",data),
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
            {buttons && <p onClick={() => openModal()}>Re Assign</p>}
              {/* <p>{data?.time}</p> */}
          
            </div>
          </div>
        </div>
            {showTicketModal1 && data.callbackId &&
              <AddTicketModals closeModal={() => setShowTicketModal1(false)}  showTicketModal={showTicketModal1}  callbackId={data.callbackId}  setRenderTicket={setRenderTicket} 
               setTicketUpdate={setTicketUpdate} enggId={data.EnggId} isAssigned={true} />}


        </>
      ))}
    </div>
  );
};

export default NotificationSlides;
