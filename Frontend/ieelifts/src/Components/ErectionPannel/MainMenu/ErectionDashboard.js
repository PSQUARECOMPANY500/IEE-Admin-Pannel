import React, { useEffect, useState, useRef } from "react";
import "../Style/ErectionPannel.css";
import ErectionEngineerCardDashboard from "../Component/ErectionDashboardSubComponent/ErectionEngineerCardDashboard";
import EnggLocation from "../../AdminPannel/Component/DashboardSubComponent/EnggLocationSection/EnggLocation";

import { useDispatch, useSelector } from "react-redux";
import { getErectionEnggForErectionPannelAction } from "../../../ReduxSetup/Actions/ErectionEnggAction";
import { getImagesFromS3Bucket } from "../../../ReduxSetup/Actions/AdminActions";
import ServiceEnggDataOnCrousel from "../../AdminPannel/Component/DashboardSubComponent/ServiceEnggDataOnCrousel";

import Slider from "react-slick";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import ErectionEnggLocation from "../Component/ErectionEngineerSubComponent/ErectionEnggLocation";

const ErectionDashboard = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [ImagesUrls, setImageUrls] = useState([]);
  useEffect(() => {
    dispatch(getErectionEnggForErectionPannelAction());
  }, [dispatch]);

  const erectionEnggers = useSelector(
    (state) =>
      state?.ErectionRootReducer?.getErectionEnggForErectionPannelReducer
        ?.ErectionEnggDetails
  );

  console.log(
    "erection engg is length ********************************  ",
    erectionEnggers
  );

  //-------------------- S3 bucket Get Data -----------------------------------------------------------------------------------

  const fetchImageUrl = async (key) => {
    try {
      const response = await getImagesFromS3Bucket(key);
      setImageUrls(response.data.url);
      return response.data.url;
    } catch (error) {
      console.log("Error while fetching the image from S3 bucket:", error);
      return null;
    }
  };

  erectionEnggers &&
    erectionEnggers?.map(
      async (imageKey) => imageKey && (await fetchImageUrl(imageKey?.EnggPhoto))
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

  <div className="carosel-Navigators-icon">
    {/* Left Arrow */}

    <FaChevronLeft
      className="carosel-controoler-button1"
      onClick={() => sliderRef.current.slickPrev()}
      // style={{ visibility: currentSlide > 0 ? "" : "hidden" }}
    />

    {/* Right Arrow */}

    <FaChevronRight
      className="carosel-controoler-button2"
      onClick={() => sliderRef.current.slickNext()}
      // style={{
      //   visibility:
      //     currentSlide + settings.slidesToShow < len ? "" : "hidden",
      // }}
    />
  </div>;

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  return (
    <div className="main-container erectionContainer">
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
                ImagesUrls={ImagesUrls}
              />
            );
          })}

          {/* {assignedArray?.map((item, index) => {
              if (
                item.ServiceEnggId === dataOnPin ||
                (item.ServiceEnggId === click && checkChecIn)
              ) {
                return (
                  <ErectionEngineerCardDashboard item={erectionEnggers} index={index} len={erectionEnggers.length} ImagesUrls={ImagesUrls} />
                );
              } else {
                return (
                  <ErectionEngineerCardDashboard item={erectionEnggers} index={index} len={erectionEnggers.length} ImagesUrls={ImagesUrls} />
                );
              }
            })} */}
          {/* {notAssignedArray?.map((item, index) => {
              if (
                item.ServiceEnggId === dataOnPin ||
                (item.ServiceEnggId === click && checkChecIn)
              ) {
                return (
                  <ErectionEngineerCardDashboard item={erectionEnggers} index={index} len={erectionEnggers.length} ImagesUrls={ImagesUrls} />
                );
              } else {
                return (
                  <ErectionEngineerCardDashboard item={erectionEnggers} index={index} len={erectionEnggers.length} ImagesUrls={ImagesUrls} />
                );
              }
            })} */}
        </Slider>
      </div>

      {/* <ServiceEnggDataOnCrousel/> */}
      {/* <div className='enginerCardsContainer' style={{ zIndex: "2", position: "relative", }}>


        {erectionEnggers?.map((Engineer, index) => {
          return (
            <ErectionEngineerCardDashboard item={Engineer} index={index} len={Engineers.length} ImagesUrls={ImagesUrls} />
          )
        })}
      </div>
 */}

      <div className="report-description-section">
        <div className="more-descriptive erectionEngineerMap">
          {/* <EnggLocation /> */}
          <ErectionEnggLocation/>
          
        </div>
      </div>
    </div>
  );
};

export default ErectionDashboard;
