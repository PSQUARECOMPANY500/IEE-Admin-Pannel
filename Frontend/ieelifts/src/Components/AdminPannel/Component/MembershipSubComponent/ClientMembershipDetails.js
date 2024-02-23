import React from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";

const ClientMembershipDetails = () => {
  return (
    <div style={{ width: "65%" }}>
      <ClientDetails />
      <ClientMembershipHistory />
      <ClientCallDetails />
      <div className="callButtons">
        <button className="callButton callNowButton">Call Now</button>
        <button className="callButton addCallButton">Add Call</button>
      </div>
      <OfferButton />
      <NotificationMembership />
    </div>
  );
};

export default ClientMembershipDetails;
