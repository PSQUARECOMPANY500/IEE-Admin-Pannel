import React, { useEffect, useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { GoCalendar } from "react-icons/go";
import ClientFormCalendar from "../../ClientsSubComponent/ClientsReusableComponent/ClientFormCalendar";

const AddTask = ({ onClose }) => {
  const [openCalender, setOpenCalender] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [clientFormData, setClientFormData] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  

  const handleDateChange = (date) => {
    setClientFormData((prev) => ({
      ...prev,
      dateOfHandover: date,
    }));
    console.log("dates===", date);
    setSelectedDate(date);
  };

  const handleOpenCalender = () => {
    setOpenCalender(true);
  };
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setOpenCalender(false);
    }
  };

  useEffect(() => {
    if (openCalender) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCalender]);

  return (
    <div className="addTask-main">
      <div className="addtask-upper">
        <div className="create-task">
          {" "}
          <p>Create Task</p>
          <RxCross1 onClick={onClose} className="closeAddtask" />
        </div>
        <form>
          <div className="task-content">
            <div className="task-content-inner">
              <p>Task Name</p>
              <input
                type="text"
                placeholder="Enter Task name"
                
                
              />
            </div>
            <div className="task-content-inner">
              <p>Member</p>
              <input
                type="text"
                placeholder="Enter Member id"
                
                
              />
            </div>
            <div className="task-content-inner">
              <p>Date</p>
              <input type="text" placeholder="dd-mm-yy"  />
              <GoCalendar
                className="calenderIcon"
                onClick={() => handleOpenCalender()}
              />
            </div>

            <div className="ClientFormCalendar-todo" ref={calendarRef}>
              {openCalender && (
                <ClientFormCalendar setTodayDate={handleDateChange} />
              )}
            </div>
            <div className="task-content-inner">
              <p>Status</p>
              {/* <input type="text" placeholder="Ongoing" /> */}

              <select
                id="cars"
                name="cars"
                placeholder="Ongoing"
                
                
              >
                <option value="volvo">Ongoing</option>
                <option value="saab">Saab 95</option>
                <option value="mercedes">Mercedes SLK</option>
                <option value="audi">Audi TT</option>
              </select>
            </div>

            <div className="task-content-inner">
              <p>Priority</p>
              {/* <input type="text" placeholder="High" /> */}
              <select
                id="cars"
                name="cars"
                placeholder="High"
                
                
              >
                <option value="volvo">High</option>
                <option value="saab">Saab 95</option>
                <option value="mercedes">Mercedes SLK</option>
                <option value="audi">Audi TT</option>
              </select>
            </div>
          </div>

          <div className="addtask-bottom">
            <button>
              <p>Create Task</p>
              <LuPlus className="plusIcon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
