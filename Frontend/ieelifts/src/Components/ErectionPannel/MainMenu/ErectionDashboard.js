import React, { useEffect, useState, useRef } from "react";
import "../Style/ErectionPannel.css";
import ErectionEngineerCardDashboard from "../Component/ErectionDashboardSubComponent/ErectionEngineerCardDashboard";

import { useDispatch, useSelector } from "react-redux";
import { getErectionEnggForErectionPannelAction } from "../../../ReduxSetup/Actions/ErectionEnggAction";
import { getImagesFromS3Bucket } from "../../../ReduxSetup/Actions/AdminActions";

import Slider from "react-slick";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import ErectionEnggLocation from "../Component/ErectionEngineerSubComponent/ErectionEnggLocation";

import { onClickEnggCart, getEnggCheckinOrNotOnToadaysDate } from "../../../ReduxSetup/Actions/AdminActions"

const ErectionDashboard = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  //pin index --------------------------------------------------------************************
  const [click, setClick] = useState("");
  const [hitclick, setHitClick] = useState(null);
  const [onclick, setOnClick] = useState(false);
  const [checkChecIn, setCheckIn] = useState();


  useEffect(() => {
    if (hitclick === click) {
      dispatch(onClickEnggCart(""));
      setHitClick(null);
      setClick(null);
      setCheckIn(!checkChecIn);
    } else {
      const getData = async () => {
        const data = await getEnggCheckinOrNotOnToadaysDate(click);
        setCheckIn(data?.isCheckIn);
      };
      getData();
      setHitClick(click);
      dispatch(onClickEnggCart(click));
    }
  }, [onclick]);

  const dataOnPin = useSelector((state) => {
    return state?.AdminRootReducer?.onClickEnggPinEnggLocationReducer
      ?.enggLocationOnPin;
  });

  useEffect(() => {
    if (dataOnPin === undefined) {
      setCheckIn(false);
      setClick("");
      setHitClick(null);
    }
  }, [dataOnPin]);

//--------------------------------------------------------------------************************


  // const [ImagesUrls, setImageUrls] = useState([]);
  useEffect(() => {
    dispatch(getErectionEnggForErectionPannelAction());
  }, [dispatch]);

  const erectionEnggers = useSelector(
    (state) =>
      state?.ErectionRootReducer?.getErectionEnggForErectionPannelReducer
        ?.ErectionEnggDetails
  );


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
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1500, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };


  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const len = erectionEnggers?.length;

  return (
    <div className="main-container erectionContainer">
     

  <div className="carosel-Navigators-icon">
    {/* Left Arrow */}

    <FaChevronLeft
      className="carosel-controoler-button1"
      onClick={() => sliderRef.current.slickPrev()}
      style={{ visibility: currentSlide > 0 ? "" : "hidden" }}
    />

    {/* Right Arrow */}

    <FaChevronRight
      className="carosel-controoler-button2"
      onClick={() => sliderRef.current.slickNext()}
       style={{
         visibility:
           currentSlide + settings.slidesToShow < len ? "" : "hidden",
       }}
    />
  </div>

  <div id="EngineerCrausel">
        <Slider
          ref={(slider) => (sliderRef.current = slider)}
          {...settings}
          beforeChange={handleBeforeChange}
        >
          {erectionEnggers?.map((Engineer, index) => {
            return (
              <ErectionEngineerCardDashboard
                item={Engineer}
                index={index}
                len={Engineer.length}
                // ImagesUrls={ImagesUrls}
                setClick={setClick}
                setOnClick={setOnClick}
                isHover={true}
                click={click}

              />
            );
          })}           
        </Slider>
      </div>

     

      <div className="report-description-section">
        <div className="more-descriptive erectionEngineerMap">
          <ErectionEnggLocation/>
          
        </div>
      </div>
    </div>
  );
};

export default ErectionDashboard;
