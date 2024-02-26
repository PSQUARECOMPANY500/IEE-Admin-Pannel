import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClientMembershipDetails } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientDetails = ({ dataType }) => {
  const dispatch = useDispatch();
  const clientDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipClientReducer
    ) {
      return state?.AdminRootReducer.requestGetMemberShipClientReducer
        .membershipCleintDetail;
    } else {
      return null;
    }
  });

  useEffect(() => {
    dispatch(getClientMembershipDetails());
  }, [dataType]);
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
              <p>JON: {clientDetail?.responseData?.jobOrderNumber}</p>
            )}
            <p>{clientDetail?.responseData?.number}</p>
            <p>{clientDetail?.responseData?.address}</p>
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
