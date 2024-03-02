import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import EngeeniersSubCard from './EngeeniersSubCard';
import EngChatNav from './EngChatNav';
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import Attendance from "./Attendance"
import Ratings from "./Ratings"
import TaskHistory from "./TaskHistory"
import SpareParts from "./SpareParts"

import { RxCross2 } from "react-icons/rx";
import { MdSend } from "react-icons/md";
import { MdAddCall } from "react-icons/md";


import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions"
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions"
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions"


const EngeeniersCard = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(null);

  // Render the selected component
  const renderSelectedComponent = () => {
    switch (currentComponent) {
      case 'c1':
        return <TaskHistory />;
      case 'c2':
        return <Attendance />;
      case 'c3':
        return <Ratings />;
      case 'c4':
        return <SpareParts />;
      default:
        return <Attendance />;
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


  useEffect(() => {
    setHeight(textareaRef.current);

  }, []);


  //socket implemantation starts ---------------------------------------------
  // const socket = io('http://localhost:8000');

  // useEffect(() => {
  //  socket.emit("setup", '65d49276f60a227274baf8e1');
  //  socket.on("connection", () => setSocketConnected(true))

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);







  const chatCreated = useSelector((state) => {
    if (state.ChatRootReducer && state.ChatRootReducer.createChatReducer && state.ChatRootReducer.createChatReducer.createChat) {
      return state.ChatRootReducer.createChatReducer.createChat.FullChat
    } else {
      return null
    }
  });
  // console.log("chat created", chatCreated?._id)


  const getMessages = useSelector((state) => {

    scroll();
    if (state.ChatRootReducer && state.ChatRootReducer.getSenderMessagesReducer && state.ChatRootReducer.getSenderMessagesReducer.message) {

      return state.ChatRootReducer.getSenderMessagesReducer.message.chats

    } else {
      return null
    }
  })
  // // console.log("all messages",getMessages)


  // useEffect(() => {
  //   dispatch(createChatActions(EnggId, '65d49276f60a227274baf8e1')); //todo - in future the id is dynamic as come from login user


  //   setTimeout(() => {
  //     if (chatCreated?._id) {
  //       dispatch(getSenderMessagesAction(chatCreated._id));
  //     }
  //   }, 400)
  //   // Cleanup function
  //   return () => {
  //     if (chatCreated?._id) {
  //       dispatch(getSenderMessagesAction()); // Clear sender messages when unmounting
  //       dispatch(createChatActions())
  //     }
  //   };
  // }, [dispatch, chatCreated?._id]);




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
    dispatch(sendChatMessageAction('65d49276f60a227274baf8e1', messageData, chatCreated?._id)); //todo - in future the id is dynamic as come from login user
    setMessageData('');


    if (textareaRef.current) {
      textareaRef.current.value = '';
      handleInput();

    }



    setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }

    }, 400)

  }

  useLayoutEffect(() => {
    scroll();
  }, [getMessages]);




  return (
    <>

      <div className={isChatOpen ? 'EngeeniersCardT' : 'EngeeniersCardF'}>

        {isChatOpen && <EngeeniersSubCard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />}
        <div className='SingleEng' style={{ display: isChatOpen ? 'none' : 'block' }}>
          <div className='SubSingleEng'>

            <div className='PDetails'>
              <div className='SubPDetails'>
                <div className='Pimg'></div>
                <h1>Name:    <span>Aayush</span></h1>
              </div>

              <h1>ID:    <span>123456</span></h1>
              <h1>Spare Parts:    <span>96</span></h1>
              <h1>Cash In Hand:     <span>10,000</span></h1>
              <FaRegFileAlt className='Icon_Color' />
            </div>
            <div className='ODetailsColumn'>
              <h5 onClick={() => setCurrentComponent('c1')}>Task History</h5>
              <h5 onClick={() => setCurrentComponent('c2')}>Attendence</h5>
              {/* <h5 onClick={()=>setCurrentComponent('c3')}>Rating</h5>
          <h5 onClick={()=>setCurrentComponent('c4')}>Spare parts</h5> */}
            </div>
            <div className='ODetails'>
              {renderSelectedComponent()}
            </div>
          </div>

        </div>

        <div className={isChatOpen ? 'EngeeniersChatT' : 'EngeeniersChatF'}>
          <EngChatNav />
          <div className='EngChatBox'>
            <div className='EngChatBoxHead'>
              <h6>online</h6>
              <div className='EngChatBoxIcons'>
                <IoCallOutline />
                <CiVideoOn />
              </div>
            </div>
            <div className='EngChatMsg'>
              <div className='SubEngChatMsg Yello_Scrollbar'>

                <div className="engchatmsg-sender-side">
                  <div className="engchatmsg-sender-message">
                    <p>hello preet sir kese ho ap khana ho gya paka kua khaya apne kahane me preet sir  roti me kya bna the sir  aalu gopbhi kha  lslksffhdashjhadfvxcm  sdkjhkjsd shns  skksk afdsdfdskcsd  !</p>
                  </div>
                </div>

                <div className=".engchatmsg-reciver-side">
                  <div className="engchatmsg-reciver-message">
                    <p>hello preet sir kese ho ap khana ho gya paka kua khaya apne kahane me preet sir  roti me kya bna the sir  aalu gopbhi kha  lslksffhdashjhadfvxcm  sdkjhkjsd shns  skksk afdsdfdskcsd  !</p>
                  </div>
                </div>





              </div>

            </div>

            <div className="agdam-eng-card" >
              <div className="eng-card-message-text">
                <textarea
                  placeholder="Enter message"
                  ref={textareaRef}
                  onInput={handleInput}
                  style={{ resize: "none", minHeight: '50px', height: `${textareaHeight}px`, fontFamily: "Poppins" }}
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

                <p className="send-messsage-eng-card " onClick={handleSendMessage}>
                  {swapIcon ? (<MdOutlineMic />) : (<MdSend />)}
                </p>
              </div>
            </div>



          </div>


        </div>
      </div>
    </>
  )
}

export default EngeeniersCard;