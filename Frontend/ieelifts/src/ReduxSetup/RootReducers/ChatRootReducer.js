import { combineReducers } from "redux";

import { createChatReducer } from "../Reducers/ChatReducer"
import { sendMessageReducer } from "../Reducers/ChatReducer"
import { getSenderMessagesReducer } from "../Reducers/ChatReducer"
import { getEnggPersonalMessagesReducer } from "../Reducers/ChatReducer"


const ChatRootReducer = combineReducers({
    createChatReducer:createChatReducer,
    sendMessageReducer:sendMessageReducer,
    getSenderMessagesReducer:getSenderMessagesReducer,
    getEnggPersonalMessagesReducer:getEnggPersonalMessagesReducer
})

export default ChatRootReducer;