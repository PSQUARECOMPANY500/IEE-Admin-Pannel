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
import { getAllAssignServiceRequestReducer } from '../Reducers/AdminReducer';
import { getAllAssignCallbackRequestReducer } from '../Reducers/AdminReducer';
import { getCurrentDateAssignCalbackAction } from '../Reducers/AdminReducer';
//import { ticketSectionRenderReducer } from '../Reducers/AdminReducer';
import { getCurrentDateAssignServiceRequestReducer } from '../Reducers/AdminReducer';
import { getBookedSlotsforEnggsReducer } from '../Reducers/AdminReducer';
import { getEnggBasicDataForCrouserReducer } from '../Reducers/AdminReducer';

import { fetchClientDetailsByJon } from '../Reducers/ClientReducer';


const AdminRootReducer = combineReducers({
    
    fetchClientDetailsByJon:fetchClientDetailsByJon,
    fetchAssignCallbacksDetailsReducer:fetchAssignCallbacksDetailsReducer,
    fetchAllCallbackReducer:fetchAllCallbackReducer,
    fetchCallbackDetailWithCallbackIdReducer:fetchCallbackDetailWithCallbackIdReducer,
    fetchAllClientDetailReducer:fetchAllClientDetailReducer,
    fetchChecklistReducer:fetchChecklistReducer,
    fetchEnggDetailReducer:fetchEnggDetailReducer,
    assignCallBackByAdminReducer:assignCallBackByAdminReducer,
    fetchAllServiceRequestsReducers:fetchAllServiceRequestsReducers,
    getRequestDetailByRequestIdReducer:getRequestDetailByRequestIdReducer,
    assignServiceRequestDetailByRequestIdAction:assignServiceRequestDetailByRequestIdAction,
    getAllAssignServiceRequestReducer:getAllAssignServiceRequestReducer,
    getAllAssignCallbackRequestReducer:getAllAssignCallbackRequestReducer,
    getCurrentDateAssignCalbackAction:getCurrentDateAssignCalbackAction,
    getCurrentDateAssignServiceRequestReducer:getCurrentDateAssignServiceRequestReducer,
    getBookedSlotsforEnggsReducer:getBookedSlotsforEnggsReducer,
    getEnggBasicDataForCrouserReducer:getEnggBasicDataForCrouserReducer

})

export default AdminRootReducer;