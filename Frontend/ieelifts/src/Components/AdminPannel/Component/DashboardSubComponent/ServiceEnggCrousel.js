import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { data } from "./data";
import { LiaStarSolid } from "react-icons/lia";
import { TbMessage2 } from "react-icons/tb";
import TaskChart from "./TaskPieChart";
import MessageBox from "./MessageBox";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const ServiceEnggCrousel = () => {
  const [len, setLen] = useState(data.length);
  const sliderRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const MessageBoxRef = useRef(null);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setLen(data.length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        MessageBoxRef.current &&
        !MessageBoxRef.current.contains(event.target) &&
        !event.target.classList.contains("message-icon")
      ) {
        setShowMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MessageBoxRef]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    useTransform: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleMesageBox = (index) => {
    console.log(index);
    setShowMessage((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMessageBoxClose = () => {
    setShowMessage(false);
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };
  return (
    <div style={{ marginTop: "20px" }} className="parent-div">
      <div className="carosel-Navigators-icon">
        {/* Left Arrow */}

        <FaChevronLeft className="carosel-controoler-button1"
          onClick={() => sliderRef.current.slickPrev()}
          style={{ visibility: currentSlide > 0 ? "" : "hidden",  }}
        />

        {/* Right Arrow */}

        <FaChevronRight className="carosel-controoler-button2"
          onClick={() => sliderRef.current.slickNext()}
          style={{
            visibility:
              currentSlide + settings.slidesToShow < len ? "" : "hidden", 
          }}
        />
      </div>

      <Slider
        ref={(slider) => (sliderRef.current = slider)}
        {...settings}
        beforeChange={handleBeforeChange}
      >
        {data.map((item, index) => (
          <div className="main-crouser" key={index}>
            <div className="second-carusel">
              <div className="basic-info">
                <img
                  src="https://ieelifts.com/wp-content/uploads/2023/08/03-972x1024.jpg"
                  alt="img"
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "100%",
                  }}
                />
                <div className="engg-profile">
                  <span>{item.name}</span>
                  <span className="star-icon">
                    4.3 <LiaStarSolid style={{ color: "#F8AC1D" }} />
                  </span>
                </div>
              </div>
              {/* ----------------- message box component embedde here ----------- */}
              <div className="message-icon">
                <span onClick={() => handleMesageBox(index)}>
                  <TbMessage2 className="message-box-crouser"/>
                </span>
                <div className="message-dot"></div>
                {showMessage[index] && (
                  <div
                    ref={MessageBoxRef}
                    style={{
                      left: len - 1 === index ? "0px" : "0",
                      position: "relative",
                    }}
                    className="engg-message"
                  >
                    <MessageBox onClose={handleMessageBoxClose} />
                  </div>
                )}
              </div>
            </div>
            {/* ----------------- message box component embedde here ----------- */}

            <div className="main-head-div">
              <div className="skill-box">
                <div class="dots2">
                  <span class="dot-progress"></span>
                  <span class="dot-progress2"></span>
                </div>
                <div className="skill-bar">
                  <span className="skill-per reactjs">
                    <span className="tooltip">70%</span>
                  </span>
                </div>

                <div className="hover-icon-service">
                  <div className="dropdown">
                    <span>ram kapur</span>
                    <span>service E1</span>

                    <div className="dropdown-menu">
                      <div className="drop-parent">
                        <div className="upper-sec">
                          <p>Ram kapoor</p>
                          <p>Service E1</p>
                          <span className="horizontal-row"></span>
                        </div>
                        <div className="lower-sec">
                          <p>JON : 123546</p>
                          <p>No: 9306754257</p>
                          <p style={{ marginLeft: "-14px", width: "100%" }}>
                            Add : 53 local street ludiana
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown2">
                    <span>ram kapur</span>
                    <span>service E1</span>

                    <div className="dropdown-menu">
                      <div className="drop-parent">
                        <div className="upper-sec">
                          <p>Ram kapoor</p>
                          <p>Service E1</p>
                          <span className="horizontal-row"></span>
                        </div>
                        <div className="lower-sec">
                          <p>JON : 123546</p>
                          <p>No: 9306754257</p>
                          <p style={{ marginLeft: "-14px", width: "100%" }}>
                            Add : 53 local street ludiana
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown3">
                {/* <div className="pie-chart-detail"> */}
                <TaskChart />
                {/* </div> */}

                <div
                  className="dropdown-menu"
                  style={{ left: len - 1 === index ? "-165px" : "-12%" }}
                >
                  <div className="drop-parent">
                    <p className="tasks-heading">Tasks</p>

                    <div className="task-main-div">
                      <div className="dot-name">
                        <div className="task-dot"></div>
                        <div className="taskmain-info">
                          <p>Mr.Ram Kapoor</p>
                          <p>JON:123456</p>
                        </div>
                      </div>
                      <div className="taskmain-info">
                        <p>Service</p>
                        <p>E1</p>
                      </div>
                    </div>
                    <span className="horizontal-row2"></span>
                    {/* one row infromation ends */}
                    <div className="task-main-div">
                      <div className="dot-name">
                        <div className="task-dot"></div>
                        <div className="taskmain-info">
                          <p>Mr.Ram Kapoor</p>
                          <p>JON:123456</p>
                        </div>
                      </div>
                      <div className="taskmain-info">
                        <p>Service</p>
                        <p>E1</p>
                      </div>
                    </div>
                    <span className="horizontal-row2"></span>
                    {/* Repeat the above block for additional task rows as needed */}
                    <div className="task-main-div">
                      <div className="dot-name">
                        <div className="task-dot"></div>
                        <div className="taskmain-info">
                          <p>Mr.Ram Kapoor</p>
                          <p>JON:123456</p>
                        </div>
                      </div>
                      <div className="taskmain-info">
                        <p>Service</p>
                        <p>E1</p>
                      </div>
                    </div>
                    <span className="horizontal-row2"></span>
                    <div className="task-main-div">
                      <div className="dot-name">
                        <div className="task-dot"></div>
                        <div className="taskmain-info">
                          <p>Mr.Ram Kapoor</p>
                          <p>JON:123456</p>
                        </div>
                      </div>
                      <div className="taskmain-info">
                        <p>Service</p>
                        <p>E1</p>
                      </div>
                    </div>
                    <span className="horizontal-row2"></span>
                    <div className="task-main-div">
                      <div className="dot-name">
                        <div className="task-dot"></div>
                        <div className="taskmain-info">
                          <p>Mr.Ram Kapoor</p>
                          <p>JON:123456</p>
                        </div>
                      </div>
                      <div className="taskmain-info">
                        <p>Service</p>
                        <p>E1</p>
                      </div>
                    </div>
                    <span className="horizontal-row2"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ServiceEnggCrousel;
