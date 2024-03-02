import axios from "axios";
import config from "../../config";

import {
  toast
} from 'react-hot-toast';


// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// all the type constants
export const GET_ALL_CALLBACK = "GET_ALL_CALLBACK";
export const GET_CALLBACK_BY_ID = "GET_CALLBACK_BY_ID";
export const GET_ALL_CLIENT_DETAIL = "GET_ALL_CLIENT_DETAIL";
export const GET_ALL_CHECKLIST = "GET_ALL_CHECKLIST";
export const GET_ENGG_DETAIL = "GET_ENGG_DETAIL";
export const CLEAR_TABLE_DATA = "CLEAR_TABLE_DATA";
export const ASSIGN_CALLBACK_BY_ADMIN = "ASSIGN_CALLBACK_BY_ADMIN";
export const GET_ASSIGN_CALLBACK_DETAILS = "GET_ASSIGN_CALLBACK_DETAILS";
export const GET_ALL_SERVICE_REQUEST = "GET_ALL_SERVICE_REQUEST";
export const GET_REQUEST_DETAIL_BY_REQUEST_ID = "GET_REQUEST_DETAIL_BY_REQUEST_ID";

export const ASSIGN_SERVICE_REQUEST_BY_ADMIN = "ASSIGN_SERVICE_REQUEST_BY_ADMIN";

export const GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID = "GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID";

export const GET_ALL_ASSIGN_SERVICE_REQUEST = "GET_ALL_ASSIGN_SERVICE_REQUEST";

export const GET_ALL_ASSIGN_CALLBACK = "GET_ALL_ASSIGN_CALLBACK";

export const GET_CURRENT_DATE_ASSIGN_CALLBACK = "GET_CURRENT_DATE_ASSIGN_CALLBACK";

/* export const TICKET_COMPONENT_RENDERED = "TICKET_COMPONENT_RENDERED"; */
/* export const TICKET_COMPONENT_RENDERED = "TICKET_COMPONENT_RENDERED"; */

export const GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST = "GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST";

export const GET_BOOKED_DATES_FOR_ENGGS = "GET_BOOKED_DATES_FOR_ENGGS";

export const GET_ENGG_BASIC_DATA_FOR_CROUSER = "GET_ENGG_BASIC_DATA_FOR_CROUSER";

export const GET_ENG_ASSIGN_SLOTS = "GET_ENG_ASSIGN_SLOTS";

export const GET_ENGG_LOCATION_DETAILS = "GET_ENGG_LOCATION_DETAILS";

export const GET_CLIENT_MEMBERSHIP_HISTORY = "GET_CLIENT_MEMBERSHIP_HISTORY";
export const GET_CLIENT_CALL_DETAILS = "GET_CLIENT_CALL_DETAILS";
export const CREATE_CLIENT_CALL = "CREATE_CLIENT_CALL";
export const GET_CLIENT_DETAILS = "GET_CLIENT_DETAILS";
export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_FILTER_DATA = "GET_FILTER_DATA";

export const GET_MEMBERSHIP_DATA = "GET_MEMBERSHIP_DATA";
export const GET_LIMITED_CLIENT_DATA = "GET_LIMITED_CLIENT_DATA";
export const GET_LIMITED_CLIENT_DATA_EXPIRED =
  "GET_LIMITED_CLIENT_DATA_EXPIRED";
// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//function to handle get Engg Basic data in the Engg crouser

export const getEnggBasicDataForCrouserAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getEnggCrouserData`)
      //console.log(response,"response from eng crousal")
      dispatch({
        type: GET_ENGG_BASIC_DATA_FOR_CROUSER,
        payload: response.data
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
        type: GET_BOOKED_DATES_FOR_ENGGS,
        payload: response.data
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
        type: GET_CURRENT_DATE_ASSIGN_SERVICE_REQUEST,
        payload: response.data
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
        type: GET_CURRENT_DATE_ASSIGN_CALLBACK,
        payload: response.data
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
        type: GET_ALL_ASSIGN_CALLBACK,
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
        type: GET_ALL_ASSIGN_SERVICE_REQUEST,
        payload: response.data
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
        type: GET_SERVICE_REQUEST_DETAIL_BY_SERVICE_REQUEST_ID,
        payload: response.data
      })
    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle Assign service Request by admin

export const assignserviceRequestByAdmin = (ServiceEnggId, JobOrderNumber, RequestId, AllotAChecklist, Slot, Date, Message, name, enggJon) => {
  return async (dispatch) => {
    try {
      //console.log("assign",ServiceEnggId,JobOrderNumber,RequestId,AllotAChecklist,Slot,Date,Message,name,enggJon)
      const response = await axios.post(`${config.apiUrl}/admin/assignRequest`, {
        ServiceEnggId,
        JobOrderNumber,
        RequestId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
      });

      await axios.put(`${config.apiUrl}/client/updateServiceRequest`, {
        RequestId,
        name,
        enggJon,
      });
      dispatch({
        type: ASSIGN_SERVICE_REQUEST_BY_ADMIN,
        payload: response.data
      })

      toast.success('Assign Request successfully');

    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//action to handle get request by request Id

export const getRequestDetailByRequestIdAction = (RequestId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getRequestDetailByRequestid/${RequestId}`)

      dispatch({
        type: GET_REQUEST_DETAIL_BY_REQUEST_ID,
        payload: response.data
      })

    } catch (error) {
      console.log("error while fetching Eng_details", error);
    }
  }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Action to handle callBack Assign BY Admin

export const assignCallBackByAdminAction = (ServiceEnggId, JobOrderNumber, callbackId, AllotAChecklist, Slot, Date, Message, name, enggJon) => {
  return async (dispatch) => {
    try {

      const response = await axios.post(`${config.apiUrl}/admin/assigncallback`, {
        ServiceEnggId,
        JobOrderNumber,
        callbackId,
        AllotAChecklist,
        Slot,
        Date,
        Message,
      });

      await axios.put(`${config.apiUrl}/client/updateCallbacks`, {
        callbackId,
        name,
        enggJon,
      }, );

      dispatch({
        type: ASSIGN_CALLBACK_BY_ADMIN,
        payload: response.data
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
export const fetchEnggDetailAction = (EnggId) => {
  return async (dispatch) => {
    try {

      if (EnggId === undefined) {
        dispatch({
          type: GET_ENGG_DETAIL,
          payload: null,
        });
      } else {
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

export const requestAssignCallbackDetail = (callbackId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getAssignCallbackDetail/${callbackId}`);
      //console.log("assign_responce",response.data);

      dispatch({
        type: GET_ASSIGN_CALLBACK_DETAILS,
        payload: response.data,
      });

    } catch (error) {
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

export const EnggLocationDetailsFetch = ( /* {ServiceEnggId} */ ) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/getEnggLocationDetail`);
      dispatch({
        type: GET_ENGG_LOCATION_DETAILS,
        payload: response.data?.combinedData,
      });


    } catch (error) {
      console.log("error while fetching EnggLocation data", error);
    }
  }
}

// -------------------armaan-dev---------------

export const requestGetMemberShipDataAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/admin/getMembershipDetails`
        );
        console.log("responce",response.data)
      
      dispatch({
        type: GET_MEMBERSHIP_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
export const requestLimitedClientDataAction = async (
  dispatch,
  dataType,
  wanted,
  page,
  pageSize
) => {
  try {
    const response = await axios.get(`${config.apiUrl}/admin/getMembership`, {
      params: {
        dataType,
        wanted,
        page,
        pageSize,
      },
    });
    console.log("I am in requestLimitedClientDataAction",response.data);
    if (wanted === "expiring") {
      dispatch({
        type: GET_LIMITED_CLIENT_DATA,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_LIMITED_CLIENT_DATA_EXPIRED,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log("error while fetching data", error);
  }
};
export const getClientMembershipHistoryAction = (jobOrderNumber) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_MEMBERSHIP_HISTORY,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getMembershipHistory`, {
          params: {
            jobOrderNumber,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_MEMBERSHIP_HISTORY,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
export const getClientCallsDetails = (jobOrderNumber, callType) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_CALL_DETAILS,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientCalls`, {
          params: {
            jobOrderNumber,
            callType,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_CALL_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
export const createClientCalls = (jobOrderNumber, callType, callDate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/admin/createCall`, {
        jobOrderNumber,
        callType,
        callDate,
      });
      dispatch({
        type: CREATE_CLIENT_CALL,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
export const getClientMembershipDetails = (jobOrderNumber) => {
  return async (dispatch) => {
    try {
      if (!jobOrderNumber) {
        dispatch({
          type: GET_CLIENT_DETAILS,
          payload: [],
        });
        return;
      }
      const response = await axios.get(
        `${config.apiUrl}/admin/getClientDataForMembership`, {
          params: {
            jobOrderNumber,
          },
        }
      );
      dispatch({
        type: GET_CLIENT_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
export const getClients = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/AllClients`);
      dispatch({
        type: GET_ALL_CLIENTS,
        payload: response.data,
      });
    } catch (error) {}
  };
};
export const getfilteredData = (filterCondition) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/filterClient`, {
        params: {
          type: filterCondition.type,
          condition: filterCondition.condition,
        },
      });
      dispatch({
        type: GET_FILTER_DATA,
        payload: response.data,
      });
    } catch (error) {}
  };
};

// -------------------armaan-dev---------------