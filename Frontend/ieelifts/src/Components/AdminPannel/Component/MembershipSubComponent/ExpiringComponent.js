import React from "react";
import MembershipExpiring from "./MembershipExpiring";
import ClientMembershipDetails from "./ClientMembershipDetails";

const ExpiringComponent = ({ DemoData }) => {
  return (
    <div className="expandedMembershipheading">
      <ClientMembershipDetails dataType={DemoData?.dataType} />
      <MembershipExpiring DemoData={DemoData} />
    </div>
  );
};

export default ExpiringComponent;
