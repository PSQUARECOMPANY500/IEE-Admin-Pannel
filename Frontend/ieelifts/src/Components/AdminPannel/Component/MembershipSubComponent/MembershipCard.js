// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React from "react";
import MembershipCardDetails from "./MembershipCardDetails";
import MembershipExpiring from "./MembershipExpiring";
import MembershipExpired from "./MembershipExpired";
// import { useDispatch, useSelector } from "react-redux";

const MembershipCard = ({
  DemoData,
  order,
  setClick,
  itemClick,
  clickCount,
}) => {
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

  const cardColor =
    DemoData.dataType === "Warrenty"
      ? "membership_card_counts_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_counts_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_counts_gold"
      : "membership_card_counts_silver";

  const hoverShadow =
    DemoData.dataType === "Warrenty"
      ? "membership_card_warrenty_hover"
      : DemoData.dataType === "Platinum"
      ? "membership_card_platinum_hover"
      : DemoData.dataType === "Gold"
      ? "membership_card_gold_hover"
      : "membership_card_silver_hover";

  return (
    <>
      <div
        className={`membership_card   ${
          order === 1 && setClick
            ? `membership_card_expand ${borderClass} `
            : setClick
            ? `membership_card_expand_non ${hoverShadow}`
            : `${shadowClass}`
        } `}
        style={{
          order: order,
          padding: order !== 1 && setClick ? "3% 6% 6% 6%" : undefined,
        }}
        onClick={(e) => {
          clickCount === 1 && itemClick();
        }}
        onDoubleClick={(e) => {
          if (clickCount !== 1) {
            itemClick();
          }
        }}
      >
        {DemoData !== "" && (
          <>
            <div
              className={`membership_card_topbar ${
                setClick
                  ? order !== 1
                    ? "membership_card_topbar_non_expand "
                    : ` membership_card_topbar_expand  ${
                        clickCount !== 1 ? "animation" : "animationExpand"
                      }
                    `
                  : ""
              }`}
            >
              <div className="membership_card_topbar_left">
                <p className={`membership_card_title ${titleClass}`}>
                  {DemoData?.dataType}
                </p>
                <p
                  className="membership_card_revenue"
                  style={setClick ? { display: "none" } : {}}
                >
                  Revenue
                  {DemoData?.Data?.details?.totalRevenue !== undefined
                    ? `: ₹${DemoData?.Data?.details?.totalRevenue}`
                    : " --"}
                </p>
              </div>
              <div
                className={`membership_card_counts ${cardColor} ${
                  setClick && "membership_card_counts_expand"
                } ${order === 1 && "membership_card_counts_expanded"}`}
                style={{
                  padding: setClick ? (order !== 1 ? "2% 3%" : "1% 1.2%") : "",
                }}
              >
                {/* <p>125</p> */}
                <p>{DemoData?.Data?.details?.count}</p>
              </div>
            </div>

            {order===1 && (
              <div
              style={
                order === 1 && setClick
                  ? { marginTop: "1rem" }
                  : { display: "none" }
              }
              className={
                order === 1 && setClick && clickCount !== 1
                  ? "animation"
                  : "animationExpand"
              }
            >
              <MembershipCardDetails
                DemoData={DemoData}
                expiredCount={DemoData?.Data?.details?.expiredCount}
                expiringCount={DemoData?.Data?.details?.expiringCount}
              />
            </div>
            )}

            <div
              style={
                order !== 1 && setClick
                  ? { marginTop: "1rem" }
                  : { display: "none" }
              }
            >
              <div className="after_expansion_labels">
                <span>Revenue:</span>
                <span>
                  {" "}
                  {DemoData?.Data?.details?.totalRevenue !== undefined
                    ? `${DemoData?.Data?.details?.totalRevenue}`
                    : " --"}
                </span>
              </div>
              <div className="after_expansion_labels">
                <span>Expiring Soon:</span>
                <span>
                  {" "}
                  {DemoData?.Data?.details?.expiringCount !== undefined
                    ? `${DemoData?.Data?.details?.expiringCount}`
                    : " --"}
                </span>
              </div>
              <div className="after_expansion_labels after_expansion_labels_expired">
                <span>Expired:</span>
                <span>
                  {" "}
                  {DemoData?.Data?.details?.expiredCount !== undefined
                    ? `${DemoData?.Data?.details?.expiredCount}`
                    : " --"}
                </span>
              </div>
            </div>

            <div
              className={`membership_card_stats `}
              style={setClick ? { display: "none" } : {}}
            >
              <MembershipExpiring
                DemoData={DemoData}
                setClick={setClick}
                count={DemoData?.Data?.details?.expiringCount}
              />
              <MembershipExpired
                DemoData={DemoData}
                setClick={setClick}
                count={DemoData?.Data?.details?.expiredCount}
              />
            </div>
          </>
        )}

        {DemoData === "" && setClick && (
          <div
            className={`total_revenue_outer ${
              order === 1 && clickCount === 1 ? "animationExpand" : ""
            }`}
          >
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
