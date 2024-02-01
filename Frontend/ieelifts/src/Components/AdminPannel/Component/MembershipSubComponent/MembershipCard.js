// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React from "react";
import MembershipSubCard from "./MembershipSubCard";
import MembershipCardDetails from "./MembershipCardDetails";

const MembershipCard = ({ DemoData, order, setClick, itemClick }) => {
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
      : DemoData.dataType === "Silver"
      ? "membership_card_silver_shadow"
      : "total_revenue_outer_shadow";

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
      <div
        className={`membership_card ${borderClass} ${shadowClass}  ${
          order === 1 && setClick
            ? "membership_card_expand animation"
            : setClick && "membership_card_expand_non"
        } `}
        style={{
          order: order,
          padding: order !== 1 && setClick ? "3% 6% 6% 6%" : undefined,
        }}
        onDoubleClick={(e) => itemClick()}
      >
        {DemoData !== "" && (
          <>
            <div
              className={`membership_card_topbar ${
                setClick
                  ? order !== 1
                    ? "membership_card_topbar_non_expand "
                    : "membership_card_topbar_expand"
                  : ""
              } `}
            >
              <div className="membership_card_topbar_left">
                <p className={`membership_card_title ${titleClass}`}>
                  {DemoData.dataType}
                </p>
                <p
                  className="membership_card_revenue"
                  style={setClick ? { display: "none" } : {}}
                >
                  Revenue: {DemoData.revenue}
                </p>
              </div>
              <div
                className={`membership_card_counts ${cardColor}`}
                style={{
                  padding: setClick ? (order !== 1 ? "2% 3%" : "1% 1.2%") : "",
                }}
              >
                <p>{DemoData.count}</p>
              </div>
            </div>
            <div
              style={
                order === 1 && setClick
                  ? { marginTop: "1rem" }
                  : { display: "none" }
              }
            >
              <MembershipCardDetails/>
            </div>
            <div
              style={
                order !== 1 && setClick
                  ? { marginTop: "1rem" }
                  : { display: "none" }
              }
            >
              <div className="after_expansion_labels">
                <span>Revenue:</span>
                <span>{DemoData.revenue}</span>
              </div>
              <div className="after_expansion_labels">
                <span>Expiring Soon:</span>
                <span>{DemoData.expiringCount}</span>
              </div>
              <div className="after_expansion_labels after_expansion_labels_expired">
                <span>Expired:</span>
                <span>{DemoData.expiredCount}</span>
              </div>
            </div>

            <div
              className={`membership_card_stats `}
              style={setClick ? { display: "none" } : {}}
            >
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
                <div
                  className={`membership_card_scrollable membership_card_scrollable_expired ${
                    setClick ? "membership_card_stats_expand_height" : ""
                  }`}
                >
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
          </>
        )}

        {DemoData === "" && setClick && (
          <div className={` total_revenue_outer animation`}>
            <div className="total_revenue">
              <p className="total_revenue_heading">Total Revenue</p>
              <p className="total_revenue_amount">&#8377; 15000000</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MembershipCard;
