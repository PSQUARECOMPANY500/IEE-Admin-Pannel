import React from "react";

import MembershipSubCard from "./MembershipSubCard";

const MembershipExpiring = () => {
  const scrollbar =
    DemoData.dataType === "Warrenty"
      ? "membership_card_scrollable_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_scrollable_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_scrollable_gold"
      : DemoData.dataType === "Silver"
      ? "membership_card_scrollable_silver"
      : "total_revenue_outer_border";

  return (
    <div className="membership_card_expiring">
      <div className="membership_card_expiring-title">
        <p>Expiring Soon</p>
        <p>{DemoData.expiringCount}</p>
      </div>
      <div
        className={`membership_card_scrollable ${scrollbar} ${
          setClick ? "membership_card_stats_expand_height" : ""
        }`}
      >
        {/* {DemoData?.Data?.expData.map((data, index) => {
        return data && !data.isExpired ? (
          <MembershipSubCard
            data={data}
            key={index}
            dataType={DemoData?.dataType}
          />
        ) : null;
      })} */}
      </div>
    </div>
  );
};

export default MembershipExpiring;
