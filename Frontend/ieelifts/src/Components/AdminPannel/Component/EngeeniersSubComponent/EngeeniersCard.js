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
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions";
import Rating from "./Rating";
import EditEngineerDetails from "./EditEngineerDetails";
import config from "../../../../config";

import { BsArrowLeft } from "react-icons/bs";

const EngeeniersCard = () => {
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState();
  const [isFirst, setIsFirst] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [borderMergin, setBorderMargin] = useState(0);
  const [engID, setEngID] = useState(null);
  const [currentEngName, setCurrentEngName] = useState(null);
  const [currentengImg, setCurrentEngImg] = useState(null);

  const [onBackPress, setOnbackPress] = useState(false);

  const [currentengCash, setCurrentEngCash] = useState(null);





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

  const handleEnggNameDoubleClick = (engId, engName, engImg, engCash) => {
    setEngID(engId);
    setCurrentEngName(engName);
    setCurrentEngImg(engImg);
    setCurrentEngCash(engCash);
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
  const [messageData, setMessageData] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [file, setFile] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState();
  const [swapIcon, setSwapIcon] = useState(true);

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

  const getMessages = useSelector((state) => {
    scroll();
    if (
      state.ChatRootReducer &&
      state.ChatRootReducer.getSenderMessagesReducer &&
      state.ChatRootReducer.getSenderMessagesReducer.message
    ) {
      return state.ChatRootReducer.getSenderMessagesReducer.message.chats;
    } else {
      return null;
    }
  });

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

  const handleSendMessage = () => {
    dispatch(
      sendChatMessageAction(
        "65d49276f60a227274baf8e1",  //to be dynamic in future
        messageData,
        chatCreated?._id
      )
    );
    setMessageData("");

    if (textareaRef.current) {
      textareaRef.current.value = "";
      handleInput();
    }

    setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    }, 400);
  };

  useLayoutEffect(() => {
    scroll();
  }, [getMessages]);

  const handleCurrentComponent = (c, m) => {
    setCurrentComponent(c);
    setBorderMargin(m);
  };

  const navigateOneStepBack = () => {
    // <EngeeniersSubCard />
   setIsSecond(false)
    console.log("true engg design")
    console.log("{{{{{",onBackPress);
  };

  return (
    <>
      {onBackPress ? (
        <EngeeniersSubCard
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          isSecond={isSecond}
          setIsSecond={setIsSecond}
          handleEnggNameDoubleClick={handleEnggNameDoubleClick}
        />
      ) : (
        <div
          className="EngeeniersCard"
          style={{
            gridTemplateColumns: isFirst || isSecond ? "2fr 1fr" : "1fr",
            gridTemplateAreas: isSecond && "'SingleEng'",
          }}
        >
          <EngeeniersSubCard
            isFirst={isFirst}
            setIsFirst={setIsFirst}
            isSecond={isSecond}
            setIsSecond={setIsSecond}
            handleEnggNameDoubleClick={handleEnggNameDoubleClick}
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
                      src={
                        currentengImg?.length === 0
                          ? "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                          : `${config.documentUrl}/EnggAttachments/${currentengImg}`
                      }
                      alt="eng persnol image"
                    />
                  </div>
                  <h1>
                    Name:<span>{currentEngName}</span>
                  </h1>
                </div>

                <h1>
                  ID: <span>{engID}</span>
                </h1>
                <h1>
                  Spare Parts: <span>25</span>
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
                >
                  Task History
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c2", 17)}
                  style={{ color: borderMergin === 17 && "#F8AC1DAD" }}
                >
                  Attendence
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c3", 32)}
                  style={{ color: borderMergin === 32 && "#F8AC1DAD" }}
                >
                  Rating
                </h5>
                <h5
                  onClick={() => handleCurrentComponent("c4", 49)}
                  style={{ color: borderMergin === 49 && "#F8AC1DAD" }}
                >
                  Spare parts
                </h5>
              </div>
              <div className="vertical-line">
                <div
                  className="overlay-vertical-line"
                  style={{ marginLeft: borderMergin + "rem" }}
                ></div>
              </div>
              <div className="ODetails">{renderSelectedComponent()}</div>
            </div>
          </div>

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
                  <div className="engchatmsg-sender-side">
                    <div className="engchatmsg-sender-message">
                      <p>Hi there! How are you doing today?</p>
                    </div>
                  </div>

                  <div className=".engchatmsg-reciver-side">
                    <div className="engchatmsg-reciver-message">
                      <p>Hey! I'm doing well, thanks. How about you?</p>
                    </div>
                  </div>
                  <div className="engchatmsg-sender-side">
                    <div className="engchatmsg-sender-message">
                      <p>
                        I'm good too, thanks for asking. Did you do anything
                        interesting recently?
                      </p>
                    </div>
                  </div>

                  <div className=".engchatmsg-reciver-side">
                    <div className="engchatmsg-reciver-message">
                      <p>
                        Not much, just caught up on some reading and went for a
                        walk. How about you?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    ></input>
                    <div
                      onClick={() => fileInputField.current.click()}
                      style={{ marginTop: "3px" }}
                    >
                      <MdOutlineAttachFile />
                    </div>
                  </div>
                  ``
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
