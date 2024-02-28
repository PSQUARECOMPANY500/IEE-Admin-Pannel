import React, { useState } from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";
import CallButtons from "./CallButtons";
import { useSelector } from "react-redux";

const ClientMembershipDetails = ({ isExpired, dataType }) => {
  const [buttonSelect, setButtonSelect] = useState(false);
  const historyDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipHistoryReducer
    ) {
      return state?.AdminRootReducer.requestGetMemberShipHistoryReducer
        .membershipHistory;
    } else {
      return null;
    }
  });

  const callDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipCallReducer
    ) {
      return state?.AdminRootReducer.requestGetMemberShipCallReducer
        .membershipCallDetail;
    } else {
      return null;
    }
  });
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

  return (
    <div className="clientsContainer">
      <div className="clients">
        <div>
          <ClientDetails dataType={dataType} clientDetail={clientDetail} />
          <ClientMembershipHistory
            isExpired={isExpired}
            dataType={dataType}
            historyDetails={historyDetails}
          />
        </div>
        {clientDetail && clientDetail.responseData && (
          <CallButtons
            isExpired={isExpired}
            dataType={dataType}
            buttonSelect={() => {
              setButtonSelect(!buttonSelect);
            }}
            />
            )}
      </div>
      <div className="clients">
        <ClientCallDetails
            JON={clientDetail?.responseData?.jobOrderNumber}
          isExpired={isExpired}
          dataType={dataType}
          callDetails={callDetails}
          Mybutton={buttonSelect}
        />
        {clientDetail && clientDetail.responseData && (
          <div>
            <NotificationMembership isExpired={isExpired} dataType={dataType} />
            <NotificationMembership isExpired={isExpired} dataType={dataType} />
          </div>
        )}
        {clientDetail && clientDetail.responseData && (
          <>
            <OfferButton isExpired={isExpired} dataType={dataType} />
          </>
        )}
      </div>
    </div>
  );
};

export default ClientMembershipDetails;
