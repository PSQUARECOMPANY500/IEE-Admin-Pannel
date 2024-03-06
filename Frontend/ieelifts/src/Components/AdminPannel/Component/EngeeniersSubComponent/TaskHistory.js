import React from "react";
import { FaStar } from "react-icons/fa";

const TaskHistory = () => {
  const serviceData = [
    {
      date: "2024-02-27",
      name: "Aayush",
      address: "BHOPAL Bhopal Bhopal bhopal bhopal bhopal",
      startTime: "3:00",
      endTime: "5:00",
      rating: "4.3",
    },
    {
      date: "2024-02-27",
      name: "John",
      address: "DELHI Delhi Delhi delhi delhi delhi",
      startTime: "4:00",
      endTime: "6:00",
      rating: "4.5",
    },
    {
      date: "2024-02-26",
      name: "Alice",
      address: "MUMBAI Mumbai Mumbai mumbai mumbai mumbai",
      startTime: "5:00",
      endTime: "7:00",
      rating: "4.7",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI CHENNAI",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2023-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
  ];

  const callBackData = [
    {
      date: "2024-02-27",
      name: "Aayush",
      address: "BHOPAL Bhopal Bhopal bhopal bhopal bhopal",
      startTime: "3:00",
      endTime: "5:00",
      rating: "4.3",
    },
    {
      date: "2024-02-27",
      name: "John",
      address: "DELHI Delhi Delhi delhi delhi delhi",
      startTime: "4:00",
      endTime: "6:00",
      rating: "4.5",
    },
    {
      date: "2024-02-26",
      name: "Alice",
      address: "MUMBAI Mumbai Mumbai mumbai mumbai mumbai",
      startTime: "5:00",
      endTime: "7:00",
      rating: "4.7",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI CHENNAI",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-26",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2024-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
    {
      date: "2023-02-25",
      name: "Bob",
      address: "CHENNAI Chennai Chennai chennai chennai chennai",
      startTime: "6:00",
      endTime: "8:00",
      rating: "4.8",
    },
  ];

  const serviceDataByDate = serviceData.reduce((acc, service) => {
    acc[service.date] = acc[service.date] || [];
    acc[service.date].push(service);
    return acc;
  }, {});

  const callBackDataByDate = callBackData.reduce((acc, service) => {
    acc[service.date] = acc[service.date] || [];
    acc[service.date].push(service);
    return acc;
  }, {});

  const sortedDates = Object.keys(serviceDataByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const sortedCallBackDates = Object.keys(callBackDataByDate).s;

  return (
    <div className="TaskHistory">
      <div className="TaskHeading">
        <h5>Services</h5>
        <h5>Callbacks</h5>
      </div>
      <div className="AllTask ">
        <div className="ServicContainer Yello_Scrollbar">
          {sortedDates.map((date) => (
            <div key={date} className="Services">
              <div className="DateHeading">
                <h5>{date}</h5>
              </div>
              <div className="AllServices">
                {serviceDataByDate[date].map((service, index) => (
                  <div key={index} className="ServiceCards">
                    <table>
                      <tbody>
                        <tr>
                          <td className="service-table-item">NAME:</td>
                          <td className="service-table-item">{service.name}</td>
                        </tr>
                        <tr className="odd-row">
                          <td className="service-table-item">ADD:</td>
                          <td className="service-table-item">
                            {service.address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="ServiceCardsBottom">
                      <h5>{service.startTime}</h5>
                      <h5>{service.endTime}</h5>
                      <div className="star">
                        <h5>{service.rating}</h5>
                        <FaStar className="Icon_Color small-Icon" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="CallbackContainer Yello_Scrollbar">
          {sortedDates.map((date) => (
            <div key={date} className="CallBacks">
              <div className="callBackDateHeading">
                <h5>{date}</h5>
              </div>
              <div className="AllCallback">
                {serviceDataByDate[date].map((service, index) => (
                  <div key={index} className="CallBackCards">
                    <table>
                      <tbody>
                        <tr>
                          <td className="callback-table-item">NAME:</td>
                          <td className="callback-table-item">
                            {service.name}
                          </td>
                        </tr>
                        <tr className="odd-row">
                          <td className="callback-table-item">ADD:</td>
                          <td className="callback-table-item">
                            {service.address}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="CallBackCardsBottom">
                      <h5>{service.startTime}</h5>
                      <h5>{service.endTime}</h5>
                      <div className="star">
                        <h5>{service.rating}</h5>
                        <FaStar className="Icon_Color small-Icon" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskHistory;
