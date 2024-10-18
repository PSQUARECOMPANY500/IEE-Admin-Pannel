import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EngeeniersSubCard from "./EngeeniersSubCard";
import EngChatNav from "./EngChatNav";
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaRegFileAlt, FaSadCry } from "react-icons/fa";
import Attendance from "./Attendance";
import TaskHistory from "./TaskHistory";
import SpareParts from "./SpareParts";
import { MdSend } from "react-icons/md";
import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createChatActions, sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getEnggPersonalChatMessages } from "../../../../ReduxSetup/Actions/ChatActions";
import Rating from "./Rating";
import EditEngineerDetails from "./EditEngineerDetails";
import config from "../../../../config";

import { jwtDecode } from "jwt-decode";





import { BsArrowLeft } from "react-icons/bs";
import "../../../../Assets/Engeeniers.css";
import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions";

const EngeeniersCard = () => {
  const navigate = useNavigate();

  const adminID = localStorage.getItem("adminData")

  const decodeAdmin = jwtDecode(adminID);

// console.log("abjhi shwk ha  shek mera dosty", decodeAdmin.user._id)

  const [currentComponent, setCurrentComponent] = useState();
  const [isFirst, setIsFirst] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [borderMergin, setBorderMargin] = useState(0);
  const [engID, setEngID] = useState(null);
  const [currentEngName, setCurrentEngName] = useState(null);
  const [currentengImg, setCurrentEngImg] = useState(null);
  const [enggObjectId, setEnggObjectId] = useState(null);
  const [sparePartsCount, setsparePartsCount] = useState(0);

  const [onBackPress, setOnbackPress] = useState(false);

  const [currentengCash, setCurrentEngCash] = useState(null);

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  const [ImageURL,setImageURL] = useState();



  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  function checkLengthAndDispalyName(name) {
    if (name.length > 13) {
      return name.slice(0, 13) + "..."
    }
    return name
  }


  const handleEnggNameDoubleClick = (engId, engName, engImg, engCash, enggObjectId, lastname, sparePartsCount) => {
    setEnggObjectId(enggObjectId)
    setEngID(engId);
    setCurrentEngName(checkLengthAndDispalyName(engName + " " + lastname));
    setCurrentEngImg(engImg);
    setCurrentEngCash(engCash);
    setsparePartsCount(sparePartsCount)
  };
  // Render the selected component
  const renderSelectedComponent = () => {
    switch (currentComponent) {
      case "c1":
        return <TaskHistory engID={engID} />;
      case "c2":
        return <Attendance engID={engID} />;
      case "c3":
        return <Rating engID={engID} />;
      case "c4":
        return <SpareParts engID={engID} />;
      default:
        return <TaskHistory engID={engID} />;
    }
  };

  const dispatch = useDispatch();

  const fileInputField = useRef(null);
  const textareaRef = useRef();
  const messageBodyRef = useRef(null);
  const [messageData, setMessageData] = useState("");
  // console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}", messageData);


  const [socketConnected, setSocketConnected] = useState(false);
  const [file, setFile] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState();
  const [swapIcon, setSwapIcon] = useState(true);
  const [mediumScreen, setMediumScreen] = useState(false);

  const scroll = () => {
    if (messageBodyRef.current) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0].name);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setHeight(textareaRef.current);
  }, []);

  const chatCreated = useSelector((state) => {
    if (
      state.ChatRootReducer &&
      state.ChatRootReducer.createChatReducer &&
      state.ChatRootReducer.createChatReducer.createChat
    ) {
      return state.ChatRootReducer.createChatReducer.createChat.FullChat;
    } else {
      return null;
    }
  });

  // console.log("this is all chat crteatedddddddddddd", chatCreated);


  const getMessages = useSelector((state) => {
    scroll();
    if (
      state.ChatRootReducer &&
      state.ChatRootReducer.getEnggPersonalMessagesReducer &&
      state.ChatRootReducer.getEnggPersonalMessagesReducer.messages
    ) {
      return state.ChatRootReducer.getEnggPersonalMessagesReducer.messages.messageModel;
    } else {
      return null;
    }
  });
  // fetc engg personal informations --------------------------------
  // const enggMessages = useSelector((state) => state?.ChatRootReducer?.getEnggPersonalMessagesReducer?.messages?.messageModel);
  // console.log("thisn is engg messages use selector: ", getMessages)

  useEffect(() => {
    const fetchIntiakMessages = async () => {
      setIsLoadingMessages(true);
      const FinalMessages = await getMessages && getMessages?.map((data) => {
        return {
          chatId: data.ChatId,
          Content: data.Content,
          Sender: data.Sender[0],
        };
      });

      setAllMessages(FinalMessages);
      setIsLoadingMessages(false);
    };

    fetchIntiakMessages();
    scroll();
  }, [getMessages]);



  useEffect(() => {
    setAllMessages([]);
    setIsLoadingMessages(true);
    console.log("_____________________________", engID);
    enggObjectId && dispatch(createChatActions(enggObjectId, decodeAdmin.user._id)); //TODO: - in future the id is dynamic as come from login user
    if (chatCreated?._id && engID) {
      dispatch(getEnggPersonalChatMessages(engID))
    }
    // Cleanup function
    return () => {
      setIsLoadingMessages(true);
      if (chatCreated?._id && engID) {
        dispatch(getEnggPersonalChatMessages()); // Clear sender messages when unmounting
        dispatch(createChatActions());
      }
    };
  }, [dispatch, chatCreated?._id, engID]);




  const setHeight = (elem) => {
    const style = window.getComputedStyle(elem, null);
    const verticalBorders = Math.round(
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
    );
    const maxHeight = parseFloat(style.maxHeight) || 70;

    elem.style.height = "20px";

    const newHeight = elem.scrollHeight + verticalBorders;

    elem.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
    elem.style.height = Math.min(newHeight, maxHeight) + "px";

    setTextareaHeight(Math.min(newHeight, maxHeight));
  };

  const handleInput = () => {
    setHeight(textareaRef.current);
    setSwapIcon(!textareaRef.current.value.trim());
  };

  const handleSendMessage = async () => {
    if (chatCreated?._id){
    // console.log("lllllllllllllllllll", messageData)
    // console.log("oooooooooooooooooo", chatCreated?._id)
    const myNewMessage = await sendChatMessageAction(decodeAdmin.user._id, messageData, chatCreated?._id, "");   //TODO: it shoul be dynamically created  

    // console.log("333333333333333333333333", myNewMessage)

    }
    setMessageData("");
    dispatch(getEnggPersonalChatMessages(engID))

    if (textareaRef.current) {
      textareaRef.current.value = "";
      handleInput();
    }

    setTimeout(() => {
      if (chatCreated?._id && engID) {
        dispatch(getEnggPersonalChatMessages(engID))
      }
    }, 400);
  };

  useLayoutEffect(() => {
    scroll();
  }, [getMessages]);

  useEffect(() => {
    if (engID) {

      dispatch(getEnggPersonalChatMessages(engID))
    }
  }, [])



  const handleCurrentComponent = (c, m) => {
    setCurrentComponent(c);
    setBorderMargin(m);
  };

  const navigateOneStepBack = () => {
    // <EngeeniersSubCard />
    setIsSecond(false)
    // console.log("true engg design")
    // console.log("{{{{{", onBackPress);
  };

  useEffect(() => {
    const checkScreenSie = () => {
      if (window.innerWidth <= 1550) {
        setMediumScreen(true);
      } else {
        setMediumScreen(false);
      }
    }

    window.addEventListener('resize', checkScreenSie);

    return () => {
      window.removeEventListener('resize', checkScreenSie);
    }
  })

  
  //-------------------------------------    logic to get images forme the S3 bucket through API   ---------------------------------------------
 useEffect(() => {
  const fetchImageUrl = async () => {
    try {
      const response = await getImagesFromS3Bucket(`${currentengImg}`);
      setImageURL(response.data.url);
      return response.data.url;
    } catch (error) {
      console.log("error while fecthing the engg Images from S3 bucket ", error);
    }
   }

   fetchImageUrl()

 },[currentengImg])
 

//------------------------------------------------------------------------------------------------------------------------------------------------



  
  return (
    <>
      {onBackPress ? (
        <EngeeniersSubCard
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
          handleEnggNameDoubleClick={handleEnggNameDoubleClick}
          checkLengthAndDispalyName={checkLengthAndDispalyName}
        />
      ) : (
        <div
          className="EngeeniersCard"
          style={{
            gridTemplateColumns: isFirst || isSecond ? mediumScreen ? "2fr 0.8fr" : "2fr 1fr" : "1fr",
            gridTemplateAreas: isSecond && "'SingleEng'",
            gridGap: isFirst ? '0.5rem' : 0,

          }}
        >
          <EngeeniersSubCard
            isFirst={isFirst}
            setIsFirst={setIsFirst}
            isSecond={isSecond}
            setIsSecond={setIsSecond}
            handleEnggNameDoubleClick={handleEnggNameDoubleClick}
            checkLengthAndDispalyName={checkLengthAndDispalyName}
          />

          <div className="SingleEng" style={{ display: isSecond && "block" }}>
            <div className="SubSingleEng">
              <div className="PDetails">
                <div className="SubPDetails">
                  <div
                    onClick={navigateOneStepBack}
                    style={{ marginRight: "16px", cursor: "pointer" }}
                  >
                    <BsArrowLeft />
                  </div>

                  <div className="Pimg">
                    {/* <img src={currentengImg} alt="eng persnol image" /> */}
                    <img
                      src={ImageURL}
                      alt="eng persnol image"
                    />
                    {/* <img
                      src={
                        currentengImg?.length === 0
                          ? "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                          : `${config.documentUrl}/EnggAttachments/${currentengImg}`
                      }
                      alt="eng persnol image"
                    /> */}
                  </div>
                  <h1>
                    Name:<span>{currentEngName}</span>
                  </h1>
                </div>

                <h1>
                  ID: <span>{engID}</span>
                </h1>
                <h1>
                  Spare Parts: <span>{sparePartsCount}</span>
                </h1>
                <h1 className="ooo">
                  Cash In Hand: <span>{currentengCash}</span>
                </h1>
                <FaRegFileAlt
                  className="Icon_Color"
                  onClick={() => setOpenModal(true)}
                />
              </div>
              <div className="ODetailsColumn">
                <h5
                  onClick={() => {
                    handleCurrentComponent("c1", 0);
                  }}
                  style={{ color: borderMergin === 0 && "#F8AC1DAD" }}
                  id="Task"
                >
                  Task History
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c2", 25.5)}
                  style={{ color: borderMergin === 17 && "#F8AC1DAD" }}

                  id="Attendence">
                  Attendance
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c3", 50)}
                  style={{ color: borderMergin === 32 && "#F8AC1DAD" }}
                  id="Rating"
                >
                  Rating
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c4", 75)}
                  style={{ color: borderMergin === 49 && "#F8AC1DAD" }}
                  id="Spare"
                >
                  Spare parts
                </h5>
              </div>
              <div className="vertical-line">
                <div
                  className="overlay-vertical-line"
                  style={{ marginLeft: borderMergin + "%" }}
                ></div>
              </div>
              <div className="ODetails">{renderSelectedComponent()}</div>
            </div>
          </div>

          {/* -------------------------------------------------------engg chat section starts---------------------------------------------------------------------------- */}
          <div
            className="EngeeniersChatF"
            style={{ display: isFirst || isSecond ? "block" : "none" }}
          >
            <EngChatNav />
            <div className="EngChatBox">
              <div className="EngChatBoxHead">
                <h6>online</h6>
                <div className="EngChatBoxIcons">
                  <IoCallOutline />
                  <CiVideoOn />
                </div>
              </div>
              <div className="EngChatMsg">
                <div className="SubEngChatMsg Yello_Scrollbar">

                  {allMessages && allMessages?.length >= 0 ? (
                    allMessages?.map((item, index) => {
                      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", item.Sender);
                      const senderId = decodeAdmin.user._id;
                      const isCurrentUser = item.Sender === senderId;                   //TODO: - in future the id is dynamic as come from login user
                      return (
                        <div className={isCurrentUser ? "engchatmsg-sender-side" : ".engchatmsg-reciver-side"}>
                          <div className={isCurrentUser ? "engchatmsg-sender-message" : "engchatmsg-reciver-message"}>
                            <p>{item.Content}</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="skelton-in-message">
                      <div className="loader">
                        <div classname="box"></div>
                        <p>No Message Yet</p>
                      </div>
                    </div>

                  )}




                </div>
              </div>

              {/* // <div className="engchatmsg-sender-side">
                  //   <div className="engchatmsg-sender-message">
                  //     <p>Hi there! How are you doing today?</p>
                  //   </div>
                  // </div>

                  // <div className=".engchatmsg-reciver-side">
                  //   <div className="engchatmsg-reciver-message">
                  //     <p>Hey! I'm doing well, thanks. How about you?</p>
                  //   </div>
                  // </div> */}


              {/* -------------------------------------------------------engg chat section ends---------------------------------------------------------------------------- */}











              <div className="agdam-eng-card">
                <div className="eng-card-message-text">
                  <textarea
                    placeholder="Enter message"
                    ref={textareaRef}
                    onInput={handleInput}
                    style={{
                      resize: "none",
                      minHeight: "50px",
                      height: `${textareaHeight}px`,
                      fontFamily: "Poppins",
                    }}
                    className="text-area-message-eng-card"
                    onChange={(e) => setMessageData(e.target.value)}
                    value={messageData}
                  />
                </div>

                <div className="user-attachment4-eng-card">
                  <div className="user-attachment2-eng-card">
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      ref={fileInputField}
                      style={{ display: "none" }}
                      autoComplete="off"
                    />
                    <div
                      onClick={() => fileInputField.current.click()}
                      style={{ marginTop: "3px" }}
                    >
                      <MdOutlineAttachFile />
                    </div>
                  </div>

                  <p
                    className="send-messsage-eng-card "
                    onClick={handleSendMessage}
                  >
                    {swapIcon ? <MdOutlineMic /> : <MdSend />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openModal && (
        <div className="engineer-modal-wrapper">
          <div className="engineer-modal-container" ref={formRef}>
            <EditEngineerDetails engID={engID} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default EngeeniersCard;
