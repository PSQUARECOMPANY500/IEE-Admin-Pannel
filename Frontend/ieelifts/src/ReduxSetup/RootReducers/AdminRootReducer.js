import { combineReducers} from 'redux';

import { fetchAllCallbackReducer } from "../Reducers/AdminReducer"
import { fetchCallbackDetailWithCallbackIdReducer } from "../Reducers/AdminReducer"
import { fetchAllClientDetailReducer } from "../Reducers/AdminReducer"

const AdminRootReducer = combineReducers({
    fetchAllCallbackReducer:fetchAllCallbackReducer,
    fetchCallbackDetailWithCallbackIdReducer:fetchCallbackDetailWithCallbackIdReducer,
    fetchAllClientDetailReducer:fetchAllClientDetailReducer
})

export default AdminRootReducer;