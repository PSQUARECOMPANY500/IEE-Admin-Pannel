import React, { useState, useEffect, useLayoutEffect } from "react";
import NotificationSlides from "./NotificationSlides";
import { getNotificationDataAction } from "../../../../ReduxSetup/Actions/AdminActions";

import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import callbackicon from "../../../../../src/Assets/Images/NotificationIcons/callback.png";
import sparePrtReqwuestIcon from "../../../../../src/Assets/Images/NotificationIcons/repair.png";

import attendance from "../../../../../src/Assets/Images/NotificationIcons/calendar.png"; //TODO:

import messageIcon from "../../../../../src/Assets/Images/NotificationIcons/messageIcon.png";

import referalIcon from "../../../../../src/Assets/Images/NotificationIcons/refer.png";
import leaveIcon from "../../../../../src/Assets/Images/NotificationIcons/leaveIcon.png";

import rating from "../../../../../src/Assets/Images/NotificationIcons/rating.png";

const NotificationSection = ({ cancelNotification }) => {
  const dispatch = useDispatch();
  const [lengthCount, setLengthCount] = useState({
    All: 0,
    Client: 0,
    Enginner: 0,
  });

  const [allnotificationdata, setallNotificationData] = useState();
  const [combineNotifications, setConbineNotifications] = useState();
  const [Enggnotificationdata, setEnggNotificationData] = useState();
  const [Clientnotificationdata, setClientNotificationData] = useState();
  const [moveLeft, setMoveLeft] = useState(5);
  const [moveWidth, setMoveWidth] = useState(15);

  const length =
    combineNotifications?.length +
    Enggnotificationdata?.length +
    Clientnotificationdata?.length;

  useEffect(() => {
    const getNotificationData = async () => {
      dispatch(getNotificationDataAction());
    };

    getNotificationData();
  }, [dispatch]);

  const getAllNotification = useSelector(
    (state) =>
      state?.AdminRootReducer?.getNotificationDataAction?.NotificationsData
  );

  useEffect(() => {
    if (getAllNotification) {
      setallNotificationData(getAllNotification);
    }
  }, [getAllNotification]);

  useEffect(() => {
    if (allnotificationdata) {
      //----------------------------------------------------------------
      const enggNotifications = allnotificationdata.response.filter((data) => {
        return data.Owner.includes("Engg");
      });
      const enggNotificationData = enggNotifications.map((data) =>
        JSON.parse(data.Data)
      );
      setEnggNotificationData(enggNotificationData);

      //----------------------------------------------------------------
      const clientNotifications = allnotificationdata.response.filter(
        (data) => {
          return data.Owner.includes("Client");
        }
      );
      const clientNotificationData = clientNotifications.map((data) =>
        JSON.parse(data.Data)
      );
      setClientNotificationData(clientNotificationData);

      //----------------------------------------------------------------
      const BothNotification = allnotificationdata.response.map((data) =>
        JSON.parse(data.Data)
      );
      setConbineNotifications(BothNotification);
    }
  }, [allnotificationdata]);

  useEffect(() => {
    handleNotificationData("All");
  }, [combineNotifications]);

  const [notification, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const caluclateNumberOfNotification = (notification) => {
    return notification
      ?.map((notification) => notification)
      ?.filter((data) => data !== null);
  };

  const handleNotificationData = (category) => {
    if (category === "All") {
      setNotifications(combineNotifications);
      setSelectedCategory(category);
      setMoveLeft(5);
      setMoveWidth(15);
    } else if (category === "Engineer") {
      setNotifications(Enggnotificationdata);
      setSelectedCategory(category);
      setMoveLeft(35);
      setMoveWidth(23);
    } else if (category === "Client") {
      setNotifications(Clientnotificationdata);
      setSelectedCategory(category);
      setMoveLeft(76);
      setMoveWidth(18);
    }
  };

  useEffect(() => {
    setLengthCount({
      All: caluclateNumberOfNotification(combineNotifications)?.length,
      Enginner: caluclateNumberOfNotification(Enggnotificationdata)?.length,
      Client: caluclateNumberOfNotification(Clientnotificationdata)?.length,
    });
  }, [combineNotifications, Enggnotificationdata, Clientnotificationdata]);

  const timeCalucalte = (time) => {
    const sortedTime = time.slice(11, 19);
    const specificTime = moment(sortedTime, "HH:mm:ss");
    const currentTime = moment();
    const difference = currentTime.diff(specificTime, "hours");

    return difference + " hours ago";
  };

  const generateMessage = (notification) => {
    if (notification?.data?.callbackId && notification?.data?.Slot) {
      return null;
    }
    if (notification?.data?.RequestId && notification?.data?.Slot) {
      return null;
    }
    if (notification?.data?.isVerify === false) {
      return null;
    }

    if (notification?.data?.callbackId) {
      return {
        title: "New Callback Request",
        message: `${notification?.data?.JobOrderNumber} has requested a callback regarding ${notification?.data?.Description}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: callbackicon,
      };
    }

    if (notification?.data?.RequestId) {
      return {
        title: "New Service Request",
        message: `${notification?.data?.JobOrderNumber} has requested a service.`,
        time: timeCalucalte(notification?.time),
        imageIcon: callbackicon,
      };
    }

    if (notification?.data?.Check_In) {
      return {
        title: "Engineer Attendence",
        message: `${notification?.data?.ServiceEnggId} has just checked in.`,
        time: timeCalucalte(notification?.time),
        imageIcon: attendance,
      };
    }

    if (notification?.data?.SubSparePartName) {
      return {
        title: "Spare Part Request",
        message: `${notification?.data?.EnggId} has requested ${notification?.data?.quantity} ${notification?.data?.SubSparePartName} with ${notification?.data?.RequestType}.Please review the request`,
        time: timeCalucalte(notification?.time),
        imageIcon: sparePrtReqwuestIcon,
      };
    }

    if (notification?.data?.ChatId) {
      return {
        title: "Message",
        message: `${notification?.data?.Content} from ${notification?.data?.ChatId}`,
        time: timeCalucalte(notification?.time),
        imageIcon: messageIcon,
      };
    }

    if (notification?.data?.Hot) {
      return {
        title: "Referal",
        message: `This ${notification?.data?.jobOrderNumber} has requested a referal for ${notification?.data?.Name} from ${notification?.data?.City}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: referalIcon,
      };
    }

    if (
      notification?.data?.IsApproved === "false" &&
      notification?.data?.Leave_Reason
    ) {
      return {
        title: "Leave Request",
        message: `This ${notification?.data?.ServiceEnggId} has requested a leave for ${notification?.data?.Leave_Reason} from ${notification?.data?.Duration?.From} to ${notification?.data?.Duration?.To}.`,
        time: timeCalucalte(notification?.time),
        imageIcon: leaveIcon,
      };
    }

    if (
      notification?.data?.Questions &&
      notification?.data?.Rating &&
      notification?.data?.Description
    ) {
      return {
        title: "Rating",
        message: `${notification?.data?.JobOrderNumber} give ${notification?.data?.Rating} out of 5 to ${notification?.data?.ServiceEnggId} .`,
        time: timeCalucalte(notification?.time),
        imageIcon: rating,
      };
    }
  };

  const filteredNotifications = notification
    ?.map((notification) => generateMessage(notification))
    ?.filter((data) => data !== null);

  return (
    <div className="parent-Notification-div">
      <div className="child-notification-div">
        <div className="notification-body">
          <div className="notification-heading">
            <p>Notification</p>
            <p>{lengthCount.All}</p>
          </div>

          <div className="notification-navigators">
            <div
              className={`notification-buttons ${
                selectedCategory === "All" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("All")}
            >
              <p>All</p>
              <p>{(lengthCount && lengthCount.All) || 0}</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Enginner" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Enginner")}
            >
              <p>Engineer</p>
              <p>{(lengthCount && lengthCount.Enginner) || 0}</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Client" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Client")}
            >
              <p>Client</p>
              <p>{(lengthCount && lengthCount.Client) || 0}</p>
            </div>
          </div>
          <div
            className="notification-bg-line"
            style={{ left: moveLeft + "%", width: moveWidth + "%" }}
          ></div>
        </div>

        <div className="notification-archives">
          <NotificationSlides notifications={filteredNotifications} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
