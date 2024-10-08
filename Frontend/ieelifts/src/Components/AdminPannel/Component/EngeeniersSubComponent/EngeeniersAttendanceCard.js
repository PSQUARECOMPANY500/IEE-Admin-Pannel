import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import EnggLocation from "../DashboardSubComponent/EnggLocationSection/EnggLocation";
import Arrow from "../../../../Assets/Images/arrow.png";
import { getCheckInCheckOuts } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";
import EnggLocationHistoryModal from "../DashboardSubComponent/EnggLocationSection/EnggLocationHistoryModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EngeeniersAttendanceCard = ({ onClose, engID, selectedDateIndex }) => {

  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", engID, selectedDateIndex);

  const [isCliked, setIsCliked] = useState(false);
  const [isCliked2, setIsCliked2] = useState(false);
  const [isCliked3, setIsCliked3] = useState(false);
  const [isCliked4, setIsCliked4] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [checkInCheckOutData, setCheckInCheckOutData] = useState([]);

  // console.log("planttt",checkInCheckOutData)

  const handleImage = () => {
    setIsCliked(!isCliked);
    setIsArrowVisible(!isArrowVisible);
  };

  const handleImage2 = () => {
    setIsCliked2(!isCliked2);
    setIsArrowVisible(!isArrowVisible);
  };
  const handleImage3 = () => {
    setIsCliked3(!isCliked3);
    setIsArrowVisible(!isArrowVisible);
  };
  const handleImage4 = () => {
    setIsCliked4(!isCliked4);
    setIsArrowVisible(!isArrowVisible);
  };

  const handleRightClick = () => {
    if (isCliked) {
      setIsCliked2(true);
      setIsCliked(false);
    }
    else {
      setIsCliked4(true);
      setIsCliked3(false);
    }
  }
  const handleLeftClick = () => {
    if (isCliked2) {
      setIsCliked(true);
      setIsCliked2(false);
    }
    else {
      setIsCliked3(true);
      setIsCliked4(false);
    }
  }

  const handleBack = () => {
    setIsCliked3(false);
    setIsCliked(false);
    setIsCliked4(false);
    setIsCliked2(false);
    setIsArrowVisible(false);
  }

  useEffect(() => {
    const getData = async () => {
      const getCheckInOut = await getCheckInCheckOuts(
        engID,
        selectedDateIndex
      );
      setCheckInCheckOutData(getCheckInOut);
    };

    getData();
  }, []);

  return (
    <div className="engeeniersattendancecard-main">
      <div className="engeeniersattendancecard-left">
        <button id="checkin">Check in</button>
        {
          (isCliked || isCliked3) && <div onClick={handleRightClick} className="Arrow-engeeniersattendancecardleft">
            <FaArrowRight />
          </div>
        }
        {
          (isCliked2 || isCliked4) && <div onClick={handleLeftClick} className="Arrow-engeeniersattendancecardleft Arrow-engeeniersattendancecardRight">
            <FaArrowLeft />
          </div>
        }
        <div
          onClick={handleImage}
          className={
            isCliked
              ? "engeeniersattendancefullImage"
              : "engeeniersattendancecard-box"
          }
        >
          <img
            src={
              checkInCheckOutData?.Check_In?.engPhoto.split(" ")[0] ? `${config.documentUrl}/uplodes/${checkInCheckOutData?.Check_In?.engPhoto.split(" ")[0]}` : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
            }
          ></img>
        </div>
        <div
          onClick={handleImage2}
          className={
            isCliked2
              ? "engeeniersattendancefullImage"
              : "engeeniersattendancecard-box"
          }
        >


          <img
            src={
              checkInCheckOutData?.Check_In?.engPhoto.split(" ")[1]
                ? `${config.documentUrl}/uplodes/${checkInCheckOutData?.Check_In?.engPhoto.split(" ")[1]
                }`
                : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
            }
          ></img>
        </div>
        <button>Check Out</button>
        <div
          onClick={handleImage3}
          className={
            isCliked3
              ? "engeeniersattendancefullImage"
              : "engeeniersattendancecard-box2"
          }
        >


          <img
            src={
              checkInCheckOutData?.Check_In?.engPhoto.split(" ")[0]
                ? `${config.documentUrl}/uplodes/${checkInCheckOutData?.Check_Out?.engPhoto.split(" ")[0]
                }`
                : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
            }
          ></img>
        </div>
        <div
          onClick={handleImage4}
          className={
            isCliked4
              ? "engeeniersattendancefullImage"
              : "engeeniersattendancecard-box2"
          }
        >

          <img
            src={
              checkInCheckOutData?.Check_In?.engPhoto.split(" ")[1]
                ? `${config.documentUrl}/uplodes/${checkInCheckOutData?.Check_Out?.engPhoto.split(" ")[1]
                }`
                : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
            }
          ></img>

        </div>

      </div>
      <div className="engeeniersattendancecard-right">
        <div className="engeeniersattendancecard-right-inner">
          <button>Location</button>
          <IoCloseOutline
            onClick={onClose}
            className="closeIconengeeniersattendancecard"
          />
          <img
            onClick={handleBack}
            style={{ display: isArrowVisible ? "block" : "none" }}
            className="Arrow-engeeniersattendancecard"
            src={Arrow}
            alt=""
          />
        </div>

        <div className="engeeniersattendancecard-right-inner2">
          <div className="engeeniersattendancecard-description-section">
            <div className="engeeniersattendancecard-more-descriptive">
              <EnggLocationHistoryModal engID={engID} selectedDate={selectedDateIndex} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngeeniersAttendanceCard;
