import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'

const Attendance = () => {
  const ACalendarRef = useRef(null);
  const AMonthyearRef = useRef(null);
  const ADayContainerRef = useRef(null);

  const [acurrentDate, setACurrentDate] = useState(new Date());
  const [aselectedDate, setASelectedDate] = useState(null);


  const AhandlePrevClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
    ArenderCalendar();
  };

  const AhandleNextClick = () => {
    setACurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
    ArenderCalendar();
  };

  const ahandleDayClick = (day) => {
    const newSelectedDate = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    setASelectedDate(newSelectedDate);

    // OnDateChange(newSelectedDate)
    // dateInputRef.current.value = newSelectedDate.toLocaleDateString("en-US");
    // calendarRef.current.style.display = "none";
    ArenderCalendar();
  };

  const acreateDayElement = (day) => {
    const date = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      day
    );
    const dayElement = document.createElement("div");
    dayElement.classList.add("aday");

    if (date.toDateString() === new Date().toDateString()) {
      dayElement.classList.add("current");
    }
    if (
      aselectedDate &&
      date.toDateString() === aselectedDate.toDateString()
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.textContent = day;
    dayElement.addEventListener("click", () => {
      ahandleDayClick(day);
    });
    ADayContainerRef.current.appendChild(dayElement);
  };



  const ArenderCalendar = () => {

    if (!ADayContainerRef.current) {
      return;
    }

    ADayContainerRef.current.innerHTML = "";
    const firstDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      acurrentDate.getFullYear(),
      acurrentDate.getMonth() + 1,
      0
    );

    AMonthyearRef.current.textContent = `${acurrentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    )} ${acurrentDate.getFullYear()}`;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daysHeader = document.createElement("div");
    daysHeader.classList.add("days-header");

    daysOfWeek.forEach(dayOfWeek => {
      const dayHeader = document.createElement("div");
      dayHeader.textContent = dayOfWeek;
      daysHeader.appendChild(dayHeader);
    });

    const firstDayIndex = firstDay.getDay();


    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty-cell");
      ADayContainerRef.current.appendChild(emptyCell);
  }

    ADayContainerRef.current.appendChild(daysHeader);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      acreateDayElement(day);
    }
  };





 
  const DateSelect=()=>{

    const surroundingDates = [];
    if(!aselectedDate){
      return;
    }

    // // // Calculate the preceding dates
    for (let i = 2; i > 0; i--) {
  
        const precedingDate = new Date(aselectedDate);
        precedingDate.setDate(aselectedDate.getDate() - i);
        surroundingDates.push(precedingDate);
      
    }
    
    // Add the selected date
    surroundingDates.push(aselectedDate);
    
    // Calculate the following dates
    for (let i = 1; i <= 2; i++) {
    
        const followingDate = new Date(aselectedDate);
        followingDate.setDate(aselectedDate.getDate() + i);
        surroundingDates.push(followingDate);
    }
    
    // Display the surrounding dates
    surroundingDates.forEach(date => {
        console.log(date.toDateString());
    });
  }

  useEffect(() => {
    ArenderCalendar();
    DateSelect();
  }, [acurrentDate,aselectedDate]);
  return (
    <div className='Attendance'>
      <div className="Attendancecalendar" id="Attendancecalendar" ref={ACalendarRef}>
        <div className="header Attendacne-header">
          <button id="aprevBtn">
            <FaChevronLeft onClick={AhandlePrevClick}/>

          </button>
          <h2 id="monthYear" ref={AMonthyearRef} >
            Month Year
          </h2>
          <button id="anextBtn" >
            <FaChevronRight onClick={AhandleNextClick} id="ArrowSize" />
          </button>
        </div>
        <div className="adays" id="daysContainer" ref={ADayContainerRef} ></div>
      </div>
      <div className="DatesContainer">
        <div className="DatesCard">
       <div className="DateCardData">
        <h5>15</h5>
        <h5>MON</h5>
       </div>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check In</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check out</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Total Hours</h5>
       </div>
  
        </div>
      
        <div className="DatesCard">
       <div className="DateCardData">
        <h5>15</h5>
        <h5>MON</h5>
       </div>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check In</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check out</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Total Hours</h5>
       </div>
  
        </div>
     
        <div className="DatesCard">
       <div className="DateCardData">
        <h5>15</h5>
        <h5>MON</h5>
       </div>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check In</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check out</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Total Hours</h5>
       </div>
  
        </div>
     
        <div className="DatesCard">
       <div className="DateCardData">
        <h5>15</h5>
        <h5>MON</h5>
       </div>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check In</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check out</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Total Hours</h5>
       </div>
  
        </div>
     
        <div className="DatesCard">
       <div className="DateCardData">
        <h5>15</h5>
        <h5>MON</h5>
       </div>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check In</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Check out</h5>
       </div>
       <span className='HoriZontalLine AHoriZontalLine'></span>
       <div className="DateCardData">
        <h5>15:15</h5>
        <h5>Total Hours</h5>
       </div>
  
        </div>
     
     
      </div>
    </div>
  )
}

export default Attendance