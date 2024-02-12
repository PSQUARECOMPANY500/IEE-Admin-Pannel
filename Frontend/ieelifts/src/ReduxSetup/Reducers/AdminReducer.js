import { GET_ALL_CALLBACK } from "../Actions/AdminActions";
import { GET_CALLBACK_BY_ID } from "../Actions/AdminActions";
import { GET_ALL_CLIENT_DETAIL } from "../Actions/AdminActions";
import { GET_ALL_CHECKLIST } from "../Actions/AdminActions";
import { GET_ENGG_DETAIL } from "../Actions/AdminActions";
import { ASSIGN_CALLBACK_BY_ADMIN } from "../Actions/AdminActions";

import { GET_ASSIGN_CALLBACK_DETAILS } from "../Actions/AdminActions";
import { GET_MEMBERSHIP_DATA } from "../Actions/AdminActions";
import { GET_LIMITED_CLIENT_DATA } from "../Actions/AdminActions";

const intialState7 = {
  membershipDetail: null,
};
export const requestLimitedClientData = (state = intialState7, action) => {
  switch (action.type) {
    case GET_LIMITED_CLIENT_DATA:
      return { ...state, membershipDetail: action.payload };
    default:
      return state;
  }
};
const intialState6 = {
  membershipDetail: null,
};
export const requestGetMemberShipDataActionReducer = (
  state = intialState6,
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

//fetch assignCallBackByAdminReducer

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
