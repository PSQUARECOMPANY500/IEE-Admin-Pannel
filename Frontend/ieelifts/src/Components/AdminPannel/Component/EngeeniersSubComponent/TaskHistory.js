
    
      import React from "react";
      import { FaStar } from "react-icons/fa";
      
      const TaskHistory = () => {


        const serviceData = [
          {
            date: "2024-02-30",
            name: "Aayush",
            address: "BHOPAL Bhopal Bhopal bhopal bhopal bhopal",
            startTime: "3:00",
            endTime: "5:00",
            rating: "4.3",
          },
          {
            date: "2024-02-30",
            name: "John",
            address: "DELHI Delhi Delhi delhi delhi delhi",
            startTime: "4:00",
            endTime: "6:00",
            rating: "4.5",
          },
          {
            date: "2024-02-30",
            name: "Alice",
            address: "MUMBAI Mumbai Mumbai mumbai mumbai mumbai",
            startTime: "5:00",
            endTime: "7:00",
            rating: "4.7",
          },
          {
            date: "2024-02-10",
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
            date: "2024-02-30",
            name: "Aayush",
            address: "BHOPAL Bhopal Bhopal bhopal bhopal bhopal",
            startTime: "3:00",
            endTime: "5:00",
            rating: "4.3",
          },
          {
            date: "2024-02-28",
            name: "John",
            address: "DELHI Delhi Delhi delhi delhi delhi",
            startTime: "4:00",
            endTime: "6:00",
            rating: "4.5",
          },
          {
            date: "2024-02-27",
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
            date: "2024-02-20",
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
            date: "2024-02-27",
            name: "Bob",
            address: "CHENNAI Chennai Chennai chennai chennai chennai",
            startTime: "6:00",
            endTime: "8:00",
            rating: "4.8",
          },

          {
            date: "2024-02-30",
            name: "Bob",
            address: "CHENNAI Chennai Chennai chennai chennai chennai",
            startTime: "6:00",
            endTime: "8:00",
            rating: "4.8",
          },
        ];
      
   
        const serviceDataByDate = groupByDate(serviceData);
        const callBackDataByDate = groupByDate(callBackData);
  
        const allDates = Object.keys(serviceDataByDate).concat(Object.keys(callBackDataByDate));
        const uniqueSortedDates = Array.from(new Set(allDates)).sort((a, b) => new Date(b) - new Date(a));
      
        function groupByDate(data) {
          return data.reduce((acc, item) => {
            acc[item.date] = acc[item.date] || [];
            acc[item.date].push(item);
            return acc;
          }, {});
        }
      
        function getMaxElementCount(date) {
          const serviceCount = serviceDataByDate[date] ? serviceDataByDate[date].length : 0;
          const callBackCount = callBackDataByDate[date] ? callBackDataByDate[date].length : 0;
          return Math.max(serviceCount, callBackCount);
        }
      
        return (
          <div className="TaskHistory">
            <div className="TaskHeading">
              <h5>Services</h5>
              <h5>Callbacks</h5>
            </div>
            <div className="AllTask Yello_Scrollbar">
              <div className="ServicContainer">
                {uniqueSortedDates.map((date) => (
                  <div key={date} className="Services">
                    <div className="DateHeading">
                      <h5>{date}</h5>
                    </div>
                    <div className="AllServices">
                      {(serviceDataByDate[date] || []).map((service, index) => (
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
                      {[...Array(getMaxElementCount(date) - (serviceDataByDate[date] ? serviceDataByDate[date].length : 0))].map((_, index) => (
                        <div key={`empty-service-${index}`} className="ServiceCards" style={{opacity:'0'}}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
      
              <div className="CallbackContainer">
                {uniqueSortedDates.map((date) => (
                  <div key={date} className="CallBacks">
              
                    <div className="AllCallback">
                      {(callBackDataByDate[date] || []).map((service, index) => (
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
                      {[...Array(getMaxElementCount(date) - (callBackDataByDate[date] ? callBackDataByDate[date].length : 0))].map((_, index) => (
                        <div key={`empty-callback-${index}`} className="CallBackCards" style={{opacity:'0'}}></div>
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
      


   