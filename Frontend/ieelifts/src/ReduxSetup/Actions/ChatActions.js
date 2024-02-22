import axios from "axios";
import config from "../../config";

export const CREATE_CHAT_ACTION = "CREATE_CHAT_ACTION"

export const SEND_MESSAGE_BY_SENDER = "SEND_MESSAGE_BY_SENDER"

export const FETCH_ALL_MESSAGES_BY_CHATID = "FETCH_ALL_MESSAGES_BY_CHATID"

//-------------------------------------------------------------------------------------------------------------------
//action to create chat

export const createChatActions = (userId,LoginId) => {
  return async(dispatch)=>{
      try {
       const response = await axios.post(`${config.apiUrl}/chat/createChat`,
       {
        userId,
        LoginId,
       }
     );

    //  console.log(response.data);

     dispatch({
        type:CREATE_CHAT_ACTION,
        payload:response.data
     })

      }catch (error) {
        console.log("error while fetching data", error);
      }
}
}

//-------------------------------------------------------------------------------------------------------------------


//action to send message

export const sendChatMessageAction = (Sender,Content,ChatId) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${config.apiUrl}/chat/sendMessage`,
       {
        Sender,
        Content,
        ChatId
       }
     );

     dispatch({
        type:SEND_MESSAGE_BY_SENDER,
        payload:response.data
     })

        } catch (error) {
            console.log("error while fetching data", error); 
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------

//action to get sender messages

export const getSenderMessagesAction = (chatId) =>{

    console.log(chatId)
    return async(dispatch) => {
        try {
            const response = await axios.get(`${config.apiUrl}/chat/getChatMessages/${chatId}`);
            dispatch({
                type:FETCH_ALL_MESSAGES_BY_CHATID,
                payload:response.data
            })
        } catch (error) {
            console.log("error while fetching data from messages", error);  
        }
    }
}


//-------------------------------------------------------------------------------------------------------------------