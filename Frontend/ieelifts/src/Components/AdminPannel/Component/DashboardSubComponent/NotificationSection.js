import React, { useState , useEffect} from "react";
import NotificationSlides from "./NotificationSlides";
import { getNotificationDataAction } from "../../../../ReduxSetup/Actions/AdminActions"

const NotificationSection = () => {
  const notifications = [
    {
      category: "All",
      description: "Notification text 1",
      time: "20 minutes ago",
      imageUrl: "https://example.com/image1.png",
    },
    {
      category: "Enginner",
      description: "Notification text 2",
      time: "30 minutes ago",
      imageUrl: "https://example.com/image2.png",
    },
    {
      category: "Client",
      description: "client text 3",
      time: "40 minutes ago",
      imageUrl: "https://example.com/image3.png",
    },
    {
      category: "Client",
      description: "client text 3",
      time: "40 minutes ago",
      imageUrl: "https://example.com/image3.png",
    },
    {
      category: "Client",
      description: "client text 3",
      time: "40 minutes ago",
      imageUrl: "https://example.com/image3.png",
    },
    {
      category: "Client",
      description: "client text 3",
      time: "40 minutes ago",
      imageUrl: "https://example.com/image3.png",
    },
    {
      category: "Client",
      description: "client text 3",
      time: "40 minutes ago",
      imageUrl: "https://example.com/image3.png",
    },
  ];

  const [ notificationdata, setNotificationData ] = useState();
  console.log("90909",notificationdata);

  const getNotificationData = async () => {
    const data = await getNotificationDataAction();
    setNotificationData(data);
  };

  useEffect(() => {
    getNotificationData();
  },[]);


  const [filteredNotifications, setFilteredNotifications] = useState([
    ...notifications,
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleNotificationData = (category) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);

      if (category === "All") {
        setFilteredNotifications(notifications);
      } else {
        const filtered = notifications.filter(
          (notification) => notification.category === category
        );
        setFilteredNotifications(filtered);
      }
    }
  };

  return (
    <div className="parent-Notification-div">
      <div className="child-notification-div">
        <div className="notification-body">
          <div className="notification-heading">
            <p>Notification</p>
            <p>25</p>
          </div>

          <div className="notification-navigators">
            <div
              className={`notification-buttons ${
                selectedCategory === "All" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("All")}
            >
              <p>All</p>
              <p>2</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Enginner" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Enginner")}
            >
              <p>Enginner</p>
              <p>5</p>
            </div>
            <div
              className={`notification-buttons ${
                selectedCategory === "Client" ? "activeNotification" : ""
              }`}
              onClick={() => handleNotificationData("Client")}
            >
              <p>Client</p>
              <p>4</p>
            </div>
          </div>
        </div>

        <div className="notification-archives">
          <NotificationSlides notifications={filteredNotifications} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
