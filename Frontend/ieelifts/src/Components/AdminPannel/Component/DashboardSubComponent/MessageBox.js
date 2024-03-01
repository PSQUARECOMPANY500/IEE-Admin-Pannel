import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdSend } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions";
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions";
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions";

import io from "socket.io-client";

const MessageBox = ({ onClose, EnggId }) => {
  const dispatch = useDispatch();

  const fileInputField = useRef(null);
  const textareaRef = useRef();
  const messageBodyRef = useRef(null);

  const [messageData, setMessageData] = useState();

  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // console.log("prrrrAlo",messageData)
  const [socketConnected, setSocketConnected] = useState(false);
  const [file, setFile] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState();
  const [swapIcon, setSwapIcon] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [allMessages, setAllMessages] = useState([]);
  console.log("allMessages", allMessages);

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

  const socket = io("https://iee-admin-pannel.onrender.com");

  useEffect(() => {
    socket.on("connect", () => [
      console.log("socket is connected successfully"),
    ]);

    return () => {
      socket.off("connect");
    };
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

  useEffect(() => {
    const fetchIntiakMessages = async () => {
      setIsLoading(true);
      setIsLoadingMessages(true);
      const FinalMessages = await getMessages?.map((data) => {
        return {
          chatId: data.ChatId,
          Content: data.Content,
          Sender: data.Sender[0],
        };
      });

      console.log("finalmessage", FinalMessages);

      setAllMessages(FinalMessages);
      setIsLoadingMessages(false);
      setIsLoading(false);
    };

    fetchIntiakMessages();
    scroll();
  }, [getMessages]);

  const sendMessage = useSelector(
    (state) => state?.ChatRootReducer?.sendMessageReducer?.chatMessage
  );
  const prevSendMessageRef = useRef();

  useEffect(() => {
    setAllMessages([]);
    setIsLoadingMessages(true);
    dispatch(createChatActions(EnggId, "65e0103005fd2695f3aaf6d4")); //todo - in future the id is dynamic as come from login user
    if (chatCreated?._id) {
      dispatch(getSenderMessagesAction(chatCreated._id));
    }
    /* setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    }, 300); */

    // Cleanup function
    return () => {
      setIsLoadingMessages(true);
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction()); // Clear sender messages when unmounting
        dispatch(createChatActions());
      }
    };
  }, [dispatch, chatCreated?._id, EnggId]);

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
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (chatCreated?._id) {
      const myNewMessage = await sendChatMessageAction(
        "65e0103005fd2695f3aaf6d4",
        messageData,
        chatCreated?._id
      );
      if (myNewMessage) {
        socket.emit("aloo", myNewMessage.data);
      }
      dispatch(getSenderMessagesAction(chatCreated._id));

      console.log("format", messageData);

      setMessageData("");
    }

    if (textareaRef.current) {
      textareaRef.current.value = "";
      handleInput();
    }

    setTimeout(() => {
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    }, 400);
    socket.emit("aloo", sendMessage);
  };

  useLayoutEffect(() => {
    scroll();
  }, [getMessages]);

  useEffect(() => {
    socket.on("EnggNewMessage", (message) => {
      setAllMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

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
          {isLoadingMessages ? (
            <div className="skelton-in-message">
              <div className="loader">
                <div class="box"></div>
                <p>Loading...</p>
              </div>
            </div>
          ) : allMessages?.length >= 0 ? (
            allMessages?.map((item, index) => {
              const isCurrentUser = item.Sender === "65e0103005fd2695f3aaf6d4";
              return (
                <div
                  className={isCurrentUser ? "sender-side" : "reciver-side"}
                  key={index}
                >
                  <div
                    className={
                      isCurrentUser ? "sender-message" : "reciver-message"
                    }
                  >
                    <p>{item.Content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="skelton-in-message">
              <div className="loader">
                <div class="box"></div>
                <p>No Message Yet</p>
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
