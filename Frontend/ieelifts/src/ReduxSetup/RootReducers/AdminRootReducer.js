import { combineReducers} from 'redux';

import { fetchAllCallbackReducer } from "../Reducers/AdminReducer"
import { fetchCallbackDetailWithCallbackIdReducer } from "../Reducers/AdminReducer"
import { fetchAllClientDetailReducer } from "../Reducers/AdminReducer"
import { fetchChecklistReducer } from "../Reducers/AdminReducer"
import { fetchEnggDetailReducer } from "../Reducers/AdminReducer"
import { assignCallBackByAdminReducer } from "../Reducers/AdminReducer"
import { fetchAssignCallbacksDetailsReducer } from '../Reducers/AdminReducer';
import { fetchAllServiceRequestsReducers } from '../Reducers/AdminReducer';
import { getRequestDetailByRequestIdReducer } from '../Reducers/AdminReducer';
import { assignServiceRequestDetailByRequestIdAction } from '../Reducers/AdminReducer';

const AdminRootReducer = combineReducers({
    fetchAssignCallbacksDetailsReducer:fetchAssignCallbacksDetailsReducer,
    fetchAllCallbackReducer:fetchAllCallbackReducer,
    fetchCallbackDetailWithCallbackIdReducer:fetchCallbackDetailWithCallbackIdReducer,
    fetchAllClientDetailReducer:fetchAllClientDetailReducer,
    fetchChecklistReducer:fetchChecklistReducer,
    fetchEnggDetailReducer:fetchEnggDetailReducer,
    assignCallBackByAdminReducer:assignCallBackByAdminReducer,
    fetchAllServiceRequestsReducers:fetchAllServiceRequestsReducers,
    getRequestDetailByRequestIdReducer:getRequestDetailByRequestIdReducer,
    assignServiceRequestDetailByRequestIdAction:assignServiceRequestDetailByRequestIdAction
})

export default AdminRootReducer;