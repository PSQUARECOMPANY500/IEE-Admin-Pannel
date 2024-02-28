import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdLocalFireDepartment, MdSend, MdSignalCellularNull } from "react-icons/md";
import { MdAddCall } from "react-icons/md";

import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";

import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader"

import { useDispatch, useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions";
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions";

import  io from "socket.io-client";

const MessageBox = ({ onClose, EnggId }) => {
  const dispatch = useDispatch();

  const fileInputField = useRef(null);
  const textareaRef = useRef();
  const messageBodyRef = useRef(null);


  const [messageData, setMessageData] = useState();
  // console.log("prrrrAlo",messageData)
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

  const socket = io('https://iee-admin-pannel.onrender.com');
  
  
  useEffect(() => {
    socket.on('connect', ()=>[
      console.log("socket is connected successfully")
    ])
  }, []);

    // socket.on('testing',(message)=>{
    //   console.log("this is message",message);
    // })
    

    
    
    
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
  // console.log("chat created", chatCreated?._id)

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
  // console.log("all messages", getMessages);


  const sendMessage = useSelector((state) =>  state.ChatRootReducer.sendMessageReducer.chatMessage);
  // console.log("emit", sendMessage);

  const prevSendMessageRef = useRef();



  useEffect(() => {
    dispatch(createChatActions(EnggId, "65d49276f60a227274baf8e1")); //todo - in future the id is dynamic as come from login user
    setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    }, 400);

    // Cleanup function
    return () => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction()); // Clear sender messages when unmounting
        dispatch(createChatActions());
      }
    };
  }, [dispatch, chatCreated?._id]);

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


  //function to send the message ------------------------------------------------
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if(chatCreated?._id){
      dispatch(sendChatMessageAction("65d49276f60a227274baf8e1",messageData,chatCreated?._id)); //todo - in future the id is dynamic as come from login user
      console.log('format',messageData);
      setMessageData("");
    }
    
    // socket.emit("join chat",chatCreated?._id);
    
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
  

  socket.on("message recieved", (newMessageRecieved) => {
    console.log("newMessageRecieved",newMessageRecieved)   
  })

    
  



  // useEffect(() => {
  //   if (prevSendMessageRef.current !== sendMessage) {
  //     socket.emit("newmessage", sendMessage);
  //     console.log("emit", sendMessage);
  //     prevSendMessageRef.current = sendMessage;
  //   }
  // },[sendMessage]);



  return (
    <div className="message-parent-div">
      <div className="message-child-div">
        <div className="messagebox-heading">
          <div className="pro-heading"></div>
          <div className="featured-icon">
            <div>
              <MdAddCall />
            </div>
            <div>
              <RxCross2 onClick={onClose} />
            </div>
          </div>
        </div>

        <div className="message-body" ref={messageBodyRef}>
          {getMessages?.length > 0 ? (
            getMessages.map((item) => {
              console.log("frontend",item.Sender[0])

              const isCurrentUser = item.Sender[0] === '65d49276f60a227274baf8e1';

              return (
                <div className={isCurrentUser ? "sender-side":"reciver-side" } key={item._id}>
                  <div className={isCurrentUser ? "sender-message":"reciver-message"}>
                    <p>{item.Content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="skelton-in-message">
            <div className="loader">
              <div class="box">
                </div><p>No Message Yet</p>
                </div>
            </div>
          )}


          {file.length > 0 && (
            <div className="sender-side">
              <div className="sender-message">
                <p>{file}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="agdam">
        <div className="message-text">
          <textarea
            placeholder="Enter message"
            ref={textareaRef}
            onInput={handleInput}
            style={{ resize: "none", height: "10px", fontFamily: "Poppins" }}
            className="text-area-message-whatsapp"
            rows="4"
            cols="50"
            onChange={(e) => setMessageData(e.target.value)}
            value={messageData}
          />
        </div>

        <div className="user-attachment4">
          <div className="user-attachment2">
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

          <p className="send-messsage" onClick={handleSendMessage}>
            {swapIcon ? <MdOutlineMic /> : <MdSend />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
