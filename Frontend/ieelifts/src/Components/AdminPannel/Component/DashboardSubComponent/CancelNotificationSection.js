import React, { useState, useEffect, useLayoutEffect } from "react";
import NotificationSlides from "./NotificationSlides";
import { FcCancel } from "react-icons/fc";
import { getClientCancelServiceCallbackDataAction } from "../../../../ReduxSetup/Actions/AdminActions"

import cancelRequest from "../../../../../src/Assets/Images/NotificationIcons/calendar.png";


import { useDispatch,useSelector } from "react-redux";




const CancelNotificationSection = () => {
 const dispatch = useDispatch();

useEffect(() => {
  dispatch(getClientCancelServiceCallbackDataAction())
},[])

const generateMessage = (notification) => {
   return {
      title: "New Cancel Notification Request",
      message: `Service Engg ${notification.ServiceEnggId} have requested to cancel the service for JON ${notification.JobOrderNumber} for Date ${notification.Date} slot ${notification.Slot[0]}.`,
      time: "0m ago",
      imageIcon:cancelRequest,
      callbackId: notification.CallbackId ? notification.CallbackId : notification.RequestId,
      EnggId: notification.ServiceEnggId
    };  
}




const cancelRequestByClient = useSelector((state) => state?.AdminRootReducer?.getClientCancelServiceCallbackDataReducer?.cancelRequestsData?.cancelledRequests);
console.log("+++++++++++++++++++++++++++++++++++++++++",cancelRequestByClient)

const GenrateMessageNotification = cancelRequestByClient && cancelRequestByClient?.map((notification) => generateMessage(notification))
  
  return (
    <div className="parent-Notification-div">
      <div className="child-notification-div">
        <div className="notification-body">
          <div className="notification-heading">
            <p>Cancel Service Notification</p>
            <p>{GenrateMessageNotification?.length || 0}</p>
          </div>
        </div>

        <div className="notification-archives">
          <NotificationSlides
            notifications={GenrateMessageNotification}
            buttons={true}
          />
        </div>
      </div>
    </div>
  );
};



export default CancelNotificationSection