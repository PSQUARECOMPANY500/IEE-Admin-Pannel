import { GET_ALL_CALLBACK } from "../Actions/AdminActions";
import { GET_CALLBACK_BY_ID } from "../Actions/AdminActions";
import { GET_ALL_CLIENT_DETAIL } from "../Actions/AdminActions";
import { GET_ALL_CHECKLIST } from "../Actions/AdminActions";
import { GET_ENGG_DETAIL } from "../Actions/AdminActions";
import { ASSIGN_CALLBACK_BY_ADMIN } from "../Actions/AdminActions";

import { GET_ALL_SERVICE_REQUEST } from "../Actions/AdminActions";
import { GET_ASSIGN_CALLBACK_DETAILS } from "../Actions/AdminActions";
import { GET_REQUEST_DETAIL_BY_REQUEST_ID } from "../Actions/AdminActions";
import { GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID } from "../Actions/AdminActions";

import { GET_ALL_ASSIGN_SERVICE_REQUEST } from "../Actions/AdminActions";

import { GET_ALL_ASSIGN_CALLBACK } from "../Actions/AdminActions";

import { GET_CURRENT_DATE_ASSIGN_CALLBACK } from "../Actions/AdminActions";
import { GET_BOOKED_DATES_FOR_ENGGS } from "../Actions/AdminActions";
import { GET_ENGG_BASIC_DATA_FOR_CROUSER } from "../Actions/AdminActions";
import { TICKET_COMPONENT_RENDERED } from "../Actions/AdminActions";
import { GET_MEMBERSHIP_DATA } from "../Actions/AdminActions";
import { GET_LIMITED_CLIENT_DATA } from "../Actions/AdminActions";
import { GET_LIMITED_CLIENT_DATA_EXPIRED } from "../Actions/AdminActions";
import { GET_CLIENT_MEMBERSHIP_HISTORY } from "../Actions/AdminActions";
import { GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST } from "../Actions/AdminActions";
import { GET_CLIENT_CALL_DETAILS } from "../Actions/AdminActions";
import { CREATE_CLIENT_CALL } from "../Actions/AdminActions";
import { GET_CLIENT_DETAILS } from "../Actions/AdminActions";
import { GET_ALL_CLIENTS } from "../Actions/AdminActions";
import { GET_FILTER_DATA } from "../Actions/AdminActions";

const intialState22 = {
  clients: null,
};
export const getFilterDataReducer = (state = intialState22, action) => {
  switch (action.type) {
    case GET_FILTER_DATA:
      return { ...state, clients: action.payload };
    default:
      return state;
  }
};
const intialState21 = {
  clients: null,
};
export const getClientsReducer = (state = intialState21, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return { ...state, clients: action.payload };
    default:
      return state;
  }
};

const intialState20 = {
  clientCall: null,
};
export const createClientCallReducer = (state = intialState20, action) => {
  switch (action.type) {
    case CREATE_CLIENT_CALL:
      return { ...state, clientCall: action.payload };
    default:
      return state;
  }
};

const intialState19 = {
  membershipCleintDetail: null,
};
export const requestGetMemberShipClientReducer = (
  state = intialState19,
  action
) => {
  switch (action.type) {
    case GET_CLIENT_DETAILS:
      return { ...state, membershipCleintDetail: action.payload };
    default:
      return state;
  }
};

const intialState18 = {
  membershipCallDetail: null,
};
export const requestGetMemberShipCallReducer = (
  state = intialState18,
  action
) => {
  switch (action.type) {
    case GET_CLIENT_CALL_DETAILS:
      return { ...state, membershipCallDetail: action.payload };
    default:
      return state;
  }
};

const intialState17 = {
  membershipHistory: null,
};
export const requestGetMemberShipHistoryReducer = (
  state = intialState17,
  action
) => {
  switch (action.type) {
    case GET_CLIENT_MEMBERSHIP_HISTORY:
      return { ...state, membershipHistory: action.payload };
    default:
      return state;
  }
};

const initialState16 = {
  membershipDetail: {
    expiring: {},
    expired: {},
  },
};

export const requestLimitedClientDataReducer = (
  state = initialState16,
  action
) => {
  switch (action.type) {
    case GET_LIMITED_CLIENT_DATA:
      return {
        ...state,
        membershipDetail: {
          ...state.membershipDetail,
          expiring: { ...state.membershipDetail.expiring, ...action.payload },
        },
      };
    case GET_LIMITED_CLIENT_DATA_EXPIRED:
      return {
        ...state,
        membershipDetail: {
          ...state.membershipDetail,
          expired: { ...state.membershipDetail.expired, ...action.payload },
        },
      };
    default:
      return state;
  }
};
// const intialState14 = {
//   membershipDetail: null,
// };
// export const requestLimitedClientDataReducer = (
//   state = intialState14,
//   action
// ) => {
//   switch (action.type) {
//     case GET_LIMITED_CLIENT_DATA:
//       console.log("Information", action.payload);
//       return {
//         ...state,
//         membershipDetail: { ...state.membershipDetail, ...action.payload },
//       };
//     case GET_LIMITED_CLIENT_DATA_EXPIRED:
//       console.log("Information", action.payload);
//       return {
//         ...state,
//         membershipDetail: { ...state.membershipDetail, ...action.payload },
//       };
//     default:
//       return state;
//   }
// };

const intialState15 = {
  membershipDetail: null,
};
export const requestGetMemberShipDataActionReducer = (
  state = intialState15,
  action
) => {
  switch (action.type) {
    case GET_MEMBERSHIP_DATA:
      return { ...state, membershipDetail: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get Engg Basic data in the Engg crouser
const intialState14 = {
  EnggBasicDetailForCrouser: null,
};

export const getEnggBasicDataForCrouserReducer = (
  state = intialState14,
  action
) => {
  switch (action.type) {
    case GET_ENGG_BASIC_DATA_FOR_CROUSER:
      return { ...state, EnggBasicDetailForCrouser: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
// function get Booked Slots for Enggs Reducer
const initialState13 = {
  bookedDatesEngg: null,
};
export const getBookedSlotsforEnggsReducer = (
  state = initialState13,
  action
) => {
  switch (action.type) {
    case GET_BOOKED_DATES_FOR_ENGGS:
      return { ...state, bookedDatesEngg: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//reducer to handle get Current Date Assign Service Request
const initialState12 = {
  currentDateServiceRequest: null,
};

export const getCurrentDateAssignServiceRequestReducer = (
  state = initialState12,
  action
) => {
  switch (action.type) {
    case GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST:
      return { ...state, currentDateServiceRequest: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

//reducer to handel ge tCurrent Date Assign CalbackAction

const intialState11 = {
  currentDateCallback: null,
};

export const getCurrentDateAssignCalbackAction = (
  state = intialState11,
  action
) => {
  switch (action.type) {
    case GET_CURRENT_DATE_ASSIGN_CALLBACK:
      return { ...state, currentDateCallback: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//Reducer to handle get All assign Callback requests.
const intialState10 = {
  assignCallback: null,
};

export const getAllAssignCallbackRequestReducer = (
  state = intialState10,
  action
) => {
  switch (action.type) {
    case GET_ALL_ASSIGN_CALLBACK:
      return { ...state, assignCallback: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//Reducer to handle get All Assign Service Request Reducer

const initialState9 = {
  serviceRequest: null,
};

export const getAllAssignServiceRequestReducer = (
  state = initialState9,
  action
) => {
  switch (action.type) {
    case GET_ALL_ASSIGN_SERVICE_REQUEST:
      return { ...state, serviceRequest: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//Reducer to handle assign Service Request Detail By RequestId

const intialState8 = {
  assignServiceRequestdetail: null,
};

export const assignServiceRequestDetailByRequestIdAction = (
  state = intialState8,
  action
) => {
  // console.log("3");

  switch (action.type) {
    case GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID:
      return { ...state, assignServiceRequestdetail: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

//fetch to handle get request by request Id

const intialState7 = {
  serviceRequest: null,
};
export const getRequestDetailByRequestIdReducer = (
  state = intialState7,
  action
) => {
  switch (action.type) {
    case GET_REQUEST_DETAIL_BY_REQUEST_ID:
      return { ...state, serviceRequest: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//Reducer fetchAllServiceRequestsReducers

const intialState6 = {
  serviceRequestDetail: null,
};
export const fetchAllServiceRequestsReducers = (
  state = intialState6,
  action
) => {
  switch (action.type) {
    case GET_ALL_SERVICE_REQUEST:
      return { ...state, serviceRequestDetail: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

//Reducer assignCallBackByAdminReducer

const intialState5 = {
  callBackDetail: null,
};
export const assignCallBackByAdminReducer = (state = intialState5, action) => {
  switch (action.type) {
    case ASSIGN_CALLBACK_BY_ADMIN:
      return { ...state, callBackDetail: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//fetch engg detail reducer
const intialState4 = {
  enggDetail: null,
};
export const fetchEnggDetailReducer = (state = intialState4, action) => {
  switch (action.type) {
    case GET_ENGG_DETAIL:
      return { ...state, enggDetail: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
//fetch checklist Reducer
const intialState3 = {
  checklists: null,
};
export const fetchChecklistReducer = (state = intialState3, action) => {
  switch (action.type) {
    case GET_ALL_CHECKLIST:
      return { ...state, checklists: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------
// fetch all callback reducers
const intialState = {
  callbacks: null,
};
export const fetchAllCallbackReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_ALL_CALLBACK:
      return { ...state, callbacks: action.payload };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

// fetch callback with id and correspondin the client details reducer

const intialState1 = {
  callbackData: null,
};

export const fetchCallbackDetailWithCallbackIdReducer = (
  state = intialState1,
  action
) => {
  switch (action.type) {
    case GET_CALLBACK_BY_ID:
      return {
        ...state,
        callbackData: action.payload,
      };
    default:
      return state;
  }
};

// --------------------------------------------------------------------------------------------------------------------------------------------------

//functio to fetch All Clients detail reducer
const intialState2 = {
  clientDetail: null,
};

export const fetchAllClientDetailReducer = (state = intialState2, action) => {
  switch (action.type) {
    case GET_ALL_CLIENT_DETAIL:
      return {
        ...state,
        clientDetail: action.payload,
      };
    default:
      return state;
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//function to fetch AssignCallbacks

const initialAssign = {
  assignDetails: null,
};
export const fetchAssignCallbacksDetailsReducer = (
  state = initialAssign,
  action
) => {
  switch (action.type) {
    case GET_ASSIGN_CALLBACK_DETAILS:
      return {
        ...state,
        assignDetails: action.payload,
      };
    default:
      return state;
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------

const intialStateRender = {
  isComponentRendered: false,
};

export const ticketSectionRenderReducer = (
  state = intialStateRender,
  action
) => {
  switch (action.type) {
    case TICKET_COMPONENT_RENDERED:
      return { ...state, isComponentRendered: true };
    default:
      return state;
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
