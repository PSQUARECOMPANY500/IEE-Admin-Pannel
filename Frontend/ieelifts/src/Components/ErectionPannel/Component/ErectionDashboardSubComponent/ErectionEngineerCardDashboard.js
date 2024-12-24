import React, { useState, useEffect, useRef, useCallback } from "react";
import { TbMessage2 } from "react-icons/tb";
import MessageBox from "../../../AdminPannel/Component/DashboardSubComponent/MessageBox";
import { useMediaQuery } from "@react-hook/media-query";

import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions"



const ErectionEngineerCardDashboard = ({ item, index, len}) => {
    const smallLaptopSizes = useMediaQuery('(min-width: 769px) and (max-width: 1280px)');

    // console.log("this is erection data --------------->>>>>>>>>> ] " , item?.EnggPhoto)


    const dropdownClickRef = useRef();
    const MessageBoxRef = useRef(null);
    const [showMessage, setShowMessage] = useState([false]);
    const [ImageUrl, setImageUrl] = useState();

    const handleMessageBoxClose = () => {
        setShowMessage(false);
    };

    const useClickOutside = (ref, handler) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    handler();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, handler]);
    };


    const handleMesageBox = (index) => {
        setShowMessage((prev) => ({
            ...prev,
            [index]: !prev[index],

        }));
    };

    const statusBorder = item?.status === "Working" ? "erectionEngineerStatusWorking" : item?.status === "On-break" ? "erectionEngineerStatusBreak" : "erectionEngineerStatusLeave"

    const handleOutsideClick = useCallback(() => {
        setShowMessage(false);
    }, []);

    useClickOutside(dropdownClickRef, handleOutsideClick);


    //------------------------------------------------------------------------------------------------------------------------------

    const fetchImageUrl = async (key) => {
        try {
          const response = await getImagesFromS3Bucket(`${key}`);
          // console.log("this is response for Engg id ", response.data.url);
          return response.data.url;
        } catch (error) {
          console.log(
            "error while fecthing the engg Images from S3 bucket ",
            error
          );
        }
      };

    useEffect(() => {
        const fetchImage = async () => {
          const url = await fetchImageUrl(item?.EnggPhoto);
          // console.log("this is consoling my url ", url);
          setImageUrl(url || "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png");
        };
    
        // if (item?.ServiceEnggPic) {
        fetchImage();
        // }
      }, [item]);

//------------------------------------------------------------------------------------------------------------------------------------

    // onClick = {() => { setClick(item.ServiceEnggId); setOnClick((prev) => !prev) }}
    return (
        <div className={"enginerCardHover"}>
            <div className="erectionEngineerDetails">
                <div className="basic-info">
                    <img
                        src={ImageUrl} alt="img"
                        style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="erectionEnggprofile">
                        <span>{item?.EnggName}</span>
                        <span className={`star-icon ${statusBorder}`}>
                            {item?.status}
                        </span>
                    </div>
                </div>

                <div className="message-icon erectionEngineerMessageIcon" ref={dropdownClickRef}>
                    <span onClick={() => handleMesageBox(index)} >
                        <TbMessage2 className="message-box-crouser" />
                    </span>
                    {/* <div className="message-dot"></div> */} 
                    {showMessage[index] && (
                        <div
                            ref={MessageBoxRef}
                            style={{
                                left: len - 1 === index ? "0px" : "0", top: "100%",
                                position: "absolute"
                                
                            }}
                            className="engg-message"
                        >
                            <MessageBox onClose={handleMessageBoxClose} EnggId={item.EnggObjId} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErectionEngineerCardDashboard;