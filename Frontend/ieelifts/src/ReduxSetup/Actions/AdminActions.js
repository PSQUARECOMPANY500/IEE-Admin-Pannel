import axios from "axios";
import config from "../../config";

import { toast } from 'react-hot-toast';


// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// all the type constants
export const GET_ALL_CALLBACK = "GET_ALL_CALLBACK";
export const GET_CALLBACK_BY_ID = "GET_CALLBACK_BY_ID";
export const GET_ALL_CLIENT_DETAIL = "GET_ALL_CLIENT_DETAIL";
export const GET_ALL_CHECKLIST = "GET_ALL_CHECKLIST";
export const GET_ENGG_DETAIL = "GET_ENGG_DETAIL";
export const CLEAR_TABLE_DATA = "CLEAR_TABLE_DATA";
export const ASSIGN_CALLBACK_BY_ADMIN = "ASSIGN_CALLBACK_BY_ADMIN";
export const GET_ASSIGN_CALLBACK_DETAILS="GET_ASSIGN_CALLBACK_DETAILS";
export const GET_ALL_SERVICE_REQUEST="GET_ALL_SERVICE_REQUEST";
export const GET_REQUEST_DETAIL_BY_REQUEST_ID = "GET_REQUEST_DETAIL_BY_REQUEST_ID";

export const ASSIGN_SERVICE_REQUEST_BY_ADMIN = "ASSIGN_SERVICE_REQUEST_BY_ADMIN";

export const GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID = "GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID";

export const GET_ALL_ASSIGN_SERVICE_REQUEST = "GET_ALL_ASSIGN_SERVICE_REQUEST";

export const GET_ALL_ASSIGN_CALLBACK = "GET_ALL_ASSIGN_CALLBACK";

export const GET_CURRENT_DATE_ASSIGN_CALLBACK = "GET_CURRENT_DATE_ASSIGN_CALLBACK";

/* export const TICKET_COMPONENT_RENDERED = "TICKET_COMPONENT_RENDERED"; */

export const GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST = "GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST";

export const GET_BOOKED_DATES_FOR_ENGGS = "GET_BOOKED_DATES_FOR_ENGGS";

export const GET_ENGG_BASIC_DATA_FOR_CROUSER = "GET_ENGG_BASIC_DATA_FOR_CROUSER";

export const GET_ENG_ASSIGN_SLOTS = "GET_ENG_ASSIGN_SLOTS";

export const GET_ENGG_LOCATION_DETAILS = "GET_ENGG_LOCATION_DETAILS";
// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get Engg Basic data in the Engg crouser

export const getEnggBasicDataForCrouserAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getEnggCrouserData`)
      //console.log(response,"response from eng crousal")
      dispatch({
        type:GET_ENGG_BASIC_DATA_FOR_CROUSER,
        payload:response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getBooked slots for enggs.

export const getBookedSlotsforEnggsAction = (date) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getAvailbaleEng/?Date=${date}`);
      dispatch({
        type:GET_BOOKED_DATES_FOR_ENGGS,
        payload:response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}





// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get Current Date Assign Service Request 
export const getCurrentDateAssignServiceRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getCurrentDateAssignServiceRequest`)
      dispatch({
        type:GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST,
        payload:response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}



// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get Current date assign callbacks

export const getCurrentDateAssignCalbackAction = () => {
    return async (dispatch) => {
      try {
        //console.log("USEeFFECT CALLED PART 2")
        const response = await axios.get(`${config.apiUrl}/admin/getCurrentDateAssignCallback`);
        //console.log("response",response);
          dispatch({
            type:GET_CURRENT_DATE_ASSIGN_CALLBACK,
            payload:response.data
          })
        } catch (error) {
          console.log("error while fetching Eng_details", error); 
        }  
    }
}





// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle getAllAssignCallback Request ("not is use may be use in future also")

export const getAllAssignCallbackRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getAllAssignCallback`);

      dispatch({
        type:GET_ALL_ASSIGN_CALLBACK,
        payload: response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error); 
    }
  }
}





// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//function to handle get all assignRequests

export const getAllAssignServiceRequestAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getAllAssignServices`);
      dispatch({
        type:GET_ALL_ASSIGN_SERVICE_REQUEST,
        payload:response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error); 
    }
  }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//action to handle get Assign service Request detail By Request Id

export const assignServiceRequestDetailByRequestIdAction = (RequestId) => {
  // console.log("2");
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getAssignRequestDetail/${RequestId}`);
      dispatch({
        type:GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID,
        payload:response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error);   
    }
  }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle Assign service Request by admin

export const assignserviceRequestByAdmin = (ServiceEnggId,JobOrderNumber,RequestId,AllotAChecklist,Slot,Date,Message,name,enggJon) => {
  return async (dispatch) => {
    try {
      //console.log("assign",ServiceEnggId,JobOrderNumber,RequestId,AllotAChecklist,Slot,Date,Message,name,enggJon)
      const response = await axios.post(`${config.apiUrl}/admin/assignRequest`,
      {
        ServiceEnggId,
        JobOrderNumber,
        RequestId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
      }
    );

    const responseData = await axios.put(`${config.apiUrl}/client/updateServiceRequest`,
    {
      RequestId,
      name,
      enggJon,
    }
  );
  dispatch({
    type:ASSIGN_SERVICE_REQUEST_BY_ADMIN,
    payload:response.data
  })

  toast.success('Assign Request successfully'); 

    } catch (error) {
      console.log("error while fetching Eng_details", error); 
    }
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//action to handle get request by request Id

export const getRequestDetailByRequestIdAction = (RequestId) =>{
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getRequestDetailByRequestid/${RequestId}`)

      dispatch({
        type:GET_REQUEST_DETAIL_BY_REQUEST_ID,
        payload:response.data
      })

    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle callBack Assign BY Admin
    
export const assignCallBackByAdminAction = (ServiceEnggId,JobOrderNumber,callbackId,AllotAChecklist,Slot,Date,Message,name,enggJon) => {
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

        await axios.put(`${config.apiUrl}/client/updateCallbacks`,
          {
            callbackId,
            name,
            enggJon,
          },
        );
  
      dispatch({
        type:ASSIGN_CALLBACK_BY_ADMIN,
        payload:response.data
      })
      toast.success('Assign callback successfully'); 
    } catch (error) {
      console.log("error while fetching Eng_details", error);
      // toast.success('no notification');
    }
  };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// Action to handle fetch Engg detail by Id
export const  fetchEnggDetailAction = (EnggId) => {
  return async (dispatch) => {
    try {
      
      if(EnggId===undefined){
        dispatch({
          type: GET_ENGG_DETAIL,
          payload: null,
        });
      }else{
        //console.log("EngId ",EnggId);
        const response = await axios.get(
          `${config.apiUrl}/admin/getEnggDetailById/${EnggId}`
        );
        //console.log("this is the responce fetchEnggDetailAction:",response);
        dispatch({
          type: GET_ENGG_DETAIL,
          payload: response.data,
        });
      }
      
    } catch (error) {
      console.log("error while fetching Eng_details", error);
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

//Admin actions to handle get All the fetch All Service Requests Action
export const fetchAllServiceRequestsAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/Allservices`);
      // console.log(response)
      dispatch({
        type: GET_ALL_SERVICE_REQUEST,
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

export const requestAssignCallbackDetail = (callbackId)=>{
  return async(dispatch)=>{
   try{
    const response = await axios.get(`${config.apiUrl}/admin/getAssignCallbackDetail/${callbackId}`);
    //console.log("assign_responce",response.data);

    dispatch({
      type: GET_ASSIGN_CALLBACK_DETAILS,
      payload: response.data,
    });

  }catch (error) {
      console.log("error while fetching data", error);
    }
  }  
}







//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//action performed for rendering the components
/* 
export const ticketSectionRenderAction = () => {
return async (dispatch) => {
  try {
    dispatch({ type: TICKET_COMPONENT_RENDERED})  
  } catch (error) {
    console.log("error while fetching data", error);
  }
}
} */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

export const EnggLocationDetailsFetch = (/* {ServiceEnggId} */)=>{
  return async(dispatch)=>{
    try{
      const response = await axios.get(`${config.apiUrl}/admin/getEnggLocationDetail`);
      dispatch({
        type: GET_ENGG_LOCATION_DETAILS,
        payload: response.data?.combinedData,
      });

      
    }catch(error){
      console.log("error while fetching EnggLocation data", error);
    }
  }
}