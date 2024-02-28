import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getClientMembershipDetails } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientDetails = ({ dataType, clientDetail }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientMembershipDetails());
  }, [dispatch, dataType]);
  // console.log("this is client details",clientDetail);
  return (
    clientDetail && (
      <div className="clientDetailContainer">
        <div className="clientDetailLeft">
          <img src={clientDetail?.responseData?.profileImage} width={100} />
        </div>
        <div className="clientDetailRight">
          <div>
            <p className="clientName">{clientDetail?.responseData?.name}</p>
            {clientDetail?.responseData && (
              <div>
                <span className="jonHeading">JON: </span>
                <span> {clientDetail?.responseData?.jobOrderNumber}</span>
              </div>
            )}
            <p>{clientDetail?.responseData?.number}</p>
            <p className="address" >{clientDetail?.responseData?.address}</p>
          </div>
          <div className="clientDetail">
            {clientDetail?.responseData && (
              <p>DOH: {clientDetail?.responseData?.DOH}</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ClientDetails;
