// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React from "react";
import MembershipSubCard from "./MembershipSubCard";

const MembershipCard = ({ DemoData,order }) => {
  const numRows = order === 1 ? 5 : 1;
  const titleClass =
    DemoData.dataType === "Warrenty"
      ? "membership_card_title_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_title_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_title_gold"
      : "membership_card_title_silver";

  const borderClass =
    DemoData.dataType === "Warrenty"
      ? "membership_card_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_gold"
      : "membership_card_silver";

  const shadowClass =
    DemoData.dataType === "Warrenty"
      ? "membership_card_warrenty_shadow"
      : DemoData.dataType === "Platinum"
      ? "membership_card_platinum_shadow"
      : DemoData.dataType === "Gold"
      ? "membership_card_gold_shadow"
      : "membership_card_silver_shadow";

  const scrollbar =
    DemoData.dataType === "Warrenty"
      ? "membership_card_scrollable_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_scrollable_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_scrollable_gold"
      : "membership_card_scrollable_silver";

  const cardColor =
    DemoData.dataType === "Warrenty"
      ? "membership_card_counts_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_counts_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_counts_gold"
      : "membership_card_counts_silver";

  return (
    <>
      <div className={`membership_card ${borderClass} ${shadowClass}`}>
        <div className="membership_card_topbar">
          <div className="membership_card_topbar_left">
            <p className={`membership_card_title ${titleClass}`}>
              {DemoData.dataType}
            </p>
            <p className="membership_card_revenue">
              Revenue: {DemoData.revenue}
            </p>
          </div>
          <div className={`membership_card_counts ${cardColor}`}>
            <p>{DemoData.count}</p>
          </div>
        </div>

        <div className="membership_card_stats">
          <div className="membership_card_expiring">
            <div className="membership_card_expiring-title">
              <p>Expiring Soon</p>
              <p>{DemoData.expiringCount}</p>
            </div>
            <div className={`membership_card_scrollable ${scrollbar}`}>
              {DemoData.data.map((data, index) => {
                return !data.isExpired ? (
                  <MembershipSubCard
                    data={data}
                    key={index}
                    dataType={DemoData.dataType}
                  />
                ) : null;
              })}
            </div>
          </div>
          <div className="membership_card_expiring ">
            <div className="membership_card_expiring-title membership_card_expired-title">
              <p>Expired</p>
              <p>{DemoData.expiredCount}</p>
            </div>
            <div className="membership_card_scrollable membership_card_scrollable_expired">
              {DemoData.data.map((data, index) => {
                return data.isExpired ? (
                  <MembershipSubCard
                    data={data}
                    key={index}
                    dataType={DemoData.dataType}
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembershipCard;
