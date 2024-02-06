import { combineReducers} from 'redux';

import { fetchAllCallbackReducer } from "../Reducers/AdminReducer"
import { fetchCallbackDetailWithCallbackIdReducer } from "../Reducers/AdminReducer"
import { fetchAllClientDetailReducer } from "../Reducers/AdminReducer"
import { fetchChecklistReducer } from "../Reducers/AdminReducer"
import { fetchEnggDetailReducer } from "../Reducers/AdminReducer"
import { assignCallBackByAdminReducer } from "../Reducers/AdminReducer"
import { fetchAssignCallbacksDetailsReducer } from '../Reducers/AdminReducer';
import { requestGetMemberShipDataActionReducer } from '../Reducers/AdminReducer';
import { requestLimitedClientData } from '../Reducers/AdminReducer';

const AdminRootReducer = combineReducers({
    fetchAssignCallbacksDetailsReducer:fetchAssignCallbacksDetailsReducer,
    fetchAllCallbackReducer:fetchAllCallbackReducer,
    fetchCallbackDetailWithCallbackIdReducer:fetchCallbackDetailWithCallbackIdReducer,
    fetchAllClientDetailReducer:fetchAllClientDetailReducer,
    fetchChecklistReducer:fetchChecklistReducer,
    fetchEnggDetailReducer:fetchEnggDetailReducer,
    assignCallBackByAdminReducer:assignCallBackByAdminReducer,
    requestGetMemberShipDataActionReducer:requestGetMemberShipDataActionReducer,
    requestLimitedClientData:requestLimitedClientData
})

export default AdminRootReducer;