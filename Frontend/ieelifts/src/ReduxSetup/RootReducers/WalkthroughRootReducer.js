import { combineReducers } from "redux";

import { walkthroughIndexReducer } from "../Reducers/WalkthroughReducers";

const WalkthroughRootReducer = combineReducers({
    walkthroughIndexReducer: walkthroughIndexReducer
})

export default WalkthroughRootReducer;