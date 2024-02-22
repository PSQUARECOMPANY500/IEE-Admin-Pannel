import React, { useRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdSend } from "react-icons/md";
import { MdAddCall } from "react-icons/md";


import { MdOutlineMic } from "react-icons/md";
import { MdOutlineAttachFile } from "react-icons/md";

import { useDispatch , useSelector } from "react-redux";
import { createChatActions } from "../../../../ReduxSetup/Actions/ChatActions"
import { sendChatMessageAction } from "../../../../ReduxSetup/Actions/ChatActions"
import { getSenderMessagesAction } from "../../../../ReduxSetup/Actions/ChatActions"



const MessageBox = ({ onClose,EnggId }) => {
  const dispatch = useDispatch();

  // console.log("clicked EnggId",EnggId);

  const [messageData, setMessageData] = useState();
 
  // console.log(messageData)


  const [file, setFile] = useState(false);
  const fileInputField = useRef(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0].name);
  };

  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState();
  const [swapIcon, setSwapIcon] = useState(true);

  useEffect(() => {
    setHeight(textareaRef.current);
  }, []);


 


  const chatCreated = useSelector((state) => {
    if(state.ChatRootReducer && state.ChatRootReducer.createChatReducer && state.ChatRootReducer.createChatReducer.createChat){
      return state.ChatRootReducer.createChatReducer.createChat.FullChat
    }else{
      return null
    }
  });
  console.log("chat created", chatCreated?._id)


  const getMessages = useSelector((state) => {
    if(state.ChatRootReducer && state.ChatRootReducer.getSenderMessagesReducer && state.ChatRootReducer.getSenderMessagesReducer.message){
      return state.ChatRootReducer.getSenderMessagesReducer.message.chats
    }else{
      return null
    }
  })
  console.log("all messages",getMessages)



  useEffect(()=>{
    dispatch(createChatActions(EnggId,'65d49276f60a227274baf8e1')) //todo - in future the id is dynamic as come from login user
    console.log("dooon",chatCreated?._id)
    if (chatCreated?._id) {
      dispatch(getSenderMessagesAction(chatCreated._id));
    }
  },[dispatch,chatCreated?._id])



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



  const handleSendMessage = () =>{
    dispatch(sendChatMessageAction('65d49276f60a227274baf8e1',messageData,chatCreated?._id)); //todo - in future the id is dynamic as come from login user
    setMessageData('');
    setTimeout(()=>{
      if (chatCreated?._id) {
        dispatch(getSenderMessagesAction(chatCreated._id));
      }
    },400)
  }

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

        <div className="message-body">

              {getMessages?.map((item) => {
                console.log("message item map", item.Content);
        return (
          <div className="sender-side" key={item._id}>
            <div className="sender-message">
              <p>{item.Content}</p>
            </div>
          </div>
        );
      })}
        
        
{/*           

          <div className="sender-side">
            <div className="sender-message">
              <p>I am fine jh whc wcuow uc uw c uow vcuo weuo v</p>
            </div>
          </div> */}
          
          {/* <div className="sender-side">
            <div className="sender-message">
              <p>I am fine jh whc wcuow uc uw c uow vcuo weuo v</p>
            </div>
          </div>
          <div className="reciver-side">
            <div className="reciver-message">
              <p>how are you b </p>
            </div>
          </div>
          <div className="reciver-side">
            <div className="reciver-message">
              <p>how are you b fjkwnefnwe fwefh whe fp f </p>
            </div>
          </div>
          <div className="sender-side">
            <div className="sender-message">
              <p>I am fine jh whc wcuow uc uw c uow vcuo weuo v</p>
            </div>
          </div>
          <div className="sender-side">
            <div className="sender-message">
              <p>I am fine jh whc wcuow uc uw c uow vcuo weuo v</p>
            </div>
          </div> */}

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
            style={{ resize: "none", height: `${textareaHeight}px` ,fontFamily:"Poppins"}}
            className="text-area-message-whatsapp"
            rows="4"
            cols="50"
            onChange={(e)=> setMessageData(e.target.value)}
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
            {swapIcon ? (<MdOutlineMic />) : ( <MdSend />) }
            </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
