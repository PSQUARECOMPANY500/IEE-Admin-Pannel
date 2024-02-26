import React from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";

const ClientMembershipDetails = ({ isExpired }) => {
  return (
    <div className="clientsContainer">
      <div className="clients">
        <div>
          <ClientDetails />
          <ClientMembershipHistory />
        </div>
        <div className="callButtons">
          <button className={`callButton ${isExpired ? "callNowButtonExpired" :"callNowButton"}`}>Call Now</button>
          <button className="callButton addCallButton">Add Call</button>
        </div>
      </div>
      <div className="clients">
        <ClientCallDetails isExpired={isExpired} />
        <div>
          <NotificationMembership />
          <NotificationMembership />
        </div>
        <OfferButton />
      </div>
    </div>
  );
};

export default ClientMembershipDetails;
