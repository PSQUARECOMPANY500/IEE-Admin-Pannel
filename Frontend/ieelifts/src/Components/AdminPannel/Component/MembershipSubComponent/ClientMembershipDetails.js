import React from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";

const ClientMembershipDetails = ({ isExpired, dataType }) => {
  return (
    <div className="clientsContainer">
      <div className="clients">
        <div>
          <ClientDetails dataType={dataType} />
          <ClientMembershipHistory isExpired={isExpired} dataType={dataType} />
        </div>
        <div className="callButtons">
          <button
            className={`callButton ${
              isExpired ? "callNowButtonExpired" : "callNowButton"
            }`}
          >
            Call Now
          </button>
          <button
            className={`callButton  ${
              isExpired ? "addCallButtonExpired" : "addCallButton"
            }`}
          >
            Add Call
          </button>
        </div>
      </div>
      <div className="clients">
        <ClientCallDetails isExpired={isExpired} dataType={dataType} />
        <div>
          <NotificationMembership isExpired={isExpired} />
          <NotificationMembership isExpired={isExpired} />
        </div>
        <OfferButton isExpired={isExpired} />
      </div>
    </div>
  );
};

export default ClientMembershipDetails;
