import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CabinFloors from "./CabinFloors";
import CartopShift from "./CartopShift";
import Invoice from "./Invoice";
import MCRoom from "./MCRoom";
import PitArea from "./PitArea";
import Rating from "./Rating";
import ReportIssue from "./ReportIssue";

function ReportTable({handleRedportData ,RedportData}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReport,setShowReport]=useState(true)
  

  console.log("handleRedportData",handleRedportData)

  const serviceId = RedportData
  // console.log("[[[[[[[[[[[[[[[[[[[[[[",serviceId); 

  console.log("teport data",RedportData);  

  const routes = [
    { name: "M/c Room", co: <MCRoom serviceId={serviceId}/> },
    { name: "Cabin,Floors", co: <CabinFloors serviceId={serviceId}/> },
    { name: "Cartop,Shaft", co: <CartopShift serviceId={serviceId} /> },
    { name: "PIT Area", co: <PitArea serviceId={serviceId} /> },
    { name: "Invoice", co: <Invoice serviceId={serviceId}/> },
    { name: "Rating", co: <Rating serviceId={serviceId}/> },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === routes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? routes.length - 1 : prevIndex - 1
    );
  };

  const CurrentComponent = routes[currentIndex].co;

  return (
    <div className="ReportTable">

     {handleRedportData?( <ReportIssue RedportData={RedportData}/>):(
       <div className="ReportNavigation">
        <div className="CarouselButtons">
          <div className="CarouselButtonsL">
            {currentIndex !== 0 ? (
              <FaChevronLeft onClick={goToPrev} className="cursor iconSize"  />
            ) : (
              ""
            )}
          </div>
          <div className="ComponentNames">
            <div className="ComponentNames">
              {currentIndex > 0 && (
                <div className="PreviousComponentName">
                  <p>{routes[currentIndex - 1].name}</p>
                </div>
              )}
              <div className="CurrentComponentName">
                <p
               
                >
                  {routes[currentIndex].name}
                </p>
              </div>
              {currentIndex < routes.length - 1 && (
                <div className="NextComponentName">
                  <p>{routes[currentIndex + 1].name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="CarouselButtonsR">
            {currentIndex !== routes.length - 1 && (
              <FaChevronRight onClick={goToNext} className="cursor  iconSize" />
            )}
          </div>
        </div>
        <div className="CarouselScroll">
          <div className="Progress1">
            <div
              className="Progress2"
              style={{ marginLeft: `${(currentIndex / routes.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {CurrentComponent}
      </div>  )}
    </div>
  );
}

export default ReportTable;
