import React from "react";
import MembershipExpiring from "./MembershipExpiring";
import ClientMembershipDetails from "./ClientMembershipDetails";

const ExpiringComponent = ({ DemoData }) => {
  return (
    <div className="expandedMembershipheading">
      <ClientMembershipDetails />
      <MembershipExpiring DemoData={DemoData} />
    </div>
  );
};

export default ExpiringComponent;
