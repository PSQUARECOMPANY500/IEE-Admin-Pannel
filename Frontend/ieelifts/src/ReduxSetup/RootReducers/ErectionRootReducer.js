import { combineReducers } from "redux";
import { getErectionEnggForErectionPannelReducer } from "../Reducers/ErectionEnggReducer"


const ErectionRootReducer = combineReducers({
    getErectionEnggForErectionPannelReducer:getErectionEnggForErectionPannelReducer
})


export default ErectionRootReducer;