import axios from "axios";
import config from "../../config";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// all the type constants
export const GET_ALL_CALLBACK = "GET_ALL_CALLBACK";
export const GET_CALLBACK_BY_ID = "GET_CALLBACK_BY_ID";
export const GET_ALL_CLIENT_DETAIL = "GET_ALL_CLIENT_DETAIL";
export const GET_ALL_CHECKLIST = "GET_ALL_CHECKLIST";
export const GET_ENGG_DETAIL = "GET_ENGG_DETAIL";

export const ASSIGN_CALLBACK_BY_ADMIN = "ASSIGN_CALLBACK_BY_ADMIN";
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle callBack Assign BY Admin
    
export const assignCallBackByAdminAction = (ServiceEnggId,JobOrderNumber,callbackId,AllotAChecklist,Slot,Date,Message) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/admin/assigncallback`,
        {
          ServiceEnggId,
          JobOrderNumber,
          callbackId,
          AllotAChecklist,
          Slot,
          Date,
          Message,
        }
      );

      dispatch({
        type:ASSIGN_CALLBACK_BY_ADMIN,
        payload:response.data
      })

      console.log(response);
    } catch (error) {}
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// Action to handle fetch Engg detail by Id
export const fetchEnggDetailAction = (EnggId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getEnggDetailById/${EnggId}`
      );
      console.log(response);

      dispatch({
        type: GET_ENGG_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching checklist", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//Action to handle fetchcheck list
export const fetchChecklistAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getCheckList`);
      // console.log("checklist", response)
      dispatch({
        type: GET_ALL_CHECKLIST,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching checklist", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Admin actions to handle get All the clientcallbacks
export const fetchAllCallbacksAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/Allcallbacks`);
      // console.log(response)
      dispatch({
        type: GET_ALL_CALLBACK,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching callback", error);
    }
  };
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// fetch callback with id and correspondin the client details action

export const fetchCallbackDetailWithCallbackIdAction = (callbackId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientCalbackDetailWithClientDetail/${callbackId}`
      );
      // console.log(response)
      dispatch({
        type: GET_CALLBACK_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//functio to fetch All Clients detail action

export const fetchAllClientDetailAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/AllServiceEngg`);
      // console.log(response);

      dispatch({
        type: GET_ALL_CLIENT_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
