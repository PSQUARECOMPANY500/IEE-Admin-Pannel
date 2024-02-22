import React from "react";
import ClientDetails from "./ClientDetails";
import { FaPrint } from "react-icons/fa6";

const ClientMembershipDetails = () => {
  return (
    <div style={{ width: "65%" }}>
      <ClientDetails />
      <div>
        <div>
          <p>History</p>
        </div>
        <div className="history">
            <p>June 12, 2016</p>
            <p><FaPrint /></p>
            <p>June 12, 2017</p>
        </div>
      </div>
    </div>
  );
};

export default ClientMembershipDetails;
