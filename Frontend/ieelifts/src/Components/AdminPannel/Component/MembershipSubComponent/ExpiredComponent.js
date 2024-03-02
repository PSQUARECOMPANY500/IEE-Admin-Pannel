import React from 'react'
import MembershipExpired from "./MembershipExpired";
import ClientMembershipDetails from "./ClientMembershipDetails";


const ExpiredComponent = ({ DemoData }) => {
    return (
    <div className="expandedMembershipheading">
        <ClientMembershipDetails isExpired ={true} />
        <MembershipExpired DemoData={DemoData}  />
    </div>
    )
}

export default ExpiredComponent