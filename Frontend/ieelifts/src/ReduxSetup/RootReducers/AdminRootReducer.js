import { combineReducers} from 'redux';

import { fetchAllCallbackReducer } from "../Reducers/AdminReducer"
import { fetchCallbackDetailWithCallbackIdReducer } from "../Reducers/AdminReducer"
import { fetchAllClientDetailReducer } from "../Reducers/AdminReducer"
import { fetchChecklistReducer } from "../Reducers/AdminReducer"
import { fetchEnggDetailReducer } from "../Reducers/AdminReducer"
import { assignCallBackByAdminReducer } from "../Reducers/AdminReducer"

const AdminRootReducer = combineReducers({
    fetchAllCallbackReducer:fetchAllCallbackReducer,
    fetchCallbackDetailWithCallbackIdReducer:fetchCallbackDetailWithCallbackIdReducer,
    fetchAllClientDetailReducer:fetchAllClientDetailReducer,
    fetchChecklistReducer:fetchChecklistReducer,
    fetchEnggDetailReducer:fetchEnggDetailReducer,
    assignCallBackByAdminReducer:assignCallBackByAdminReducer
})

export default AdminRootReducer;